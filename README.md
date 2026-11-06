# Xenofon Papadopoulos – Portfolio

Personal portfolio for an embedded and flight software engineer. Plain HTML, CSS and JavaScript, with no build step and no framework. It is hosted on GitHub Pages.

Live site: https://grxeno.github.io/Portfolio/

## Features

- Dark space theme with a twinkling starfield, plus a light/dark toggle (remembered between visits)
- Animated orbit hero and a headline that types through different phrases
- Count-up stats, scroll-reveal sections, scroll progress bar and active nav highlighting
- Projects section generated from a simple data file
- Responsive layout and `prefers-reduced-motion` support

## Project structure

```
Portfolio/
├── index.html        Page content (hero, experience, about, contact)
├── style.css         All styling, colors and layout
├── script.js         Animations, theme toggle, projects renderer
├── projects.js       Your project list (edit this one most often)
├── README.md
└── files/
    ├── .project-ideas.txt          Private notes (hidden, not linked)
    ├── XenofonPapadopoulosCV.pdf
    ├── XenofonPapadopoulosThesis.pdf
    └── images/
        ├── profile.jpg
        └── grxeno_logo.png
```

There is also an optional single-file version, `index-all-in-one.html`, with the CSS, JavaScript and project list inside one file. Use it **instead of** the split files: rename it to `index.html` and delete `style.css`, `script.js` and `projects.js`. Don't keep both `index.html` files in the same folder.

## Run it locally

Open `index.html` in a browser. To serve it the way GitHub Pages does:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy to GitHub Pages

1. Push the files to your repository (branch `main`, root folder).
2. In the repository go to **Settings → Pages** and choose **Deploy from a branch → main → / (root)**.
3. Wait a minute, then open the site URL. After updating, do a hard refresh (Ctrl+Shift+R) to avoid cached files.

## How to update things

### Add or edit a project

Open `projects.js` and copy one block:

```js
{
  title: "Mini flight software on STM32",
  text: "FreeRTOS tasks, a command handler and a safe-mode state machine.",
  tags: "C · FreeRTOS · STM32",
  link: "https://github.com/GRxeno/your-repo",
  label: "View on GitHub"
},
```

- Order in the file is the order on the page.
- `tags`, `link` and `label` are optional.
- Every block needs a comma after its closing `}` (the last one can go without). A missing comma will leave the section blank. Press F12 and check the console to find it.

### Edit experience, about text or contact details

These are written directly in `index.html`. Search for the section id (`experience`, `about`, `contact`) and edit the text. Your email is in the `mailto:` links in the contact section.

### Change the rotating headline

In `script.js`, edit the `words` array. Keep phrases short so they stay on one line.

### Change the stats

In `index.html`, the numbers in the stats strip are set with `data-count`. The "years" counter is calculated automatically from `2021-08-01` in `script.js`, so change that date if needed.

### Change colors, fonts or sizes

At the top of `style.css`, the `:root` blocks hold the color variables (`--accent`, `--accent2`, `--bg` and so on). One block is for light mode, the other for dark mode. The headline size is set by `8.2cqw` in the `.hero h1` rule.

### Update your CV or thesis

Replace the PDFs in `files/` and keep the same file names, or update the links in `index.html`.

## Hidden project notes

`files/.project-ideas.txt` contains private notes on portfolio projects to build for aerospace roles. It starts with a dot, so file managers hide it, and GitHub Pages does not publish it. It is not linked from the site.

## Troubleshooting

- **Projects section is empty:** check `projects.js` for a missing comma or quote, and make sure it is uploaded next to `index.html`.
- **Images are missing:** check that `files/images/profile.jpg` and `files/images/grxeno_logo.png` exist and the names match exactly (they are case sensitive).
- **Old styling after an update:** hard refresh with Ctrl+Shift+R.
- **Fonts look different:** the site loads Bricolage Grotesque, Figtree and JetBrains Mono from Google Fonts and falls back to system fonts if they are blocked.

## Contact

xinipap@gmail.com · [LinkedIn](https://www.linkedin.com/in/xenopap) · [GitHub](https://github.com/GRxeno/)
