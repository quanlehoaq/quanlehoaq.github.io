/* ==========================================================================
   dmir3r_ Portfolio v2.0 — Main Interactive Engine
   Features: Theme, VI/EN i18n, 3D Hero Tilt, Spotlight Cards, Live Clock,
             Web Audio Lo-Fi Synth, Skills Filter, Projects + Sorting Lab,
             Supercharged LHQ-OS v3.0 Shell, Command Palette (Ctrl+K), Matrix
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const safeCreateIcons = () => {
    try {
      if (window.lucide) window.lucide.createIcons();
    } catch (err) {
      console.error('Lucide icon init failed:', err);
    }
  };
  safeCreateIcons();

  /* ------------------------------------------------------------------------
   * 0. SIGNATURE DRAWING SPLASH INTRO (~3s SMOOTH HANDWRITTEN ANIMATION)
   * ------------------------------------------------------------------------ */
  const introEl = document.getElementById('signature-intro');
  const sigSvg = document.getElementById('signature-svg');
  const sigPath = document.getElementById('signature-path');
  const sigPen = document.getElementById('signature-pen');
  const sigCaption = document.getElementById('signature-caption');
  const sigSkipBtn = document.getElementById('signature-skip-btn');
  let introTimers = [];
  let introRaf = null;

  function clearIntroTimers() {
    introTimers.forEach((t) => clearTimeout(t));
    introTimers = [];
    if (introRaf !== null) {
      cancelAnimationFrame(introRaf);
      introRaf = null;
    }
  }

  function hideSignatureIntro() {
    clearIntroTimers();
    if (sigPen) sigPen.setAttribute('opacity', '0');
    introEl?.classList.add('is-hidden');
    document.body.style.overflow = '';
  }

  // Smooth handwritten easing: gentle start, natural pen sweep, graceful finish
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function playSignatureIntro() {
    if (!introEl || !sigPath) return;
    clearIntroTimers();

    introEl.classList.remove('is-hidden');
    sigSvg?.classList.remove('is-glowing');
    sigCaption?.classList.remove('is-visible');
    document.body.style.overflow = 'hidden';

    const totalLen = sigPath.getTotalLength();
    sigPath.style.transition = 'none';
    sigPath.style.strokeDasharray = `${totalLen}`;
    sigPath.style.strokeDashoffset = `${totalLen}`;

    const drawDuration = 2900; // ~3s smooth handwriting draw
    const startDelay = 160;
    let startTime = null;
    let captionShown = false;

    function animateStroke(timestamp) {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const raw = Math.min(1, elapsed / drawDuration);
      const eased = easeInOutCubic(raw);
      const drawnLen = totalLen * eased;

      sigPath.style.strokeDashoffset = `${totalLen - drawnLen}`;

      if (sigPen) {
        const pt = sigPath.getPointAtLength(drawnLen);
        sigPen.setAttribute('cx', pt.x.toFixed(1));
        sigPen.setAttribute('cy', pt.y.toFixed(1));
        sigPen.setAttribute('opacity', raw > 0.96 ? String((1 - raw) / 0.04) : '0.95');
      }

      if (!captionShown && raw >= 0.72) {
        captionShown = true;
        sigCaption?.classList.add('is-visible');
      }

      if (raw < 1) {
        introRaf = requestAnimationFrame(animateStroke);
      } else {
        introRaf = null;
        if (sigPen) sigPen.setAttribute('opacity', '0');
        sigSvg?.classList.add('is-glowing');
        introTimers.push(setTimeout(hideSignatureIntro, 650));
      }
    }

    introTimers.push(
      setTimeout(() => {
        introRaf = requestAnimationFrame(animateStroke);
      }, startDelay)
    );
  }

  sigSkipBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    hideSignatureIntro();
  });
  introEl?.addEventListener('click', hideSignatureIntro);
  playSignatureIntro();

  /* ------------------------------------------------------------------------
   * 1. I18N DICTIONARY (VI / EN)
   * ------------------------------------------------------------------------ */
  const i18n = {
    vi: {
      'nav.about': 'Giới thiệu',
      'nav.skills': 'Kỹ năng',
      'nav.projects': 'Dự án',
      'nav.journey': 'Hành trình',
      'nav.contact': 'Liên hệ',
      'nav.quick': 'Tìm nhanh',
      'hero.badge': 'Computer Science Student • TDTU K30',
      'hero.greeting': 'Xin chào, mình là',
      'hero.lead': 'Sinh viên năm nhất ngành <strong class="text-heading font-semibold">Khoa học Máy tính (Computer Science)</strong> tại Đại học Tôn Đức Thắng (TDTU). Đam mê thuật toán, phần cứng PC, xây dựng sản phẩm web gọn gàng và thích bóng rổ.',
      'hero.ctaProjects': 'Xem Dự án',
      'hero.ctaTerminal': 'Mở Terminal',
      'hero.cmdHint': 'Nhấn',
      'hero.statTech': 'Kỹ năng',
      'hero.statHoops': 'Bóng rổ',
      'about.title': 'Tiểu sử & Hệ sinh thái cá nhân',
      'about.eduTitle': 'Hồ sơ Học vấn & Định hướng',
      'about.eduDesc': 'Hiện tại mình là sinh viên năm nhất chuyên ngành <strong class="text-heading">Khoa học Máy tính (Computer Science)</strong> tại <strong class="text-emerald-400">Trường Đại học Tôn Đức Thắng (TDTU)</strong>. Mình tập trung rèn luyện nền tảng vững chắc về thuật toán, cấu trúc dữ liệu, lập trình hệ thống với C/C++, Python, Java và tư duy toán học để xây dựng các sản phẩm phần mềm chất lượng.',
      'about.locLabel': 'Vị trí hiện tại',
      'about.country': 'Việt Nam',
      'about.pcTitle': 'Phần cứng PC',
      'about.pcDesc': 'Tự tìm hiểu kiến trúc phần cứng, tối ưu airflow/hiệu năng, tự tay lắp ráp và nâng cấp linh kiện máy tính cá nhân.',
      'about.gameDesc': 'Đam mê các tựa game chiến thuật, co-op săn quái và FPS đòi hỏi phản xạ nhanh.',
      'about.lifeTitle': 'Thể thao & Focus Audio',
      'about.lifeDesc': 'Cân bằng giữa màn hình code, sân bóng rổ 3x3, cầu lông và một chút nhạc Lo-Fi chill khi học bài.',
      'skills.title': 'Kỹ năng & Nền tảng',
      'skills.all': 'Tất cả',
      'skills.dev': 'Lập trình',
      'skills.foundations': 'Nền tảng',
      'skills.tools': 'Công cụ',
      'projects.title': 'Dự án cá nhân',
      'projects.subtitle': 'Quản lý danh sách dự án trong projects.js',
      'terminal.hint': 'Hỗ trợ Tab tự điền lệnh, ↑/↓ lịch sử, neofetch & matrix easter egg.',
      'terminal.quickLabel': 'Lệnh nhanh:',
      'journey.title': 'Hành trình học tập',
      'journey.m1Date': '2026 – Hiện tại',
      'journey.m1Title': 'Sinh viên ngành Khoa học Máy tính — Đại học Tôn Đức Thắng (TDTU)',
      'journey.m1Desc': 'Chính thức theo học chuyên ngành <span class="text-emerald-400 font-medium">Khoa học Máy tính (Computer Science)</span> tại TDTU. Tập trung chuyên sâu vào lập trình C/C++ (STL), Python, Java, cấu trúc dữ liệu &amp; giải thuật, đại số tuyến tính và mạng máy tính.',
      'journey.m2Title': 'Hoàn thành chứng chỉ IELTS (IDP Vietnam)',
      'journey.m2Desc': 'Đạt chứng chỉ tiếng Anh học thuật <span class="text-heading font-medium">IELTS tại IDP Vietnam</span>, tạo lợi thế lớn trong việc đọc hiểu tài liệu chuyên ngành, nghiên cứu công nghệ mới và học tập trong môi trường chuẩn quốc tế.',
      'journey.m3Date': 'Trước 2026',
      'journey.m3Title': 'Hoàn thành khoá đào tạo nhân tài 12 năm của Bộ Giáo dục và Đào tạo',
      'journey.m3Desc': 'Đạt chuỗi tốt nghiệp và lên lớp liên tục trong vòng 12 năm học tập, đạt "giải khát" trong vòng 3 năm liên tục tham gia đấu trường <span class="text-orange-400 font-medium">3x3 Bóng rổ</span>.',
      'contact.title': 'Kết nối cùng Hoàng Quân',
      'contact.desc': 'Bạn muốn tìm một đồng đội code có tâm, một người bạn mê build PC, hay đơn giản là rủ đánh Liên Minh & CS2 cùng? Đừng ngại nhắn tin hoặc kết nối qua các kênh dưới đây nhé!',
      'contact.copy': 'Sao chép',
    },
    en: {
      'nav.about': 'About',
      'nav.skills': 'Skills',
      'nav.projects': 'Projects',
      'nav.journey': 'Journey',
      'nav.contact': 'Contact',
      'nav.quick': 'Quick Find',
      'hero.badge': 'Computer Science Student • TDTU K30',
      'hero.greeting': "Hi there, I'm",
      'hero.lead': 'Computer Science freshman at <strong class="text-heading font-semibold">Ton Duc Thang University (TDTU)</strong>. Passionate about algorithms, DIY PC hardware, crisp web interfaces, and love basketball.',
      'hero.ctaProjects': 'Explore Projects',
      'hero.ctaTerminal': 'Open Terminal',
      'hero.cmdHint': 'Press',
      'hero.statTech': 'Skills',
      'hero.statHoops': 'Hoops',
      'about.title': 'Profile & Personal Ecosystem',
      'about.eduTitle': 'Education & Direction',
      'about.eduDesc': 'Currently a freshman majoring in <strong class="text-heading">Computer Science</strong> at <strong class="text-emerald-400">Ton Duc Thang University (TDTU)</strong>. Focusing on strong foundations in data structures, algorithms, systems programming (C/C++, Python, Java), and applied mathematics.',
      'about.locLabel': 'Current Location',
      'about.country': 'Vietnam',
      'about.pcTitle': 'PC Hardware',
      'about.pcDesc': 'Exploring hardware architecture, airflow tuning, and building & upgrading custom desktop rigs hands-on.',
      'about.gameDesc': 'Enjoying tactical strategy, co-op monster hunting, and fast-paced competitive FPS titles.',
      'about.lifeTitle': 'Sports & Focus Audio',
      'about.lifeDesc': 'Balancing coding sessions with 3x3 basketball, badminton, and ambient Lo-Fi synth beats.',
      'skills.title': 'Skills & Foundations',
      'skills.all': 'All',
      'skills.dev': 'Programming',
      'skills.foundations': 'Foundations',
      'skills.tools': 'Tools',
      'projects.title': 'Personal Projects',
      'projects.subtitle': 'Manage & add projects easily in projects.js',
      'terminal.hint': 'Supports Tab autocomplete, ↑/↓ history, neofetch & matrix easter egg.',
      'terminal.quickLabel': 'Quick cmds:',
      'journey.title': 'Academic Journey',
      'journey.m1Date': '2026 – Present',
      'journey.m1Title': 'B.Sc. in Computer Science — Ton Duc Thang University (TDTU)',
      'journey.m1Desc': 'Pursuing <span class="text-emerald-400 font-medium">Computer Science</span> at TDTU, focusing on C/C++ (STL), Python, Java, Data Structures &amp; Algorithms, Linear Algebra, and Computer Networks.',
      'journey.m2Title': 'IELTS Academic Certificate (IDP Vietnam)',
      'journey.m2Desc': 'Achieved <span class="text-heading font-medium">IELTS Academic certification at IDP Vietnam</span>, empowering direct reading of technical papers, docs, and global collaboration.',
      'journey.m3Date': 'Before 2026',
      'journey.m3Title': 'Completed the 12-Year Talent Program of the Ministry of Education & Training',
      'journey.m3Desc': 'Maintained an unbroken 12-year grade-advancement streak and won "refreshment awards" across 3 consecutive years competing in <span class="text-orange-400 font-medium">3x3 Basketball</span>.',
      'contact.title': 'Connect with Hoàng Quân',
      'contact.desc': 'Looking for a reliable coding teammate, a PC hardware buddy, or a squadmate for League & CS2? Feel free to reach out via email or socials below!',
      'contact.copy': 'Copy',
    },
  };

  let currentLang = localStorage.getItem('dmir3r_lang') || 'vi';
  let currentSkillFilter = 'all';

  /* ------------------------------------------------------------------------
   * 2. TOAST NOTIFICATION
   * ------------------------------------------------------------------------ */
  const toastEl = document.getElementById('toast');
  const toastMsgEl = document.getElementById('toast-message');
  let toastTimer = null;

  function showToast(msg) {
    if (!toastEl || !toastMsgEl) return;
    toastMsgEl.textContent = msg;
    toastEl.classList.remove('opacity-0', '-translate-y-3');
    toastEl.classList.add('opacity-100', 'translate-y-0');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('opacity-100', 'translate-y-0');
      toastEl.classList.add('opacity-0', '-translate-y-3');
    }, 2600);
  }

  /* ------------------------------------------------------------------------
   * 3. THEME MANAGER (DARK / LIGHT)
   * ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dmir3r_theme', theme);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#070b14' : '#f4f7fb');
    if (sunIcon && moonIcon) {
      if (theme === 'dark') {
        sunIcon.classList.remove('hidden');
        moonIcon.classList.add('hidden');
      } else {
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
      }
    }
  }

  const savedTheme = localStorage.getItem('dmir3r_theme') || 'dark';
  applyTheme(savedTheme);

  function toggleTheme() {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    showToast(
      currentLang === 'vi'
        ? `Đã chuyển sang giao diện ${next === 'dark' ? 'Tối (Cyber)' : 'Sáng (Minimal)'}`
        : `Switched to ${next === 'dark' ? 'Dark Cyber' : 'Light Minimal'} theme`
    );
  }

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);

  /* ------------------------------------------------------------------------
   * 4. LANGUAGE SWITCHER (VI / EN)
   * ------------------------------------------------------------------------ */
  const langToggleBtn = document.getElementById('lang-toggle-btn');

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dmir3r_lang', lang);
    document.documentElement.lang = lang;
    if (langToggleBtn) langToggleBtn.textContent = lang.toUpperCase();

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = i18n[lang]?.[key];
      if (val) el.innerHTML = val;
    });

    renderSkills(currentSkillFilter);
    renderProjects();
    updateClock();
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const next = currentLang === 'vi' ? 'en' : 'vi';
      applyLanguage(next);
      showToast(next === 'vi' ? 'Đã chuyển ngôn ngữ: Tiếng Việt' : 'Language switched: English');
    });
  }

  /* ------------------------------------------------------------------------
   * 5. MOBILE MENU & SCROLL PROGRESS + SCROLLSPY
   * ------------------------------------------------------------------------ */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const scrollProgressEl = document.getElementById('scroll-progress');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.toggle('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', String(!isHidden));
    });
    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function onScroll() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(100, (window.scrollY / docHeight) * 100) : 0;
    if (scrollProgressEl) scrollProgressEl.style.width = `${pct}%`;

    // ScrollSpy
    const sections = ['about', 'skills', 'projects', 'terminal', 'journey', 'contact'];
    let activeId = '';
    if (window.scrollY >= 160) {
      for (const id of sections) {
        const sec = document.getElementById(id);
        if (sec) {
          const rect = sec.getBoundingClientRect();
          if (rect.top <= 180) activeId = id;
        }
      }
    }
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('data-section') === activeId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------------
   * 6. HERO TYPING ANIMATION & 3D TILT CARD + SPOTLIGHT HOVER
   * ------------------------------------------------------------------------ */
  const typingEl = document.getElementById('typing-text');
  const typingPhrases = {
    vi: [
      'Sinh viên Khoa học Máy tính @ TDTU',
      'DIY PC Hardware & Tech Enthusiast',
      'Bôn lờ 3x3 số 1 TDT 🏀',
      'Za trưởng top 2 không ai top 1',
    ],
    en: [
      'Computer Science Student @ TDTU',
      'DIY PC Builder & Tech Enthusiast',
      '3x3 Basketball Hoops Player 🏀',
      'Building Clean Interactive Web Apps',
    ],
  };
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeLoop() {
    if (!typingEl) return;
    const list = typingPhrases[currentLang] || typingPhrases.vi;
    const phrase = list[phraseIdx % list.length];

    if (isDeleting) {
      charIdx = Math.max(0, charIdx - 1);
    } else {
      charIdx = Math.min(phrase.length, charIdx + 1);
    }
    typingEl.textContent = phrase.substring(0, charIdx);

    let delay = isDeleting ? 35 : 68;
    if (!isDeleting && charIdx === phrase.length) {
      delay = 1850;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % list.length;
      delay = 360;
    }
    setTimeout(typeLoop, delay);
  }
  typeLoop();

  // 3D Micro-Tilt on Hero Card (Desktop pointer only)
  const heroCard = document.getElementById('hero-tilt-card');
  if (heroCard && window.matchMedia('(hover: hover)').matches) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      heroCard.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(6px)`;
    });
    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotateY(0deg) rotateX(0deg) translateZ(0px)';
    });
  }

  // Spotlight radial glow tracking on all .spotlight-card elements
  if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
      const card = e.target.closest('.spotlight-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  }

  /* ------------------------------------------------------------------------
   * 7. LIVE HCMC CLOCK & TIME-AWARE STATUS + INTERACTIVE PC HARDWARE CHIPS
   * ------------------------------------------------------------------------ */
  const clockEl = document.getElementById('live-clock');
  const activityEl = document.getElementById('live-activity');
  const heroStatusPill = document.getElementById('hero-status-pill');

  function updateClock() {
    const now = new Date();
    let hour = now.getHours();
    try {
      const fmt = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      });
      if (clockEl) clockEl.textContent = fmt.format(now);
      const hFmt = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour: 'numeric',
        hour12: false,
      });
      hour = parseInt(hFmt.format(now), 10);
    } catch {
      if (clockEl) clockEl.textContent = now.toLocaleTimeString('vi-VN');
    }

    let statusVi = 'Đang code & học CS';
    let statusEn = 'Coding & Studying CS';
    let shortTag = '⚡ Coding';

    if (hour >= 0 && hour < 6) {
      statusVi = 'Chế độ ngủ nạp pin 🌙';
      statusEn = 'Recharging (Sleep Mode) 🌙';
      shortTag = '🌙 Offline';
    } else if (hour >= 6 && hour < 17) {
      statusVi = 'Học tập & Lab tại TDTU';
      statusEn = 'Classes & Labs @ TDTU';
      shortTag = '🎓 Campus';
    } else if (hour >= 17 && hour < 19) {
      statusVi = 'Sân bóng rổ 3x3 / Cầu lông 🏀';
      statusEn = '3x3 Basketball / Badminton 🏀';
      shortTag = '🏀 Sports';
    } else {
      statusVi = 'Code đêm, Lo-Fi & Gaming 🎮';
      statusEn = 'Late Coding, Lo-Fi & Gaming 🎮';
      shortTag = '⚡ Active';
    }

    if (activityEl) {
      const span = activityEl.querySelector('span:last-child');
      if (span) span.textContent = currentLang === 'vi' ? statusVi : statusEn;
    }
    if (heroStatusPill) heroStatusPill.textContent = shortTag;
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Interactive Hardware Spec Notes
  const hwDetailEl = document.getElementById('hw-detail');
  const hwChips = document.querySelectorAll('.hw-chip');
  const hwDescriptions = {
    gpu: {
      vi: 'GPU Graphics: Quan tâm hiệu năng raster/ray-tracing, tối ưu nhiệt độ & curve quạt khi chơi Monster Hunter Wilds và CS2.',
      en: 'GPU Graphics: Tuning thermals, fan curves, and frame pacing for Monster Hunter Wilds and CS2.',
    },
    ssd: {
      vi: 'SSD NVMe PCIe: Tốc độ đọc ghi siêu nhanh cho boot hệ điều hành, compile C++/Java và load game không chờ đợi.',
      en: 'SSD NVMe PCIe: High-throughput storage for instant OS boot, fast C++/Java builds, and zero-lag loading.',
    },
    psu: {
      vi: 'PSU Power: Luôn ưu tiên nguồn chuẩn 80+ Gold/Bronze chất lượng cao để bảo vệ toàn bộ dàn linh kiện bền bỉ lâu dài.',
      en: 'PSU Power: Prioritizing clean, reliable 80+ certified power delivery to keep every component safe and stable.',
    },
  };

  hwChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const key = chip.getAttribute('data-hw');
      hwChips.forEach((c) => c.classList.remove('border-emerald-500/40', 'ring-1', 'ring-emerald-400/40'));
      chip.classList.add('border-emerald-500/40', 'ring-1', 'ring-emerald-400/40');
      if (hwDetailEl && hwDescriptions[key]) {
        hwDetailEl.textContent = hwDescriptions[key][currentLang];
      }
    });
  });

  /* ------------------------------------------------------------------------
   * 8. WEB AUDIO LO-FI FOCUS SYNTH PLAYER (ZERO EXTERNAL AUDIO DEPENDENCIES)
   * ------------------------------------------------------------------------ */
  const audioPlayBtn = document.getElementById('audio-play-btn');
  const audioModeBtn = document.getElementById('audio-mode-btn');
  const audioEq = document.getElementById('audio-equalizer');
  const audioTrackName = document.getElementById('audio-track-name');
  const iconPlay = document.getElementById('audio-icon-play');
  const iconPause = document.getElementById('audio-icon-pause');

  let audioCtx = null;
  let audioTimer = null;
  let isPlaying = false;
  let modeIndex = 0;

  const synthModes = [
    {
      name: 'Midnight Coding Lo-Fi',
      chords: [
        [220.0, 261.63, 329.63, 392.0], // Am7
        [174.61, 220.0, 261.63, 329.63], // Fmaj7
        [196.0, 246.94, 293.66, 392.0], // G6
        [164.81, 196.0, 246.94, 293.66], // Em7
      ],
      wave: 'triangle',
      interval: 2200,
    },
    {
      name: 'Cyber Drift Ambient',
      chords: [
        [146.83, 220.0, 261.63, 329.63], // Dm9
        [130.81, 196.0, 246.94, 329.63], // Cmaj7
        [110.0, 164.81, 220.0, 261.63],  // Am
        [164.81, 246.94, 293.66, 392.0], // Em7
      ],
      wave: 'sine',
      interval: 2600,
    },
  ];

  let chordStep = 0;

  function playChord() {
    if (!audioCtx || !isPlaying) return;
    const mode = synthModes[modeIndex];
    const freqs = mode.chords[chordStep % mode.chords.length];
    chordStep++;

    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(720, now);

    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.055, now + 0.45);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + mode.interval / 1000 + 0.35);

    filter.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    freqs.forEach((f, idx) => {
      const osc = audioCtx.createOscillator();
      osc.type = mode.wave;
      osc.frequency.setValueAtTime(f, now + idx * 0.04);
      osc.connect(filter);
      osc.start(now + idx * 0.04);
      osc.stop(now + mode.interval / 1000 + 0.4);
    });
  }

  function startAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      showToast('Trình duyệt không hỗ trợ Web Audio API.');
      return;
    }
    if (!audioCtx) audioCtx = new AudioContextClass();
    if (audioCtx.state === 'suspended') audioCtx.resume();

    isPlaying = true;
    audioEq?.classList.add('eq-playing');
    iconPlay?.classList.add('hidden');
    iconPause?.classList.remove('hidden');

    playChord();
    clearInterval(audioTimer);
    audioTimer = setInterval(playChord, synthModes[modeIndex].interval);
  }

  function stopAudio() {
    isPlaying = false;
    clearInterval(audioTimer);
    audioEq?.classList.remove('eq-playing');
    iconPlay?.classList.remove('hidden');
    iconPause?.classList.add('hidden');
  }

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener('click', () => {
      if (isPlaying) stopAudio();
      else startAudio();
    });
  }

  if (audioModeBtn) {
    audioModeBtn.addEventListener('click', () => {
      modeIndex = (modeIndex + 1) % synthModes.length;
      if (audioTrackName) audioTrackName.textContent = synthModes[modeIndex].name;
      if (isPlaying) {
        clearInterval(audioTimer);
        playChord();
        audioTimer = setInterval(playChord, synthModes[modeIndex].interval);
      }
      showToast(`Audio: ${synthModes[modeIndex].name}`);
    });
  }

  /* ------------------------------------------------------------------------
   * 9. TECH STACK & SKILLS FILTERING (POLISHED + PROFICIENCY METER)
   * ------------------------------------------------------------------------ */
  const skillsData = [
    {
      name: 'C',
      category: 'dev',
      tag: { vi: 'Lập trình', en: 'Language' },
      levelLabel: 'Core CS',
      levelPct: 78,
      icon: 'terminal',
      accent: 'emerald',
      desc: {
        vi: 'Nền tảng lập trình cấu trúc, con trỏ, quản lý bộ nhớ và bài tập thuật toán cơ bản.',
        en: 'Structured programming, pointers, memory fundamentals, and core CS coursework.',
      },
    },
    {
      name: 'C++ (STL)',
      category: 'dev',
      tag: { vi: 'Lập trình', en: 'Language' },
      levelLabel: 'DSA Focus',
      levelPct: 72,
      icon: 'code-2',
      accent: 'cyan',
      desc: {
        vi: 'Ứng dụng Standard Template Library cho cấu trúc dữ liệu, giải thuật và tối ưu thời gian chạy.',
        en: 'Using STL containers and algorithms for data structures and competitive problem solving.',
      },
    },
    {
      name: 'Python (NumPy)',
      category: 'dev',
      tag: { vi: 'Lập trình', en: 'Language' },
      levelLabel: 'Scripting',
      levelPct: 75,
      icon: 'braces',
      accent: 'emerald',
      desc: {
        vi: 'Xử lý tính toán ma trận với NumPy, viết script tự động hóa và thử nghiệm nhanh ý tưởng.',
        en: 'Numerical computing with NumPy, quick automation scripts, and rapid prototyping.',
      },
    },
    {
      name: 'Java',
      category: 'dev',
      tag: { vi: 'Lập trình', en: 'Language' },
      levelLabel: 'OOP',
      levelPct: 74,
      icon: 'coffee',
      accent: 'cyan',
      desc: {
        vi: 'Lập trình hướng đối tượng (OOP), thiết kế lớp bài bản và tư duy kiến trúc phần mềm.',
        en: 'Object-Oriented Programming (OOP), clean class hierarchies, and software design.',
      },
    },
    {
      name: 'HTML / CSS / JS',
      category: 'dev',
      tag: { vi: 'Lập trình', en: 'Web Dev' },
      levelLabel: 'Frontend',
      levelPct: 76,
      icon: 'globe',
      accent: 'emerald',
      desc: {
        vi: 'Xây dựng giao diện responsive, Tailwind CSS và các hiệu ứng tương tác bằng JavaScript thuần.',
        en: 'Building responsive layouts with Tailwind CSS and interactive vanilla JavaScript apps.',
      },
    },
    {
      name: 'Đại số tuyến tính',
      category: 'foundations',
      tag: { vi: 'Nền tảng', en: 'Math' },
      levelLabel: 'Surviving 😅',
      levelPct: 62,
      icon: 'sigma',
      accent: 'cyan',
      barColor: 'red',
      desc: {
        vi: 'Ma trận, vector, không gian tuyến tính — nền móng toán học cho đồ họa máy tính & AI.',
        en: 'Matrices, vectors, and linear spaces — mathematical backbone for graphics & AI.',
      },
    },
    {
      name: 'Mạng máy tính',
      category: 'foundations',
      tag: { vi: 'Nền tảng', en: 'Networking' },
      levelLabel: 'Packet Tracer',
      levelPct: 68,
      icon: 'network',
      accent: 'emerald',
      desc: {
        vi: 'Mô hình OSI/TCP-IP, chia subnet IPv4 và thực hành mô phỏng topo mạng với Cisco Packet Tracer.',
        en: 'OSI/TCP-IP layers, IPv4 subnetting, and hands-on topology labs in Cisco Packet Tracer.',
      },
    },
    {
      name: 'VS Code & Visual Studio',
      category: 'tools',
      tag: { vi: 'Công cụ', en: 'IDE' },
      levelLabel: 'Daily Driver',
      levelPct: 88,
      icon: 'laptop',
      accent: 'cyan',
      desc: {
        vi: 'Môi trường phát triển chính cho C/C++, Python, Java và Web với workflow debug tối ưu.',
        en: 'Primary IDEs for C/C++, Python, Java, and Web development with streamlined debugging.',
      },
    },
    {
      name: 'Git & GitHub',
      category: 'tools',
      tag: { vi: 'Công cụ', en: 'VCS' },
      levelLabel: 'Workflow',
      levelPct: 82,
      icon: 'git-branch',
      accent: 'emerald',
      desc: {
        vi: 'Quản lý phiên bản mã nguồn, nhánh làm việc nhóm và deploy trang tĩnh qua GitHub Pages.',
        en: 'Version control, collaborative branching, and static hosting via GitHub Pages.',
      },
    },
  ];

  const skillsGrid = document.getElementById('skills-grid');
  const filterBtns = document.querySelectorAll('.skill-filter-btn');

  function renderSkills(filter = 'all') {
    if (!skillsGrid) return;
    currentSkillFilter = filter;
    const filtered = filter === 'all' ? skillsData : skillsData.filter((s) => s.category === filter);

    skillsGrid.innerHTML = filtered
      .map((skill) => {
        const isEmerald = skill.accent === 'emerald';
        const iconStyle = isEmerald
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400';
        const barGradient =
          skill.barColor === 'red'
            ? 'from-red-600 to-rose-400 shadow-[0_0_10px_rgba(239,68,68,0.55)]'
            : isEmerald
            ? 'from-emerald-500 to-teal-400'
            : 'from-cyan-500 to-emerald-400';

        return `
          <article class="spotlight-card surface-card border p-5 rounded-2xl flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between gap-2 mb-3.5">
                <div class="w-10 h-10 rounded-xl border ${iconStyle} flex items-center justify-center">
                  <i data-lucide="${skill.icon}" class="w-5 h-5"></i>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="font-mono text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ${skill.levelLabel}
                  </span>
                  <span class="font-mono text-[10px] px-2 py-0.5 rounded-md surface-elevated text-faint-custom border">
                    ${skill.tag[currentLang]}
                  </span>
                </div>
              </div>
              <h3 class="font-bold text-base text-heading group-hover:text-emerald-400 transition-colors mb-1.5">${skill.name}</h3>
              <p class="text-xs sm:text-sm text-muted-custom leading-relaxed mb-4">${skill.desc[currentLang]}</p>
            </div>
            <div class="pt-3 border-t border-subtle">
              <div class="h-1.5 w-full rounded-full surface-elevated overflow-hidden">
                <div class="h-full rounded-full bg-gradient-to-r ${barGradient}" style="width: ${skill.levelPct}%"></div>
              </div>
            </div>
          </article>
        `;
      })
      .join('');

    safeCreateIcons();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.getAttribute('data-filter');
      filterBtns.forEach((b) => {
        b.setAttribute('aria-selected', 'false');
        b.className = 'skill-filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all text-muted-custom border border-transparent hover:text-heading';
      });
      btn.setAttribute('aria-selected', 'true');
      btn.className = 'skill-filter-btn px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all bg-emerald-500/15 text-emerald-400 border border-emerald-500/40';
      renderSkills(selected);
    });
  });

  /* ------------------------------------------------------------------------
   * 10. SIMPLE PROJECTS RENDERER (DATA LIVES IN projects.js)
   * ------------------------------------------------------------------------ */
  const projectsGrid = document.getElementById('projects-grid');

  function getProjectsList() {
    return Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  }

  function resolveText(val) {
    if (!val) return '';
    return typeof val === 'string' ? val : val[currentLang] || val.vi || val.en || '';
  }

  function renderProjects() {
    if (!projectsGrid) return;
    const list = getProjectsList();

    if (list.length === 0) {
      projectsGrid.innerHTML = `
        <div class="md:col-span-2 surface-card border rounded-3xl p-8 text-center font-mono text-sm text-muted-custom">
          Chưa có dự án nào — mở <span class="text-emerald-400">projects.js</span> để thêm dự án đầu tiên của bạn.
        </div>
      `;
      return;
    }

    projectsGrid.innerHTML = list
      .map((p, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const title = escapeHTML(resolveText(p.title));
        const desc = escapeHTML(resolveText(p.desc));
        const status = escapeHTML(p.status || 'Project');
        const tags = Array.isArray(p.tags) ? p.tags : [];

        const liveLink = p.liveUrl
          ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium surface-elevated border text-emerald-400 hover:border-emerald-400 transition-colors">
               <span>Live</span>
               <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
             </a>`
          : '';

        const githubLink = p.githubUrl
          ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 text-xs font-mono text-muted-custom hover:text-heading transition-colors">
               <i data-lucide="github" class="w-3.5 h-3.5"></i>
               <span>GitHub</span>
             </a>`
          : '';

        return `
          <article class="spotlight-card surface-card border p-6 rounded-3xl flex flex-col justify-between group">
            <div>
              <div class="flex items-center justify-between gap-3 mb-4">
                <span class="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                  ${num}
                </span>
                <span class="font-mono text-[11px] px-2.5 py-1 rounded-full surface-elevated border text-cyan-400">
                  ${status}
                </span>
              </div>
              <h3 class="text-lg font-bold text-heading group-hover:text-emerald-400 transition-colors mb-2">${title}</h3>
              <p class="text-sm text-muted-custom leading-relaxed mb-5">${desc}</p>
            </div>

            <div class="space-y-4">
              <div class="flex flex-wrap gap-1.5">
                ${tags.map((t) => `<span class="px-2.5 py-1 rounded-lg font-mono text-[11px] surface-elevated border text-body">${escapeHTML(t)}</span>`).join('')}
              </div>
              ${
                liveLink || githubLink
                  ? `<div class="flex items-center justify-between gap-2 pt-3 border-t border-subtle">
                       <div class="flex items-center gap-2">${liveLink}</div>
                       <div>${githubLink}</div>
                     </div>`
                  : ''
              }
            </div>
          </article>
        `;
      })
      .join('');

    safeCreateIcons();
  }

  /* ------------------------------------------------------------------------
   * 12. SUPERCHARGED MINI TERMINAL (LHQ-OS v3.0) + MATRIX EASTER EGG
   * ------------------------------------------------------------------------ */
  const terminalBody = document.getElementById('terminal-body');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalForm = document.getElementById('terminal-form');
  const terminalInput = document.getElementById('terminal-input');
  const termChips = document.querySelectorAll('.term-chip');

  const commandHistory = [];
  let historyPointer = -1;

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }[m]));
  }

  // Matrix Rain Easter Egg
  const matrixCanvas = document.getElementById('matrix-canvas');
  let matrixInterval = null;
  let matrixTimeout = null;

  function triggerMatrix() {
    if (!matrixCanvas) return;
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    matrixCanvas.classList.add('active');

    const cols = Math.floor(matrixCanvas.width / 18);
    const drops = Array(cols).fill(1);
    const chars = '01DMIR3RTDTUCS<>/{}[]$#';

    clearInterval(matrixInterval);
    clearTimeout(matrixTimeout);

    matrixInterval = setInterval(() => {
      ctx.fillStyle = 'rgba(7, 11, 20, 0.14)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      ctx.fillStyle = '#10b981';
      ctx.font = '15px "JetBrains Mono", monospace';
      drops.forEach((y, i) => {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * 18, y * 18);
        if (y * 18 > matrixCanvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i]++;
      });
    }, 42);

    matrixTimeout = setTimeout(() => {
      clearInterval(matrixInterval);
      matrixCanvas.classList.remove('active');
    }, 3600);
  }

  const terminalCommands = {
    help: () => `
      <div class="space-y-1 text-slate-300">
        <div class="text-emerald-400 font-semibold mb-1">LHQ-OS v3.0 — Danh sách lệnh khả dụng:</div>
        <div><span class="text-cyan-300 inline-block w-24">neofetch</span> — Hiển thị thông số hệ thống &amp; ASCII art</div>
        <div><span class="text-cyan-300 inline-block w-24">whoami</span> — Thông tin tổng quan về Lê Hoàng Quân</div>
        <div><span class="text-cyan-300 inline-block w-24">education</span> — Học vấn &amp; chuyên ngành Khoa học Máy tính</div>
        <div><span class="text-cyan-300 inline-block w-24">skills</span> — Tech Stack, Nền tảng &amp; Công cụ</div>
        <div><span class="text-cyan-300 inline-block w-24">projects</span> — Danh sách dự án &amp; lab tương tác</div>
        <div><span class="text-cyan-300 inline-block w-24">hobbies</span> — Phần cứng PC, Gaming &amp; Thể thao</div>
        <div><span class="text-cyan-300 inline-block w-24">contact</span> — Email &amp; liên kết mạng xã hội</div>
        <div><span class="text-cyan-300 inline-block w-24">theme</span> — Chuyển nhanh Dark / Light mode</div>
        <div><span class="text-cyan-300 inline-block w-24">intro</span> — Phát lại intro chữ ký tay</div>
        <div><span class="text-cyan-300 inline-block w-24">matrix</span> — Kích hoạt hiệu ứng Matrix Rain (3.6s)</div>
        <div><span class="text-cyan-300 inline-block w-24">date</span> — Xem giờ hiện tại ở TP.HCM (GMT+7)</div>
        <div><span class="text-cyan-300 inline-block w-24">clear</span> — Xóa sạch màn hình terminal</div>
      </div>
    `,
    neofetch: () => `
      <div class="flex flex-col sm:flex-row gap-4 text-xs leading-relaxed">
        <pre class="text-emerald-400 font-bold select-none shrink-0">   ____  _
  / __ \\| |
 | |  | | |
 | |  | | |
 | |__| | |____
  \\___\\_\\______|</pre>
        <div class="space-y-0.5 text-slate-300">
          <div><span class="text-emerald-400 font-bold">dmir3r_</span>@<span class="text-cyan-400 font-bold">tdtu-cs</span></div>
          <div class="text-slate-600">----------------------</div>
          <div><span class="text-cyan-300">OS:</span> LHQ-OS v3.0 (Tech-Minimalist)</div>
          <div><span class="text-cyan-300">Host:</span> Ton Duc Thang University (K30)</div>
          <div><span class="text-cyan-300">Major:</span> Computer Science</div>
          <div><span class="text-cyan-300">Stack:</span> C, C++ (STL), Python, Java, Web</div>
          <div><span class="text-cyan-300">Cert:</span> IELTS Academic (IDP 2025)</div>
          <div><span class="text-cyan-300">Hobby:</span> PC DIY • 3x3 Hoops • LoL / CS2</div>
          <div class="flex gap-1.5 pt-1">
            <span class="w-3 h-3 rounded-sm bg-emerald-400 inline-block"></span>
            <span class="w-3 h-3 rounded-sm bg-cyan-400 inline-block"></span>
            <span class="w-3 h-3 rounded-sm bg-amber-400 inline-block"></span>
            <span class="w-3 h-3 rounded-sm bg-rose-400 inline-block"></span>
            <span class="w-3 h-3 rounded-sm bg-slate-200 inline-block"></span>
          </div>
        </div>
      </div>
    `,
    whoami: () => `
      <div class="space-y-1 text-slate-300 border-l-2 border-emerald-500/60 pl-3">
        <div><span class="text-slate-500">Name     :</span> <span class="text-white font-semibold">Lê Hoàng Quân (dmir3r_)</span></div>
        <div><span class="text-slate-500">Major    :</span> <span class="text-emerald-300">Khoa học Máy tính (Computer Science) @ TDTU</span></div>
        <div><span class="text-slate-500">Location :</span> TP. Hồ Chí Minh, Việt Nam (GMT+7)</div>
        <div><span class="text-slate-500">Focus    :</span> <span class="text-cyan-300">Thuật toán, cấu trúc dữ liệu &amp; kỹ thuật phần mềm</span></div>
      </div>
    `,
    education: () => `
      <div class="space-y-1.5 text-slate-300">
        <div class="text-emerald-400 font-semibold">[2026 – Hiện tại] Trường Đại học Tôn Đức Thắng (TDTU)</div>
        <div>• Chuyên ngành: <span class="text-white">Khoa học Máy tính (Computer Science)</span></div>
        <div>• Trọng tâm: Thuật toán, Cấu trúc dữ liệu, C/C++ (STL), Python, Java &amp; Đại số tuyến tính.</div>
        <div class="text-cyan-300 pt-1">[04/2025] Hoàn thành chứng chỉ IELTS (IDP Vietnam).</div>
        <div class="text-slate-400">[Trước 2026] Ăn, ngủ, ải đía, cơm ngày 3 cử.</div>
      </div>
    `,
    skills: () => `
      <div class="space-y-1.5 text-slate-300">
        <div><span class="text-emerald-400">[Languages]  </span> C, C++ (STL), Python (NumPy), Java, HTML/CSS/JavaScript</div>
        <div><span class="text-cyan-400">[Foundations]</span> Đại số tuyến tính, Mạng máy tính (Cisco Packet Tracer)</div>
        <div><span class="text-amber-300">[Tools]      </span> VS Code, Visual Studio, Git &amp; GitHub</div>
      </div>
    `,
    projects: () => {
      const list = getProjectsList();
      if (!list.length) return `<div class="text-slate-400">Chưa có dự án nào trong projects.js.</div>`;
      return `
        <div class="space-y-1.5 text-slate-300">
          ${list
            .map((p, i) => {
              const color = i % 2 === 0 ? 'text-emerald-400' : 'text-cyan-400';
              return `<div><span class="${color}">${i + 1}. ${escapeHTML(resolveText(p.title))}</span> — ${escapeHTML(resolveText(p.desc))}</div>`;
            })
            .join('')}
        </div>
      `;
    },
    hobbies: () => `
      <div class="space-y-1.5 text-slate-300">
        <div><span class="text-emerald-400">▸ Tech &amp; PC :</span> Tự build PC, tối ưu airflow &amp; nâng cấp linh kiện phần cứng.</div>
        <div><span class="text-cyan-400">▸ Gaming    :</span> League of Legends (TFT), Monster Hunter Wilds, Counter-Strike 2.</div>
        <div><span class="text-amber-400">▸ Sports    :</span> 3x3 Basketball &amp; Badminton.</div>
      </div>
    `,
    contact: () => `
      <div class="space-y-1 text-slate-300">
        <div><span class="text-emerald-400">Email    :</span> lehoangquan2008@gmail.com</div>
        <div><span class="text-cyan-400">GitHub   :</span> github.com/quanlehoaq</div>
        <div><span class="text-cyan-400">Steam    :</span> steamcommunity.com/id/raverdepzai</div>
        <div><span class="text-emerald-400">Instagram:</span> @hq.quann_</div>
        <div><span class="text-cyan-400">Facebook :</span> fb.com/hpaun0</div>
      </div>
    `,
    date: () => {
      const nowStr = new Intl.DateTimeFormat('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        dateStyle: 'full',
        timeStyle: 'medium',
      }).format(new Date());
      return `<div class="text-cyan-300">${escapeHTML(nowStr)} (GMT+7)</div>`;
    },
    theme: () => {
      toggleTheme();
      return `<div class="text-emerald-400">✓ Đã chuyển giao diện Dark / Light.</div>`;
    },
    lang: () => {
      applyLanguage(currentLang === 'vi' ? 'en' : 'vi');
      return `<div class="text-emerald-400">✓ Language switched to ${currentLang.toUpperCase()}.</div>`;
    },
    intro: () => {
      playSignatureIntro();
      return `<div class="text-emerald-400">✦ Replaying signature intro...</div>`;
    },
    matrix: () => {
      triggerMatrix();
      return `<div class="text-emerald-400">Wake up, dmir3r_... Matrix mode activated (3.6s).</div>`;
    },
  };

  const commandNames = [...Object.keys(terminalCommands), 'clear', 'echo'];

  function executeCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    commandHistory.unshift(trimmed);
    historyPointer = -1;

    const lower = trimmed.toLowerCase();
    if (lower === 'clear') {
      if (terminalOutput) terminalOutput.innerHTML = '';
      return;
    }

    let responseHTML = '';
    if (lower.startsWith('echo ')) {
      responseHTML = `<div class="text-slate-200">${escapeHTML(trimmed.slice(5))}</div>`;
    } else if (terminalCommands[lower]) {
      responseHTML = terminalCommands[lower]();
    } else {
      responseHTML = `<div class="text-rose-400">zsh: command not found: ${escapeHTML(trimmed)}. Gõ <span class="text-cyan-300">'help'</span> để xem danh sách lệnh.</div>`;
    }

    const entry = document.createElement('div');
    entry.className = 'space-y-1.5';
    entry.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="text-emerald-400 font-semibold">dmir3r_</span><span class="text-slate-500">:</span><span class="text-cyan-400">~</span><span class="text-slate-400">$</span>
        <span class="text-slate-100">${escapeHTML(trimmed)}</span>
      </div>
      <div class="pl-1">${responseHTML}</div>
    `;
    terminalOutput?.appendChild(entry);
    requestAnimationFrame(() => {
      if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
    });
  }

  if (terminalForm && terminalInput) {
    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    });

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const cur = terminalInput.value.trim().toLowerCase();
        if (!cur) return;
        const match = commandNames.find((c) => c.startsWith(cur));
        if (match) terminalInput.value = match;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (historyPointer < commandHistory.length - 1) {
          historyPointer++;
          terminalInput.value = commandHistory[historyPointer];
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (historyPointer > 0) {
          historyPointer--;
          terminalInput.value = commandHistory[historyPointer];
        } else {
          historyPointer = -1;
          terminalInput.value = '';
        }
      }
    });

    terminalBody?.addEventListener('click', () => terminalInput.focus());
  }

  termChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      executeCommand(cmd);
      terminalInput?.focus({ preventScroll: true });
      requestAnimationFrame(() => {
        if (terminalBody) terminalBody.scrollTop = terminalBody.scrollHeight;
      });
    });
  });

  /* ------------------------------------------------------------------------
   * 13. COPY EMAIL (MODERN CLIPBOARD API + EXEC_COMMAND FALLBACK)
   * ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailTextEl = document.getElementById('email-text');

  async function copyEmail() {
    const email = emailTextEl ? emailTextEl.textContent.trim() : 'lehoangquan2008@gmail.com';
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = email;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      showToast(currentLang === 'vi' ? 'Đã sao chép email!' : 'Email copied to clipboard!');
    } catch {
      showToast('lehoangquan2008@gmail.com');
    }
  }

  copyEmailBtn?.addEventListener('click', copyEmail);

  /* ------------------------------------------------------------------------
   * 14. COMMAND PALETTE (Ctrl+K / ⌘K)
   * ------------------------------------------------------------------------ */
  const cmdModal = document.getElementById('cmd-modal');
  const cmdInput = document.getElementById('cmd-search-input');
  const cmdResults = document.getElementById('cmd-results');
  const cmdOpenBtn = document.getElementById('cmd-palette-btn');
  const mobileCmdBtn = document.getElementById('mobile-cmd-btn');
  const heroCmdHint = document.getElementById('hero-cmd-hint');
  const cmdCloseBtn = document.getElementById('cmd-close-btn');

  const paletteActions = [
    { label: 'Đi tới: Tiểu sử & Bento Grid (#about)', icon: 'user', run: () => scrollToSection('#about') },
    { label: 'Đi tới: Kỹ năng & Nền tảng (#skills)', icon: 'code-2', run: () => scrollToSection('#skills') },
    { label: 'Đi tới: Dự án cá nhân (#projects)', icon: 'folder-git-2', run: () => scrollToSection('#projects') },
    { label: 'Đi tới: LHQ-OS Mini Terminal (#terminal)', icon: 'terminal', run: () => { scrollToSection('#terminal'); setTimeout(() => terminalInput?.focus(), 350); } },
    { label: 'Chạy lệnh Terminal: neofetch', icon: 'cpu', run: () => { scrollToSection('#terminal'); executeCommand('neofetch'); } },
    { label: 'Phát lại Intro chữ ký tay', icon: 'pen-tool', run: () => playSignatureIntro() },
    { label: 'Kích hoạt Easter Egg: Matrix Rain', icon: 'zap', run: () => triggerMatrix() },
    { label: 'Bật / Tắt nhạc Lo-Fi Focus Synth', icon: 'headphones', run: () => (isPlaying ? stopAudio() : startAudio()) },
    { label: 'Chuyển giao diện Sáng / Tối (Theme)', icon: 'sun', run: () => toggleTheme() },
    { label: 'Chuyển ngôn ngữ Việt / Anh (VI / EN)', icon: 'languages', run: () => applyLanguage(currentLang === 'vi' ? 'en' : 'vi') },
    { label: 'Sao chép Email (lehoangquan2008@gmail.com)', icon: 'copy', run: () => copyEmail() },
    { label: 'Mở GitHub (@quanlehoaq)', icon: 'github', run: () => window.open('https://github.com/quanlehoaq', '_blank', 'noopener,noreferrer') },
  ];

  let cmdActiveIndex = 0;
  let filteredPalette = [...paletteActions];

  function scrollToSection(hash) {
    const target = document.querySelector(hash);
    if (target) {
      target.classList.add('is-visible');
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }

  function renderPalette(query = '') {
    if (!cmdResults) return;
    const q = query.trim().toLowerCase();
    filteredPalette = q
      ? paletteActions.filter((a) => a.label.toLowerCase().includes(q))
      : [...paletteActions];
    cmdActiveIndex = 0;

    if (filteredPalette.length === 0) {
      cmdResults.innerHTML = `<li class="px-4 py-6 text-center text-xs font-mono text-faint-custom">Không tìm thấy hành động phù hợp.</li>`;
      return;
    }

    cmdResults.innerHTML = filteredPalette
      .map(
        (item, i) => `
          <li>
            <button type="button" data-cmd-idx="${i}" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors ${
              i === cmdActiveIndex
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'text-body hover:bg-emerald-500/10 border border-transparent'
            }">
              <i data-lucide="${item.icon}" class="w-4 h-4 shrink-0 text-emerald-400"></i>
              <span class="truncate">${item.label}</span>
            </button>
          </li>
        `
      )
      .join('');

    safeCreateIcons();

    cmdResults.querySelectorAll('button[data-cmd-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.getAttribute('data-cmd-idx'));
        closePalette();
        filteredPalette[idx]?.run();
      });
    });
  }

  function openPalette() {
    cmdModal?.classList.remove('hidden');
    if (cmdInput) {
      cmdInput.value = '';
      renderPalette('');
      setTimeout(() => cmdInput.focus(), 20);
    }
  }

  function closePalette() {
    cmdModal?.classList.add('hidden');
  }

  cmdOpenBtn?.addEventListener('click', openPalette);
  mobileCmdBtn?.addEventListener('click', () => {
    mobileMenu?.classList.add('hidden');
    openPalette();
  });
  heroCmdHint?.addEventListener('click', openPalette);
  cmdCloseBtn?.addEventListener('click', closePalette);
  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) closePalette();
  });

  cmdInput?.addEventListener('input', (e) => renderPalette(e.target.value));
  cmdInput?.addEventListener('keydown', (e) => {
    if (!filteredPalette.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      cmdActiveIndex = (cmdActiveIndex + 1) % filteredPalette.length;
      highlightPaletteRow();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      cmdActiveIndex = (cmdActiveIndex - 1 + filteredPalette.length) % filteredPalette.length;
      highlightPaletteRow();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const chosen = filteredPalette[cmdActiveIndex];
      closePalette();
      chosen?.run();
    }
  });

  function highlightPaletteRow() {
    cmdResults?.querySelectorAll('button[data-cmd-idx]').forEach((btn, idx) => {
      if (idx === cmdActiveIndex) {
        btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
        btn.scrollIntoView({ block: 'nearest' });
      } else {
        btn.className = 'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-sm transition-colors text-body hover:bg-emerald-500/10 border border-transparent';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal?.classList.contains('hidden')) openPalette();
      else closePalette();
    } else if (e.key === 'Escape') {
      closePalette();
      hideSignatureIntro();
    }
  });

  /* ------------------------------------------------------------------------
   * 15. INSTANT-SAFE SCROLL REVEAL (NO BLANK CARDS ON ANCHOR JUMPS)
   * ------------------------------------------------------------------------ */
  const revealSections = document.querySelectorAll('.reveal-section');

  const revealIfVisible = (el) => el.classList.add('is-visible');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealIfVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.04, rootMargin: '0px 0px -30px 0px' }
    );
    revealSections.forEach((sec) => observer.observe(sec));
  } else {
    revealSections.forEach(revealIfVisible);
  }

  // Immediately reveal target section when clicking any anchor link
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', () => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) target.classList.add('is-visible');
      }
    });
  });

  // Initial render with saved language
  applyLanguage(currentLang);
});
