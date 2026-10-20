import math, sys
W,H=170,240
O1,O2=8,9.3          # outer lines
B1,B2=9.3,15.3       # band
I1,I2=15.3,16.6      # inner lines
C=12.3               # corner centre
BROWN,GOLD,RED,PAPER='#6e4318','#a8803a','#8a2b16','#efdcae'
out=[]
a=out.append
a(f'<svg class="frame" viewBox="0 0 {W} {H}" xmlns="http://www.w3.org/2000/svg">')
# lines
a(f'<rect x="{O1}" y="{O1}" width="{W-2*O1}" height="{H-2*O1}" fill="none" stroke="{BROWN}" stroke-width=".9"/>')
a(f'<rect x="{O2}" y="{O2}" width="{W-2*O2}" height="{H-2*O2}" fill="none" stroke="{BROWN}" stroke-width=".3"/>')
a(f'<rect x="{I1}" y="{I1}" width="{W-2*I1}" height="{H-2*I1}" fill="none" stroke="{BROWN}" stroke-width=".3"/>')
a(f'<rect x="{I2}" y="{I2}" width="{W-2*I2}" height="{H-2*I2}" fill="none" stroke="{RED}" stroke-width=".7"/>')
# band motif: a small four-petal flower (زهيرة) between two dots, identical on every side
def motif(x,y,rot=0):
    g=[f'<g transform="translate({x:.3f} {y:.3f}) rotate({rot})">']
    for k in range(4):
        g.append(f'<path d="M0 0 C.9 -.6 .9 -1.9 0 -2.4 C-.9 -1.9 -.9 -.6 0 0 Z" fill="none" stroke="{GOLD}" stroke-width=".3" transform="rotate({45+90*k})"/>')
    g.append(f'<circle r=".5" fill="{RED}"/>')
    g.append('</g>')
    return ''.join(g)
def dot(x,y): return f'<circle cx="{x:.3f}" cy="{y:.3f}" r=".38" fill="{BROWN}"/>'
mid=(B1+B2)/2
def run(start,end,fixed,horiz,skip_centre):
    L=end-start; n=round(L/6); step=L/n
    for i in range(n):
        c=start+step*(i+.5)
        if skip_centre and abs(c-(start+end)/2)<9: continue
        x,y=(c,fixed) if horiz else (fixed,c)
        a(motif(x,y))
        if i<n-1:
            d=start+step*(i+1)
            if skip_centre and abs(d-(start+end)/2)<9: continue
            a(dot(d,fixed) if horiz else dot(fixed,d))
lo,hi_x,hi_y=C+5.6,W-C-5.6,H-C-5.6
run(lo,hi_x,mid,True,True)          # top (centre ornament)
run(lo,hi_x,H-mid,True,True)        # bottom (folio)
run(lo,hi_y,mid,False,True)         # right
run(lo,hi_y,W-mid,False,True)       # left
# شمسة: Arabic rosette for the corners
def shamsa(x,y):
    g=[f'<g transform="translate({x} {y})">',
       f'<circle r="5.5" fill="{PAPER}" stroke="{BROWN}" stroke-width=".5"/>',
       f'<circle r="4.7" fill="none" stroke="{GOLD}" stroke-width=".25"/>']
    for k in range(8):
        fill=RED if k%2==0 else 'none'
        g.append(f'<path d="M0 -1.2 C1.15 -2 1.15 -3.6 0 -4.4 C-1.15 -3.6 -1.15 -2 0 -1.2 Z" fill="{fill}" fill-opacity=".85" stroke="{BROWN}" stroke-width=".25" transform="rotate({45*k})"/>')
    for k in range(8):
        g.append(f'<circle cx="0" cy="-4.75" r=".3" fill="{GOLD}" transform="rotate({45*k+22.5})"/>')
    g.append(f'<circle r="1.05" fill="{PAPER}" stroke="{BROWN}" stroke-width=".3"/><circle r=".45" fill="{RED}"/>')
    g.append('</g>'); return ''.join(g)
for x in (C,W-C):
    for y in (C,H-C): a(shamsa(x,y))
# side and top centre ornaments (lens), identical
def lens(x,y,rot):
    return (f'<g transform="translate({x} {y}) rotate({rot})"><path d="M-9 0 C-5 -3.2 -2 -3.2 0 -1.2 C2 -3.2 5 -3.2 9 0 C5 3.2 2 3.2 0 1.2 C-2 3.2 -5 3.2 -9 0 Z" fill="{PAPER}" stroke="{BROWN}" stroke-width=".45"/>'
            f'<path d="M-6 0 C-3.6 -1.6 -1.6 -1.6 0 0 C1.6 -1.6 3.6 -1.6 6 0 C3.6 1.6 1.6 1.6 0 0 C-1.6 1.6 -3.6 1.6 -6 0 Z" fill="none" stroke="{GOLD}" stroke-width=".25"/><circle r=".9" fill="{RED}"/></g>')
a(lens(W/2,mid,0)); a(lens(mid,H/2,90)); a(lens(W-mid,H/2,90))
# header plates, mirror images about the centre
def plate(x1,x2):
    y1,y2=9.8,14.8; r=(y2-y1)/2
    return f'<path d="M{x1+r} {y1} H{x2-r} A{r} {r} 0 0 1 {x2-r} {y2} H{x1+r} A{r} {r} 0 0 1 {x1+r} {y1} Z" fill="{PAPER}" stroke="{BROWN}" stroke-width=".35"/>'
a(plate(21.4,75.1)); a(plate(W-75.1,W-21.4))
a('</svg>')
sys.stdout.write('\n'.join(out))
