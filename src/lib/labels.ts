export const statusLabels = {
  draft: 'مسودة',
  review: 'قيد المراجعة',
  approved: 'معتمد',
} as const;

export const statusHints = {
  draft: 'لم يمر بعد بمراجعة المصادر كاملة.',
  review: 'اكتمل بحثه وينتظر المراجعة.',
  approved: 'روجع واعتُمد.',
} as const;

// درجات الرواية الأربع (وثيقة الأساس 5.1). تُعطى للنص وللقصة كلٌّ على حدة.
export const textGrades = {
  thabit: { label: 'ثابت', hint: 'رواه الرواة الأوائل الموثوقون منسوبًا إليه، ولم يُنسب إلى غيره نسبة معتبرة، ولم يطعن فيه ناقد قديم.' },
  rajih: { label: 'راجح', hint: 'الأقدم والأكثر ينسبونه إليه، وفي المصادر من ينسبه أو ينسب بعضه إلى غيره؛ والترجيح لنسبته إليه.' },
  mukhtalaf: { label: 'مختلف فيه', hint: 'المصادر المعتبرة تتقاسم نسبته بين قائلين أو أكثر، أو ردّه ناقد قديم، ولا دليل يرجّح.' },
  mansub: { label: 'منسوب', hint: 'يُروى باسمه ولا يثبت له: أقدم مصادره متأخر كثيرًا أو بلا إسناد، أو قيل إنه مصنوع.' },
} as const;

export const storyGrades = {
  thabit: { label: 'ثابت', hint: 'يرويه رواة الأخبار الأوائل، وتتفق المصادر القديمة على جوهره وتفاصيله الكبرى.' },
  rajih: { label: 'راجح', hint: 'له أصل في المصادر القديمة وجوهره متفق عليه، ويُختلف في تفاصيله.' },
  mukhtalaf: { label: 'مختلف فيه', hint: 'المصادر القديمة تختلف في جوهره، أو ردّه ناقد قديم، ولا دليل يرجّح.' },
  mansub: { label: 'منسوب', hint: 'يُروى ولا سند له يُعتمد: أقدم مصادره متأخر كثيرًا أو بلا إسناد، أو قامت الأدلة على صنعه.' },
} as const;

// وسما القصة، يُكتبان مع درجتها لا بدلها.
export const storyTags = {
  adabi: { label: 'خبر أدبي', hint: 'نشأ حول بيت أو مثل أو لقب ليفسّره، أو صقله الرواة؛ قيمته في دلالته لا في دقة وقائعه.' },
  usturi: { label: 'خبر أسطوري', hint: 'فيه خارق أو أعمار تتجاوز المعقول أو أمم بائدة أو كهانة؛ يُروى من قصص العرب ولا يُقرأ تاريخًا.' },
} as const;

// درجات الأعلام الثلاث (docs/alam.md).
export const tiers = {
  formative: { plural: 'أعلام التكوين', one: 'من أعلام التكوين', hint: 'ندرسهم بعمق، ولكل واحد منهم مسار قراءة كامل.' },
  important: { plural: 'أعلام مهمون', one: 'من الأعلام المهمين', hint: 'نعرفهم جيدًا، ونقرأ لكل واحد منهم عدة نصوص كاملة.' },
  face: { plural: 'وجوه من العصر', one: 'من وجوه العصر', hint: 'شعراء وخطباء بقيت لهم قصة أو قصيدة أو بيت، في مجموعات بحسب موضوعها.' },
} as const;

// درجات القراءة الثلاث.
export const readingTiers = {
  deep: { label: 'قراءة عميقة', hint: 'النص كاملًا مع المفردات والسياق والشرح التفصيلي والبناء والملاحظات الأدبية.' },
  guided: { label: 'قراءة موجهة', hint: 'النص كاملًا مع المفردات، ومدخل، وتقسيم للمقاطع، وشرح الأبيات المفصلية.' },
  free: { label: 'قراءة حرة', hint: 'النص كاملًا مع المفردات الضرورية، وتعريف قصير بالسياق.' },
} as const;

export const personKinds = {
  poet: 'شاعر',
  prose: 'ناثر',
  critic: 'ناقد',
  commentator: 'شارح',
  narrator: 'راوٍ',
  linguist: 'لغوي',
  patron: 'أمير وراعٍ للأدب',
} as const;

export const personKindsF = {
  poet: 'شاعرة',
  prose: 'ناثرة',
  critic: 'ناقدة',
  commentator: 'شارحة',
  narrator: 'راوية',
  linguist: 'لغوية',
  patron: 'أميرة وراعية للأدب',
} as const;

// صفات العلم بحسب تذكيره وتأنيثه.
export const kindsOf = (p: { kinds: (keyof typeof personKinds)[]; female?: boolean }) =>
  p.kinds.map((k) => (p.female ? personKindsF : personKinds)[k]).join('، ');

export const textKinds = {
  qasida: 'قصيدة',
  muqattaa: 'مقطوعة',
  khutba: 'خطبة',
  risala: 'رسالة',
  maqama: 'مقامة',
  novel: 'رواية',
  story: 'قصة',
  play: 'مسرحية',
  other: 'نص',
} as const;

export const conceptGroups = {
  arud: 'العروض والقافية',
  balagha: 'البلاغة',
  nahw: 'النحو',
  sarf: 'الصرف',
  naqd: 'النقد',
  adab: 'تاريخ الأدب',
} as const;

export const mahfuzKinds = {
  bayt: 'بيت سائر',
  maqta: 'مقطع',
  mathal: 'مثل وقول سائر',
  hikaya: 'حكاية',
} as const;

// أسماء الأنواع في مرشّح صفحة المحفوظات.
export const mahfuzFilters = {
  bayt: 'الأبيات',
  maqta: 'المقاطع',
  mathal: 'الأمثال',
  hikaya: 'الحكايات',
} as const;

export const sourceKinds = {
  primary: 'الأصول: الدواوين والشروح وكتب الأخبار',
  study: 'الدراسات الحديثة',
  dictionary: 'المعاجم',
} as const;

// أسماء الأبواب بالترتيب العددي، لمسارات التنقل.
export const ordinals = ['الأول', 'الثاني', 'الثالث', 'الرابع', 'الخامس', 'السادس', 'السابع', 'الثامن', 'التاسع', 'العاشر'];
