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
| `speech-en.mp3`, `speech-si.mp3`, `speech-ta.mp3` | **You add these:** one speech recording per language. |
| `hearing-station.html` | **The single-file version for the tablet** (Option A). Made automatically. Don't edit it. |
| `build.py`, `.github/workflows/build.yml` | Rebuild `hearing-station.html`. GitHub runs this for you. |
| `sw.js`, `manifest.webmanifest`, `icon.svg` | Only used for the online-hosting option (Option B). They do no harm otherwise. |

Keep all the files together in one folder, named `hearing`.

## 1. Add your speech recording

Make one recording per language. Each should be a person speaking with a
little background noise, about 15–20 seconds long. Name them exactly
(all lowercase):

| Language | File name |
|---|---|
| English | `speech-en.mp3` |
| Sinhala | `speech-si.mp3` |
| Tamil | `speech-ta.mp3` |

Phone recordings saved as **.m4a** work too. Just rename them the same way, e.g.
`speech-ta.m4a`. The page plays the recording that matches the language the
visitor chose. If one language has no recording yet, it plays another
language's recording instead. (A single file named `speech.mp3` also still
works for all languages.)

You don't need to worry about how loud the recording is. The page evens out the
loudness and caps the maximum volume.

If the page finds no recording at all, a condition page shows a
**"Choose audio file"** button. Tap it and pick a recording from the tablet.
It is used for the language currently selected. With Option A, the easiest
way is to upload the recordings to GitHub so they are built into the single
file (see below).

The conditions list page shows a small line at the bottom right, e.g.
`English ✓ · සිංහල ✓ · தமிழ் ✗`, so you can check which recordings were found.

## 2. Install hearWHO first

Do this before the exhibition, while the tablet has internet:

1. Open the **Play Store** on the tablet.
2. Search for **hearWHO** (by hearX Group / World Health Organization) and tap **Install**.
3. Open it once, accept its terms, and test it with the headphones.

When hearWHO is installed, the **Continue** button opens it directly. If it is
not installed, the button opens its Play Store page instead.

## 3. Put the page on the tablet

### Option A – one file on the tablet (fully offline)

Newer Android versions stop Chrome from opening `file:///` addresses, so
use the **single-file version**, `hearing-station.html`. Everything (text,
design, code, and your recording if it is in the repository) is built into
that one file. Nothing else needs to be next to it.

**Step 1 – get the file with your recording inside**

1. On github.com, open this repository and upload your three recordings
   (**Add file → Upload files**, drag in all three files at once, then
   **Commit changes**).
2. Wait about a minute. GitHub automatically rebuilds `hearing-station.html`
   with the recordings inside it (you can watch this under the **Actions** tab).
   The same happens whenever you edit `texts.js` on GitHub.
3. Click `hearing-station.html` → the **⋯** menu (or the download icon) →
   **Download**.

(If you skip uploading the recordings, the file still works. Visitors will see
"Choose audio file" and you pick the recording on the tablet each time the
page is opened.)

**Step 2 – put it on the tablet**

1. Copy `hearing-station.html` to the tablet's **Download** folder: by USB
   cable (choose **File transfer** on the tablet), by emailing it to
   yourself, or by Google Drive.
2. On the tablet, open the **Files** app (or **My Files** on Samsung) →
   **Downloads**, tap `hearing-station.html`, and choose **Chrome** when it
   asks which app to use. (Don't choose "HTML Viewer", which can't play sound.)
3. To get back to it quickly next time, bookmark it in Chrome (⋮ → ☆), or
   leave the tab open. The page resets itself between visitors without
   reloading.

> The other files (`index.html`, `texts.js`, …) are the "source" you edit.
> `hearing-station.html` is made from them automatically, so don't edit it
> directly. Your changes would be lost at the next rebuild.

### Option B – host it online once, then use it offline (most reliable)

This uses free GitHub Pages hosting. The tablet only needs internet the first
time it opens the page.

1. Make sure your recordings are uploaded into this repository next to `index.html`.
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
quotation marks. The easiest way is to edit it on github.com (open `texts.js`
→ ✏️ pencil icon → **Commit changes**). GitHub then rebuilds
`hearing-station.html`. Download it again and copy it to the tablet.

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

All effects are made live from the one recording (for the chosen language) with the Web Audio API.
