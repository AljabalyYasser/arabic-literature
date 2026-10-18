"""Pre-build check for content files a writer touched (mirrors what `npm run build` rejects).

  python3 vcheck.py text TEXT_ID [TEXT_ID ...]   the text file and its verses folder
  python3 vcheck.py file PATH [PATH ...]         any content file (md/mdx/yaml): parse + citation ids

Checks: YAML/frontmatter parses; every [@id، …], <Cite id="…">, source: id names a file in
src/content/sources; verses are numbered 001…N with no gap except `omit`; an explained verse has
meaning, vocabulary, syntax, morphology, rhetoric (thesis + ≥1 device), prosody (meter, rhyme,
scansion) and ≥1 source; an unexplained verse (explained: false) has first and ≥1 source and its
text has a `reading`; references to people/texts/stories/concepts/verses exist.
Run meter.py on the verse files separately for scansion.
"""
import os, re, sys, glob, yaml

class _StrictLoader(yaml.SafeLoader):
    pass
def _no_dup(loader, node, deep=False):
    seen = set()
    for k, _ in node.value:
        key = loader.construct_object(k, deep=deep)
        if key in seen:
            raise yaml.YAMLError(f'duplicated mapping key: {key}')
        seen.add(key)
    return loader.construct_mapping(node, deep)
_StrictLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, _no_dup)
def _strict_load(t):
    return yaml.load(t, Loader=_StrictLoader)
ROOT = '/home/user/arabic-literature/src/content'
SRC = {os.path.splitext(f)[0] for f in os.listdir(f'{ROOT}/sources')}
def ids(coll, ext):
    return {os.path.splitext(os.path.relpath(p, f'{ROOT}/{coll}'))[0] for p in glob.glob(f'{ROOT}/{coll}/**/*{ext}', recursive=True)}
PEOPLE, TEXTS, STORIES, CONCEPTS = ids('people', '.md'), ids('texts', '.md'), ids('stories', '.md'), ids('concepts', '.md')
VERSES = ids('verses', '.yaml')
errs = 0
def err(path, msg):
    global errs; errs += 1; print(f'ERR {os.path.relpath(path, ROOT)}: {msg}')

def load(path):
    s = open(path, encoding='utf-8').read()
    if path.endswith(('.md', '.mdx')):
        m = re.match(r'^---\n(.*?)\n---\n?(.*)$', s, re.S)
        if not m: err(path, 'no frontmatter'); return {}, s
        try: return _strict_load(m.group(1)) or {}, m.group(2)
        except yaml.YAMLError as e: err(path, f'YAML: {e}'.replace('\n', ' ')); return {}, ''
    try: return _strict_load(s) or {}, ''
    except yaml.YAMLError as e: err(path, f'YAML: {e}'.replace('\n', ' ')); return {}, ''

def walk(x):
    if isinstance(x, dict):
        for v in x.values(): yield from walk(v)
    elif isinstance(x, list):
        for v in x: yield from walk(v)
    elif isinstance(x, str): yield x

def cites(path, data, body):
    for s in list(walk(data)) + [body]:
        for m in re.finditer(r'\[@([a-z0-9-]+)', s):
            if m.group(1) not in SRC: err(path, f'unknown source [@{m.group(1)}')
        for m in re.finditer(r'<Cite id="([^"]+)"', s):
            if m.group(1) not in SRC: err(path, f'unknown source <Cite id="{m.group(1)}"')
        for tag, coll, pool in (('StoryCard', 'stories', STORIES), ('ConceptCard', 'concepts', CONCEPTS), ('PersonCard', 'people', PEOPLE)):
            for m in re.finditer(rf'<{tag} id="([^"]+)"', s):
                if m.group(1) not in pool: err(path, f'unknown {coll} id {m.group(1)}')
        for m in re.finditer(r'<Reading text="([^"]+)"', s):
            if m.group(1) not in TEXTS: err(path, f'unknown text {m.group(1)}')
        for m in re.finditer(r'<VerseQuote id="([^"]+)"', s):
            if m.group(1) not in VERSES: err(path, f'unknown verse {m.group(1)}')
    def chk_src_list(lst, where):
        for c in lst or []:
            if isinstance(c, dict) and c.get('source') not in SRC: err(path, f'{where}: unknown source {c.get("source")}')
    if isinstance(data, dict):
        for i, o in enumerate(data.get('outcomes') or []):
            if not isinstance(o, str): err(path, f'outcomes[{i}] is not a string (quote it: it contains ": ")')
        for i, r in enumerate(data.get('review') or []):
            if not (isinstance(r, dict) and isinstance(r.get('q'), str) and isinstance(r.get('a'), str)): err(path, f'review[{i}] q/a must be strings (quote them)')
        chk_src_list(data.get('sources'), 'sources')
        for k in ('earliest', 'edition'):
            if isinstance(data.get(k), dict): chk_src_list([data[k]], k)
        for k, pool in (('people', PEOPLE), ('texts', TEXTS), ('stories', STORIES), ('concepts', CONCEPTS)):
            for i in data.get(k) or []:
                if isinstance(i, str) and i not in pool: err(path, f'{k}: unknown id {i}')
        if '/texts/' in path and isinstance(data.get('author'), str) and data['author'] not in PEOPLE: err(path, f'author: unknown person {data["author"]}')
        if isinstance(data.get('person'), str) and data['person'] not in PEOPLE: err(path, f'person: unknown {data["person"]}')
        for v in data.get('verses') or []:
            if isinstance(v, str) and v not in VERSES: err(path, f'verses: unknown {v}')

def verse(path, v, reading):
    if not isinstance(v, dict): err(path, 'not a mapping'); return
    if not v.get('first'): err(path, 'missing first')
    if not v.get('sources'): err(path, 'no sources')
    if v.get('status') not in ('draft', 'review', 'approved'): err(path, f'bad status {v.get("status")}')
    if v.get('explained', True) is False:
        if not reading: err(path, 'unexplained verse in a text without reading')
        return
    for k in ('meaning', 'vocabulary', 'syntax', 'morphology'):
        if not v.get(k): err(path, f'explained verse needs {k}')
    r = v.get('rhetoric') or {}
    if not r.get('thesis') or not r.get('devices'): err(path, 'rhetoric needs thesis and ≥1 device')
    for d in r.get('devices') or []:
        if not (isinstance(d, dict) and d.get('title') and d.get('text')): err(path, 'device needs title and text')
    p = v.get('prosody') or {}
    for k in ('meter', 'rhyme', 'scansion'):
        if not p.get(k): err(path, f'prosody needs {k}')
    for x in v.get('vocabulary') or []:
        if not (isinstance(x, dict) and x.get('term') and x.get('text')): err(path, 'vocabulary item needs term and text')
    for x in v.get('variants') or []:
        if not (isinstance(x, dict) and {'reading', 'status', 'note'} <= set(x)): err(path, 'variant needs reading, status, note')

def text(tid):
    tp = f'{ROOT}/texts/{tid}.md'
    if not os.path.exists(tp): err(tp, 'missing text file'); return
    data, body = load(tp); cites(tp, data, body)
    reading, omit = data.get('reading'), set(data.get('omit') or [])
    files = sorted(glob.glob(f'{ROOT}/verses/{tid}/*.yaml'))
    nums = []
    for f in files:
        b = os.path.basename(f)
        if not re.fullmatch(r'\d{3}\.yaml', b): err(f, 'file name must be NNN.yaml'); continue
        nums.append(int(b[:3]))
        v, _ = load(f); cites(f, v, ''); verse(f, v, reading)
    if reading and nums:
        missing = [n for n in range(1, max(nums) + 1) if n not in nums and n not in omit]
        if missing: err(tp, f'missing verses {missing}')
    print(f'{tid}: {len(files)} verse files, reading={reading}, omit={sorted(omit)}')

if __name__ == '__main__':
    mode, args = sys.argv[1], sys.argv[2:]
    for a in args:
        if mode == 'text': text(a)
        else:
            d, b = load(a); cites(a, d, b)
    print('OK' if not errs else f'{errs} error(s)')
    sys.exit(1 if errs else 0)
