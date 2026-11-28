/* ==========================================================================
   DANH SÁCH DỰ ÁN CÁ NHÂN — dmir3r_ Portfolio
   --------------------------------------------------------------------------
   HƯỚNG DẪN THÊM DỰ ÁN MỚI:
   Chỉ cần copy 1 khối { ... } bên dưới, dán vào trong mảng window.PROJECTS
   và điền thông tin của bạn. Website + lệnh `projects` trong Terminal sẽ
   tự động cập nhật!
   ========================================================================== */

window.PROJECTS = [
  {
    title: 'PC Cleaner by dmir3r',
    category: 'DESKTOP UTILITY',
    date: '2026',
    status: 'Windows App',
    icon: 'sparkles',
    desc: {
      vi: 'Ứng dụng Windows WPF (.NET 10) quét dọn file rác hệ thống, Thùng rác, cache trình duyệt & công cụ lập trình, tìm file dung lượng lớn và lọc file trùng lặp xác thực SHA-256 3 tầng.',
      en: 'Native Windows WPF (.NET 10) desktop utility to safely clean system junk, Recycle Bin, browser & dev caches, scan large files, and deduplicate files with 3-stage SHA-256 verification.',
    },
    tags: ['C#', '.NET 10', 'WPF', 'Win32 API', 'SHA-256'],
    liveUrl: '',
    githubUrl: 'https://github.com/quanlehoaq/cleasingtool',
  },
  {
    title: 'Campus LAN & VLAN Lab',
    category: 'NETWORKING',
    date: '2026',
    status: 'Coursework',
    icon: 'network',
    desc: {
      vi: 'Bài thực hành môn Mạng máy tính: thiết kế sơ đồ mạng LAN, chia subnet IPv4 và cấu hình VLAN cơ bản trên Cisco Packet Tracer.',
      en: 'Computer Networks lab designing a campus LAN topology, IPv4 subnetting plan, and foundational VLAN routing in Cisco Packet Tracer.',
    },
    tags: ['Cisco Packet Tracer', 'Networking', 'TCP/IP'],
    liveUrl: '',
    githubUrl: '',
  },
  {
    title: 'dmir3r.is-a.dev — Portfolio v2',
    category: 'WEB PORTFOLIO',
    date: '2026',
    status: 'Live',
    icon: 'globe',
    desc: {
      vi: 'Trang web giới thiệu cá nhân phong cách Tech-Minimalist tích hợp Mini Terminal (LHQ-OS), Command Palette (⌘K), chuyển Dark/Light mode và nhạc Lo-Fi Synth.',
      en: 'Tech-minimalist personal portfolio featuring an interactive LHQ-OS mini terminal, Command Palette (⌘K), Dark/Light theming, and a built-in Lo-Fi Web Audio synth.',
    },
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript'],
    liveUrl: 'https://dmir3r.is-a.dev/',
    githubUrl: 'https://github.com/quanlehoaq',
  },
  {
    title: 'dmir3r — Portfolio v1',
    category: 'WEB ARCHIVE',
    date: '2026',
    status: 'Live',
    icon: 'history',
    desc: {
      vi: 'Phiên bản trang portfolio đầu tiên được mình xây dựng và triển khai lên GitHub Pages — cột mốc khởi đầu trước khi nâng cấp toàn diện lên v2.',
      en: 'My very first personal portfolio website built and deployed on GitHub Pages — the starting milestone before upgrading to v2.',
    },
    tags: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
    liveUrl: 'https://dmir3r.is-a.dev/dmir3r1stportfo.github.io/',
    githubUrl: 'https://github.com/quanlehoaq/dmir3r1stportfo.github.io',
  },

  /* ------------------------------------------------------------------------
   * MẪU THÊM DỰ ÁN MỚI (bỏ dấu /* và * / để kích hoạt):
   * ------------------------------------------------------------------------
  {
    title: 'Tên dự án mới của bạn',
    category: 'SIDE PROJECT', // Nhãn nhỏ phía trên tiêu đề (tùy chọn)
    date: '2026',             // Thời gian thực hiện (tùy chọn)
    status: 'In Progress',    // 'Live' | 'Windows App' | 'In Progress' | 'Coursework'
    icon: 'code-2',           // Tên icon Lucide (tùy chọn, mặc định 'folder-git-2')
    desc: {
      vi: 'Mô tả ngắn gọn 1–2 câu về chức năng chính và công nghệ đã dùng.',
      en: 'Short 1–2 sentence English description of the project.',
    },
    tags: ['C++', 'Python', 'HTML'],
    liveUrl: '',              // Dán link web nếu có, không có thì để ''
    githubUrl: 'https://github.com/quanlehoaq/ten-repo',
  },
  */
];
