#!/usr/bin/env python3
"""Render the abridgement markup (src/*.txt) to a Paged.js HTML book (out/book.html).

Markup, one block per line:
  # title            chapter title (sets the running head)
  % text             subtitle under the chapter title
  ## / ### heading   section / sub-section
  @ N | first | second [^[note]]   verse
  = text             meaning of the previous verse
  ~ text             bridge line
  other              paragraph
Inline footnotes: ^[ ... ]
"""
import html, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).parent
BOOK = ROOT.parent
REPO = BOOK.parent
DIGITS = str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩')


def inline(text):
    out, i = [], 0
    while True:
        j = text.find('^[', i)
        if j < 0:
            out.append(html.escape(text[i:]).translate(DIGITS))
            break
        out.append(html.escape(text[i:j]).translate(DIGITS))
        depth, k = 1, j + 2
        while depth:
            if text[k] == '[':
                depth += 1
            elif text[k] == ']':
                depth -= 1
            k += 1
        note = html.escape(text[j + 2:k - 1].strip()).translate(DIGITS)
        out.append(f'<span class="footnote">{note}</span>')
        i = k
    return ''.join(out)


def chapter(path, era):
    blocks, poet = [], None
    for raw in Path(path).read_text(encoding='utf-8').splitlines():
        line = raw.strip()
        if not line:
            continue
        if line.startswith('# '):
            poet = line[2:].strip()
            blocks.append(f'<h1 class="chapter" data-poet="{html.escape(poet)}" data-era="{html.escape(era)}"><span>{inline(poet)}</span></h1>')
        elif line.startswith('% '):
            blocks.append(f'<div class="subtitle">{inline(line[2:])}</div>')
        elif line.startswith('### '):
            blocks.append(f'<h3>{inline(line[4:])}</h3>')
        elif line.startswith('## '):
            blocks.append(f'<h2>{inline(line[3:])}</h2>')
        elif line.startswith('@ '):
            num, first, second = [p.strip() for p in line[2:].split('|', 2)]
            blocks.append('<div class="bayt">'
                          f'<span class="n">{num.translate(DIGITS)}</span>'
                          f'<span class="h">{inline(first)}</span><span class="sep">❊</span>'
                          f'<span class="h">{inline(second)}</span></div>')
        elif line.startswith('= '):
            blocks.append(f'<div class="meaning"><span class="lbl">المعنى:</span> {inline(line[2:])}</div>')
        elif line.startswith('~ '):
            blocks.append(f'<div class="bridge">{inline(line[2:])}</div>')
        else:
            blocks.append(f'<p>{inline(line)}</p>')
    return '\n'.join(blocks)


def main(chapters, era, out, title=True):
    body = []
    if title: body.append('''<div class="titlepage">
  <div class="series">الشعر والأدب العربي</div>
  <div class="tp-cartouche"><span>العصر الجاهلي</span></div>
  <div class="tp-sub">مختصر في أعلامه وقضاياه وشعره</div>
  <div class="tp-orn">❊ ❊ ❊</div>
  <div class="tp-by">إعداد وتلخيص<br><b>ياسر أحمد</b></div>
</div>''')
    for c in chapters:
        body.append(chapter(c, era))
    tpl = (ROOT / 'template.html').read_text(encoding='utf-8')
    html_out = tpl.replace('<!--BODY-->', '<div id="book"></div>\n<div id="src">\n' + '\n'.join(body) + '\n</div>')
    dest = BOOK / 'out'
    dest.mkdir(exist_ok=True)
    for f in (BOOK / 'assets').iterdir():
        shutil.copy(f, dest / f.name)
    shutil.copy(ROOT / 'paginate.js', dest / 'paginate.js')
    fonts = REPO / 'node_modules' / '@fontsource' / 'amiri' / 'files'
    for w in ('400', '700'):
        for sub in ('arabic', 'latin'):
            shutil.copy(fonts / f'amiri-{sub}-{w}-normal.woff2', dest)
    (dest / out).write_text(html_out, encoding='utf-8')


if __name__ == '__main__':
    # render.py [--out NAME] [--no-title] "<running head>" chapter.txt ...
    args, name, title = sys.argv[1:], 'book', True
    if args[:1] == ['--out']: name, args = args[1], args[2:]
    if args[:1] == ['--no-title']: title, args = False, args[1:]
    main(args[1:], args[0], name + '.html', title)
