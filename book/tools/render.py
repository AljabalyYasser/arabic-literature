#!/usr/bin/env python3
"""Render the abridgement markup (src/*.txt) to a Paged.js HTML book (out/book.html).

Markup, one block per line:
  # title            chapter title (sets the running head)
  % text             subtitle under the chapter title
  ## / ### heading   section / sub-section
  @ N | first | second [^[note]]   verse
  = text             meaning of the previous verse (with the «المعنى» label)
  ~ text             bridge line
  & title | rest     bibliography entry
  + name | text      a face's entry: the name in bold, running into its paragraph
  other              paragraph
Inline footnotes: ^[ ... ]
"""
import html, re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).parent
BOOK = ROOT.parent
REPO = BOOK.parent
DIGITS = str.maketrans('0123456789', '٠١٢٣٤٥٦٧٨٩')

# الحواشي تذكر الكتاب لا المؤلف: أول مرة في الفصل «العنوان الكامل، المؤلف، الموضع»، ثم «العنوان المختصر، الموضع».
MARKS = re.compile('[ً-ْٰـ]')
def plain(t): return MARKS.sub('', t).strip()
BOOKS = {  # المؤلف كما يُكتب في الحاشية، بلا تشكيل: (العنوان الكامل، العنوان المختصر)
    'شوقي ضيف': ('تاريخ الأدب العربي', 'تاريخ الأدب العربي'),  # الأجزاء تُذكر في ثبت المصادر
    'ابن عبد ربه': ('العقد الفريد', 'العقد الفريد'),
    'ابن قتيبة': ('الشعر والشعراء', 'الشعر والشعراء'),
    'ابن سلام': ('طبقات فحول الشعراء', 'طبقات فحول الشعراء'),
    'ابن الأنباري': ('شرح القصائد السبع الطوال الجاهليات', 'شرح القصائد السبع'),
    'الأسد': ('مصادر الشعر الجاهلي وقيمتها التاريخية', 'مصادر الشعر الجاهلي'),
    'ناصر الدين الأسد': ('مصادر الشعر الجاهلي وقيمتها التاريخية', 'مصادر الشعر الجاهلي'),
    'أبو عبيدة': ('شرح النقائض', 'النقائض'),
    'الميداني': ('مجمع الأمثال', 'مجمع الأمثال'),
    'ابن رشيق': ('العمدة', 'العمدة'),
    'الزوزني': ('شرح المعلقات السبع', 'شرح المعلقات السبع'),
    'الجاحظ': ('البيان والتبيين', 'البيان والتبيين'),
    'أبو الفرج': ('الأغاني', 'الأغاني'),
    'أبو الفرج الأصفهاني': ('الأغاني', 'الأغاني'),
    'القالي': ('الأمالي', 'الأمالي'),
    'ابن هشام': ('السيرة النبوية', 'السيرة النبوية'),
    'المرزوقي': ('شرح ديوان الحماسة', 'شرح الحماسة للمرزوقي'),
    'التبريزي': ('شرح ديوان الحماسة', 'شرح الحماسة للتبريزي'),
    'ابن منظور': ('لسان العرب', 'لسان العرب'),
    'طه حسين': ('في الأدب الجاهلي', 'في الأدب الجاهلي'),
    'الأفغاني': ('أسواق العرب في الجاهلية والإسلام', 'أسواق العرب'),
    'محمود مصطفى': ('أهدى سبيل إلى علمي الخليل', 'أهدى سبيل'),
    'البغدادي': ('خزانة الأدب', 'خزانة الأدب'),
    'الأصمعي': ('الأصمعيات', 'الأصمعيات'),
    'العسكري': ('جمهرة الأمثال', 'جمهرة الأمثال'),
    'أبو حاتم السجستاني': ('المعمرون والوصايا', 'المعمرون والوصايا'),
    'عبد العزيز عتيق': ('علم العروض والقافية', 'علم العروض والقافية'),
    'عتيق': ('علم العروض والقافية', 'علم العروض والقافية'),
    'الجرجاني': ('دلائل الإعجاز', 'دلائل الإعجاز'),
    'عبد القاهر الجرجاني': ('دلائل الإعجاز', 'دلائل الإعجاز'),
    'المرزباني': ('الموشح', 'الموشح'),
    'الزركلي': ('الأعلام', 'الأعلام'),
    'البكري': ('سمط اللآلي', 'سمط اللآلي'),
    'المبرد': ('الكامل', 'الكامل'),
    'الطبري': ('تاريخ الرسل والملوك', 'تاريخ الطبري'),
    'سيبويه': ('الكتاب', 'الكتاب'),
    'ابن خلكان': ('وفيات الأعيان', 'وفيات الأعيان'),
}
SHORT = {full: short for full, short in BOOKS.values()}
ALIAS = {'ناصر الدين الأسد': 'الأسد', 'أبو الفرج الأصفهاني': 'أبو الفرج', 'عبد القاهر الجرجاني': 'الجرجاني',
         'عبد العزيز عتيق': 'عتيق'}
SHOWN = {'الأسد': 'ناصر الدين الأسد', 'الأفغاني': 'سعيد الأفغاني', 'الزوزني': 'الزَّوْزَنِيّ', 'أبو الفرج': 'أبو الفرج الأصفهاني', 'الجرجاني': 'عبد القاهر الجرجاني',
         'عتيق': 'عبد العزيز عتيق'}
FULL = {'شرح القصائد السبع الطوال': 'شرح القصائد السبع الطوال الجاهليات',
        'مصادر الشعر الجاهلي': 'مصادر الشعر الجاهلي وقيمتها التاريخية'}
SHORT.update({'شرح القصائد السبع الطوال': 'شرح القصائد السبع', 'مصادر الشعر الجاهلي': 'مصادر الشعر الجاهلي',
              'أسرار البلاغة': 'أسرار البلاغة', 'الحيوان': 'الحيوان'})
CITE = re.compile(r'([^،\.\[\]؛:«»()]{2,60})، (?:([^،\.\[\]؛:«»()]{2,60})، )?(?=[جص]\d)')
STATE = {'last': {}, 'seen': set()}
AMBIG = {'التبريزي', 'العسكري', 'الجاحظ', 'الجرجاني'}

def cite_titles(note):
    def split_author(lead):
        # يعيد (ما قبل المؤلف، المؤلف) إذا انتهى الكلام باسم مؤلف معروف
        p = plain(lead)
        for a in sorted(BOOKS, key=len, reverse=True):
            if p == a or p.endswith(' ' + a):
                cut = len(p) - len(a)  # موضع المؤلف في النص بلا تشكيل
                i = n = 0
                while n < cut:
                    if not MARKS.match(lead.lstrip()[i]): n += 1
                    i += 1
                body = lead.lstrip()
                return lead[:len(lead) - len(body)] + body[:i], a
        return None, None
    def fix(m):
        lead, title = m.group(1), m.group(2)
        before, author = split_author(lead)
        if author is None and title:
            b2, a2 = split_author(title)
            if a2:  # «… كما يفسرهما العسكري، ج2»
                before, author, title = lead + '، ' + b2, a2, None
        if author is None:
            return m.group(0)
        tail = ''
        if title and re.match(r'[جص]\d', plain(title)):
            tail, title = title + '، ', None  # الجزء الثاني موضع لا عنوان
        author = ALIAS.get(author, author)
        named = FULL.get(plain(title), plain(title)) if title else None
        if named and author in AMBIG:
            STATE['last'][author] = named
        if author in AMBIG and author not in STATE['last']:
            return m.group(0)  # مؤلف له أكثر من كتاب ولم يُسمَّ كتابه في الفصل بعد
        # للمؤلف الملتبس آخرُ كتاب سُمّي له، ولغيره كتابه المعروف ما لم يُسمَّ غيره في الحاشية نفسها
        full = named or STATE['last'].get(author) or BOOKS[author][0]
        short = BOOKS[author][1] if author in ('المرزوقي', 'التبريزي') and full == 'شرح ديوان الحماسة' else SHORT.get(full, full)
        key = (author, full)
        if before.strip():  # الاسم في سياق كلام: «كما يفسرهما العسكري في جمهرة الأمثال»
            STATE['seen'].add(key)
            return f'{before}{SHOWN.get(author, author)} في «{short}»، {tail}'
        if key in STATE['seen']:
            return f'{before}{short}، {tail}'
        STATE['seen'].add(key)
        return f'{before}{full}، {SHOWN.get(author, author)}، {tail}'
    return CITE.sub(fix, note)

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
        note = html.escape(cite_titles(text[j + 2:k - 1].strip())).translate(DIGITS)
        out.append(f'<span class="footnote">{note}</span>')
        i = k
    return ''.join(out)


def chapter(path, era):
    STATE['last'].clear(); STATE['seen'].clear()
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
        elif line.startswith('+ '):
            name, rest = [x.strip() for x in line[2:].split('|', 1)]
            blocks.append(f'<p class="entry"><b>{inline(name)}</b> {inline(rest)}</p>')
        elif line.startswith('& '):
            title, rest = [x.strip() for x in line[2:].split('|', 1)]
            blocks.append(f'<p class="bib"><b>{inline(title)}</b>: {inline(rest)}</p>')
        elif line == '!sign':  # توقيع المعدّ وختمه الشمعي، يسار الصفحة في آخر المقدمة (book/tools/gen-seal.mjs)
            blocks.append('<div class="sign"><img src="signature.png" alt="ياسر أحمد"></div>')
        elif line.startswith('~ '):
            blocks.append(f'<div class="bridge">{inline(line[2:])}</div>')
        else:
            blocks.append(f'<p>{inline(line)}</p>')
    return '\n'.join(blocks)


def main(chapters, out, title=True):  # chapters: [(path, running head)]
    body = []
    if title: body.append('''<div class="titlepage">
  <div class="series">الشعر والأدب العربي</div>
  <div class="tp-cartouche"><span>العصر الجاهلي</span></div>
  <div class="tp-sub">مختصر في أعلامه وقضاياه وشعره</div>
  <div class="tp-orn">❊ ❊ ❊</div>
  <div class="tp-by">إعداد وتلخيص<br><b>ياسر أحمد</b></div>
</div>''')
    if title: body.append('<div class="tocmark"></div>')  # يملؤه paginate.js بالمحتويات بعد الترقيم
    for c, era in chapters:
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
    # render.py [--out NAME] [--no-title] "<running head>" chapter.txt ... ["<running head>" chapter.txt ...]
    # كل ترويسة تسري على الفصول التي بعدها حتى تأتي ترويسة أخرى
    args, name, title = sys.argv[1:], 'book', True
    if args[:1] == ['--out']: name, args = args[1], args[2:]
    if args[:1] == ['--no-title']: title, args = False, args[1:]
    chapters, era = [], ''
    for a in args:
        if a.endswith('.txt'): chapters.append((a, era))
        else: era = a
    main(chapters, name + '.html', title)
