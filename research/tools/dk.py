"""Dar al-Kutub Aghani (archive.org OCR) helper.

  python3 dk.py find VOL WORD [WORD ...]   leaves scored by how many words occur (normalized)
  python3 dk.py leaf VOL N [N2]            print OCR text of leaf N..N2
  python3 dk.py img VOL N OUT.jpg          download page image of leaf N
Printed page is read from the leaf's header line when possible (leaf ~ page+1).
"""
import gzip, json, os, re, subprocess, sys
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'akt')
os.makedirs(D, exist_ok=True)
ITEM = {11: ('Al-aghani_11', None)}

def item(vol):
    return ITEM.get(vol, ('aghani2014', str(vol)))

def files(vol):
    it, pre = item(vol)
    s, i = os.path.join(D, f'{vol}_s.gz'), os.path.join(D, f'{vol}_i.gz')
    if not os.path.exists(s):
        if pre is None:
            meta = json.loads(subprocess.run(['curl', '-sL', f'https://archive.org/metadata/{it}/files'], capture_output=True, text=True).stdout)
            names = [f['name'] for f in meta['result']]
            st = [n for n in names if n.endswith('_hocr_searchtext.txt.gz')][0]
            pi = [n for n in names if n.endswith('_hocr_pageindex.json.gz')][0]
        else:
            st, pi = f'{pre}_hocr_searchtext.txt.gz', f'{pre}_hocr_pageindex.json.gz'
        subprocess.run(['curl', '-sL', '-o', s, f'https://archive.org/download/{it}/{st}'])
        subprocess.run(['curl', '-sL', '-o', i, f'https://archive.org/download/{it}/{pi}'])
    return gzip.open(s).read().decode('utf-8'), json.loads(gzip.open(i).read().decode('utf-8'))

TR = str.maketrans({'ی': 'ي', 'ى': 'ي', 'ک': 'ك', 'ہ': 'ه', 'ھ': 'ه', 'ة': 'ه', 'أ': 'ا', 'إ': 'ا', 'آ': 'ا', 'ٱ': 'ا', 'ؤ': 'و', 'ئ': 'ي', 'ٹ': 'ت', 'ۀ': 'ه', 'ٔ': ''})
def norm(x):
    x = re.sub('[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640\u200c-\u200f]', '', x)
    return x.translate(TR)

PD = str.maketrans('۰۱۲۳۴۵۶۷۸۹٠١٢٣٤٥٦٧٨٩', '01234567890123456789')
def printed(t):
    head = t.strip().split('\n')[0][:60].translate(PD)
    m = re.search(r'\d{1,3}', head)
    return m.group(0) if m else '?'

def leaves(vol):
    s, idx = files(vol)
    return [s[a:b] for a, b, *_ in idx]

if __name__ == '__main__':
    cmd, vol = sys.argv[1], int(sys.argv[2])
    L = leaves(vol)
    if cmd == 'find':
        ws = [norm(w) for w in sys.argv[3:]]
        res = []
        for n, t in enumerate(L):
            nt = norm(t)
            sc = sum(1 for w in ws if w in nt)
            if sc: res.append((sc, n, t))
        res.sort(key=lambda r: (-r[0], r[1]))
        for sc, n, t in res[:12]:
            nt = norm(t)
            w = next(w for w in ws if w in nt)
            k = nt.find(w)
            print(f'== leaf {n} (p.{printed(t)}) score {sc}/{len(ws)}: ...{nt[max(0,k-120):k+200]}...'.replace('\n', ' / '))
    elif cmd == 'leaf':
        a = int(sys.argv[3]); b = int(sys.argv[4]) if len(sys.argv) > 4 else a
        for n in range(a, b + 1):
            print(f'===== leaf {n} (p.{printed(L[n])})\n{L[n]}')
    elif cmd == 'img':
        n, out = int(sys.argv[3]), sys.argv[4]
        it, pre = item(vol)
        if pre is None:
            url = f"https://archive.org/download/{it}/al-a%273hani_11_jp2.zip/al-a%273hani_11_jp2%2Fal-a%273hani_11_{n:04d}.jp2?ext=jpg"
        else:
            url = f'https://archive.org/download/{it}/{pre}_jp2.zip/{pre}_jp2%2F{pre}_{n:04d}.jp2?ext=jpg'
        subprocess.run(['curl', '-sL', '-o', out, url])
        print(out, os.path.getsize(out))
