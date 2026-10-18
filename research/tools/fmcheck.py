import sys,glob,yaml,re
bad=0
class U(yaml.SafeLoader): pass
def no_dup(loader,node,deep=False):
    keys=set()
    for k,v in node.value:
        kk=loader.construct_object(k,deep=deep)
        if kk in keys: raise yaml.YAMLError(f'duplicate key {kk}')
        keys.add(kk)
    return loader.construct_mapping(node,deep)
U.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG,no_dup)
for f in glob.glob('/home/user/arabic-literature/src/content/**/*.*',recursive=True):
    if not f.endswith(('.md','.mdx','.yaml')): continue
    s=open(f,encoding='utf-8').read()
    if f.endswith('.yaml'): t=s
    else:
        m=re.match(r'---\n(.*?)\n---',s,re.S)
        if not m: continue
        t=m.group(1)
    try: yaml.load(t,Loader=U)
    except Exception as e: bad+=1; print(f, str(e)[:120])
print('bad',bad)
