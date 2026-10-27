# Hearing station – MEDSCOPE II

A touch-screen web app for the "Hearing" part of the exhibition. It runs in
Chrome on an Android tablet (landscape) with wired headphones and works
without internet once it is installed.

**How a visit goes:** a welcome screen loops your video, with three big
language buttons on top (English · සිංහල · தமிழ்). The visitor picks a
language, then chooses *Test your hearing* (opens hearWHO) or *Experience
hearing loss*. After 60 seconds with no touch, the app stops any sound and
goes back to the welcome video.

## The files

| File | What it is |
|---|---|
| `index.html` | The app itself. |
| `texts.js` | **All on-screen text** in English, Sinhala and Tamil. Edit translations here. |
| `style.css` | Colours and layout. |
| `app.js` | How it works, plus the sound processing. Settings are at the top (see below). |
| `intro.mp4` | **You add this:** the looping welcome video. |
| `speech-en.mp3`, `speech-si.mp3`, `speech-ta.mp3` | **You add these:** one speech recording per language. |
| `sw.js`, `manifest.webmanifest`, `icon*.png`, `icon.svg` | Make it an installable app that works offline. |
| `netlify.toml` | Hosting settings for Netlify. |
| `hearing-station.html` | Single-file backup version (Option B). Made automatically. Don't edit it. |
| `build.py`, `.github/workflows/build.yml` | Rebuild `hearing-station.html`. GitHub runs this for you. |

## 1. Add your welcome video

- Name it exactly **`intro.mp4`** (all lowercase).
- **Format:** MP4 (H.264), landscape, 1280×720 or 1920×1080. Most phones and
  video editors (CapCut, Canva, etc.) export this by default.
- **Length:** 10–30 seconds. It repeats endlessly, so a smooth loop looks best.
- **Size:** keep it **under 25 MB** (GitHub's upload page takes up to 25 MB per file).
- **Sound:** it always plays **muted** (Chrome only autoplays videos without
  sound, and visitors are wearing headphones), so you don't need audio.
- **Keep the bottom third fairly plain.** The title and the language buttons
  sit there on a dark fade.

Until a video is added, the welcome screen shows an animated "sound wave" background.

## 2. Add your speech recordings

Make one recording per language. Each should be a person speaking with a
little background noise, about 15–20 seconds long. Name them exactly:

| Language | File name |
|---|---|
| English | `speech-en.mp3` |
| Sinhala | `speech-si.mp3` |
| Tamil | `speech-ta.mp3` |

Phone recordings saved as **.m4a** work too (e.g. `speech-ta.m4a`). The app
plays the recording that matches the visitor's language. If one is missing,
it uses another language's recording. You don't need to worry about loudness.
The app evens it out and caps the volume.

The conditions list page shows a small line at the bottom right, e.g.
`English ✓ · සිංහල ✓ · தமிழ் ✓`, so you can check which recordings were found.

**Uploading to GitHub:** open the repository on github.com → make sure the
branch drop-down (top left) shows the branch with these files → **Add file →
Upload files** → drag the files in → **Commit changes**.

## 3. Install hearWHO first

Do this before the exhibition, while the tablet has internet:

1. Open the **Play Store** on the tablet.
2. Search for **hearWHO** (by hearX Group / World Health Organization) and tap **Install**.
3. Open it once, accept its terms, and test it with the headphones.

When hearWHO is installed, the **Continue** button opens it directly. If it is
not installed, the button opens its Play Store page instead.

## 4. Put the web app online, then install it on the tablet

The app needs to be on a web address (https) **once**, so the tablet can
install it. After that it runs offline from the tablet. Pick one way to host it:

### Way 1 – Netlify (free, works with a private repository) – recommended

1. Go to **app.netlify.com** and sign up for free (you can sign up with your GitHub account).
2. Click **Add new site → Import an existing project → GitHub**, allow
   access, and choose the **hearing-test** repository.
3. For **Branch to deploy**, choose the branch with your files. The other
   settings are read from `netlify.toml`, so leave them as they are. Click **Deploy**.
4. After a minute you get an address like `https://something.netlify.app`.
   (You can rename it under *Site configuration → Change site name*.)
5. From now on, every change you upload to GitHub (new video, new
   recordings, edited `texts.js`) updates the site automatically.

### Way 2 – GitHub Pages (free only if the repository is public)

GitHub Pages on a **private** repository needs a paid GitHub plan. If you're
happy to make the repository public (anyone could then see the files,
including the voice recordings), go to **Settings → General → Danger Zone →
Change visibility → Public**. Then **Settings → Pages** → *Deploy from a
branch* → pick the branch, folder `/ (root)` → **Save**. The address will be
`https://axisavalon33-ai.github.io/hearing-test/`.

### Install it on the tablet

1. With internet on, open your app's address in **Chrome** on the tablet.
2. Tap a language, open *Experience hearing loss*, and play one condition.
   This makes sure everything (video, recordings) is saved on the tablet.
3. Chrome **⋮** menu → **Add to Home screen** → **Install**.
4. An app icon called **Hearing** appears on the tablet's home screen. Open it
   from there: it runs full-screen, without Chrome's address bar, and works
   **without internet**.
5. Test once with Wi-Fi turned off, to be sure.

When you change something later, open the app once with internet on. It
picks up the new version (open it twice if you don't see the change straight away).

### Backup: the single-file version (no hosting at all)

`hearing-station.html` contains everything in one file (if the video is
under 25 MB). GitHub rebuilds it automatically after each upload. Download
it from GitHub, copy it to the tablet's **Download** folder, then open it from
the **Files** app with **Chrome**. It works, but it opens inside Chrome with
the address bar, and it can't be installed as an app.

## 5. Exhibition-day checklist

- **Volume:** plug in the headphones, play a condition, and set the tablet
  volume to a comfortable level (start around 50%). The page has its own
  built-in volume ceiling as well (see Settings).
- **Screen timeout:** Settings → Display → Screen timeout → longest option
  (the page also asks the screen to stay on where Chrome allows it).
- **Do Not Disturb:** turn it on so notifications don't pop up.
- **Lock visitors into the app (optional):** Settings → Security → *App
  pinning* / *Pin windows*. Then pin the Hearing app from the recent-apps screen.
  Note: hearWHO can't open while Chrome is pinned. Leave pinning off if you
  want the "Test your hearing" button to work.
- **Headphones:** mark the left cup clearly. The acoustic neuroma page affects
  the **left** ear only and has a *Test left / right* button.
- After **60 seconds** with no touch, the app stops any sound and returns to
  the welcome video.

## Editing the text and translations

Open `texts.js` in any text editor (on a computer: Notepad, TextEdit, or VS Code).
Every language has the same list of entries. Change only the words inside the
quotation marks. The easiest way is to edit it on github.com (open `texts.js`
→ ✏️ pencil icon → **Commit changes**). With Netlify, the app updates
automatically. Open it once on the tablet with internet on.

The Sinhala and Tamil text was written for you to check. Please have a fluent
speaker review it, especially the medical terms.

## Settings (top of `app.js`)

| Setting | Default | Meaning |
|---|---|---|
| `MAX_VOLUME` | `0.35` | Master volume ceiling. Lower it to make everything quieter. |
| `PEAK_LIMIT` | `0.4` | Hard limit. Output can never go above this level. |
| `NORMAL_SECONDS` | `5` | Seconds of normal hearing before the condition starts. |
| `IDLE_SECONDS` | `60` | No-touch time before it returns to the welcome video. |
| `VIDEO_FILES` | `intro.mp4`, `intro.webm` | Name of the welcome video. |
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

All effects are made live from the one recording (for the chosen language) with the Web Audio API.
