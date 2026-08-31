const ERAS=window.LIT_ERAS||{};
const POETS=window.LIT_POETS||{};
const POEMS=window.LIT_POEMS||{};
const VERSES=window.LIT_VERSES||{};
const SOURCES=window.LIT_SOURCES||{};
const TERMS=window.LIT_TERMS||{};

const fixtureEra=ERAS.abbasid;
const fixturePoet=POETS['al-mutanabbi'];
const fixturePoem=POEMS['ala-qadr-ahl-al-azm'];

const esc=value=>(value??'').toString().replace(/[&<>'"]/g,ch=>({
  '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'
}[ch]));

const arabicMarks=/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]/g;
const normalizeArabic=value=>(value||'').toString()
  .replace(arabicMarks,'')
  .replace(/ـ/g,'')
  .replace(/[أإآ]/g,'ا')
  .replace(/ى/g,'ي')
  .replace(/ة/g,'ه')
  .replace(/ؤ/g,'و')
  .replace(/ئ/g,'ي')
  .replace(/\s+/g,' ')
  .trim()
  .toLowerCase();

function activateMode(mode){
  document.querySelectorAll('.mode-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.mode===mode));
  document.querySelectorAll('.mode').forEach(section=>section.classList.toggle('active',section.id===mode));
}
function activatePage(page,{scroll=false}={}){
  activateMode('deep');
  document.querySelectorAll('.sub-btn').forEach(btn=>btn.classList.toggle('active',btn.dataset.page===page));
  document.querySelectorAll('.detail-page').forEach(section=>section.classList.toggle('active',section.id===`page-${page}`));
  if(scroll)document.getElementById('deep')?.scrollIntoView({behavior:'smooth',block:'start'});
}

document.querySelectorAll('.mode-btn').forEach(btn=>btn.addEventListener('click',()=>{
  activateMode(btn.dataset.mode);
  if(btn.dataset.mode==='deep')window.scrollTo({top:document.querySelector('.modebar').offsetTop,behavior:'smooth'});
}));
document.querySelectorAll('.sub-btn').forEach(btn=>btn.addEventListener('click',()=>{
  activatePage(btn.dataset.page);
  history.replaceState(null,'',`#${btn.dataset.page}`);
}));

function renderSimple(){
  const host=document.getElementById('simple-era');
  if(!host||!fixtureEra||!fixturePoet||!fixturePoem)return;
  host.innerHTML=`
    <div class="simple-root">
      <strong>${esc(fixtureEra.name)}</strong>
      <span>${esc(fixtureEra.periodHijri)} · ${esc(fixtureEra.periodGregorian)}</span>
    </div>
    <div class="simple-grid">
      <article class="simple-card">
        <h3>العصر في جملة</h3>
        <div class="alias">${esc(fixtureEra.distanceFromPresent)}</div>
        <p>${esc(fixtureEra.summary)}</p>
        <div class="chips">${fixtureEra.essentialPoints.slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
        <button class="jump-btn" type="button" data-jump="era">افتح خريطة العصر ←</button>
      </article>
      <article class="simple-card">
        <h3>${esc(fixturePoet.name)}</h3>
        <div class="alias">${esc(fixturePoet.born)} — ${esc(fixturePoet.died)}</div>
        <p>${esc(fixturePoet.summary)}</p>
        <div class="chips">${fixturePoet.features.slice(0,3).map(x=>`<span>${esc(x)}</span>`).join('')}</div>
        <button class="jump-btn" type="button" data-jump="poet">ادخل إلى ملف الشاعر ←</button>
      </article>
      <article class="simple-card">
        <h3>${esc(fixturePoem.title)}</h3>
        <div class="alias">${esc(fixturePoem.meter)} · ${fixturePoem.verseIds.length} أبيات في Fixture</div>
        <p>${esc(fixturePoem.summary)}</p>
        <div class="chips"><span>المعنى</span><span>البلاغة</span><span>النحو</span><span>العروض</span></div>
        <button class="jump-btn" type="button" data-jump="poem">افتح قارئ القصيدة ←</button>
      </article>
    </div>`;
  host.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>activatePage(btn.dataset.jump,{scroll:true})));
}

function renderEra(){
  const host=document.getElementById('era-detail');
  if(!host||!fixtureEra)return;
  host.innerHTML=`
    <div class="detail-head">
      <div><div class="kicker">Fixture للعصر</div><h2>${esc(fixtureEra.name)}</h2><p>${esc(fixtureEra.summary)}</p></div>
      <span class="source-pill">${esc(fixtureEra.periodHijri)} · ${esc(fixtureEra.periodGregorian)}</span>
    </div>
    <div class="timeline-card">
      <div class="timeline-head"><h3>موضعه في الرحلة</h3><span class="timeline-date">${esc(fixtureEra.distanceFromPresent)}</span></div>
      <p>الهدف هنا ليس كتابة تاريخ العصر كاملًا، بل اختبار وحدة العرض التي ستتكرر لاحقًا مع كل عصر: زمن واضح، سياق مختصر، نقاط لا ينبغي أن يخرج القارئ من العصر دون معرفتها، ثم وصلها بالأعلام والنصوص.</p>
      <div class="point-list">${fixtureEra.essentialPoints.map(x=>`<div>${esc(x)}</div>`).join('')}</div>
    </div>
    <div class="branch-grid">
      <details class="branch-card wide" open><summary><span class="sum-title"><b>العمود الفقري للعصر</b><small>ما يجب أن يعرفه القارئ أولًا</small></span><span class="toggle"></span></summary><div class="branch-body"><div class="rules">${fixtureEra.essentialPoints.map((x,i)=>`<div class="rule"><b>0${i+1}</b><p>${esc(x)}</p></div>`).join('')}</div></div></details>
      <details class="branch-card"><summary><span class="sum-title"><b>أبرز علم في Fixture</b><small>يُستدعى بالمعرّف</small></span><span class="toggle"></span></summary><div class="branch-body"><p class="reader-copy"><b>${esc(fixturePoet.name)}</b><br>${esc(fixturePoet.summary)}</p><button class="jump-btn" data-jump="poet" type="button">عرض ملف الشاعر</button></div></details>
      <details class="branch-card"><summary><span class="sum-title"><b>نص ممثل</b><small>بوابة إلى قارئ القصيدة</small></span><span class="toggle"></span></summary><div class="branch-body"><p class="reader-copy"><b>${esc(fixturePoem.title)}</b><br>${esc(fixturePoem.summary)}</p><button class="jump-btn" data-jump="poem" type="button">قراءة القصيدة</button></div></details>
    </div>`;
  host.querySelectorAll('[data-jump]').forEach(btn=>btn.addEventListener('click',()=>activatePage(btn.dataset.jump,{scroll:true})));
}

function renderPoet(){
  const host=document.getElementById('poet-detail');
  if(!host||!fixturePoet)return;
  host.innerHTML=`
    <div class="detail-head"><div><div class="kicker">ملف الشاعر</div><h2>${esc(fixturePoet.name)}</h2><p>بيانات أساسية واحدة تستعمل في المسار العام، وفي صفحة العصر، وفي القصيدة، من دون نسخ السيرة في كل موضع.</p></div><span class="source-pill">ID: ${esc(fixturePoet.id)}</span></div>
    <div class="poet-hero">
      <article class="poet-card-main"><h3>${esc(fixturePoet.name)}</h3><div class="poet-fullname">${esc(fixturePoet.fullName)}</div><p>${esc(fixturePoet.summary)}</p><div class="chips">${fixturePoet.places.map(x=>`<span>${esc(x)}</span>`).join('')}</div></article>
      <aside class="poet-facts"><div class="poet-fact"><small>الميلاد</small><b>${esc(fixturePoet.born)}</b></div><div class="poet-fact"><small>الوفاة</small><b>${esc(fixturePoet.died)}</b></div><div class="poet-fact"><small>البعد الزمني</small><b>${esc(fixturePoet.distanceFromPresent)}</b></div><div class="poet-fact"><small>العصر</small><b>${esc(ERAS[fixturePoet.eraId]?.name)}</b></div></aside>
    </div>
    <div class="branch-grid" style="margin-top:14px">
      <details class="branch-card wide" open><summary><span class="sum-title"><b>ما الذي يميّز شعره؟</b><small>طبقة الدراسة</small></span><span class="toggle"></span></summary><div class="branch-body"><div class="rules">${fixturePoet.features.map((x,i)=>`<div class="rule"><b>سمة ${i+1}</b><p>${esc(x)}</p></div>`).join('')}</div></div></details>
      <details class="branch-card"><summary><span class="sum-title"><b>القصائد المختارة</b><small>مرتبطة بالمعرّف</small></span><span class="toggle"></span></summary><div class="branch-body">${fixturePoet.poemIds.map(id=>`<p class="reader-copy"><b>${esc(POEMS[id]?.title||id)}</b></p>`).join('')}<button class="jump-btn" data-jump="poem" type="button">فتح قارئ القصيدة</button></div></details>
      <details class="branch-card"><summary><span class="sum-title"><b>حالة التوثيق</b><small>لا تختلط بالسيرة</small></span><span class="toggle"></span></summary><div class="branch-body"><p class="reader-copy">${esc(fixturePoet.note)}</p></div></details>
    </div>`;
  host.querySelector('[data-jump="poem"]')?.addEventListener('click',()=>activatePage('poem',{scroll:true}));
}

const ANALYSIS_LABELS={
  meaning:'المعنى',vocabulary:'المفردات',grammar:'النحو',morphology:'الصرف',rhetoric:'البلاغة',prosody:'العروض والقافية',criticism:'ملاحظة نقدية'
};
function renderAnalysisValue(type,value){
  if(type==='vocabulary'){
    return `<div class="vocab-list">${(value||[]).map(item=>`<div class="vocab-item"><b>${esc(item.term)}</b><span>${esc(item.explanation)}</span></div>`).join('')}</div>`;
  }
  return `<p>${esc(value)}</p>`;
}
function verseCard(verse){
  const tabs=Object.keys(ANALYSIS_LABELS).filter(key=>verse.analysis?.[key]!==undefined);
  const first=tabs[0];
  return `<article class="verse-card" id="verse-${esc(verse.id)}" data-verse-id="${esc(verse.id)}">
    <button class="verse-trigger" type="button" aria-expanded="false">
      <span class="verse-number">${String(verse.order).padStart(2,'0')}</span>
      <span class="verse-lines"><span>${esc(verse.sadr)}</span><span>${esc(verse.ajuz)}</span></span>
      <span class="verse-open-icon">＋</span>
    </button>
    <div class="verse-panel">
      <div class="analysis-tabs">${tabs.map((key,i)=>`<button type="button" class="analysis-tab${i===0?' active':''}" data-analysis="${key}">${ANALYSIS_LABELS[key]}</button>`).join('')}</div>
      <div class="analysis-content" data-analysis-content>${renderAnalysisValue(first,verse.analysis[first])}</div>
      <div class="verse-actions"><button type="button" class="verse-link-btn" data-copy-verse>نسخ رابط البيت</button></div>
    </div>
  </article>`;
}

function setupVerseInteractions(host){
  host.querySelectorAll('.verse-card').forEach(card=>{
    const id=card.dataset.verseId;
    const verse=VERSES[id];
    const trigger=card.querySelector('.verse-trigger');
    const icon=card.querySelector('.verse-open-icon');
    trigger.addEventListener('click',()=>{
      const open=!card.classList.contains('is-open');
      card.classList.toggle('is-open',open);
      trigger.setAttribute('aria-expanded',String(open));
      icon.textContent=open?'−':'＋';
      if(open)history.replaceState(null,'',`#verse-${id}`);
    });
    card.querySelectorAll('.analysis-tab').forEach(tab=>tab.addEventListener('click',()=>{
      card.querySelectorAll('.analysis-tab').forEach(x=>x.classList.toggle('active',x===tab));
      card.querySelector('[data-analysis-content]').innerHTML=renderAnalysisValue(tab.dataset.analysis,verse.analysis[tab.dataset.analysis]);
    }));
    card.querySelector('[data-copy-verse]')?.addEventListener('click',async event=>{
      const url=`${location.href.split('#')[0]}#verse-${id}`;
      try{await navigator.clipboard.writeText(url);event.currentTarget.textContent='تم نسخ الرابط';setTimeout(()=>event.currentTarget.textContent='نسخ رابط البيت',1400);}catch{location.hash=`verse-${id}`;}
    });
  });
}

function renderPoem(){
  const host=document.getElementById('poem-reader');
  if(!host||!fixturePoem)return;
  const poet=POETS[fixturePoem.poetId];
  const verses=fixturePoem.verseIds.map(id=>VERSES[id]).filter(Boolean).sort((a,b)=>a.order-b.order);
  host.innerHTML=`
    <div class="detail-head"><div><div class="kicker">قارئ القصيدة التفاعلي</div><h2>${esc(fixturePoem.title)}</h2><p>اضغط أي بيت لفتح معناه وطبقاته العلمية دون مغادرة القصيدة أو إعادة تحميل الصفحة.</p></div><span class="source-pill">${esc(poet?.name)}</span></div>
    <div class="poem-shell">
      <div class="poem-main">
        <article class="poem-title-card"><h2>${esc(fixturePoem.title)}</h2><p>${esc(fixturePoem.summary)}</p></article>
        <details class="branch-card wide whole-poem"><summary><span class="sum-title"><b>القصيدة كوحدة كاملة</b><small>قبل تحليل الأبيات منفردة</small></span><span class="toggle"></span></summary><div class="branch-body"><div class="rules">${fixturePoem.structureNotes.map((x,i)=>`<div class="rule"><b>0${i+1}</b><p>${esc(x)}</p></div>`).join('')}</div></div></details>
        <div class="verse-list">${verses.map(verseCard).join('')}</div>
      </div>
      <aside class="poem-aside">
        <h3>بطاقة القصيدة</h3>
        <div class="poem-meta">
          <div><small>الشاعر</small><b>${esc(poet?.name)}</b></div>
          <div><small>العصر</small><b>${esc(ERAS[fixturePoem.eraId]?.name)}</b></div>
          <div><small>البحر</small><b>${esc(fixturePoem.meter)}</b></div>
          <div><small>القافية</small><b>${esc(fixturePoem.rhyme)}</b></div>
          <div><small>عدد أبيات Fixture</small><b>${verses.length}</b></div>
        </div>
        <div class="poem-note"><b>درجة النسبة:</b><br>${esc(fixturePoem.attribution.grade)}<br><br>${esc(fixturePoem.attribution.note)}</div>
      </aside>
    </div>`;
  setupVerseInteractions(host);
}

function buildGuideIndex(){
  const rows=[];
  Object.values(ERAS).forEach(record=>rows.push({id:record.id,name:record.name,type:'عصر',summary:record.summary,aliases:[record.periodHijri,record.periodGregorian],page:'era'}));
  Object.values(POETS).forEach(record=>rows.push({id:record.id,name:record.name,type:'شاعر',summary:record.summary,aliases:[record.fullName,...(record.places||[])],page:'poet'}));
  Object.values(POEMS).forEach(record=>rows.push({id:record.id,name:record.title,type:'قصيدة',summary:record.summary,aliases:[record.meter,record.rhyme],page:'poem'}));
  Object.values(TERMS).forEach(record=>rows.push({id:record.id,name:record.name,type:record.type||'مصطلح',summary:record.summary,aliases:record.aliases||[],target:record.target,page:record.target?.startsWith('#verse-')?'poem':'poem'}));
  Object.values(VERSES).forEach(record=>rows.push({id:record.id,name:`${record.sadr} — ${record.ajuz}`,type:'بيت',summary:record.analysis.meaning,aliases:[record.sadr,record.ajuz,...(record.analysis.vocabulary||[]).map(x=>x.term)],target:`#verse-${record.id}`,page:'poem'}));
  return rows.map(row=>({...row,_search:normalizeArabic([row.name,row.summary,...(row.aliases||[])].join(' '))}));
}
const GUIDE_INDEX=buildGuideIndex();

function renderGuide(query=''){
  const host=document.getElementById('guide-results');
  const count=document.getElementById('guide-count');
  if(!host||!count)return;
  const q=normalizeArabic(query);
  let results=q?GUIDE_INDEX.filter(row=>row._search.includes(q)):GUIDE_INDEX.slice(0,10);
  results=results.slice(0,30);
  count.textContent=`${results.length} نتيجة`;
  host.innerHTML=results.length?results.map(row=>`<button type="button" class="guide-result" data-guide-page="${row.page}" data-guide-target="${esc(row.target||'')}"><div class="guide-result-top"><b>${esc(row.name)}</b><span class="guide-type">${esc(row.type)}</span></div><p>${esc(row.summary)}</p></button>`).join(''):`<div class="guide-empty">لا توجد نتيجة مطابقة. جرّب كتابة جزء من الاسم أو المصطلح.</div>`;
  host.querySelectorAll('.guide-result').forEach(btn=>btn.addEventListener('click',()=>{
    activatePage(btn.dataset.guidePage||'poem',{scroll:true});
    const target=btn.dataset.guideTarget;
    if(target)setTimeout(()=>openTarget(target),160);
  }));
}

function openTarget(target){
  const el=document.querySelector(target);
  if(!el)return;
  if(el.classList.contains('verse-card')&&!el.classList.contains('is-open'))el.querySelector('.verse-trigger')?.click();
  el.scrollIntoView({behavior:'smooth',block:'center'});
}

function renderSources(){
  const host=document.getElementById('sources-list');
  if(!host)return;
  host.innerHTML=Object.values(SOURCES).map(source=>`<article class="source-card"><div class="source-card-top"><b>${esc(source.title)}</b><span class="source-status">${source.status==='pending-verification'?'بانتظار التحقيق':esc(source.status)}</span></div><p><strong>${esc(source.author)}</strong> · ${esc(source.kind)}<br>${esc(source.citation)}</p></article>`).join('');
}

function initGuide(){
  const input=document.getElementById('guide-search');
  const clear=document.getElementById('guide-clear');
  if(!input)return;
  renderGuide('');
  input.addEventListener('input',()=>renderGuide(input.value));
  clear?.addEventListener('click',()=>{input.value='';renderGuide('');input.focus();});
  document.addEventListener('keydown',event=>{
    if(event.key==='/'&&!/INPUT|TEXTAREA/.test(document.activeElement?.tagName||'')){
      event.preventDefault();activatePage('guide',{scroll:true});setTimeout(()=>input.focus(),150);
    }
  });
}

function applyHash(){
  const hash=location.hash.replace('#','');
  if(!hash)return;
  const pages=['era','poet','poem','guide','method','references'];
  if(pages.includes(hash)){activatePage(hash);return;}
  if(hash.startsWith('verse-')){
    activatePage('poem');
    requestAnimationFrame(()=>openTarget(`#${CSS.escape(hash)}`));
  }
}

renderSimple();
renderEra();
renderPoet();
renderPoem();
renderSources();
initGuide();
applyHash();
