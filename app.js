/* =====================================================================
   HEARING STATION – app logic and live audio simulation
   ===================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     SETTINGS YOU MAY WANT TO CHANGE
     ------------------------------------------------------------------ */
  var CONFIG = {
    // Master volume ceiling (0 to 1). The speech is first evened out to a
    // fixed loudness, then multiplied by this. Lower = quieter.
    MAX_VOLUME: 0.35,
    // Absolute peak limit after everything (0 to 1). Nothing can ever be
    // louder than this, whatever the recording is like.
    PEAK_LIMIT: 0.4,
    // Loudness every recording is evened out to before MAX_VOLUME.
    SPEECH_LEVEL: 0.1,

    NORMAL_SECONDS: 5,      // how long the clip plays normally first
    AUTO_FADE_SECONDS: 1.2, // smooth change from normal to condition
    TOGGLE_FADE_SECONDS: 0.25,
    IDLE_SECONDS: 60,       // no touch for this long -> back to home
    FULLSCREEN: true,       // go full screen on first touch

    AUDIO_FILE: 'speech.mp3',
    HEARWHO_LINK: 'intent://#Intent;package=com.hearxgroup.hearwho;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.hearxgroup.hearwho;end',

    // Tinnitus sound levels (kept well below the speech).
    TINNITUS: { ring: 0.012, buzz: 0.05, hiss: 0.045 },
    NOISE_RING_LEVEL: 0.008,  // soft 4 kHz ringing for noise-induced loss

    DEFAULT_LANG: 'en'
  };

  var T = window.TEXT;
  if (!T) return;

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var dbToGain = function (db) { return Math.pow(10, db / 20); };

  var state = {
    lang: CONFIG.DEFAULT_LANG,
    screen: 'home',
    cond: null,
    params: { severity: 1, sound: 'ring', stage: 2 },
    lastTouch: Date.now()
  };

  function t(key) {
    var pack = T[state.lang] || T.en;
    return (pack[key] != null) ? pack[key] : (T.en[key] != null ? T.en[key] : key);
  }

  /* ------------------------------------------------------------------
     Language
     ------------------------------------------------------------------ */
  function applyLanguage() {
    document.documentElement.lang = state.lang;
    $$('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    $$('.lang-btn').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-lang') === state.lang); });
    if (state.cond) renderCondition();
    updateAudioUI();
    fitText();
  }

  function setLanguage(lang) {
    if (!T[lang]) return;
    state.lang = lang;
    try { localStorage.setItem('hearing-lang', lang); } catch (e) { /* ignore */ }
    applyLanguage();
  }

  /* Shrinks text that would overflow its box, so nothing needs scrolling. */
  function fitText() {
    requestAnimationFrame(function () {
      $$('.screen.active [data-fit]').forEach(function (el) {
        el.style.fontSize = '';
        var size = parseFloat(getComputedStyle(el).fontSize);
        var min = size * 0.6;
        while (el.scrollHeight > el.clientHeight + 1 && size > min) {
          size *= 0.95;
          el.style.fontSize = size + 'px';
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     Screens
     ------------------------------------------------------------------ */
  function show(name) {
    if (name !== 'cond') stopPlayback();
    state.screen = name;
    $$('.screen').forEach(function (s) { s.classList.toggle('active', s.id === 'screen-' + name); });
    if (name === 'ack') { $('#ackBox').checked = false; updateAck(); }
    if (name === 'home' || name === 'list') state.cond = null;
    fitText();
  }

  function goHome() {
    stopPlayback();
    state.params = { severity: 1, sound: 'ring', stage: 2 };
    show('home');
  }

  /* ------------------------------------------------------------------
     Acknowledgement + hearWHO
     ------------------------------------------------------------------ */
  function updateAck() { $('#ackContinue').disabled = !$('#ackBox').checked; }

  function openHearWHO() {
    if (!$('#ackBox').checked) return;
    window.location.href = CONFIG.HEARWHO_LINK;
    // When the visitor comes back from the app, start fresh on the home page.
    setTimeout(goHome, 1500);
  }

  /* ------------------------------------------------------------------
     Conditions
     ------------------------------------------------------------------ */
  var CONDITIONS = {
    presby: { highlight: 'cochlea' },
    noise:  { highlight: 'cochlea' },
    tinn:   { highlight: 'both' },
    neuro:  { highlight: 'nerve' }
  };

  function openCondition(id) {
    state.cond = id;
    renderCondition();
    show('cond');
    resetPlayerUI();
  }

  function renderCondition() {
    var id = state.cond;
    $('#condTitle').textContent = t(id + 'Name');
    $('#condText').textContent = t(id + 'Text');
    $('#condTodo').textContent = t(id + 'Todo');
    $('#toggleCondBtn').textContent = t(id + 'Short');

    $$('.extra').forEach(function (el) { el.classList.toggle('show', el.getAttribute('data-for') === id); });
    syncChoiceButtons();
    $('#stageSlider').value = state.params.stage;

    // Diagram highlight
    var dia = $('#diagram');
    dia.classList.toggle('neuro', id === 'neuro');
    var hl = $('#dHighlight');
    var where = CONDITIONS[id].highlight;
    if (where === 'nerve') { setAttrs(hl, { cx: 370, cy: 132, r: 34 }); }
    else if (where === 'both') { setAttrs(hl, { cx: 330, cy: 150, r: 66 }); }
    else { setAttrs(hl, { cx: 300, cy: 160, r: 46 }); }

    updateStatusLabel();
    fitText();
  }

  function setAttrs(el, attrs) { for (var k in attrs) el.setAttribute(k, attrs[k]); }

  function syncChoiceButtons() {
    $$('.choice').forEach(function (group) {
      var p = group.getAttribute('data-param');
      $$('button', group).forEach(function (b) {
        b.classList.toggle('on', String(state.params[p]) === b.getAttribute('data-value'));
      });
    });
  }

  /* Draws the cochlea spiral in the diagram. */
  function drawCochlea() {
    var cx = 300, cy = 160, turns = 2.6, rMax = 34, rMin = 6, steps = 120, d = '';
    for (var i = 0; i <= steps; i++) {
      var f = i / steps;
      var a = Math.PI + f * turns * 2 * Math.PI;
      var r = rMax - (rMax - rMin) * f;
      var x = cx + r * Math.cos(a), y = cy + r * Math.sin(a);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    $('#cochleaSpiral').setAttribute('d', d);
  }

  /* ------------------------------------------------------------------
     AUDIO ENGINE
     One speech recording is processed live with the Web Audio API.

       speech -> level -> mono ─┬─> normal bus ───────────────┐
                                └─> condition effect -> cond bus ┴─> master volume -> peak limiter -> headphones

     The two buses are cross-faded to switch between normal and condition.
     ------------------------------------------------------------------ */
  var ctx = null, master = null, limiter = null;
  var speechBuffer = null, speechLevel = 1;
  var audioStatus = 'loading'; // loading | ready | missing | error
  var audioSource = '';        // 'file' (speech.mp3) or 'chosen'
  var play = null;             // the current playback, or null

  function getCtx() {
    if (ctx) return ctx;
    var AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = CONFIG.MAX_VOLUME;
    master.channelCount = 2;
    master.channelCountMode = 'explicit';
    limiter = ctx.createWaveShaper();
    var n = 2048, curve = new Float32Array(n), L = CONFIG.PEAK_LIMIT;
    for (var i = 0; i < n; i++) {
      var x = (i / (n - 1)) * 2 - 1;
      curve[i] = L * Math.tanh(x / L);
    }
    limiter.curve = curve;
    master.connect(limiter);
    limiter.connect(ctx.destination);
    return ctx;
  }

  function resumeCtx() {
    var c = getCtx();
    if (c.state === 'suspended') c.resume();
  }

  /* Measures the recording and works out the gain that evens it out. */
  function measureLevel(buf) {
    var sum = 0, count = 0, peak = 0;
    for (var ch = 0; ch < buf.numberOfChannels; ch++) {
      var d = buf.getChannelData(ch);
      for (var i = 0; i < d.length; i += 4) {
        var v = Math.abs(d[i]);
        if (v > peak) peak = v;
        // ignore near-silence so pauses don't fool the measurement
        if (v > 0.003) { sum += v * v; count++; }
      }
    }
    var rms = count ? Math.sqrt(sum / count) : 0;
    if (!rms || !peak) return 1;
    var g = CONFIG.SPEECH_LEVEL / rms;
    return Math.min(g, 0.9 / peak);
  }

  function useArrayBuffer(arr, source) {
    var c = getCtx();
    return new Promise(function (resolve, reject) {
      c.decodeAudioData(arr, resolve, reject);
    }).then(function (buf) {
      speechBuffer = buf;
      speechLevel = measureLevel(buf);
      audioStatus = 'ready';
      audioSource = source;
      updateAudioUI();
    });
  }

  function loadAudio() {
    audioStatus = 'loading';
    updateAudioUI();
    // The single-file version (hearing-station.html) carries the recording inside it.
    if (window.EMBEDDED_SPEECH) {
      var bin = atob(window.EMBEDDED_SPEECH), bytes = new Uint8Array(bin.length);
      for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      useArrayBuffer(bytes.buffer, 'file').catch(function () { audioStatus = 'error'; updateAudioUI(); });
      return;
    }
    fetch(CONFIG.AUDIO_FILE)
      .then(function (r) { if (!r.ok) throw new Error('not found'); return r.arrayBuffer(); })
      .then(function (arr) { return useArrayBuffer(arr, 'file'); })
      .catch(function () {
        // Not found (or page opened from the tablet's storage): try the file
        // chosen earlier with "Choose audio file".
        return dbGet().then(function (blob) {
          if (!blob) throw new Error('none');
          return blob.arrayBuffer().then(function (arr) { return useArrayBuffer(arr, 'chosen'); });
        }).catch(function () {
          audioStatus = 'missing';
          updateAudioUI();
        });
      });
  }

  function chooseAudio() { $('#audioFileInput').click(); }

  function onFileChosen(e) {
    var file = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!file) return;
    file.arrayBuffer()
      .then(function (arr) { return useArrayBuffer(arr, 'chosen'); })
      .then(function () { dbPut(file); })
      .catch(function () { audioStatus = 'error'; updateAudioUI(); });
  }

  /* Remembers the chosen file on the tablet (IndexedDB). */
  function dbOpen() {
    return new Promise(function (resolve, reject) {
      try {
        var req = indexedDB.open('hearing-station', 1);
        req.onupgradeneeded = function () { req.result.createObjectStore('files'); };
        req.onsuccess = function () { resolve(req.result); };
        req.onerror = function () { reject(req.error); };
      } catch (err) { reject(err); }
    });
  }
  function dbPut(blob) {
    return dbOpen().then(function (db) {
      return new Promise(function (resolve) {
        var tx = db.transaction('files', 'readwrite');
        tx.objectStore('files').put(blob, 'speech');
        tx.oncomplete = resolve; tx.onerror = resolve;
      });
    }).catch(function () { /* storage not available – fine */ });
  }
  function dbGet() {
    return dbOpen().then(function (db) {
      return new Promise(function (resolve) {
        var req = db.transaction('files').objectStore('files').get('speech');
        req.onsuccess = function () { resolve(req.result || null); };
        req.onerror = function () { resolve(null); };
      });
    });
  }

  function updateAudioUI() {
    var ready = audioStatus === 'ready';
    $('#playerControls').hidden = !ready && audioStatus !== 'loading';
    $('#playBtn').disabled = !ready;
    $('#audioMissingBox').hidden = (audioStatus !== 'missing' && audioStatus !== 'error');
    $('#audioMissingMsg').textContent = audioStatus === 'error' ? t('audioError') : t('audioMissing');
    var admin = $('#audioAdminStatus');
    admin.textContent = ready ? '✓ ' + t('audioReady') :
                        audioStatus === 'loading' ? t('audioLoading') : t('audioMissing');
    // "Change audio file" link only matters when the file was picked by hand
    // or is missing; with speech.mp3 next to the page it is not needed.
    $('.audio-admin .link-btn').hidden = (audioSource === 'file' && ready);
    if (!play) updateStatusLabel();
    fitText();
  }

  /* ---------- condition effects ----------
     Each builder connects input (mono speech) to out (condition bus) and
     returns { update(params), stop() }. */

  function filter(type, freq, gainDb, q) {
    var f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    if (gainDb != null) f.gain.value = gainDb;
    if (q != null) f.Q.value = q;
    return f;
  }
  function gain(v) { var g = ctx.createGain(); g.gain.value = v; return g; }
  function tone(type, freq) { var o = ctx.createOscillator(); o.type = type; o.frequency.value = freq; return o; }
  function smooth(param, value) { param.setTargetAtTime(value, ctx.currentTime, 0.08); }

  function noiseSource() {
    var len = ctx.sampleRate * 2, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    var s = ctx.createBufferSource();
    s.buffer = buf; s.loop = true;
    return s;
  }

  function chain(nodes) { for (var i = 0; i < nodes.length - 1; i++) nodes[i].connect(nodes[i + 1]); }

  var BUILDERS = {
    /* Age-related: progressive high-frequency loss */
    presby: function (input, out) {
      // [shelf above 1 kHz, above 2 kHz, above 4 kHz, low-pass Hz, overall dB]
      var PRESETS = [
        [-4, -6, -8, 7000, -1],    // mild
        [-6, -10, -14, 4500, -2],  // moderate
        [-10, -14, -18, 2500, -4]  // severe
      ];
      var s1 = filter('highshelf', 1000, 0), s2 = filter('highshelf', 2000, 0), s3 = filter('highshelf', 4000, 0);
      var lp = filter('lowpass', 8000, null, 0.7), g = gain(1);
      chain([input, s1, s2, s3, lp, g, out]);
      function update(p, instant) {
        var v = PRESETS[p.severity] || PRESETS[1];
        var set = instant ? function (prm, x) { prm.value = x; } : smooth;
        set(s1.gain, v[0]); set(s2.gain, v[1]); set(s3.gain, v[2]);
        set(lp.frequency, v[3]); set(g.gain, dbToGain(v[4]));
      }
      return { update: update, stop: function () {} };
    },

    /* Noise-induced: notch around 4 kHz + mild high loss + soft 4 kHz ringing */
    noise: function (input, out) {
      var notch = filter('peaking', 4000, -28, 1.1);
      var hs = filter('highshelf', 2000, -5);
      chain([input, hs, notch, out]);
      var ring = tone('sine', 4000), rg = gain(CONFIG.NOISE_RING_LEVEL);
      chain([ring, rg, out]);
      ring.start();
      return { update: function () {}, stop: function () { try { ring.stop(); } catch (e) {} } };
    },

    /* Tinnitus: normal speech + a phantom sound on top */
    tinn: function (input, out) {
      input.connect(out);
      var ring = tone('sine', 6000), ringG = gain(0);
      chain([ring, ringG, out]);
      var buzz = tone('sawtooth', 150), buzzLp = filter('lowpass', 900, null, 0.7), buzzG = gain(0);
      chain([buzz, buzzLp, buzzG, out]);
      var hiss = noiseSource(), hissHp = filter('highpass', 2500, null, 0.7), hissLp = filter('lowpass', 9000, null, 0.7), hissG = gain(0);
      chain([hiss, hissHp, hissLp, hissG, out]);
      ring.start(); buzz.start(); hiss.start();
      function update(p) {
        smooth(ringG.gain, p.sound === 'ring' ? CONFIG.TINNITUS.ring : 0);
        smooth(buzzG.gain, p.sound === 'buzz' ? CONFIG.TINNITUS.buzz : 0);
        smooth(hissG.gain, p.sound === 'hiss' ? CONFIG.TINNITUS.hiss : 0);
      }
      return { update: update, stop: function () { [ring, buzz, hiss].forEach(function (n) { try { n.stop(); } catch (e) {} }); } };
    },

    /* Acoustic neuroma: LEFT ear quieter + high-frequency loss + soft ringing;
       right ear unchanged. */
    neuro: function (input, out) {
      // stage 0 (early) .. 4 (late): [left level dB, shelf 1.5k dB, shelf 3k dB, low-pass Hz, ringing]
      var PRESETS = [
        [-4, -3, -6, 9000, 0.003],
        [-9, -6, -10, 6000, 0.005],
        [-15, -9, -15, 4000, 0.007],
        [-22, -12, -20, 2500, 0.009],
        [-30, -15, -25, 1500, 0.011]
      ];
      var merger = ctx.createChannelMerger(2);
      // Right ear (input 1): unchanged
      input.connect(merger, 0, 1);
      // Left ear (input 0): reduced and muffled
      var s1 = filter('highshelf', 1500, 0), s2 = filter('highshelf', 3000, 0), lp = filter('lowpass', 9000, null, 0.7), gl = gain(1);
      chain([input, s1, s2, lp, gl]);
      gl.connect(merger, 0, 0);
      // soft ringing, left ear only
      var ring = tone('sine', 4500), rg = gain(0);
      chain([ring, rg]);
      rg.connect(merger, 0, 0);
      merger.connect(out);
      ring.start();
      function update(p, instant) {
        var v = PRESETS[p.stage] || PRESETS[2];
        var set = instant ? function (prm, x) { prm.value = x; } : smooth;
        set(gl.gain, dbToGain(v[0])); set(s1.gain, v[1]); set(s2.gain, v[2]);
        set(lp.frequency, v[3]); set(rg.gain, v[4]);
      }
      return { update: update, stop: function () { try { ring.stop(); } catch (e) {} } };
    }
  };

  function startPlayback() {
    if (!speechBuffer || !state.cond) return;
    resumeCtx();
    stopPlayback();

    var src = ctx.createBufferSource();
    src.buffer = speechBuffer;
    var level = gain(speechLevel);
    // force mono so both ears get the same speech
    var mono = ctx.createGain();
    mono.channelCount = 1;
    mono.channelCountMode = 'explicit';
    mono.channelInterpretation = 'speakers';
    var normalBus = gain(1), condBus = gain(0);
    chain([src, level, mono, normalBus, master]);
    condBus.connect(master);

    var effect = BUILDERS[state.cond](mono, condBus);
    effect.update(state.params, true);

    play = {
      src: src, effect: effect, normalBus: normalBus, condBus: condBus,
      nodes: [src, level, mono, normalBus, condBus],
      start: ctx.currentTime, duration: speechBuffer.duration,
      mode: 'normal', userToggled: false, autoSwitched: false, raf: 0
    };
    src.onended = function () { if (play && play.src === src) finishPlayback(); };
    src.start();

    $('#playBtn').classList.add('playing');
    $('#playBtnText').textContent = t('stop');
    $('#modeToggle').setAttribute('data-disabled', 'false');
    $('#todoBox').classList.remove('highlight');
    $('#progressMark').style.left = Math.min(100, CONFIG.NORMAL_SECONDS / play.duration * 100) + '%';
    updateMode();
    tick();
  }

  function setMode(mode, fadeSeconds) {
    if (!play || play.mode === mode) return;
    play.mode = mode;
    var now = ctx.currentTime, end = now + fadeSeconds;
    [[play.normalBus, mode === 'normal' ? 1 : 0], [play.condBus, mode === 'cond' ? 1 : 0]].forEach(function (pair) {
      var g = pair[0].gain;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(pair[1], end);
    });
    updateMode();
  }

  function tick() {
    if (!play) return;
    var elapsed = ctx.currentTime - play.start;
    if (!play.userToggled && !play.autoSwitched && elapsed >= CONFIG.NORMAL_SECONDS) {
      play.autoSwitched = true;
      setMode('cond', CONFIG.AUTO_FADE_SECONDS);
    }
    $('#progressFill').style.width = Math.min(100, elapsed / play.duration * 100) + '%';
    play.raf = requestAnimationFrame(tick);
  }

  function stopPlayback() {
    if (!play) return;
    var p = play;
    play = null;
    cancelAnimationFrame(p.raf);
    p.src.onended = null;
    try { p.src.stop(); } catch (e) {}
    p.effect.stop();
    // tiny fade to avoid a click, then disconnect
    var now = ctx.currentTime;
    [p.normalBus, p.condBus].forEach(function (b) { b.gain.cancelScheduledValues(now); b.gain.setTargetAtTime(0, now, 0.02); });
    setTimeout(function () { p.nodes.forEach(function (n) { try { n.disconnect(); } catch (e) {} }); }, 200);
    resetPlayerUI();
  }

  function finishPlayback() {
    stopPlayback();
    $('#playBtnText').textContent = t('playAgain');
    $('#progressFill').style.width = '100%';
    var todo = $('#todoBox');
    todo.classList.remove('highlight');
    void todo.offsetWidth; // restart the animation
    todo.classList.add('highlight');
  }

  function resetPlayerUI() {
    $('#playBtn').classList.remove('playing');
    $('#playBtnText').textContent = t('play');
    $('#modeToggle').setAttribute('data-disabled', 'true');
    $('#progressFill').style.width = '0';
    $('#todoBox').classList.remove('highlight');
    updateMode();
  }

  function updateMode() {
    var mode = play ? play.mode : null;
    $$('#modeToggle button').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-mode') === mode); });
    updateStatusLabel();
  }

  function updateStatusLabel() {
    var el = $('#statusLabel');
    el.classList.remove('normal', 'cond');
    if (play) {
      if (play.mode === 'normal') { el.textContent = t('labelNormal'); el.classList.add('normal'); }
      else { el.textContent = t('labelWith').replace('{name}', state.cond ? t(state.cond + 'Short').toUpperCase() : ''); el.classList.add('cond'); }
    } else {
      el.textContent = audioStatus === 'loading' ? t('audioLoading') : t('labelReady');
      if (audioStatus === 'ready') {
        var hint = document.createElement('small');
        hint.textContent = t('pressPlayHint');
        el.appendChild(hint);
      }
    }
  }

  function setParam(name, value) {
    state.params[name] = value;
    syncChoiceButtons();
    if (play) play.effect.update(state.params);
  }

  /* Left/right headphone check: short beep left, then right. */
  function lrTest() {
    resumeCtx();
    var flash = $('#lrFlash');
    [[-1, 'left', 'lrLeft', 0], [1, 'right', 'lrRight', 0.9]].forEach(function (s) {
      var at = ctx.currentTime + s[3];
      var o = tone('sine', 660), g = gain(0), pan = ctx.createStereoPanner();
      pan.pan.value = s[0];
      chain([o, g, pan, master]);
      g.gain.setValueAtTime(0, at);
      g.gain.linearRampToValueAtTime(0.08, at + 0.03);
      g.gain.setValueAtTime(0.08, at + 0.55);
      g.gain.linearRampToValueAtTime(0, at + 0.6);
      o.start(at); o.stop(at + 0.65);
      o.onended = function () { pan.disconnect(); };
      setTimeout(function () {
        flash.textContent = (s[1] === 'left' ? '◀ ' : '') + t(s[2]) + (s[1] === 'right' ? ' ▶' : '');
        flash.className = 'lr-flash ' + s[1];
        flash.hidden = false;
      }, s[3] * 1000);
    });
    setTimeout(function () { flash.hidden = true; }, 1700);
  }

  /* ------------------------------------------------------------------
     Inactivity timer, full screen, screen wake lock
     ------------------------------------------------------------------ */
  function touched() { state.lastTouch = Date.now(); }

  function checkIdle() {
    if (state.screen === 'home') return;
    if (Date.now() - state.lastTouch > CONFIG.IDLE_SECONDS * 1000) goHome();
  }

  var wakeLock = null;
  function keepAwake() {
    if (!('wakeLock' in navigator) || wakeLock) return;
    navigator.wakeLock.request('screen').then(function (l) {
      wakeLock = l;
      l.addEventListener('release', function () { wakeLock = null; });
    }).catch(function () {});
  }

  function goFullscreen() {
    if (!CONFIG.FULLSCREEN || document.fullscreenElement) return;
    var el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(function () {});
  }

  /* ------------------------------------------------------------------
     Wire up
     ------------------------------------------------------------------ */
  function init() {
    try { var saved = localStorage.getItem('hearing-lang'); if (saved && T[saved]) state.lang = saved; } catch (e) {}

    drawCochlea();
    applyLanguage();

    document.addEventListener('click', function (e) {
      var go = e.target.closest('[data-go]');
      if (go) {
        var target = go.getAttribute('data-go');
        if (target === 'home') goHome(); else show(target);
        return;
      }
      var lang = e.target.closest('[data-lang]');
      if (lang) { setLanguage(lang.getAttribute('data-lang')); return; }
      var cond = e.target.closest('[data-cond]');
      if (cond) { openCondition(cond.getAttribute('data-cond')); return; }
      var act = e.target.closest('[data-action="choose-audio"]');
      if (act) { chooseAudio(); return; }
      var choice = e.target.closest('.choice button');
      if (choice) {
        var p = choice.parentNode.getAttribute('data-param');
        var v = choice.getAttribute('data-value');
        setParam(p, p === 'severity' ? parseInt(v, 10) : v);
        return;
      }
      var modeBtn = e.target.closest('#modeToggle button');
      if (modeBtn && play) {
        play.userToggled = true;
        setMode(modeBtn.getAttribute('data-mode'), CONFIG.TOGGLE_FADE_SECONDS);
      }
    });

    $('#ackBox').addEventListener('change', updateAck);
    $('#ackContinue').addEventListener('click', openHearWHO);
    $('#playBtn').addEventListener('click', function () { if (play) stopPlayback(); else startPlayback(); });
    $('#stageSlider').addEventListener('input', function (e) { setParam('stage', parseInt(e.target.value, 10)); });
    $('#lrTestBtn').addEventListener('click', lrTest);
    $('#audioFileInput').addEventListener('change', onFileChosen);

    ['pointerdown', 'touchstart', 'keydown', 'input'].forEach(function (ev) {
      document.addEventListener(ev, touched, { passive: true, capture: true });
    });
    document.addEventListener('pointerdown', function () { resumeCtx(); goFullscreen(); keepAwake(); }, { capture: true });
    setInterval(checkIdle, 1000);
    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState === 'visible') checkIdle();
      else stopPlayback();
    });
    window.addEventListener('resize', fitText);
    // stop the long-press menu / text selection on the kiosk
    document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

    loadAudio();

    // Offline support when the page is served over https (e.g. GitHub Pages)
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  }

  window.HEARING_APP_OK = true;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
