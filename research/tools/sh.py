"""Shamela research helper.

  python3 sh.py page BOOK IDX [IDX2]      print pages (volume, print page, url, text)
  python3 sh.py toc BOOK                  print table of contents (index, title)
  python3 sh.py find BOOK FROM TO REGEX   scan pages FROM..TO, print hits with context

Text matching ignores Arabic diacritics and hamza/alif variants.
Pages are cached under ./cache/.
"""
import html, json, os, re, subprocess, sys
from concurrent.futures import ThreadPoolExecutor

CACHE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'cache')
os.makedirs(CACHE, exist_ok=True)


def fetch(url, key):
    path = os.path.join(CACHE, key)
    if os.path.exists(path):
        return open(path, encoding='utf-8').read()
    for _ in range(3):
        r = subprocess.run(['curl', '-sL', '--max-time', '40', url], capture_output=True, text=True)
        if r.returncode == 0 and len(r.stdout) > 2000:
            open(path, 'w', encoding='utf-8').write(r.stdout)
            return r.stdout
    return ''


def norm(s):
    s = re.sub(r'[ؐ-ًؚ-ٰٟۖ-ۭ]', '', s)
    s = s.replace('ـ', '')
    s = re.sub('[أإآٱ]', 'ا', s)
    return s.replace('ى', 'ي').replace('ة', 'ه')


def page(book, idx):
    url = f'https://shamela.ws/book/{book}/{idx}'
    s = fetch(url, f'{book}_{idx}.html')
    part = re.search(r'id="fld_part_top" value="(\d+)"', s)
    pg = re.search(r'id="fld_goto_top" value="(\d+)"', s)
    m = re.search(r'<div[^>]*class="[^"]*nass[^"]*"[^>]*>(.*?)</div>\s*</div>', s, re.S)
    body = m.group(1) if m else ''
    body = re.sub(r'<br\s*/?>|</p>', '\n', body)
    text = html.unescape(re.sub(r'<[^>]+>', ' ', body))
    text = re.sub(r'[ \t]+', ' ', text)
    text = re.sub(r'\n\s*\n+', '\n', text).strip()
    return {'book': book, 'idx': idx, 'part': part.group(1) if part else '', 'page': pg.group(1) if pg else '', 'url': url, 'text': text}


def toc(book):
    s = fetch(f'https://shamela.ws/book/{book}', f'{book}_card.html')
    out = []
    for i, t in re.findall(rf'href="https://shamela.ws/book/{book}/(\d+)(?:#[^"]*)?"[^>]*>(.*?)</a>', s, re.S):
        t = re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', '', t))).strip()
        if t and not t.isdigit():
            out.append((int(i), t))
    return out


def show(p):
    print(f"== ج{p['part']} ص{p['page']}  (idx {p['idx']})  {p['url']}")
    print(p['text'])


if __name__ == '__main__':
    cmd, book = sys.argv[1], sys.argv[2]
    if cmd == 'page':
        a = int(sys.argv[3]); b = int(sys.argv[4]) if len(sys.argv) > 4 else a
        with ThreadPoolExecutor(6) as ex:
            for p in ex.map(lambda i: page(book, i), range(a, b + 1)):
                show(p)
    elif cmd == 'toc':
        for i, t in toc(book):
            print(i, t)
    elif cmd == 'find':
        a, b, rx = int(sys.argv[3]), int(sys.argv[4]), re.compile(norm(sys.argv[5]))
        with ThreadPoolExecutor(8) as ex:
            for p in ex.map(lambda i: page(book, i), range(a, b + 1)):
                t = norm(p['text'])
                for m in rx.finditer(t):
                    s0 = max(0, m.start() - 200)
                    print(f"-- ج{p['part']} ص{p['page']} idx {p['idx']}: …{t[s0:m.end() + 300]}…")
