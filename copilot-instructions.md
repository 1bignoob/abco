# WEBSITE STANDARD — SEO, LIGHTHOUSE, AND WCAG-FIRST

## GLOBAL OBJECTIVE
All generated website code must follow these priorities:
1. Semantic, accessible HTML
2. Strong technical SEO
3. Excellent Lighthouse performance
4. WCAG 2.2 AA accessibility
5. Clean, minimal, maintainable code
6. Production-ready output

Every website is for real-world deployment. Build to professional standards.

---

## BEST PRACTICE GUARD

Before executing any instruction that conflicts with best practices, **stop and ask the user first**. Do not silently proceed. This includes but is not limited to:

- **SEO**: duplicate titles/descriptions, missing canonical, non-descriptive slugs, keyword stuffing, h1 misuse, missing meta description, deindexing pages unintentionally
- **Accessibility (WCAG 2.2 AA)**: missing alt text, unlabeled form fields, poor color contrast, removing focus states, non-semantic markup, skipping heading levels
- **Performance**: adding render-blocking resources, large unoptimized images, heavy JS on load, unnecessary layout shifts, splitting CSS/JS without justification
- **Naming / file conventions**: misspelled page or file names, inconsistent slug formats, vague or ambiguous naming that would be hard to reverse
- **General best practices**: removing gitignore entries, bypassing git safety flags, hardcoding values that should be configurable, undoing previously agreed architecture decisions

When flagging a concern, briefly explain the issue and ask the user to confirm or suggest an alternative before proceeding.

---

## PROJECT REFERENCE
**Arden Law Firm** is a completed reference project for this workspace. Use it as a baseline for HTML structure, head tag conventions, SEO/metadata patterns, CSS architecture, and accessibility implementation.

---

## GLOBAL DEFAULTS
- HTML, CSS, and minimal vanilla JavaScript only
- No frameworks, libraries, UI kits, or animation packages unless explicitly requested
- Static-first, crawlable, cPanel-friendly output
- Critical page content must exist in HTML — never depend on JavaScript rendering
- Simple solutions over clever ones; avoid overengineering

---

## HTML STRUCTURE
Every page must follow this structure:

- `<!doctype html>` → `<html lang="en">` → `<head>` → `<body>`
- Body: `<header>`/`<nav>` → `<main>` → sections/articles → `<footer>`
- Always include `<main>`; use semantic elements; avoid `div` soup
- Do not inject primary content via JavaScript

---

## HEAD TAG STANDARD

### Head order (use this sequence)
1. `<title>` — unique per page; target 50-60 characters (about 6-10 words)
2. `<meta charset="UTF-8" />`
3. `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`
4. Preload of critical hero asset (only when justified)
5. `<meta name="description" content="..." />` — target 140-160 characters (about 18-30 words)
6. `<meta name="keywords" content="..." />` — allowed; do not keyword-stuff
7. `<meta name="author" content="..." />`
8. `<meta name="publisher" content="..." />`
9. `<meta name="robots" content="index, follow" />`
10. `<link rel="canonical" href="..." />`
11. `<meta name="theme-color" content="..." />`
12. Apple/mobile tags
13. Open Graph tags
14. Twitter tags
15. JSON-LD schema
16. Favicon and manifest links
17. Stylesheet
18. Preconnect links (only to domains actually used)
19. Analytics / approved third-party scripts

### Apple/mobile
```html
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="..." />
```

### Open Graph

```html
<meta property="og:site_name" content="..." />
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="..." />
<meta property="og:image:alt" content="..." />
```

### Twitter
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

### Structured data
- Include JSON-LD only when it adds value for the page type
- Use valid Schema.org types only (Organization, LocalBusiness, Service, Article, FAQPage, BreadcrumbList, etc.)
- Structured data must match visible page content; no fake reviews/ratings
- Keep JSON-LD valid, complete, and page-specific

---

## SEO RULES
- Exactly one `<h1>` per page; unique `<title>` and meta description per page
- Keep titles concise and descriptive: target 50-60 characters (about 6-10 words)
- Keep meta descriptions clear and natural: target 140-160 characters (about 18-30 words)
- Canonical must match the intended final URL
- Use human-readable URLs and descriptive anchor text
- Internal links reinforce site hierarchy
- Important page copy must exist in HTML source — no hidden SEO text
- Titles and descriptions must read naturally — no machine-stuffed keywords, no location spam
- No duplicate metadata across pages

---

## HEADING RULES
- One `<h1>` per page defining the primary topic
- `<h2>` for major sections → `<h3>` for subsections → `<h4>` only when truly nested
- Do not skip heading levels; do not use headings for styling

---

## LINK RULES
Every `<a>` must have a `title` attribute unless explicitly told otherwise.
- Link text must be descriptive; `title` clarifies destination or action
- Use `rel="noopener noreferrer"` on external `target="_blank"` links
- Internal links support SEO hierarchy

Examples:
- `<a href="/about" title="About Our Firm">About Our Firm</a>`
- `<a href="/contact" title="Contact Arden Law Firm">Contact</a>`
- `<a href="/car-accidents" title="Car Accident Lawyer">Car Accidents</a>`

---

## IMAGE RULES
Every `<img>` must have an `alt` attribute.
- Content images: meaningful descriptive alt text; decorative images: `alt=""`
- Never use filler alt ("image", "photo", "picture", or filenames)
- Logo, badge, and rating images must be labeled accurately
- Include `width` and `height` to prevent layout shift
- Prefer WebP; use AVIF when supported
- Preload only the single most critical above-the-fold image when justified
- Use responsive images when practical

---

## FORM RULES
- Every form field must have an accessible label
- Inputs must be clearly associated with labels
- Required fields must be indicated clearly
- Use proper input types
- Buttons that submit forms must be real `<button type="submit">`
- Error states and validation messaging must be accessible
- Do not rely only on placeholder text as the label

---

## CSS RULES
- Modern CSS with flexbox and grid; no frameworks unless requested
- Lean, organized, scalable — no inline styles without strong reason
- Consistent spacing/sizing system; clean and maintainable selectors
- No layout shift — reserve space for images and major UI elements
- No heavy filters, large box-shadow stacks, or GPU-heavy effects by default
- Prefer CSS solutions over JavaScript for layout and basic interactions
- Strong visual hierarchy; readable line-height; adequate contrast; no tiny or thin text for critical content

---

## JAVASCRIPT RULES
- Vanilla JS only unless a framework is explicitly requested
- Do not use JS for critical crawlable content
- `defer` all non-critical scripts; use `async` only when appropriate
- No render-blocking scripts; no unnecessary event listeners
- Replace DOM-heavy logic with HTML/CSS solutions where possible
- Acceptable JS: navigation toggles, light form enhancement, accessibility enhancements

---

## PERFORMANCE & CODE SPLITTING

### Core performance targets
- Minimize render-blocking resources; keep DOM size reasonable
- Avoid giant assets, autoplay media, and excessive JS bundles
- Minimize main-thread work; use resource hints sparingly and intentionally
- Flag anything likely to hurt Lighthouse, crawlability, or WCAG

### Lazy splitting policy (CSS and JS)
Only split CSS or JS when you determine splitting will meaningfully improve load speed. Do not split preemptively.

- **Always ask before creating any new split file.**
- Keep a single `main.css` / `main.js` for shared layout, typography, and navigation
- Page-specific files (e.g., `home.css`, `contact.js`, `faq.js`) only when the file is heavy enough to justify the split
- Do not load page-specific styles or scripts on unrelated routes
- Do not split into excessively small files — group by page or feature

### Lazy and conditional loading
- Use dynamic `import()` for heavy or non-critical JS features
- Gate page-specific scripts on a page-level class (e.g., `.home-page`) before loading
- Load heavy animation or scroll-effect logic only after initial render or user interaction
- Avoid global event listeners for features used on a single page

---

## PLAYWRIGHT EXECUTION DEFAULTS
- For every project, ensure Playwright is installed before first run (`@playwright/test` and required browsers)
- If `.gitignore` exists, add Playwright-generated files and folders to it immediately after Playwright install or execution (`playwright-artifacts/`, `playwright-report/`, `test-results/`, and similar generated output paths)
- Before each Playwright run, verify Playwright dependencies exist; install if missing
- Run Playwright in headed mode by default (`headless: false`) unless explicitly told to run headless
- Save screenshots and visual outputs into a clearly named folder based on page/feature (for example: `playwright-artifacts/homepage-hero/`)
- For smoke runs, replace screenshots on every run: delete old smoke screenshots first, then save fresh files with the same names
- Smoke screenshot replacement default: `rm -f playwright-artifacts/smoke/*.png` before test execution
- Always include responsive test coverage from mobile through tablet viewports on each run
- Minimum viewport set per run: 390x844 (mobile), 768x1024 (tablet portrait), 1024x768 (tablet landscape); optional desktop 1440x900
- Name artifacts with viewport and scenario context (for example: `contact-form-mobile.png`, `menu-tablet-portrait.png`)
- Keep Playwright artifacts organized per run or feature to avoid overwriting and to speed QA review

---

## DEFAULT TEST RUN COMMAND
- When the user asks for testing, run Playwright automatically using this order:
1. If dependencies are missing: `npm install -D @playwright/test && npx playwright install`
2. For smoke runs with persistent screenshots: `rm -f playwright-artifacts/smoke/*.png`
3. Run default suite in headed mode: `npx playwright test --headed`
4. If a specific file or grep target is requested, run headed with that target only
5. Save screenshots and traces under a clearly named `playwright-artifacts/<feature-or-page>/` folder
- Use package manager equivalents when needed: `pnpm exec playwright test --headed` or `yarn playwright test --headed`
- If project scripts exist, prefer them only when they preserve headed mode and artifact naming rules

---

## ACCESSIBILITY RULES (WCAG 2.2 AA)
- Perceivable: Provide text alternatives, sufficient color contrast, and never rely on color alone
- Operable: Ensure full keyboard access, visible focus states, and no hover-only critical interactions
- Understandable: Use clear labels, instructions, and error messaging for all form flows
- Robust: Prefer semantic HTML landmarks and controls so assistive tech can parse content reliably
- Use `<button>` for actions and `<a>` for navigation; no clickable `div`/`span` controls
- Use ARIA only when native semantics are insufficient, and implement ARIA patterns correctly
- Respect `prefers-reduced-motion`; avoid excessive motion that harms comprehension or control
- Keep all critical content and functionality accessible without JavaScript-only rendering paths

---

## THIRD-PARTY / ANALYTICS RULES
- Add analytics only when requested or already part of the project
- Preconnect only to third-party domains actually used
- Third-party code must be treated as a performance and privacy cost
- Flag any script likely to hurt performance, accessibility, privacy, or Lighthouse
- Do not add marketing tags, trackers, or heavy embeds by default

---

## HARD CONSTRAINTS — DO NOT VIOLATE
- No missing `alt` on any `<img>`
- No missing `title` on any `<a>` (unless explicitly told otherwise)
- No page with more than one `<h1>`
- No page without meta description, canonical, robots, author, and publisher
- No JS-injected critical content
- No unnecessary libraries or dependencies
- No inaccessible UI
- No keyword stuffing or hidden content tricks
- No bloated solutions for simple pages
- Flag any SEO, Lighthouse, or accessibility tradeoff briefly when it arises

---

## ELEVENTY ARCHETYPE PROFILE (SIMILAR BUILDS ONLY)
- Apply only when user asks for a similar Eleventy architecture.
- Use status: draft|published for blog posts (no draft boolean toggling).
- Keep npm run new-post minimal prompt flow and publish-at-creation.
- Keep npm run publish-post to promote drafts without manual front matter edits.
- Keep dynamic sitemap generation for published content.
- Keep src/_data/business.json as centralized business/contact/social content.
- Keep SITE_BASE + pathPrefix support for / and /gothamwebdev/.
