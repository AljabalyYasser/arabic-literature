# الفاصل المزخرف بين فصلين يتصلان في صفحة واحدة؛ من زخارف الإطار نفسها
import sys
W,H=90,8
Y=H/2
BROWN,GOLD,RED,PAPER='#6e4318','#a8803a','#8a2b16','#efdcae'
out=[f'<svg viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">']
a=out.append
def motif(x,y):
    g=[f'<g transform="translate({x} {y})"><circle r="1.9" fill="{PAPER}"/>']
    for k in range(4):
        g.append(f'<path d="M0 0 C.9 -.6 .9 -1.9 0 -2.4 C-.9 -1.9 -.9 -.6 0 0 Z" fill="none" stroke="{GOLD}" stroke-width=".3" transform="rotate({45+90*k})"/>')
    g.append(f'<circle r=".5" fill="{RED}"/></g>')
    return ''.join(g)
def shamsa(x,y,s):
    g=[f'<g transform="translate({x} {y}) scale({s})">',
       f'<circle r="5.5" fill="{PAPER}" stroke="{BROWN}" stroke-width=".5"/>',
       f'<circle r="4.7" fill="none" stroke="{GOLD}" stroke-width=".25"/>']
    for k in range(8):
        fill=RED if k%2==0 else 'none'
        g.append(f'<path d="M0 -1.2 C1.15 -2 1.15 -3.6 0 -4.4 C-1.15 -3.6 -1.15 -2 0 -1.2 Z" fill="{fill}" fill-opacity=".85" stroke="{BROWN}" stroke-width=".25" transform="rotate({45*k})"/>')
    for k in range(8):
        g.append(f'<circle cx="0" cy="-4.75" r=".3" fill="{GOLD}" transform="rotate({45*k+22.5})"/>')
    g.append(f'<circle r="1.05" fill="{PAPER}" stroke="{BROWN}" stroke-width=".3"/><circle r=".45" fill="{RED}"/></g>')
    return ''.join(g)
for x1,x2 in ((3,40.5),(49.5,87)):
    a(f'<line x1="{x1}" y1="{Y}" x2="{x2}" y2="{Y}" stroke="{BROWN}" stroke-width=".45"/>')
    a(f'<line x1="{x1+6}" y1="{Y-1.1}" x2="{x2-6}" y2="{Y-1.1}" stroke="{GOLD}" stroke-width=".22"/>')
    a(f'<line x1="{x1+6}" y1="{Y+1.1}" x2="{x2-6}" y2="{Y+1.1}" stroke="{GOLD}" stroke-width=".22"/>')
for x in (3,87): a(f'<circle cx="{x}" cy="{Y}" r=".6" fill="{BROWN}"/>')
for x in (21.5,68.5): a(motif(x,Y))
for x in (12,31,59,78): a(f'<circle cx="{x}" cy="{Y}" r=".38" fill="{BROWN}"/>')
a(shamsa(W/2,Y,.7))
a('</svg>')
sys.stdout.write('\n'.join(out))
