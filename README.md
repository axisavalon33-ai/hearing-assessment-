# Hearing station – MEDSCOPE II

A self-contained touch-screen page for the "Hearing" part of the exhibition.
It runs in Chrome on an Android tablet (landscape) with wired headphones and
needs no internet.

## The files

| File | What it is |
|---|---|
| `index.html` | The page itself. **This is the file you open.** |
| `texts.js` | **All on-screen text** in English, Sinhala and Tamil. Edit translations here. |
| `style.css` | Colours and layout. |
| `app.js` | How it works, plus the sound processing. Settings are at the top (see below). |
| `speech.mp3` | **You add this:** your speech recording. |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Only used for the online-hosting option (Option B). They do no harm otherwise. |

Keep all the files together in one folder, named `hearing`.

## 1. Add your speech recording

1. Record a person speaking with a little background noise, about 15–20 seconds long.
2. Save it as an **MP3** file named exactly `speech.mp3` (all lowercase).
3. Put it in the `hearing` folder, next to `index.html`.

You don't need to worry about how loud the recording is. The page evens out the
loudness and caps the maximum volume.

If the page can't find `speech.mp3`, a condition page shows a
**"Choose audio file"** button. Tap it and pick the recording from the tablet.
The tablet remembers that choice, so you only do it once. (With Option A below
you **will** need to do this once. See the note there.)

## 2. Install hearWHO first

Do this before the exhibition, while the tablet has internet:

1. Open the **Play Store** on the tablet.
2. Search for **hearWHO** (by hearX Group / World Health Organization) and tap **Install**.
3. Open it once, accept its terms, and test it with the headphones.

When hearWHO is installed, the **Continue** button opens it directly. If it is
not installed, the button opens its Play Store page instead.

## 3. Put the page on the tablet

### Option A – copy the files onto the tablet (fully offline)

1. Connect the tablet to your computer with a USB cable. On the tablet, swipe
   down from the top, tap the "USB" notification and choose **File transfer**.
2. On the computer, open the tablet's storage (Windows: *This PC* → tablet name
   → *Internal storage*; Mac: install *Android File Transfer* first).
3. Open the **Download** folder and copy your whole `hearing` folder into it.
4. On the tablet, open **Chrome**. Tap the address bar and type exactly:

   ```
   file:///sdcard/Download/hearing/index.html
   ```

   Then press Enter. If Chrome asks for permission to access files, tap **Allow**.
5. Go to *Experience hearing loss* → any condition. Tap **Choose audio file**
   and pick `speech.mp3` from *Downloads → hearing*. (Chrome doesn't let a
   page read files next to it on its own, so this step is needed once. The
   tablet then remembers the file.)
6. Bookmark the page (⋮ menu → ☆) so you can open it quickly next time.

> **Do not** open `index.html` by tapping it in the *Files* app. That opens
> it in a way where the other files can't load, and you will see a "did not
> load correctly" message. Always type the address in Chrome as shown in step 4.
>
> Some tablets with newer Android versions won't open `file:///` addresses at
> all. If step 4 shows an error, use Option B.

### Option B – host it online once, then use it offline (most reliable)

This uses free GitHub Pages hosting. The tablet only needs internet the first
time it opens the page.

1. Make sure `speech.mp3` is uploaded into this repository next to `index.html`.
2. On github.com, open the repository → **Settings** → **Pages**. Under
   *Build and deployment*, choose **Deploy from a branch**, select the
   branch that has these files, folder `/ (root)`, and click **Save**. (Pages on a private
   repository needs a paid GitHub plan. A public repository works for free.)
3. After a minute, the page address appears at the top of that screen, e.g.
   `https://<your-username>.github.io/hearing-test/`.
4. On the tablet (with internet), open that address in Chrome. Visit each
   page once and play one condition, so everything is saved for offline use.
5. Chrome ⋮ menu → **Add to Home screen** (or **Install app**). An icon appears
   on the home screen. It opens full-screen and works without internet.

## 4. Exhibition-day checklist

- **Volume:** plug in the headphones, play a condition, and set the tablet
  volume to a comfortable level (start around 50%). The page has its own
  built-in volume ceiling as well (see Settings).
- **Screen timeout:** Settings → Display → Screen timeout → longest option
  (the page also asks the screen to stay on where Chrome allows it).
- **Do Not Disturb:** turn it on so notifications don't pop up.
- **Lock visitors into the page (optional):** Settings → Security → *App
  pinning* / *Pin windows*. Then pin Chrome from the recent-apps screen.
  Note: hearWHO can't open while Chrome is pinned. Leave pinning off if you
  want the "Test your hearing" button to work.
- **Headphones:** mark the left cup clearly. The acoustic neuroma page affects
  the **left** ear only and has a *Test left / right* button.
- The page goes full-screen on the first touch. After **60 seconds** with no
  touch, it stops any sound and returns to the home page.

## Editing the text and translations

Open `texts.js` in any text editor (on a computer: Notepad, TextEdit, or VS Code).
Every language has the same list of entries. Change only the words inside the
quotation marks, save, and copy the file to the tablet again (Option B:
upload it to GitHub). Then reload the page.

The Sinhala and Tamil text was written for you to check. Please have a fluent
speaker review it, especially the medical terms.

## Settings (top of `app.js`)

| Setting | Default | Meaning |
|---|---|---|
| `MAX_VOLUME` | `0.35` | Master volume ceiling. Lower it to make everything quieter. |
| `PEAK_LIMIT` | `0.4` | Hard limit. Output can never go above this level. |
| `NORMAL_SECONDS` | `5` | Seconds of normal hearing before the condition starts. |
| `IDLE_SECONDS` | `60` | No-touch time before it returns to the home page. |
| `TINNITUS` | ring / buzz / hiss levels | Loudness of the tinnitus sounds, kept below the speech. |
| `FULLSCREEN` | `true` | Go full-screen on the first touch. |

## What each simulation does

- **Age-related hearing loss:** progressive cut of high frequencies (above
  1 kHz, more above 2 kHz and 4 kHz). The Mild / Moderate / Severe buttons
  change how strong it is.
- **Noise-induced hearing loss:** a dip centred on 4 kHz (about 3–6 kHz), a
  mild high-frequency loss, and a soft 4 kHz ringing in both ears.
- **Tinnitus:** normal speech with a phantom sound on top: Ring (6 kHz tone),
  Buzz (150 Hz), or Hiss (filtered noise). It can be switched while playing.
- **Acoustic neuroma:** left ear only. The left side gets quieter and loses
  high frequencies, with soft ringing on the left. The right ear stays normal.
  The Early → Late slider makes it worse.

All effects are made live from the one `speech.mp3` with the Web Audio API.
