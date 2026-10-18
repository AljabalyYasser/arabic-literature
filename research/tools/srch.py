"""Shamela full-text search: python3 srch.py "term" [book_id ...]"""
import sys, re, html, subprocess
term = sys.argv[1]
books = sys.argv[2:]
args = ['curl', '-sL', '--max-time', '60', '-X', 'POST', 'https://shamela.ws/ajax/search', '--data-urlencode', f'term={term}']
for b in books:
    args += ['-d', f'books[]={b}']
s = subprocess.run(args, capture_output=True, text=True).stdout
m = re.search(r'<div class="alert">([^<]*)</div>', s)
print(m.group(1) if m else 'no results')
for href, title, snip in re.findall(r'<a target="_blank" href="([^"]+)"><b><span class="text-primaryy">([^<]*)</span>.*?<span class="srch-snippet-text">(.*?)</span> <button', s, re.S):
    snip = html.unescape(re.sub(r'<[^>]+>', '', snip))
    print(f'-- {title} {href}\n   {snip[:400]}')
