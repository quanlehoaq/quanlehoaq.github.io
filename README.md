# dmir3r_ — Portfolio v2

Personal portfolio website of **Lê Hoàng Quân (`dmir3r_`)** — Computer Science student @ Ton Duc Thang University (TDTU).

🌐 **Live:** [https://dmir3r.is-a.dev/](https://dmir3r.is-a.dev/)

---

## Features

- **Handwritten SVG Signature Intro:** Smooth two-phase animated signature splash with skip support (`Esc` / click / `intro` command).
- **Dark / Light Theme:** Tech-minimalist Cyber Dark and Light Minimal themes with contrast-tuned palettes and `localStorage` persistence.
- **Bilingual (`VI / EN`):** Instant Vietnamese / English switcher across UI, skills, and projects.
- **Selected Works Showcase:** Full-width vertical project banners with quick icon navigation, tags, live/GitHub/download links, and one-click SHA-256 copy — all driven by [`projects.js`](./projects.js).
- **LHQ-OS v3.0 Mini Terminal:** Interactive shell supporting `neofetch`, `whoami`, `skills`, `projects`, `matrix`, `intro`, `theme`, `lang`, `Tab` autocomplete, and `↑/↓` history.
- **Command Palette (`Ctrl+K` / `⌘K`):** Fast keyboard navigation and quick actions.
- **Built-in Lo-Fi Focus Synth:** Zero-dependency ambient chord synthesizer powered by the Web Audio API.

---

## Project Structure

```text
.
├── index.html   # Main markup & layout (Tailwind CSS CDN + Lucide Icons)
├── styles.css   # Theme tokens, spotlight cards, intro & showcase animations
├── app.js       # Interactive engine (i18n, theme, terminal, synth, command palette)
├── projects.js  # Project data list (edit here to add/update projects)
├── LICENSE      # MIT License (source code)
└── README.md    # Documentation & usage notice
```

---

## Adding a Project

Edit `window.PROJECTS` in [`projects.js`](./projects.js). Both the **Selected Works** showcase and the `projects` command in the Mini Terminal update automatically.

---

## License & Usage Notice

- **Source Code:** Licensed under the [MIT License](./LICENSE) — Copyright © 2026 **Lê Hoàng Quân (`dmir3r_`)**. You are free to study, fork, and adapt the code structure as long as you include the original copyright and license notice.
- **Personal Content & Branding (All Rights Reserved):** Personal information, biography, custom handwritten SVG signature (`#signature-path`), branding (`dmir3r_`), and personal links belong exclusively to the author. If you reuse this template, please replace all personal details and assets with your own.
