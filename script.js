/**
 * SEIF4D Portfolio — Core Interactive Engine
 * High-performance, Accessible, Zero External Dependencies
 */

// Utility Helpers
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

// ==========================================================================
// 1. Audio Synthesizer (Web Audio API - Zero External Audio Files)
// ==========================================================================
class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('seif4d_sound') === 'true';
    this.initUI();
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        try {
          this.ctx = new AudioContext();
        } catch (e) {
          return;
        }
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('seif4d_sound', String(this.enabled));
    this.updateIcon();
    if (this.enabled) {
      this.initContext();
      this.playChime();
      showToast('🔊 Sound effects enabled / تم تفعيل المؤثرات الصوتية');
    } else {
      showToast('🔇 Sound effects muted / تم كتم المؤثرات الصوتية');
    }
  }

  updateIcon() {
    const icon = $('.sound-btn .sound-icon');
    if (icon) {
      icon.textContent = this.enabled ? '🔊' : '🔇';
    }
    const btn = $('.sound-btn');
    if (btn) {
      btn.classList.toggle('active', this.enabled);
    }
  }

  initUI() {
    this.updateIcon();
    const btn = $('#sound-toggle');
    if (btn) {
      btn.addEventListener('click', () => this.toggle());
    }

    const unlock = () => {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    };
    ['click', 'keydown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, unlock, { passive: true });
    });
  }

  playTick() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(820, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.035);
    } catch (e) {}
  }

  playPop() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.055);
    } catch (e) {}
  }

  playChime() {
    if (!this.enabled) return;
    this.initContext();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      [523.25, 659.25].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.06);

        gain.gain.setValueAtTime(0.03, this.ctx.currentTime + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + i * 0.06 + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + i * 0.06);
        osc.stop(this.ctx.currentTime + i * 0.06 + 0.2);
      });
    } catch (e) {}
  }
}
const sfx = new SoundFX();

// ==========================================================================
// 2. Bilingual Dictionary (EN / AR) & Localization Engine
// ==========================================================================
const translations = {
  en: {
    "a11y.skip": "Skip to content",
    "nav.work": "Work",
    "nav.build": "Build",
    "nav.process": "Process",
    "nav.about": "About",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.terminal": "Terminal",
    "nav.cta": "Let’s build",
    "nav.home": "Home",
    "nav.more": "More",
    "hero.kicker1": "CREATIVE DEVELOPER",
    "hero.kicker2": "BUILDER",
    "hero.tagline": "I don’t fit into one box.<br><mark>So I build my own.</mark>",
    "hero.intro": "Design. Code. Ideas. Impact.<br>I build digital products, brands, systems and experiments — from rough idea to something real.",
    "hero.btnWork": "Explore my work",
    "hero.btnAbout": "More about me",
    "hero.stat1": "Selected projects",
    "hero.stat2": "Ideas in motion",
    "hero.stat3": "Build · Learn · Evolve",
    "hero.scribble": "Different<br>by Design.",
    "hero.ethos": "IDEAS<br>PRODUCTS<br>PEOPLE<br>A BRIGHTER<br>TOMORROW",
    "work.index": "01 / SELECTED WORK",
    "work.title": "Ideas<br>into impact.",
    "work.lead": "A curated set of real products, client work and ventures where code, design and strategy meet execution.",
    "filter.all": "All Works (6)",
    "filter.web": "Web & Apps (3)",
    "filter.ai": "AI Systems (2)",
    "filter.venture": "Ventures & Studio (2)",
    "proj.hint": "Quick View",
    "proj.harmed.sub": "Medical wear / Brand & web",
    "proj.viacairo.sub": "Travel / Bilingual experience",
    "proj.qurani.sub": "Quran / Digital product",
    "proj.dragon.sub": "Education / Community ecosystem",
    "proj.scope.sub": "Venture studio / Product building",
    "proj.volt.sub": "Service brand / Web & growth",
    "build.index": "02 / WHAT I BUILD",
    "build.title": "Different skills.<br>One system.",
    "build.lead": "I connect technical execution, product thinking, design and business context to turn messy ideas into clear digital outcomes.",
    "build.c1.title": "Web Development",
    "build.c1.desc": "Fast, responsive websites and web apps with clean front-end systems, zero bloat, and thoughtful UX.",
    "build.c2.title": "AI Systems",
    "build.c2.desc": "Practical AI features, RAG workflows, agentic architectures, and automations focused on useful outcomes.",
    "build.c3.title": "Cybersecurity",
    "build.c3.desc": "Security-minded product building, web vulnerability assessment, and infrastructure awareness.",
    "build.c4.title": "Brand & Product",
    "build.c4.desc": "Positioning, visual direction, design systems, and digital experiences that feel coherent and memorable.",
    "build.c5.title": "Venture Building",
    "build.c5.desc": "From opportunity and rapid MVP to launch, user feedback loops, growth systems and iteration.",
    "process.index": "03 / PROCESS",
    "process.title": "A clearer path<br>to bolder outcomes<span>.</span>",
    "process.lead": "No theatre. Just a repeatable loop that moves from ambiguity to a product people can actually use.",
    "process.s1.title": "Explore",
    "process.s1.desc": "Understand the problem, user and opportunity before touching the interface.",
    "process.s2.title": "Build",
    "process.s2.desc": "Turn the strongest idea into a focused, testable, and robust experience.",
    "process.s3.title": "Iterate",
    "process.s3.desc": "Measure, learn, remove friction and make the product sharper.",
    "process.s4.title": "Scale",
    "process.s4.desc": "Strengthen the system, infrastructure and growth loops around what works.",
    "process.statement": "“Ideas mean nothing<br>without execution.”",
    "process.p1": "BUILD",
    "process.p2": "LEARN",
    "process.p3": "ITERATE",
    "process.p4": "GROW",
    "about.index": "04 / ABOUT",
    "about.title": "More than a portfolio.<br><mark>A mindset.</mark>",
    "about.desc": "I’m Seif — the builder behind SEIF4D. Based in Cairo, Egypt, I work across web development, AI, digital products, branding and ventures. The common thread is simple: I like turning complicated ideas into useful, understandable things.",
    "about.p1.kicker": "TECH",
    "about.p1.title": "Make it work.",
    "about.p1.desc": "Engineering decisions should serve the experience, not show off the stack.",
    "about.p2.kicker": "CREATIVITY",
    "about.p2.title": "Make it memorable.",
    "about.p2.desc": "Good products need character, clarity and enough personality to be remembered.",
    "about.p3.kicker": "BUSINESS",
    "about.p3.title": "Make it matter.",
    "about.p3.desc": "A beautiful interface is stronger when it understands the user, market and outcome.",
    "about.id1": "DEVELOPER",
    "about.id2": "BUILDER",
    "about.id3": "EXPLORER",
    "about.id4": "CREATOR",
    "faq.index": "05 / KNOWLEDGE & FAQ",
    "faq.title": "Direct answers.<br>Zero ambiguity.",
    "faq.lead": "Transparent details on how I partner with founders, teams, and enterprises to build outstanding digital products.",
    "faq.q1": "What kinds of projects does SEIF4D specialize in?",
    "faq.a1": "I specialize in end-to-end digital experiences: high-performance web applications, bespoke frontend architectures, practical AI & RAG implementations, and rapid MVP design for venture founders.",
    "faq.q2": "Are you available for remote work and international clients?",
    "faq.a2": "Yes, absolutely. While based in Cairo, Egypt (UTC+3), I routinely collaborate with partners across the Middle East (Saudi Arabia, UAE, Qatar), Europe, and North America with agile communication.",
    "faq.q3": "How do you integrate Artificial Intelligence into products?",
    "faq.a3": "I avoid gimmicks. I build functional AI systems: Retrieval-Augmented Generation (RAG) over proprietary knowledge bases, automated agent workflows, and fast semantic search that directly boost user efficiency.",
    "faq.q4": "What is your typical development timeline and workflow?",
    "faq.a4": "A standard sprint moves through four clear stages: Exploration & Architecture (Week 1), Focused Prototyping & Build (Weeks 2–3), Iteration & Hardening (Week 4), and Production Launch.",
    "faq.q5": "How can we start a collaboration or project?",
    "faq.a5": "Send an inquiry via email or reach out on GitHub, X, or YouTube. Share a brief summary of your vision, timeline, and goals, and we can schedule an initial discovery discussion.",
    "contact.index": "06 / CONNECT",
    "contact.title": "Good ideas<br>find people.",
    "contact.desc": "Explore the work, follow what I’m building, or start a conversation on the platform you already use.",
    "contact.sendMail": "Send direct email",
    "footer.tagline": "Ideas. Products. Brands. Systems.",
    "footer.location": "Cairo, Egypt · Worldwide Remote",
    "footer.privacy": "Zero cookies · No tracking · Privacy first",
    "footer.copy": "Built for the web.",
    "nav.terminalPrompt": "Open Terminal",
    "drawer.type": "Type",
    "drawer.year": "Timeline",
    "drawer.role": "Role",
    "drawer.status": "Status",
    "drawer.overview": "Overview & Impact",
    "drawer.stack": "Technologies Used",
    "drawer.visit": "Visit Live Project"
  },
  ar: {
    "a11y.skip": "انتقل إلى المحتوى الرئيسي",
    "nav.work": "الأعمال",
    "nav.build": "الخبرات",
    "nav.process": "المنهجية",
    "nav.about": "نبذة",
    "nav.faq": "الأسئلة",
    "nav.contact": "تواصل",
    "nav.terminal": "الأوامر",
    "nav.cta": "لنبدأ البناء",
    "nav.home": "الرئيسية",
    "nav.more": "المزيد",
    "hero.kicker1": "مطور مبدع",
    "hero.kicker2": "مؤسس منتجات",
    "hero.tagline": "لا أضع نفسي في قالب محدد.<br><mark>بل أبني قالبي الخاص.</mark>",
    "hero.intro": "تصميم. كود. أفكار. تأثير.<br>أبني منتجات رقمية، علامات تجارية، أنظمة ذكاء اصطناعي وتجارب تفاعلية — من الفكرة المبدئية إلى أرض الواقع.",
    "hero.btnWork": "استكشف أعمالي",
    "hero.btnAbout": "المزيد عني",
    "hero.stat1": "مشاريع مختارة",
    "hero.stat2": "أفكار قيد الحركة",
    "hero.stat3": "بناء · تعلم · تطور",
    "hero.scribble": "مختلف<br>بالتصميم.",
    "hero.ethos": "أفكار<br>منتجات<br>أشخاص<br>لمستقبل<br>أكثر إشراقاً",
    "work.index": "01 / مشاريع مختارة",
    "work.title": "أفكار تتحول<br>إلى تأثير واقعي.",
    "work.lead": "مجموعة منتقاة من المنتجات الحية ومشاريع العملاء والمبادرات التي يلتقي فيها الكود مع التصميم والاستراتيجية.",
    "filter.all": "كل الأعمال (6)",
    "filter.web": "الويب والتطبيقات (3)",
    "filter.ai": "أنظمة الذكاء الاصطناعي (2)",
    "filter.venture": "المشاريع والاستوديو (2)",
    "proj.hint": "عرض التفاصيل",
    "proj.harmed.sub": "أزياء طبية / هوية وتجارة إلكترونية",
    "proj.viacairo.sub": "سياحة وثقافة / تجربة تفاعلية",
    "proj.qurani.sub": "القرآن الكريم / منتج رقمي",
    "proj.dragon.sub": "تعليم تقني / بيئة مجتمعية للمطورين",
    "proj.scope.sub": "استوديو بناء وتطوير المشاريع",
    "proj.volt.sub": "علامة خدمية / منصة نمو",
    "build.index": "02 / مجالات العمل",
    "build.title": "مهارات متعددة.<br>منظومة متكاملة.",
    "build.lead": "أربط بين التنفيذ التقني الصارم، والتفكير في المنتجات، والتصميم وسياق الأعمال لتحويل الأفكار المعقدة إلى نتائج رقمية واضحة.",
    "build.c1.title": "تطوير الويب المتطور",
    "build.c1.desc": "مواقع وتطبيقات ويب فائقة السرعة والتجاوب مع واجهات أمامية نظيفة وتجربة مستخدم مدروسة بعناية.",
    "build.c2.title": "أنظمة الذكاء الاصطناعي",
    "build.c2.desc": "حلول ذكاء اصطناعي عملية، وبنيات RAG والوكلاء الأذكياء وأتمتة المهام المعقدة لإنتاج نتائج ملموسة.",
    "build.c3.title": "الأمن السيبراني",
    "build.c3.desc": "بناء المنتجات بعقلية أمنية، واختبار نقاط ضعف الويب، وحماية البنى التحتية والخوادم.",
    "build.c4.title": "الهوية والمنتجات",
    "build.c4.desc": "تحديد التموضع، التوجه البصري، لغات التصميم، وتجارب رقمية ذات شخصية لا تُنسى.",
    "build.c5.title": "بناء المشاريع الرقمية",
    "build.c5.desc": "من الفرصة والنموذج الأولي السريع (MVP) إلى الإطلاق وحلقات تفاعل المستخدمين والنمو.",
    "process.index": "03 / المنهجية",
    "process.title": "مسار أوضح<br>لنتائج أكثر جرأة<span>.</span>",
    "process.lead": "منهجية عملية متكررة تنقلك من التردد والغموض إلى منتج حقيقي يستخدمه الناس ويثقون به.",
    "process.s1.title": "الاستكشاف",
    "process.s1.desc": "فهم المشكلة، سلوك المستخدم، والفرصة المتاحة قبل كتابة سطر كود واحد.",
    "process.s2.title": "البناء والنمذجة",
    "process.s2.desc": "تحويل الفكرة الأقوى إلى تجربة مركزة، قابلة للاختبار وفائقة المتانة.",
    "process.s3.title": "التطوير والتحسين",
    "process.s3.desc": "القياس والتعلم وإزالة أي عقبات لجعل المنتج أكثر حدة وفاعلية.",
    "process.s4.title": "التوسع والنمو",
    "process.s4.desc": "تعزيز بنية النظام، البنية التحتية، وحلقات النمو حول ما ثبت نجاحه فعلياً.",
    "process.statement": "“الأفكار لا تعني شيئاً<br>دون تنفيذ حقيقي.”",
    "process.p1": "بناء",
    "process.p2": "تعلم",
    "process.p3": "تطوير",
    "process.p4": "نمو",
    "about.index": "04 / عن سيف",
    "about.title": "أكثر من مجرد بورتفوليو.<br><mark>عقلية عمل.</mark>",
    "about.desc": "أنا سيف — المطور وراء SEIF4D. انطلاقاً من القاهرة، أعمل في تطوير الويب، الذكاء الاصطناعي، المنتجات الرقمية، بناء العلامات والمشاريع. الرابط المشترك بسيط: شغفي بتحويل الأفكار المعقدة إلى منتجات مفيدة وواضحة.",
    "about.p1.kicker": "التكنولوجيا",
    "about.p1.title": "اجعلها تعمل بكفاءة.",
    "about.p1.desc": "القرارات البرمجية يجب أن تخدم تجربة المستخدم وقيمة المنتج، وليس مجرد استعراض للأدوات.",
    "about.p2.kicker": "الإبداع",
    "about.p2.title": "اجعلها لا تُنسى.",
    "about.p2.desc": "المنتجات العظيمة تحتاج إلى طابع فريد ووضوح وشخصية تجعلها راسخة في ذهن المستخدم.",
    "about.p3.kicker": "الأعمال",
    "about.p3.title": "اجعلها ذات قيمة.",
    "about.p3.desc": "الواجهة الجميلة تصبح أقوى عندما تفهم متطلبات السوق وحاجة العميل والنتيجة المرجوة.",
    "about.id1": "مطور",
    "about.id2": "بانٍ",
    "about.id3": "مستكشف",
    "about.id4": "مبدع",
    "faq.index": "05 / الأسئلة الشائعة والمعرفة",
    "faq.title": "إجابات مباشرة.<br>وضوح كامل.",
    "faq.lead": "تفاصيل واضحة وشفافة حول كيفية تعاوني مع رواد الأعمال والفرق والشركات لبناء منتجات رقمية استثنائية.",
    "faq.q1": "ما هي نوعية المشاريع التي يتخصص فيها SEIF4D؟",
    "faq.a1": "أتخصص في بناء التجارب الرقمية الشاملة: تطبيقات الويب عالية الأداء، واجهات أمامية مخصصة، تطبيقات الذكاء الاصطناعي العملي والـ RAG، وبناء نماذج الـ MVP السريعة لرواد الأعمال.",
    "faq.q2": "هل تقدم خدماتك للعملاء عن بعد ودولياً في الخليج والعالم؟",
    "faq.a2": "نعم بالتأكيد. انطلاقاً من القاهرة (توقيت UTC+3)، أتعاون بسلاسة مع شركاء في الخليج العربي (السعودية، الإمارات، قطر) وأوروبا وأمريكا الشمالية بتواصل مرن وشفاف.",
    "faq.q3": "كيف تدمج الذكاء الاصطناعي في المنتجات الرقمية؟",
    "faq.a3": "أبتعد عن الاستعراضات غير المجدية، وأركز على أنظمة ذكاء اصطناعي عملية: أنظمة RAG فوق قواعد بيانات المؤسسات، وكلاء أذكياء لأتمتة المهام، والبحث الدلالي فائق السرعة.",
    "faq.q4": "كم من الوقت يستغرق تطوير مشروع جديد أو نموذج أولي (MVP)؟",
    "faq.a4": "يستغرق نموذج الـ MVP المتكامل عادة ما بين أسبوعين إلى 6 أسابيع، متبعاً مراحل واضحة: الاستكشاف والمعمارية (الأسبوع 1)، النمذجة والبناء (الأسابيع 2-3)، التحسين والاختبار (الأسبوع 4)، ثم الإطلاق.",
    "faq.q5": "كيف يمكننا بدء التعاون أو طلب مشروع؟",
    "faq.a5": "يمكنك مراسلتي مباشرة عبر البريد الإلكتروني أو من خلال حساباتي على GitHub أو X أو YouTube مع نبذة عن فكرتك وجدولك الزمني لنرتب جلسة استكشاف ومناقشة تفصيلية.",
    "contact.index": "06 / تواصل معي",
    "contact.title": "الأفكار الجيدة<br>تجد أصحابها.",
    "contact.desc": "استكشف الأعمال، تابع ما أبنيه، أو ابدأ محادثة مباشرة عبر المنصة التي تفضل استخدامها.",
    "contact.sendMail": "إرسال بريد مباشر",
    "footer.tagline": "أفكار. منتجات. علامات. أنظمة.",
    "footer.location": "القاهرة، مصر · متاح عالمياً عن بعد",
    "footer.privacy": "بدون ملفات تتبع · الخصوصية أولاً",
    "footer.copy": "صُنع للويب.",
    "nav.terminalPrompt": "افتح التيرمينال",
    "drawer.type": "النوع",
    "drawer.year": "الجدول الزمني",
    "drawer.role": "الدور",
    "drawer.status": "الحالة",
    "drawer.overview": "نظرة عامة والأثر",
    "drawer.stack": "التقنيات المستخدمة",
    "drawer.visit": "زيارة المشروع الحي"
  }
};

class I18nEngine {
  constructor() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    this.current = urlLang === 'ar' ? 'ar' : (localStorage.getItem('seif4d_lang') || 'en');
    this.init();
  }

  init() {
    this.apply(this.current);
    const btn = $('#lang-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        sfx.playPop();
        const next = this.current === 'en' ? 'ar' : 'en';
        this.apply(next);
      });
    }
  }

  apply(lang) {
    this.current = lang;
    localStorage.setItem('seif4d_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    const btnText = $('.lang-btn .lang-text');
    if (btnText) {
      btnText.textContent = lang === 'en' ? 'عربي' : 'English';
    }

    const dict = translations[lang] || translations.en;
    $$('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    updateCairoBadge();
  }
}
const i18n = new I18nEngine();

// ==========================================================================
// 3. Project Detail Database & Modal Drawer
// ==========================================================================
const projectsData = {
  "harmed": {
    img: "assets/harmed.png",
    isLive: true,
    liveUrl: "https://seif4d.github.io/Harmed/",
    en: {
      title: "Harmed",
      category: "WEB & BRAND",
      subtitle: "Medical wear / Brand & web experience",
      type: "E-Commerce & Digital Identity",
      year: "2026 Production",
      role: "Full-Stack Development & UX",
      status: "Live & Deployed",
      overview: "A modern digital storefront and brand identity created for medical apparel. Built from the ground up to combine clinical reliability with contemporary streetwear design, featuring fast product discovery, responsive filters, and frictionless mobile browsing.",
      tags: ["HTML5", "CSS3", "JavaScript", "E-Commerce", "UI/UX", "Brand Identity"],
      btnText: "Visit Live Project"
    },
    ar: {
      title: "Harmed",
      category: "الويب والهوية التجارية",
      subtitle: "أزياء طبية / تجربة تسوق وهوية عصرية",
      type: "تجارة إلكترونية وهوية رقمية",
      year: "إنتاج 2026",
      role: "تطوير شامل وتصميم تجربة المستخدم",
      status: "حي ومتاح للجمهور",
      overview: "متجر إلكتروني متكامل وهوية بصرية مميزة للأزياء والمستلزمات الطبية. صُمم ليجمع بين الدقة السريرية وجماليات أزياء الشارع العصرية، مع تجربة تسوق سريعة وفلاتر متجاوبة وتصفح فائق السلاسة على الهواتف.",
      tags: ["HTML5", "CSS3", "JavaScript", "تجارة إلكترونية", "واجهات وتجربة مستخدم", "بناء العلامة"],
      btnText: "زيارة المشروع الحي"
    }
  },
  "via-cairo": {
    img: "assets/via-cairo.png",
    isLive: false,
    liveUrl: "#contact",
    en: {
      title: "Via Cairo",
      category: "TRAVEL & CULTURAL UX",
      subtitle: "Travel / Bilingual cultural guide",
      type: "Digital Cultural Experience",
      year: "2026 Exploration",
      role: "Product Strategy & Engineering",
      status: "Production Case Study",
      overview: "An interactive bilingual digital tribute and curated navigation guide to Cairo, Egypt. Showcasing hidden architectural landmarks, local street cuisine, and cultural narratives with seamless English and Arabic typography transitions.",
      tags: ["Bilingual UI", "RTL Architecture", "CSS Grid", "Micro-interactions", "Cairo Heritage"],
      btnText: "Request Case Study Deck"
    },
    ar: {
      title: "Via Cairo",
      category: "سياحة وثقافة تفاعلية",
      subtitle: "سياحة / دليل ثقافي ثنائي اللغة للقاهرة",
      type: "تجربة ثقافية رقمية",
      year: "استكشاف 2026",
      role: "استراتيجية المنتج والهندسة البرمجية",
      status: "دراسة حالة قيد النشر",
      overview: "تجربة رقمية وتكريم تفاعلي ثنائي اللغة للعاصمة المصرية القاهرة. يستعرض المعالم المعمارية المخفية، وأسرار المطبخ الشعبي، والروايات الثقافية الحية مع تناغم فائق بين الخط العربي واللاتيني.",
      tags: ["واجهات ثنائية اللغة", "معمارية RTL", "شبكات CSS", "تفاعلات دقيقة", "تراث القاهرة"],
      btnText: "طلب ملف دراسة الحالة"
    }
  },
  "qurani": {
    img: "assets/qurani.png",
    isLive: true,
    liveUrl: "https://seif4d.github.io/GPT-Quran/",
    en: {
      title: "Qurani",
      category: "DIGITAL PRODUCT & AI",
      subtitle: "Quran / Digital web companion",
      type: "Web Application & Search",
      year: "2025–2026",
      role: "Product Design & Front-End",
      status: "Live & Public",
      overview: "A minimalist, hyper-responsive digital reading and reflection tool for the Holy Quran. Features instant ayah retrieval, distraction-free reading mode, clean Arabic typography, and smart search integrations.",
      tags: ["JavaScript", "Quran API", "Search Optimization", "Progressive Web App", "A11y"],
      btnText: "Visit Live Project"
    },
    ar: {
      title: "Qurani",
      category: "منتج رقمي وبحث ذكي",
      subtitle: "القرآن الكريم / رفيق رقمي متطور",
      type: "تطبيق ويب وبحث دلالي",
      year: "2025–2026",
      role: "تصميم المنتج والواجهة الأمامية",
      status: "حي ومتاح مجاناً",
      overview: "منصة رقمية فائقة السرعة والاستجابة لقراءة وتدبر القرآن الكريم بدون أي مشتتات بصرية. توفر بحثاً دلالياً فورياً في الآيات، ومحاذاة خطوط عثمانية عالية الوضوح، وتوافراً كتطبيق ويب تقدمي (PWA).",
      tags: ["JavaScript", "واجهة برمجية للقرآن", "تحسين البحث", "تطبيق ويب تقدمي", "إتاحة رقمية"],
      btnText: "زيارة المشروع الحي"
    }
  },
  "dragon": {
    img: "assets/dragon.png",
    isLive: false,
    liveUrl: "#contact",
    en: {
      title: "DRAGON",
      category: "EDTECH & ECOSYSTEM",
      subtitle: "Education / Community developer ecosystem",
      type: "Community Platform Concept",
      year: "2026 Venture",
      role: "System Architecture & Community Lead",
      status: "Venture In Development",
      overview: "An ecosystem designed to guide upcoming developers through pragmatic build milestones, peer reviews, and open-source contributions, eliminating tutorial paralysis in tech education.",
      tags: ["EdTech", "Community Systems", "Platform Architecture", "Venture Building"],
      btnText: "Inquire About Venture"
    },
    ar: {
      title: "DRAGON",
      category: "تكنولوجيا التعليم والمجتمع",
      subtitle: "تعليم تقني / بيئة مجتمعية للمطورين",
      type: "مفهوم منصة مجتمعية",
      year: "مشروع ريادي 2026",
      role: "معمارية النظام وقيادة المجتمع",
      status: "مشروع قيد التطوير",
      overview: "منظومة بيئية مصممة لمساعدة المطورين الصاعدين على تجاوز فخ الدروس النظرية المكررة من خلال مسارات بناء واقعية، ومراجعات الأقران، والمساهمة في البرمجيات مفتوحة المصدر.",
      tags: ["تكنولوجيا التعليم", "أنظمة المجتمع", "معمارية المنصات", "بناء المشاريع"],
      btnText: "الاستفسار عن المشروع"
    }
  },
  "scope": {
    img: "assets/scope.png",
    isLive: false,
    liveUrl: "#contact",
    en: {
      title: "SCOPE",
      category: "VENTURE STUDIO",
      subtitle: "Venture studio / Product accelerator",
      type: "Product Incubation Lab",
      year: "Active Studio",
      role: "Founder & Lead Builder",
      status: "Studio Operations",
      overview: "An agile venture incubator and rapid-prototyping studio testing bold software concepts, releasing functional MVPs in 2-to-4 week sprints, and validating customer traction through real data.",
      tags: ["Venture Studio", "Rapid Prototyping", "MVP Validation", "Product Strategy"],
      btnText: "Partner with Studio"
    },
    ar: {
      title: "SCOPE",
      category: "استوديو بناء المشاريع",
      subtitle: "استوديو ريادي / مسرعة منتجات رقمية",
      type: "مختبر احتضان المنتجات",
      year: "استوديو نشط",
      role: "المؤسس والمهندس الرئيسي",
      status: "عمليات الاستوديو",
      overview: "مختبر ريادي لتسريع وبناء المنتجات واختبار الأفكار البرمجية الجريئة، وإطلاق نماذج الـ MVP الوظيفية في دورات عمل سريعة (2 إلى 4 أسابيع)، والتحقق من الجدوى عبر بيانات المستخدمين الحقيقية.",
      tags: ["استوديو مشاريع", "نمذجة سريعة", "إثبات الـ MVP", "استراتيجية المنتجات"],
      btnText: "الشراكة مع الاستوديو"
    }
  },
  "volt": {
    img: "assets/volt.png",
    isLive: true,
    liveUrl: "https://voltmsg.store/",
    en: {
      title: "VOLT",
      category: "SERVICE BRAND & GROWTH",
      subtitle: "Service brand / High-converting web presence",
      type: "Commercial Service Platform",
      year: "2026 Production",
      role: "Full-Stack Web & Brand Architecture",
      status: "Live & Active",
      overview: "A tailored digital web presence engineered for client conversion and business growth. Optimized for ultra-fast loading, clear pricing tiers, and direct customer onboarding.",
      tags: ["Conversion UX", "Performance Tuning", "Responsive Layout", "Growth Engineering"],
      btnText: "Visit Live Project"
    },
    ar: {
      title: "VOLT",
      category: "علامة خدمية ونمو رقمي",
      subtitle: "علامة خدمية / واجهة ويب عالية التحويل",
      type: "منصة تجارية خدمية",
      year: "إنتاج 2026",
      role: "تطوير ويب كامل ومعمارية العلامة",
      status: "حي ونشط",
      overview: "حضور رقمي متقن ومبني خصيصاً لمضاعفة معدلات تحويل العملاء ونمو الأعمال. يتميز بسرعة تحميل فائقة، وعرض واضح للباقات، وتدفق تسجيل واشتراك انسيابي خالي من الاحتكاك.",
      tags: ["تحسين التحويل", "ضبط الأداء", "تصميم متجاوب", "هندسة النمو"],
      btnText: "زيارة المشروع الحي"
    }
  }
};

const drawerBackdrop = $('#drawer-backdrop');
const drawerCloseBtn = $('#drawer-close');

function openProjectDrawer(id) {
  const item = projectsData[id];
  if (!item) return;

  const currentLang = document.documentElement.lang === 'ar' ? 'ar' : 'en';
  const p = item[currentLang] || item.en;

  sfx.playPop();

  $('#drawer-category').textContent = p.category;
  $('#drawer-img').src = item.img;
  $('#drawer-img').alt = p.title;
  $('#drawer-title').textContent = p.title;
  $('#drawer-subtitle').textContent = p.subtitle;
  $('#drawer-type').textContent = p.type;
  $('#drawer-year').textContent = p.year;
  $('#drawer-role').textContent = p.role;
  $('#drawer-status').textContent = p.status;
  $('#drawer-overview').textContent = p.overview;

  const tagsContainer = $('#drawer-tags');
  if (tagsContainer) {
    tagsContainer.innerHTML = p.tags.map(t => `<span>${t}</span>`).join('');
  }

  const liveBtn = $('#drawer-live-btn');
  if (liveBtn) {
    const textSpan = liveBtn.querySelector('span:first-child');
    const arrowSpan = liveBtn.querySelector('span:last-child');
    if (textSpan) textSpan.textContent = p.btnText;
    
    if (item.isLive) {
      liveBtn.href = item.liveUrl;
      liveBtn.target = "_blank";
      liveBtn.rel = "noopener noreferrer";
      liveBtn.className = "button button-lime";
      if (arrowSpan) arrowSpan.textContent = "↗";
      liveBtn.onclick = null;
    } else {
      liveBtn.href = "#contact";
      liveBtn.target = "_self";
      liveBtn.removeAttribute('rel');
      liveBtn.className = "button button-ghost";
      if (arrowSpan) arrowSpan.textContent = "→";
      liveBtn.onclick = (e) => {
        e.preventDefault();
        closeProjectDrawer();
        const contactEl = document.getElementById('contact');
        if (contactEl) {
          contactEl.scrollIntoView({ behavior: 'smooth' });
        }
      };
    }
  }

  drawerBackdrop.classList.add('active');
  drawerBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

function closeProjectDrawer() {
  if (drawerBackdrop && drawerBackdrop.classList.contains('active')) {
    sfx.playTick();
    drawerBackdrop.classList.remove('active');
    drawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

if (drawerCloseBtn) {
  drawerCloseBtn.addEventListener('click', closeProjectDrawer);
}
if (drawerBackdrop) {
  drawerBackdrop.addEventListener('click', (e) => {
    if (e.target === drawerBackdrop) closeProjectDrawer();
  });
}

// Bind project cards to drawer
$$('.project-card').forEach(card => {
  card.addEventListener('click', () => {
    const id = card.getAttribute('data-project-id');
    if (id) openProjectDrawer(id);
  });
});

// ==========================================================================
// 4. Project Filtering
// ==========================================================================
const filterBtns = $$('.filter-btn');
const projectCards = $$('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    sfx.playTick();
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      const cat = card.getAttribute('data-category') || '';
      if (filter === 'all' || cat.includes(filter)) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';
        setTimeout(() => {
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ==========================================================================
// 5. Command Palette (Terminal / Shortcut Ctrl+K)
// ==========================================================================
const paletteBackdrop = $('#palette-backdrop');
const paletteInput = $('#palette-input');
const paletteResults = $('#palette-results');
const cmdTrigger = $('#cmd-trigger');

function openPalette() {
  sfx.playChime();
  paletteBackdrop.classList.add('active');
  paletteBackdrop.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (paletteInput) {
    paletteInput.value = '';
    paletteInput.focus();
  }
}

function closePalette() {
  if (paletteBackdrop && paletteBackdrop.classList.contains('active')) {
    sfx.playTick();
    paletteBackdrop.classList.remove('active');
    paletteBackdrop.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }
}

if (cmdTrigger) {
  cmdTrigger.addEventListener('click', openPalette);
}
const sheetCmdTrigger = $('#sheet-cmd-trigger');
if (sheetCmdTrigger) {
  sheetCmdTrigger.addEventListener('click', () => {
    setMenu(false);
    openPalette();
  });
}
if (paletteBackdrop) {
  paletteBackdrop.addEventListener('click', (e) => {
    if (e.target === paletteBackdrop) closePalette();
  });
}

window.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (paletteBackdrop && paletteBackdrop.classList.contains('active')) {
      closePalette();
    } else {
      openPalette();
    }
  } else if (e.key === 'Escape') {
    closePalette();
    closeProjectDrawer();
  }
});

function logToTerminal(msg, type = 'info') {
  if (!paletteResults) return;
  const div = document.createElement('div');
  div.className = `palette-log ${type}`;
  div.innerHTML = msg;
  paletteResults.prepend(div);
}

function executeCommand(raw) {
  const cmd = raw.trim().toLowerCase();
  if (!cmd) return;

  sfx.playPop();
  logToTerminal(`&gt; ${cmd}`, 'dim');

  switch (cmd) {
    case 'help':
      logToTerminal('Available commands: <b>projects</b>, <b>skills</b>, <b>cairo</b>, <b>contact</b>, <b>matrix</b>, <b>about</b>, <b>clear</b>', 'info');
      break;

    case 'projects':
      logToTerminal('Navigating to Selected Projects (Harmed, Via Cairo, Qurani, DRAGON, SCOPE, VOLT)...', 'success');
      setTimeout(() => {
        closePalette();
        const el = $('#work');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
      break;

    case 'skills':
      logToTerminal('Stack: JavaScript (ESNext), React, Next.js, AI/RAG, Python, FastAPI, Web Security, UI/UX, Product Architecture.', 'success');
      break;

    case 'cairo':
    case 'geo':
      logToTerminal('📍 Base: Cairo, Egypt [30.0444° N, 31.2357° E] | Timezone: UTC+3 (EEST) | Serving MENA, GCC & Global Remote.', 'success');
      break;

    case 'contact':
      logToTerminal('Email: <b>contact@seif4d.com</b> | GitHub: @seif4d | X: @seif4d', 'success');
      navigator.clipboard?.writeText('contact@seif4d.com');
      showToast('📋 Copied contact@seif4d.com to clipboard!');
      break;

    case 'about':
      logToTerminal('SEIF4D: Multidisciplinary creative developer & venture builder. Turning complex ideas into functional products.', 'info');
      break;

    case 'matrix':
      logToTerminal('⚡ Matrix digital rain sequence activated.', 'success');
      document.body.style.filter = 'hue-rotate(90deg) contrast(1.2)';
      setTimeout(() => {
        document.body.style.filter = '';
      }, 3500);
      break;

    case 'clear':
      if (paletteResults) paletteResults.innerHTML = '';
      break;

    default:
      logToTerminal(`Command not found: "${cmd}". Type <b>help</b> for valid commands.`, 'dim');
      break;
  }
}

if (paletteInput) {
  paletteInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(paletteInput.value);
      paletteInput.value = '';
    }
  });
}

$$('.palette-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const cmd = chip.getAttribute('data-cmd');
    if (cmd) executeCommand(cmd);
  });
});

// ==========================================================================
// 6. Cairo Live Time & Availability Pill (GEO Context)
// ==========================================================================
function updateCairoBadge() {
  const badge = $('#cairo-time-badge');
  if (!badge) return;

  try {
    const now = new Date();
    // Cairo is UTC+3 (Egypt Standard Time)
    const options = { timeZone: 'Africa/Cairo', hour: '2-digit', minute: '2-digit', hour12: false };
    const cairoTime = new Intl.DateTimeFormat([], options).format(now);

    const isAr = document.documentElement.lang === 'ar';
    if (isAr) {
      badge.textContent = `القاهرة ${cairoTime} • متاح للمشاريع في الربع الرابع 2026`;
    } else {
      badge.textContent = `Cairo ${cairoTime} • Available for Q4 2026`;
    }
  } catch (e) {
    badge.textContent = `Cairo • Available for Q4 2026`;
  }
}
setInterval(updateCairoBadge, 60000);
updateCairoBadge();

// ==========================================================================
// 7. Toast Notification System & Clipboard Copy
// ==========================================================================
function showToast(message) {
  const container = $('#toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

const copyEmailBtn = $('#copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', () => {
    sfx.playChime();
    const email = 'contact@seif4d.com';
    navigator.clipboard.writeText(email).then(() => {
      const isAr = document.documentElement.lang === 'ar';
      showToast(isAr ? '📋 تم نسخ البريد الإلكتروني بنجاح: contact@seif4d.com' : '📋 Copied email to clipboard: contact@seif4d.com');
    });
  });
}

// ==========================================================================
// 8. Interactive Ambient Background Canvas (Zero Library Particle Grid)
// ==========================================================================
const canvas = document.getElementById('ambient-canvas');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (canvas && !reducedMotion) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: -1000, y: -1000 };

  const resize = () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    createParticles();
  };

  const createParticles = () => {
    particles = [];
    const count = Math.min(Math.floor((width * height) / 22000), 55);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.8 + 0.8
      });
    }
  };

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  const render = () => {
    if (isPageVisible) {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200, 255, 53, 0.35)';
        ctx.fill();

        // Mouse connection
        const dxM = p1.x - mouse.x;
        const dyM = p1.y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < 120) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(200, 255, 53, ${0.22 * (1 - distM / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Particle-to-particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(200, 255, 53, ${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    }
    requestAnimationFrame(render);
  };

  resize();
  requestAnimationFrame(render);
}

// ==========================================================================
// 9. Mobile Sheet Navigation & Scroll Spy
// ==========================================================================
const header = $('.site-header');
const progress = $('.scroll-progress span');
const orb = $('.cursor-orb');
const menu = $('.mobile-sheet');
const menuButton = $('.menu-btn');
const closeButton = $('.sheet-head button');
const appMenuButton = $('[data-open-menu]');

const setMenu = (open) => {
  sfx.playTick();
  menu?.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  appMenuButton?.setAttribute('aria-expanded', String(open));
  menu?.setAttribute('aria-hidden', String(!open));
};

menuButton?.addEventListener('click', () => setMenu(!menu?.classList.contains('open')));
closeButton?.addEventListener('click', () => setMenu(false));
appMenuButton?.addEventListener('click', () => setMenu(true));
menu?.addEventListener('click', (e) => { if (e.target === menu) setMenu(false); });
$$('.mobile-sheet a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// Reveal on scroll observer
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -25px' });

$$('.reveal').forEach(el => revealObserver.observe(el));

// Number Counter Animation
const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target') || '6', 10);
      let count = 0;
      const duration = 1200;
      const step = Math.ceil(duration / target);
      const timer = setInterval(() => {
        count++;
        el.textContent = count < 10 ? `0${count}` : `${count}`;
        if (count >= target) clearInterval(timer);
      }, step);
      obs.unobserve(el);
    }
  });
}, { threshold: 0.5 });

$$('.counter').forEach(c => counterObserver.observe(c));

// Navigation Scroll Spy
const sectionIds = ['top', 'work', 'build', 'process', 'about', 'faq', 'contact'];
const appLinks = $$('.app-nav a[data-section]');
const desktopLinks = $$('.desktop-nav a');

const onScroll = () => {
  const y = window.scrollY;
  header?.classList.toggle('scrolled', y > 40);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${max > 0 ? (y / max) * 100 : 0}%`;

  let current = 'top';
  if (max > 0 && y >= max - 60) {
    current = 'contact';
  } else {
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 180) current = id;
    });
  }

  const appSectionMap = {
    top: 'top',
    work: 'work',
    build: 'build',
    process: 'build',
    about: 'about',
    faq: 'about',
    contact: 'about'
  };
  const activeApp = appSectionMap[current] || current;
  appLinks.forEach(a => a.classList.toggle('active', a.dataset.section === activeApp));

  desktopLinks.forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === `#${current}`);
  });
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Smooth in-page anchor navigation (prevents Chromium file:/// frame navigation security warnings)
document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#' || targetId === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId && targetId.length > 1) {
      try {
        const el = document.querySelector(targetId);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (err) {}
    }
  }
});

// Cursor Orb Follower & 3D Tilt for Pointer Devices
if (!reducedMotion && window.matchMedia('(pointer:fine)').matches) {
  let orbShown = false;
  window.addEventListener('pointermove', (e) => {
    if (!orb) return;
    if (!orbShown) {
      orb.style.opacity = '0.85';
      orbShown = true;
    }
    orb.style.left = `${e.clientX}px`;
    orb.style.top = `${e.clientY}px`;
  }, { passive: true });

  $$('[data-tilt]').forEach(card => {
    card.addEventListener('pointerenter', () => {
      card.style.transition = 'box-shadow 0.22s ease';
    });
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${-y * 3.5}deg) rotateY(${x * 4}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      card.style.transform = '';
    });
  });

  const art = $('[data-parallax]');
  if (art) {
    art.addEventListener('pointermove', e => {
      const r = art.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      art.style.transform = `translate3d(${x * 6}px, ${y * 5}px, 0)`;
    });
    art.addEventListener('pointerleave', () => {
      art.style.transform = '';
    });
  }

  $$('.magnetic').forEach(btn => {
    btn.addEventListener('pointerenter', () => {
      btn.style.transition = 'background 0.2s, color 0.2s, box-shadow 0.2s';
    });
    btn.addEventListener('pointermove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.08}px, ${(e.clientY - r.top - r.height / 2) * 0.1}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transition = 'transform 0.3s ease';
      btn.style.transform = '';
    });
  });
}

// Copyright Year
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
