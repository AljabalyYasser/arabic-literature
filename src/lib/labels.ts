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

export const storyGrades = {
  thabit: { label: 'ثابت', hint: 'أقدم مصادره قريب من زمنه، ولا يعارضه ما هو أقوى.' },
  khilaf: { label: 'مروي بخلاف', hint: 'له مصادر قديمة، لكنها تختلف في تفاصيله أو تتعارض.' },
  mashhur: { label: 'مشهور بلا سند قوي', hint: 'متداول جدًا، لكن أقدم مصادره متأخر أو بلا إسناد.' },
  manhul: { label: 'منحول', hint: 'الأدلة ترجّح أنه مختلق.' },
} as const;

export const attributionGrades = {
  thabit: 'ثابتة النسبة',
  rajih: 'نسبة راجحة',
  mukhtalaf: 'نسبة مختلف فيها',
  mansub: 'منسوبة بلا تحقيق',
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
