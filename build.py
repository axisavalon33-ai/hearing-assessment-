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

# "</script" inside the inlined code would end the tag early
safe = lambda js: js.replace('</script', '<\\/script')
html = html.replace('<script src="texts.js"></script>', audio + '<script>\n' + safe(read('texts.js')) + '\n</script>')
html = html.replace('<script src="app.js"></script>', '<script>\n' + safe(read('app.js')) + '\n</script>')
assert not re.search(r'<script src=|href="style.css"', html)

banner = ('<!-- GENERATED FILE - do not edit. Edit texts.js / app.js / style.css / index.html,\n'
          '     then run build.py (GitHub does this automatically). -->\n')
open(os.path.join(here, 'hearing-station.html'), 'w', encoding='utf-8').write(html.replace('<!doctype html>\n', '<!doctype html>\n' + banner, 1))
print('hearing-station.html built with recordings:', ', '.join(recordings) or 'none (visitors will see "Choose audio file")')
