"""Diwan scans on archive.org (OCR + page images) for the formative-path surveys.

  python3 diwan.py find BOOK WORD [WORD ...]   leaves scored by how many words occur (normalized)
  python3 diwan.py leaf BOOK N [N2]            OCR text of leaf N..N2, with the printed page
  python3 diwan.py page BOOK P [P2]            OCR text of printed page P..P2
  python3 diwan.py img BOOK N [OUT]            page image of leaf N (default scans/BOOK-N.jpg); open it with Read
  python3 diwan.py map BOOK                    leaf -> printed page table

BOOK: labid  (شرح ديوان لبيد، تحقيق إحسان عباس)
      khansa (ديوان الخنساء، الشرح المنسوب إلى ثعلب، تحقيق أنور أبو سويلم)
      asha1  (ديوان الأعشى الكبير، شرح محمد محمد حسين، الطبعة الأولى 1950)
      asha2  (ديوان الأعشى الكبير، شرح محمد محمد حسين، الطبعة الثانية)
      zuhayr (شعر زهير، صنعة الأعلم، تحقيق قباوة، ط3 1980)  nabigha (ديوان النابغة، أبو الفضل إبراهيم، ط2)
      antara (ديوان عنترة، مولوي)  thalab (شرح شعر زهير المنسوب إلى ثعلب، قباوة 2008)  thalab44 (طبعة دار الكتب 1944)
OCR of vocalized verse is unreliable: cite verse text only after reading the page image.
The printed page (~N) is leaf minus a per-book offset; confirm the number printed on the image before citing.
"""
import gzip, json, os, re, subprocess, sys, urllib.parse
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'diwans')
os.makedirs(D, exist_ok=True)
BOOKS = {
    'labid': ('3929pdf', '3929 كتاب اقرا اونلاين    pdf   شرح ديوان لبيد بن ربيعة العامري - ت إحسان عباس'),
    'khansa': ('3318pdf_202001', '3318 كتاب اقرا اونلاين    pdf   ديوان الخنساء بشرح ثعلب'),
    'asha1': ('diwan-ala3cha_202408', 'diwan-ala3cha'),
    'asha2': ('20201023_20201023_0327', 'ديوان الأعشى الكبير,،'),
    'zuhayr': ('3917pdf', '3917 كتاب اقرا اونلاين    pdf   شرح ديوان زهير بن أبي سلمى-الأعلم الشنتمري - تحقيق فخر الدين قباوة'),
    'nabigha': ('3409pdf_202001', '3409 كتاب اقرا اونلاين    pdf   ديوان النابغة الذبياني - ت إبراهيم - ط المعارف'),
    'antara': ('3562pdf', '3562 كتاب اقرا اونلاين    pdf   ديوان عنترة تحقيق ودراسة - المكتب الإسلامي'),
    'thalab': ('3918pdf', '3918 كتاب اقرا اونلاين    pdf   شرح ديوان زهير بن أبي سلمى-ثعلب - تحقيق - فخر الدين قباوة'),
    'thalab44': ('3916pdf', '3916 كتاب اقرا اونلاين    pdf   شرح ديوان زهير بن أبى سلمى  - ثعلب'),
}

def get(book, suffix, local):
    it, pre = BOOKS[book]
    path = os.path.join(D, f'{book}{local}')
    if not os.path.exists(path):
        url = f'https://archive.org/download/{it}/' + urllib.parse.quote(pre + suffix)
        subprocess.run(['curl', '-sSL', '--retry', '3', '-o', path, url], check=True)
    return path

def leaves(book):
    s = gzip.open(get(book, '_hocr_searchtext.txt.gz', '_s.gz')).read().decode('utf-8')
    idx = json.loads(gzip.open(get(book, '_hocr_pageindex.json.gz', '_i.gz')).read().decode('utf-8'))
    return [s[a:b] for a, b, *_ in idx]

# leaf = printed page + OFFSET, checked on page images at several leaves (labid: leaf 146 = p.101;
# khansa: 60, 200, 400 = p.61, 201, 401; asha1: 60, 200, 400 = p.30, 170, 370; asha2: 200 = p.203).
# Plates or unnumbered pages can shift it: always confirm the number printed on the image.
OFFSET = {'labid': 45, 'khansa': -1, 'asha1': 30, 'asha2': -3, 'zuhayr': 0, 'nabigha': -1, 'antara': 7, 'thalab': -1, 'thalab44': 0}
# antara: the offset varies (leaf 190 = p.183, leaf 230 = p.225); asha2: irregular, see the al-Asha survey §7.1.

class _Pages(dict):
    def __init__(self, book): self.off = OFFSET[book]
    def get(self, n, default='?'):
        p = n - self.off
        return f'~{p}' if p > 0 else default

def pages(book):
    return _Pages(book)

TR = str.maketrans({'ی': 'ي', 'ى': 'ي', 'ک': 'ك', 'ہ': 'ه', 'ھ': 'ه', 'ة': 'ه', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ؤ': 'و', 'ئ': 'ي', 'ٹ': 'ت', 'ۀ': 'ه', 'ٔ': ''})
def norm(x):
    x = re.sub('[ؐ-ًؚ-ٰٟۖ-ۭـ‌-‏]', '', x)
    return x.translate(TR)

if __name__ == '__main__':
    cmd, book = sys.argv[1], sys.argv[2]
    if cmd == 'img':
        n = int(sys.argv[3])
        out = sys.argv[4] if len(sys.argv) > 4 else os.path.join(D, '..', 'scans', f'{book}-{n}.jpg')
        os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
        tmp = out + '.full.jpg'
        subprocess.run(['curl', '-sSL', '--retry', '3', '-o', tmp, f'https://archive.org/download/{BOOKS[book][0]}/page/n{n}.jpg'], check=True)
        from PIL import Image, ImageOps
        im = Image.open(tmp).convert('L')
        box = ImageOps.invert(im).point(lambda v: 255 if v > 60 else 0).getbbox()
        if box: im = im.crop((max(0, box[0] - 20), max(0, box[1] - 20), box[2] + 20, box[3] + 20))
        im.thumbnail((1200, 1700)); im.save(out); os.remove(tmp)
        print(os.path.abspath(out), 'printed page', pages(book).get(n, '?'))
        sys.exit()
    L, P = leaves(book), pages(book)
    if cmd == 'map':
        for n in range(len(L)): print(n, P.get(n, '?'))
    elif cmd == 'find':
        ws = [norm(w) for w in sys.argv[3:]]
        res = []
        for n, t in enumerate(L):
            nt = norm(t)
            sc = sum(1 for w in ws if w in nt)
            if sc: res.append((sc, n, nt))
        res.sort(key=lambda r: (-r[0], r[1]))
        for sc, n, nt in res[:15]:
            w = next(w for w in ws if w in nt); k = nt.find(w)
            print(f'== leaf {n} (p.{P.get(n, "?")}) score {sc}/{len(ws)}: ...{nt[max(0, k-150):k+250]}...'.replace('\n', ' / '))
    elif cmd in ('leaf', 'page'):
        a = sys.argv[3]; b = sys.argv[4] if len(sys.argv) > 4 else a
        if cmd == 'leaf': ns = range(int(a), int(b) + 1)
        else:
            ns = [p + OFFSET[book] for p in range(int(a), int(b) + 1) if 0 <= p + OFFSET[book] < len(L)]
        for n in ns: print(f'===== leaf {n} (p.{P.get(n, "?")})\n{L[n]}')
