(() => {
  const params = new URLSearchParams(location.search);
  let stored = null;
  try { stored = localStorage.getItem('seif4d_lang'); } catch (_) {}
  let lang = params.get('lang');
  if (lang !== 'ar' && lang !== 'en') lang = stored === 'ar' ? 'ar' : 'en';

  const apply = (next, updateUrl = false) => {
    lang = next;
    document.body.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = document.body.dir;
    document.documentElement.lang = next;
    document.querySelector('[data-language]').textContent = next === 'ar' ? 'English' : 'العربية';
    document.title = document.body.dataset[next === 'ar' ? 'titleAr' : 'titleEn'];
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = document.body.dataset[next === 'ar' ? 'descriptionAr' : 'descriptionEn'];
    try { localStorage.setItem('seif4d_lang', next); } catch (_) {}
    document.querySelectorAll('[data-home]').forEach(link => link.href = `../index.html?lang=${next}#work`);
    document.querySelectorAll('[data-contact]').forEach(link => link.href = `mailto:contact@seif4d.com?subject=${encodeURIComponent(next === 'ar' ? 'مناقشة مشروع' : 'Project inquiry')}`);
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.set('lang', next);
      history.replaceState({}, '', url);
    }
  };

  document.querySelector('[data-language]').addEventListener('click', () => apply(lang === 'ar' ? 'en' : 'ar', true));
  apply(lang);
})();
