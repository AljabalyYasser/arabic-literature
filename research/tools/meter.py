"""Automatic scansion of fully vocalized Arabic verse.

  python3 meter.py FILES...          check verse yaml files against their text's meter
  python3 meter.py --line "صدر" "عجز" METER

Converts each hemistich to syllable weights (u short, - long) from the tashkeel,
trying the optional readings poets use (saturating the pronoun ha and plural mim,
hamzat al-wasl at the head of the ajuz), and matches the result against the named
meter with its common variations. A line that matches nothing is printed with its
patterns so the vocalization can be checked by hand.
"""
import glob, itertools, os, re, sys
import yaml

FATHA, DAMMA, KASRA, SUKUN, SHADDA = 'َ', 'ُ', 'ِ', 'ْ', 'ّ'
TANWIN = {'ً': 'a', 'ٌ': 'u', 'ٍ': 'i'}
DAGGER = 'ٰ'
SHORT = {FATHA: 'a', DAMMA: 'u', KASRA: 'i'}
LETTERS = set('ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيٱ')
SUN = set('تثدذرزسشصضطظلن')


P = r'^((?:[وفبلك][َُِ]?)*)'  # prefixes: wa, fa, bi, li, ka
IMPLICIT = [
    (P + r'لَكِن', r'\1لَاكِن'), (r'هَذَا', 'هَاذَا'), (r'هَذِهِ', 'هَاذِهِ'), (P + r'ذَلِك', r'\1ذَالِك'),
    (P + r'أُولَئِك', r'\1أُلَائِك'), (P + r'أُولِي$', r'\1أُلِي'), (P + r'أُولُو$', r'\1أُلُو'), (P + r'أُولَات', r'\1أُلَات'),  # the waw of «أولو/أولي/أولات» is never pronounced
    (P + r'هَؤُلَاء', r'\1هَاؤُلَاء'), (P + r'هَكَذَا', r'\1هَاكَذَا'),
    (P + r'عَمْرُو$', r'\1عَمْرُ'), (P + r'عَمْرَو$', r'\1عَمْرَ'),  # the waw of «عمرو» is never pronounced
    (r'الل[َُِّْٰ]*ه(?=[َُِ]?$)', 'اللَّاه'), (P + r'لِ?لَّ?[َٰ]*ه(?=[َُِ]?$)', r'\1لِلَّاه'),
]


def implicit(word):
    for a, b in IMPLICIT:
        word = re.sub(a, b, word)
    return word


def tokens(word):
    """[(letter, marks)] for one word."""
    out = []
    for ch in word:
        if ch in LETTERS:
            out.append([ch, ''])
        elif out and ch in 'ًٌٍَُِّْٰ':
            out[-1][1] += ch
        # other characters (tatweel, punctuation) are ignored
    return out


def phonemes(word, first_in_hemi, opt):
    """Return list of (consonant, vowel) with vowel in a u i A U I or None.
    opt: dict of optional readings for this word."""
    t = tokens(implicit(word.replace('ـ', '')))
    ph = []
    i = 0
    n = len(t)
    while i < n:
        l, m = t[i]
        if l == 'آ':
            ph.append(('ء', 'A'))
            i += 1
            continue
        if l in 'اٱ' and i == 0 and not any(c in m for c in SHORT) and not any(c in m for c in TANWIN):
            # hamzat al-wasl
            if first_in_hemi:
                nxt = t[1][0] if n > 1 else ''
                ph.append(('ء', 'a' if nxt == 'ل' else 'i'))
            i += 1
            continue
        if l == 'ل' and not m and i + 1 < n and SHADDA in t[i + 1][1] and i >= 1 and t[i - 1][0] in 'اٱ':
            i += 1  # lam shamsiyya
            continue
        if l == 'ل' and not m and i >= 1 and t[i - 1][0] in 'اٱ' and not t[i - 1][1]:
            ph.append(('ل', None))  # lam qamariyya written without sukun
            i += 1
            continue
        vowel = None
        long_ = False
        for c in m:
            if c in SHORT:
                vowel = SHORT[c]
            if c in TANWIN:
                vowel = TANWIN[c] + 'n'
        if DAGGER in m:
            vowel, long_ = 'a', True
        if not m:
            # unmarked letter: a lengthening letter, a silent letter, or an unmarked consonant
            prev = ph[-1] if ph else None
            if prev and prev[1] in ('a', 'u', 'i'):
                if (l in 'اى' and prev[1] == 'a') or (l == 'و' and prev[1] == 'u') or (l == 'ي' and prev[1] == 'i'):
                    ph[-1] = (prev[0], prev[1].upper())
                    i += 1
                    continue
            if l == 'ا' and i == n - 1:
                i += 1  # alif after waw al-jamaa or tanwin
                continue
            if l in 'اى':
                i += 1
                continue
            ph.append((l, None))
            i += 1
            continue
        if l in 'اى' and vowel and vowel.endswith('n'):
            # tanwin written on the alif
            if ph:
                ph[-1] = (ph[-1][0], vowel)
            i += 1
            continue
        if SHADDA in m:
            ph.append((l, None))
        if vowel and vowel.endswith('n'):
            ph.append((l, vowel[0]))
            ph.append(('ن', None))
        else:
            ph.append((l, vowel.upper() if long_ else vowel))
        i += 1
    # a trailing tanwin-alif on the previous letter: «ـًا»
    return ph


def join(words, opts, head_wasl):
    ph = []
    for k, w in enumerate(words):
        p = phonemes(w, k == 0 and head_wasl, opts.get(k, {}))
        o = opts.get(k, {})
        if o.get('sat') and p and p[-1][1] in ('u', 'i'):
            p[-1] = (p[-1][0], p[-1][1].upper())
        if o.get('shorten') and p and p[-1][1] in ('A', 'U', 'I'):
            p[-1] = (p[-1][0], p[-1][1].lower())
        # a long vowel before a dropped hamzat al-wasl is shortened
        if ph and p and ph[-1][1] in ('A', 'U', 'I') and starts_wasl(w) and not (k == 0 and head_wasl):
            ph[-1] = (ph[-1][0], ph[-1][1].lower())
        # a word ending in sukun before a dropped wasl takes a helping vowel
        if ph and p and ph[-1][1] is None and starts_wasl(w) and not (k == 0 and head_wasl):
            ph[-1] = (ph[-1][0], 'i')
        ph.extend(p)
    return ph


def starts_wasl(w):
    t = tokens(w)
    return bool(t) and t[0][0] in 'اٱ' and not any(c in t[0][1] for c in 'ًٌٍَُِ')


def weights(ph):
    out = ''
    for j, (c, v) in enumerate(ph):
        if v is None:
            continue
        if v in 'AUI':
            out += '-'
        elif j + 1 < len(ph) and ph[j + 1][1] is None:
            out += '-'
        else:
            out += 'u'
    return out


def final_long(pat):
    return pat[:-1] + '-' if pat else pat


def candidates(hemi, head_wasl_options, last):
    """All plausible weight patterns of a hemistich under optional readings."""
    words = hemi.split()
    # optional saturation: pronoun ha, plural mim
    opt_idx = []
    for k, w in enumerate(words):
        t = tokens(w)
        if not t:
            continue
        l, m = t[-1]
        if l == 'ه' and (DAMMA in m or KASRA in m):
            opt_idx.append((k, 'sat'))
        if l == 'م' and DAMMA in m and len(t) >= 2 and t[-2][0] in 'هكت' and k < len(words) - 1:
            opt_idx.append((k, 'sat'))
        if w.replace('َ', '').replace('ْ', '') in ('أنا',):
            opt_idx.append((k, 'shorten'))
    pats = set()
    for hw in head_wasl_options:
        for mask in itertools.product([False, True], repeat=min(len(opt_idx), 6)):
            opts = {}
            for (k, kind), on in zip(opt_idx, mask):
                if on:
                    opts.setdefault(k, {})[kind] = True
            p = weights(join(words, opts, hw))
            # the end of either hemistich is a pause: its last vowel may be lengthened
            pats.add(final_long(p))
            if not last:
                pats.add(p)
    return pats


# ---------- meters ----------
F = {
    'fauln': '(u--|u-u)',
    'mafailun': '(u---|u-u-|u--u)',
    'mafaaln': '(u-u-)',
    'mufaalatun': '(u-uu-|u---)',
    'mutafailun': '(uu-u-|--u-)',
    'failatun': '(-u--|uu--|-u-u|uu-u)',
    'failun': '(-u-|uu-)',
    'mustafilun': '(--u-|u-u-|-uu-|uuu-)',
    'mafulatu': '(---u|-u-u|u--u)',
}
END = {
    'tawil_a': '(u-u-)', 'tawil_d': '(u---|u-u-|u--)',
    'wafir': '(u--)',
    'kamil': '(uu-u-|--u-|uu--|---|uu-|--)',
    'ramal': '(-u--|uu--|-u-|uu-|-u-u)',
    'mutaqarib': '(u--|u-u|u-|-)',
    'basit': '(uu-|--|-u-)',
    'sari': '(-u-|uu-|--|-u)',
    'madid': '(-u--|uu--|-u-|uu-|--)',
    'munsarih': '(--u-|-uu-|u-u-|---)',
    'khafif': '(-u--|uu--|---|-u-|uu-|--)',
    'hazaj': '(u---|u--|u--u)',
    'rajaz': '(--u-|u-u-|-uu-|---|u--)',
    'mujtath': '(-u--|uu--|-u-)',
}
M = {
    'الطويل': (F['fauln'] + F['mafailun'] + F['fauln'] + '(u-u-|u---)', F['fauln'] + F['mafailun'] + F['fauln'] + END['tawil_d']),
    'الوافر': (F['mufaalatun'] + F['mufaalatun'] + END['wafir'], F['mufaalatun'] + F['mufaalatun'] + END['wafir']),
    'مجزوء الوافر': (F['mufaalatun'] + '(u-uu-|u---|u--)', F['mufaalatun'] + '(u-uu-|u---|u--)'),
    'الكامل': (F['mutafailun'] + F['mutafailun'] + END['kamil'], F['mutafailun'] + F['mutafailun'] + END['kamil']),
    'مجزوء الكامل': (F['mutafailun'] + END['kamil'], F['mutafailun'] + '(uu-u-|--u-|uu-u--|--u--|uu--|---)'),
    'الرمل': (F['failatun'] + F['failatun'] + END['ramal'], F['failatun'] + F['failatun'] + END['ramal']),
    'مجزوء الرمل': (F['failatun'] + END['ramal'], F['failatun'] + END['ramal']),
    'المتقارب': (F['fauln'] * 3 + END['mutaqarib'], F['fauln'] * 3 + END['mutaqarib']),
    'البسيط': (F['mustafilun'] + F['failun'] + F['mustafilun'] + END['basit'], F['mustafilun'] + F['failun'] + F['mustafilun'] + END['basit']),
    'مخلع البسيط': (F['mustafilun'] + F['failun'] + '(u--|--)', F['mustafilun'] + F['failun'] + '(u--|--)'),
    'السريع': (F['mustafilun'] + F['mustafilun'] + END['sari'], F['mustafilun'] + F['mustafilun'] + END['sari']),
    'المديد': (F['failatun'] + F['failun'] + END['madid'], F['failatun'] + F['failun'] + END['madid']),
    'المنسرح': (F['mustafilun'] + F['mafulatu'] + END['munsarih'], F['mustafilun'] + F['mafulatu'] + END['munsarih']),
    'الخفيف': (F['failatun'] + '(--u-|u-u-)' + END['khafif'], F['failatun'] + '(--u-|u-u-)' + END['khafif']),
    'الهزج': (F['mafailun'] + END['hazaj'], F['mafailun'] + END['hazaj']),
    'الرجز': (F['mustafilun'] + F['mustafilun'] + END['rajaz'], F['mustafilun'] + F['mustafilun'] + END['rajaz']),
    'مشطور الرجز': (F['mustafilun'] + F['mustafilun'] + END['rajaz'], None),
    'مجزوء الرجز': (F['mustafilun'] + END['rajaz'], F['mustafilun'] + END['rajaz']),
    'منهوك الرجز': (END['rajaz'] , None),
    'المجتث': ('(--u-|u-u-)' + END['mujtath'], '(--u-|u-u-)' + END['mujtath']),
}


def meter_key(name):
    name = (name or '').replace('البحر ', '').strip()
    for k in sorted(M, key=len, reverse=True):
        if k in name:
            return k
    return None


def check(first, second, meter):
    key = meter_key(meter)
    if not key:
        return None, 'unknown meter'
    rs, ra = M[key]
    single = second is None or ra is None
    pf = candidates(first, [True], last=single)
    # in a musarra' opening the end of the sadr follows the darb
    ok1 = any(re.fullmatch(rs, p) or (ra and re.fullmatch(ra, p)) for p in pf)
    if single:
        # a single line (mashtur, manhuk) may be either half
        if not ok1 and ra:
            ok1 = any(re.fullmatch(ra, p) for p in pf)
        return ok1, (sorted(pf),)
    pa = candidates(second, [False, True], last=True)
    ok2 = any(re.fullmatch(ra, p) for p in pa)
    return ok1 and ok2, (ok1, ok2, sorted(pf), sorted(pa))


def text_meter(text_id):
    p = f'/home/user/arabic-literature/src/content/texts/{text_id}.md'
    s = open(p, encoding='utf-8').read()
    m = re.search(r'^meter:\s*"?([^"\n]+)"?', s, re.M)
    return m.group(1) if m else None


def main(args):
    if args and args[0] == '--line':
        print(check(args[1], args[2] or None, args[3]))
        return
    bad = total = 0
    for f in sorted(itertools.chain.from_iterable(glob.glob(a) for a in args)):
        v = yaml.safe_load(open(f, encoding='utf-8'))
        tid = os.path.basename(os.path.dirname(f))
        meter = (v.get('prosody') or {}).get('meter') or text_meter(tid)
        ok, info = check(v['first'], v.get('second'), meter)
        total += 1
        if not ok:
            bad += 1
            print(f'{f.split("verses/")[-1]}  [{meter}]  {info if ok is None else ""}')
            print('   ', v['first'], '...', v.get('second'))
            if ok is not None:
                for part in info:
                    print('     ', part)
    print(f'{total - bad}/{total} ok')


if __name__ == '__main__':
    main(sys.argv[1:])
