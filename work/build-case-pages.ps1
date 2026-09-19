$ErrorActionPreference = 'Stop'

$projects = @(
  @{
    Slug='harmed'; Name='Harmed'; Image='harmed-cover-v2.jpg'; TypeEn='Client work · Web & brand'; TypeAr='عمل عميل · ويب وهوية'; StatusEn='Public preview'; StatusAr='نسخة عامة'; Year='2026'; RoleEn='Web experience and visual direction'; RoleAr='تجربة الويب والتوجيه البصري';
    LedeEn='A medical apparel web and brand experience that brings clinical clarity together with a contemporary visual character.'; LedeAr='تجربة ويب وهوية لملابس طبية تجمع الوضوح العملي مع شخصية بصرية معاصرة.';
    ProblemEn='The work needed to present medical apparel with enough clarity for practical buyers while avoiding the generic visual language common in the category.'; ProblemAr='احتاج المشروع إلى عرض الملابس الطبية بوضوح يخدم المشتري، مع بناء شخصية تتجاوز الشكل التقليدي المتكرر في المجال.';
    BuiltEn='A responsive web presentation that brings the apparel, brand character and browsing experience into one consistent visual system.'; BuiltAr='عرض ويب متجاوب يجمع الملابس وشخصية العلامة وتجربة التصفح داخل نظام بصري متسق.';
    DecisionEn='Use a restrained clinical structure, then introduce personality through typography, photography and motion instead of adding visual noise to the buying path.'; DecisionAr='استخدام هيكل واضح وهادئ، وإضافة الشخصية من خلال الخط والصورة والحركة بدل زيادة التشويش داخل مسار التصفح.';
    Live='https://seif4d.github.io/Harmed/'
  },
  @{
    Slug='via-cairo'; Name='Via Cairo'; Image='via-cairo-cover-v2.jpg'; TypeEn='Product · Travel platform'; TypeAr='منتج · منصة سياحية'; StatusEn='In development'; StatusAr='قيد التطوير'; Year='2026'; RoleEn='Product strategy and engineering'; RoleAr='استراتيجية المنتج والتطوير';
    LedeEn='A bilingual travel product designed to turn discovering Cairo into a clear, mobile-first digital journey.'; LedeAr='منتج سياحي ثنائي اللغة يحوّل اكتشاف القاهرة إلى رحلة رقمية واضحة ومصممة للهاتف أولًا.';
    ProblemEn='Travel discovery often fragments information across disconnected pages. The product direction brings content, navigation and operational tools into one coherent experience.'; ProblemAr='غالبًا ما تتوزع رحلة اكتشاف السفر بين صفحات ومصادر منفصلة. يجمع اتجاه المنتج المحتوى والتنقل والأدوات التشغيلية في تجربة واحدة مترابطة.';
    BuiltEn='The platform is in development, bringing a bilingual frontend together with a Laravel application layer and tools for managing travel content.'; BuiltAr='المنصة قيد التطوير، وتجمع واجهة ثنائية اللغة مع طبقة تطبيق Laravel وأدوات لإدارة المحتوى السياحي.';
    DecisionEn='Treat Arabic, English and mobile navigation as product architecture decisions from the beginning, rather than translation work added after the interface is complete.'; DecisionAr='اعتبار العربية والإنجليزية وتنقل الهاتف قرارات في بنية المنتج منذ البداية، وليس ترجمة تضاف بعد اكتمال الواجهة.';
    Live=''
  },
  @{
    Slug='qurani'; Name='Qurani'; Image='qurani-cover-v2.jpg'; TypeEn='Personal product · Reading'; TypeAr='منتج شخصي · قراءة'; StatusEn='Live public project'; StatusAr='مشروع عام حي'; Year='2025–2026'; RoleEn='Product design and frontend'; RoleAr='تصميم المنتج والواجهة';
    LedeEn='A focused Arabic reading experience built around clarity, responsive interaction and respectful visual restraint.'; LedeAr='تجربة قراءة عربية مركزة مبنية حول الوضوح والتفاعل المتجاوب والهدوء البصري المحترم.';
    ProblemEn='Long-form Arabic reading needs strong typography, low distraction and controls that remain usable across small screens.'; ProblemAr='تحتاج القراءة العربية الطويلة إلى خط واضح ومشتتات قليلة وأدوات تظل سهلة الاستخدام على الشاشات الصغيرة.';
    BuiltEn='A responsive JavaScript reading interface with Arabic content at its centre, designed to keep navigation and reading comfortably connected.'; BuiltAr='واجهة قراءة متجاوبة مبنية بجافاسكربت، يتمحور تصميمها حول المحتوى العربي والانتقال المريح بين التصفح والقراءة.';
    DecisionEn='Let the reading task lead the interface. Decorative elements remain secondary to legibility, navigation and a stable Arabic layout.'; DecisionAr='جعل مهمة القراءة هي التي تقود الواجهة، مع إبقاء الزخرفة في مرتبة تالية للوضوح والتنقل وثبات التخطيط العربي.';
    Live='https://seif4d.github.io/GPT-Quran/'
  },
  @{
    Slug='dragon'; Name='DRAGON'; Image='dragon-cover-v2.jpg'; TypeEn='Venture concept · Developer education'; TypeAr='تصور مشروع · تعليم المطورين'; StatusEn='Concept in development'; StatusAr='تصور قيد التطوير'; Year='2026'; RoleEn='Concept and system direction'; RoleAr='التصور واتجاه النظام';
    LedeEn='A proposed learning ecosystem focused on helping emerging developers move from repeated tutorials to real building practice.'; LedeAr='تصور لمنظومة تعلم تساعد المطورين الصاعدين على الانتقال من تكرار الدروس إلى ممارسة البناء الفعلي.';
    ProblemEn='Many learners collect lessons without crossing the gap into complete projects, review and contribution.'; ProblemAr='يجمع كثير من المتعلمين الدروس دون عبور الفجوة نحو مشروع مكتمل ومراجعة فعلية ومساهمة.';
    BuiltEn='A venture concept exploring project-based learning, shared feedback and a visible path from first exercise to finished product.'; BuiltAr='تصور مشروع يستكشف التعلم بالمشاريع والمراجعة المشتركة ومسارًا واضحًا من أول تمرين إلى منتج مكتمل.';
    DecisionEn='Organize learning around milestones, peer feedback and visible output so progress is demonstrated through work.'; DecisionAr='تنظيم التعلم حول مراحل بناء ومراجعة من الآخرين ومخرجات ظاهرة، بحيث يُثبت التقدم من خلال العمل.';
    Live=''
  },
  @{
    Slug='scope'; Name='SCOPE'; Image='scope-cover-v2.jpg'; TypeEn='Studio concept · Venture building'; TypeAr='تصور استوديو · بناء مشاريع'; StatusEn='Studio direction'; StatusAr='اتجاه استوديو'; Year='2026'; RoleEn='Founder and product direction'; RoleAr='المؤسس واتجاه المنتج';
    LedeEn='A studio direction for researching opportunities, shaping focused products and turning selected ideas into testable builds.'; LedeAr='اتجاه لاستوديو يبحث الفرص ويصوغ منتجات مركزة ويحوّل الأفكار المختارة إلى نماذج قابلة للاختبار.';
    ProblemEn='Early ideas often mix business, design and engineering questions without a clear way to decide what deserves to be built first.'; ProblemAr='تختلط في الأفكار المبكرة أسئلة البيزنس والتصميم والتطوير دون طريقة واضحة لتحديد ما يستحق البناء أولًا.';
    BuiltEn='An evolving studio concept connecting opportunity research, product strategy and prototyping in a focused process.'; BuiltAr='تصور استوديو قيد التشكيل يربط بحث الفرص واستراتيجية المنتج وبناء النماذج ضمن عملية مركزة.';
    DecisionEn='Use a small sequence—opportunity, proposition, prototype and evidence—to stop a broad idea from becoming an unfocused product.'; DecisionAr='استخدام تسلسل صغير: فرصة، عرض قيمة، نموذج، ودليل؛ لمنع الفكرة الواسعة من التحول إلى منتج مشتت.';
    Live=''
  },
  @{
    Slug='volt'; Name='VOLT'; Image='volt-cover-v2.jpg'; TypeEn='Client work · Service web presence'; TypeAr='عمل عميل · حضور رقمي خدمي'; StatusEn='Live public project'; StatusAr='مشروع عام حي'; Year='2026'; RoleEn='Web and brand experience'; RoleAr='تجربة الويب والهوية';
    LedeEn='A service-focused web presence structured to make the offer easier to understand and the next action easier to take.'; LedeAr='حضور رقمي لخدمة صُمم ليجعل العرض أسهل في الفهم والخطوة التالية أسهل في التنفيذ.';
    ProblemEn='Service businesses lose qualified visitors when the offer, packages and contact path compete for attention.'; ProblemAr='تفقد الأعمال الخدمية زوارًا مؤهلين عندما تتنافس الخدمة والباقات ومسار التواصل على انتباه المستخدم.';
    BuiltEn='A responsive service website with a consistent brand presentation and a clear route from understanding the offer to starting a conversation.'; BuiltAr='موقع خدمات متجاوب بتقديم بصري متسق ومسار واضح من فهم العرض إلى بدء التواصل.';
    DecisionEn='Lead with the service proposition and reduce the number of decisions required before a visitor can start a conversation.'; DecisionAr='تقديم عرض الخدمة أولًا وتقليل عدد القرارات المطلوبة قبل أن يبدأ الزائر محادثة.';
    Live='https://voltmsg.store/'
  }
)

foreach ($p in $projects) {
  $liveEn = if ($p.Live) { '<a class="button" href="' + $p.Live + '" target="_blank" rel="noopener noreferrer">Open public project ↗</a>' } else { '' }
  $liveAr = if ($p.Live) { '<a class="button" href="' + $p.Live + '" target="_blank" rel="noopener noreferrer">افتح المشروع العام ↗</a>' } else { '' }
  $canonical = "https://seif4d.com/work/$($p.Slug).html"
  $html = @"
<!doctype html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <title>SEIF4D — $($p.Name) case study</title>
  <meta name="description" content="$($p.LedeEn)">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="$canonical">
  <meta property="og:type" content="article">
  <meta property="og:title" content="$($p.Name) — SEIF4D project">
  <meta property="og:description" content="$($p.LedeEn)">
  <meta property="og:image" content="https://seif4d.com/assets/$($p.Image)">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700;800;900&display=swap">
  <link rel="stylesheet" href="case-study.css">
</head>
<body data-title-en="$($p.Name) — SEIF4D project" data-title-ar="$($p.Name) — مشروع SEIF4D" data-description-en="$($p.LedeEn)" data-description-ar="$($p.LedeAr)">
  <header class="case-header"><div class="shell"><a class="brand" data-home href="../index.html#work">SEIF<span>4D</span></a><div class="header-actions"><a data-home href="../index.html#work">← <span class="en-copy">All work</span><span class="ar-copy">كل الأعمال</span></a><button type="button" data-language>العربية</button></div></div></header>
  <main>
    <section class="case-hero shell">
      <p class="eyebrow"><span class="en-copy">$($p.TypeEn)</span><span class="ar-copy">$($p.TypeAr)</span></p>
      <h1>$($p.Name)</h1>
      <p class="lede en-copy">$($p.LedeEn)</p><p class="lede ar-copy">$($p.LedeAr)</p>
      <img class="cover" src="../assets/$($p.Image)" width="1448" height="1086" alt="$($p.Name) editorial project cover">
      <dl class="proof en-copy"><div><dt>Focus</dt><dd>$($p.RoleEn)</dd></div><div><dt>Status</dt><dd>$($p.StatusEn)</dd></div><div><dt>Discipline</dt><dd>$($p.TypeEn)</dd></div></dl>
      <dl class="proof ar-copy"><div><dt>التركيز</dt><dd>$($p.RoleAr)</dd></div><div><dt>الحالة</dt><dd>$($p.StatusAr)</dd></div><div><dt>المجال</dt><dd>$($p.TypeAr)</dd></div></dl>
    </section>
    <section class="case-content shell">
      <div class="copy en-copy"><h2>From context<br>to a clearer product.</h2><h3>The challenge</h3><p>$($p.ProblemEn)</p><h3>The direction</h3><p>$($p.BuiltEn)</p><h3>One product decision</h3><p>$($p.DecisionEn)</p>$liveEn</div>
      <div class="copy ar-copy"><h2>من الفكرة<br>إلى تجربة أوضح.</h2><h3>التحدي</h3><p>$($p.ProblemAr)</p><h3>اتجاه المشروع</h3><p>$($p.BuiltAr)</p><h3>قرار في المنتج</h3><p>$($p.DecisionAr)</p>$liveAr</div>
      <aside class="note"><span class="status"><span class="en-copy">$($p.StatusEn)</span><span class="ar-copy">$($p.StatusAr)</span></span><div class="en-copy"><b>Behind the visual</b><p>The cover is original AI-generated concept artwork expressing the project’s direction. Explore the public project, where available, to see the working experience.</p></div><div class="ar-copy"><b>وراء الصورة</b><p>الغلاف تصور بصري مولّد بالذكاء الاصطناعي يعبّر عن اتجاه المشروع. يمكنك استكشاف التجربة الفعلية من رابط المشروع عندما يكون متاحًا.</p></div></aside>
    </section>
    <section class="case-cta shell"><div class="cta-card"><div class="en-copy"><h2>Have a project<br>worth building?</h2></div><div class="ar-copy"><h2>لديك مشروع<br>يستحق البناء؟</h2></div><a class="button" data-contact href="mailto:contact@seif4d.com"> <span class="en-copy">Discuss your project →</span><span class="ar-copy">ناقش مشروعك ←</span></a></div></section>
  </main>
  <footer class="case-footer"><div class="shell">SEIF4D · Cairo, Egypt · 2026</div></footer>
  <script src="case-study.js" defer></script>
</body>
</html>
"@
  Set-Content -LiteralPath (Join-Path $PSScriptRoot ($p.Slug + '.html')) -Value $html -Encoding utf8
}
