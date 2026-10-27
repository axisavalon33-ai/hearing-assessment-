"""Builds hearing-station.html: the whole station in ONE file.

Inlines style.css, texts.js, app.js and the speech recordings, so the
page can be opened straight from the Android Files app with no other files.
Run:  python3 build.py
(GitHub runs this automatically whenever you change files on GitHub.)
"""
import base64, os, re

here = os.path.dirname(os.path.abspath(__file__))
read = lambda name: open(os.path.join(here, name), encoding='utf-8').read()

html = read('index.html')
html = html.replace('<link rel="manifest" href="manifest.webmanifest">\n', '')
icon = base64.b64encode(read('icon.svg').encode()).decode()
html = html.replace('href="icon.svg"', 'href="data:image/svg+xml;base64,' + icon + '"')
html = html.replace('<link rel="stylesheet" href="style.css">', '<style>\n' + read('style.css') + '\n</style>')

# speech-en / speech-si / speech-ta (.mp3 or .m4a), plus an optional speech.mp3
recordings = {}
for key, base in [('en', 'speech-en'), ('si', 'speech-si'), ('ta', 'speech-ta'), ('any', 'speech')]:
    for ext in ('mp3', 'm4a'):
        path = os.path.join(here, base + '.' + ext)
        if os.path.exists(path):
            recordings[key] = base64.b64encode(open(path, 'rb').read()).decode()
            break
audio = ''
if recordings:
    audio = ('<script>window.EMBEDDED_SPEECH = {'
             + ','.join('"%s":"%s"' % kv for kv in recordings.items()) + '};</script>\n')

# The welcome video (intro.mp4 or intro.webm). Very large videos make the
# single file slow to open, so they are left out above this size.
MAX_VIDEO_MB = 25
video_note = 'no intro video'
for name, mime in (('intro.mp4', 'video/mp4'), ('intro.webm', 'video/webm')):
    path = os.path.join(here, name)
    if os.path.exists(path):
        size_mb = os.path.getsize(path) / 1e6
        if size_mb > MAX_VIDEO_MB:
            video_note = '%s is %.0f MB - too big to build in (limit %d MB), welcome screen uses the animated background' % (name, size_mb, MAX_VIDEO_MB)
        else:
            data = base64.b64encode(open(path, 'rb').read()).decode()
            audio += '<script>window.EMBEDDED_VIDEO = {"type":"%s","data":"%s"};</script>\n' % (mime, data)
            video_note = 'video %s (%.1f MB)' % (name, size_mb)
        break

# "</script" inside the inlined code would end the tag early
safe = lambda js: js.replace('</script', '<\\/script')
html = html.replace('<script src="texts.js"></script>', audio + '<script>\n' + safe(read('texts.js')) + '\n</script>')
html = html.replace('<script src="app.js"></script>', '<script>\n' + safe(read('app.js')) + '\n</script>')
assert not re.search(r'<script src=|href="style.css"', html)

banner = ('<!-- GENERATED FILE - do not edit. Edit texts.js / app.js / style.css / index.html,\n'
          '     then run build.py (GitHub does this automatically). -->\n')
open(os.path.join(here, 'hearing-station.html'), 'w', encoding='utf-8').write(html.replace('<!doctype html>\n', '<!doctype html>\n' + banner, 1))
print('hearing-station.html built with recordings:', ', '.join(recordings) or 'none (visitors will see "Choose audio file")')
print('  and', video_note)
