"""Builds hearing-station.html: the whole station in ONE file.

Inlines style.css, texts.js, app.js and (if present) speech.mp3, so the
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

audio = ''
mp3 = os.path.join(here, 'speech.mp3')
if os.path.exists(mp3):
    data = base64.b64encode(open(mp3, 'rb').read()).decode()
    audio = '<script>window.EMBEDDED_SPEECH = "' + data + '";</script>\n'

# "</script" inside the inlined code would end the tag early
safe = lambda js: js.replace('</script', '<\\/script')
html = html.replace('<script src="texts.js"></script>', audio + '<script>\n' + safe(read('texts.js')) + '\n</script>')
html = html.replace('<script src="app.js"></script>', '<script>\n' + safe(read('app.js')) + '\n</script>')
assert not re.search(r'<script src=|href="style.css"', html)

banner = ('<!-- GENERATED FILE - do not edit. Edit texts.js / app.js / style.css / index.html,\n'
          '     then run build.py (GitHub does this automatically). -->\n')
open(os.path.join(here, 'hearing-station.html'), 'w', encoding='utf-8').write(html.replace('<!doctype html>\n', '<!doctype html>\n' + banner, 1))
print('hearing-station.html built', '(with speech.mp3 inside)' if audio else '(no speech.mp3 found - visitors will see "Choose audio file")')
