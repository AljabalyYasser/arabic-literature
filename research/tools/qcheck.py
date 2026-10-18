"""Check that every «quote» in a content file appears on the page its citation names.

  python3 qcheck.py FILE [FILE...]

For each citation [@src، جN صM] the quotes between it and the previous citation are
looked up in the cached Shamela pages (./cache) of that book, volume and page (±1 page,
since a quote may run over). Prints OK / MISS / NOCACHE per quote.
"""
import glob, html, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sh import norm, page, CACHE

BOOKS = {'deif': 11996, 'tabrizi-ashr': 37488, 'baghdadi-mughni': 150966, 'uyun-al-akhbar': 23790, 'askari-amthal': 6897, 'zirikli': 12286, 'ibn-hisham': 23833, 'bayan': 10614, 'ibn-qutayba': 23785,
         'ibn-rashiq': 10909, 'deif-muasir': 9981, 'ibn-sallam': 6738, 'iqd': 23789, 'kamil': 8505,
         'mufaddaliyyat': 6904, 'afghani': 9999, 'wafayat': 1000, 'yaqut': 9788, 'tabari': 9783,
         'diwan-jarir': 133412, 'diwan-dhi-al-rumma': 16545, 'subh': 9429, 'khizana-hamawi': 8675,
         'ibn-khaldun': 12320, 'dar-al-tiraz': 23119, 'nafh': 1002, 'dhakhira': 1035,
         'abbas-qurtuba': 1016, 'abbas-tawaif': 1015, 'yatima': 6743, 'muwazana': 26183, 'abbas-qurtuba': 1016, 'abbas-tawaif': 1015, 'subh': 9429, 'khizana-hamawi': 8675, 'ibn-khaldun': 12320, 'wafayat': 1000}
BOOKS.update({'amidi': 10913, 'simt': 1586, 'naqaid': 13609, 'tabrizi-hamasa': 6907, 'jamhara': 1487, 'qali': 9160, 'marzubani': 26552, 'lisan': 1687, 'suyuti-mughni': 17724, 'khizana': 12732, 'dalail': 12055, 'asrar': 8187,
              'maydani': 12929, 'muwashshah': 9427, 'asmaiyyat': 6905, 'atiq': 11298, 'sibawayh': 23018,
              'diwan-imru-al-qais': 27112, 'diwan-tarafa': 36422, 'ibn-al-anbari': 124335, 'zawzani': 11253})
AR = str.maketrans('٠١٢٣٤٥٦٧٨٩', '0123456789')
index = {}


def load(book):
    if book in index:
        return index[book]
    m = {}
    for f in glob.glob(os.path.join(CACHE, f'{book}_*.html')):
        i = os.path.basename(f)[len(str(book)) + 1:-5]
        if not i.isdigit():
            continue
        p = page(book, int(i))
        key = (p['part'] or '1', p['page'])
        m.setdefault(key, []).append(norm(p['text']))
    index[book] = m
    return m


def clean(s):
    s = norm(s.translate(AR))
    s = re.sub(r'[^\w\s]', ' ', s)
    return re.sub(r'\s+', ' ', s).strip()


def pages(loc):
    loc = loc.translate(AR)
    part = re.search(r'ج\s*(\d+)', loc)
    part = part.group(1) if part else '1'
    out = []
    for a, b in re.findall(r'ص\s*(\d+)(?:\s*[–-]\s*(\d+))?', loc):
        a = int(a); b = int(b) if b else a
        out += [(part, n) for n in range(a, b + 1)]
    return out


def check(path):
    s = open(path, encoding='utf-8').read()
    # مكوّن الإحالة في فصول MDX: <Cite id="x" loc="y" /> ← [@x، y]
    s = re.sub(r'<Cite id="([^"]+)"(?: loc="([^"]*)")? />', lambda m: f"[@{m.group(1)}، {m.group(2) or ''}]", s)
    last = 0
    for m in re.finditer(r'\[@([a-z0-9-]+)(?:[،,]\s*([^\]]+))?\]', s):
        seg = s[last:m.start()]
        last = m.end()
        src, loc = m.group(1), m.group(2) or ''
        seg = re.sub(r'(?m)^\s*-?\s*(title|name):.*$', '', seg)  # عناوين النصوص ليست اقتباسات
        quotes = re.findall(r'«([^«»]{6,})»', seg)
        if not quotes:
            continue
        book = BOOKS.get(src)
        if not book:
            for q in quotes:
                print(f'SKIP  {src} {loc}: «{q[:50]}»')
            continue
        idx = load(book)
        cand = []
        for part, n in pages(loc):
            for d in (0, -1, 1):
                cand += idx.get((part, str(n + d)), [])
        if not cand:
            print(f'NOCACHE {src} {loc}: «{quotes[0][:50]}»')
            continue
        hay = clean(' '.join(cand))
        for q in quotes:
            pieces = [clean(x) for x in re.split(r'…|\.\.\.', q) if len(clean(x)) > 3]
            ok = all(p in hay for p in pieces)
            print(f"{'OK  ' if ok else 'MISS'}  {src} {loc}: «{q[:60]}»")


for f in sys.argv[1:]:
    print('#', f)
    check(f)
