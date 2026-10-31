# QuickToolsWorld – SEO audit and keyword map

Last reviewed: October 22, 2026. **Detailed keyword research, with autocomplete evidence for the US and Pakistan, is in `docs/keyword-research.md`.** Titles in the tables below were superseded on the same day by the research-based titles in `lib/tools.ts`, which is the source of truth.

## How this was researched

- **No search-volume data was available.** Google Keyword Planner, Google Trends and Search Console were not connected, so this document contains **no search volumes, difficulty scores or CPC values**. Every keyword below is a *candidate* chosen for relevance to what the tool actually does, not a verified opportunity.
- **Search results were checked by hand** (October 22, 2026, US results) for the main query of each tool. Every head term is dominated by long-established tool sites, large brands and calculator portals. Realistic early opportunities are therefore:
  1. long-tail queries that match a specific feature (for example "compress image without uploading", "QR code generator no sign up"),
  2. the privacy angle (everything runs in the browser), which many competing tools cannot claim, and
  3. helpful guides that answer the question behind the tool.
- **Next step for the owner:** after 4–8 weeks of Search Console data, replace these candidates with the queries that actually bring impressions. Keyword Planner (free with a Google Ads account) can add volume ranges.

## Audit summary (before the October 22 changes)

| Area | Finding | Action taken |
| --- | --- | --- |
| Status codes | All 13 public pages returned 200; unknown URLs returned 404 | No change needed |
| Broken links | None found by a full crawl | Re-checked after changes |
| Canonicals | Absolute, self-referencing, on `https://www.quicktoolsworld.com` | Kept; added for blog pages |
| Duplicate titles or descriptions | None | Kept unique for new pages |
| Homepage H1 | Slogan only ("Less hassle. More done."), no description of the site | H1 is now "Free Online Tools for Everyday Tasks"; the slogan stays as large display text |
| Title length | Homepage title 81 characters, several tool titles truncated | Shortened; key words come before the brand |
| Descriptions | Several 170–204 characters | Rewritten to roughly 140–160 characters |
| Tool H1s | Just the tool name | Descriptive H1s (see map below) |
| Content depth | Tool pages already had original how-to, examples and FAQs (550–770 words) | Kept; added links to the matching guide |
| Blog | None | Blog listing and four full articles added |
| Structured data | WebSite and BreadcrumbList | Added BlogPosting (articles) and Blog (listing) |
| Sitemap / robots | Valid; correct domain | Blog URLs added; each article uses its own `lastmod` |
| Rendering | All pages statically prerendered; content is in the HTML without interaction | Blog pages are also static |
| QR quiet zone | 2 modules, below the 4-module standard | Changed to 4 modules |

## Keyword map

Intent key: **T** = transactional (wants to use a tool now), **I** = informational (wants to learn how).

### Homepage `/`

| Field | Value |
| --- | --- |
| Primary | free online tools |
| Secondary | online tools for everyday tasks, free web tools no sign up, browser-based tools |
| Intent | T (navigational once the brand is known) |
| Title | QuickToolsWorld — Free Online Tools for Everyday Tasks |
| H1 | Free Online Tools for Everyday Tasks |
| Internal links | All six tools, the blog and all four articles |
| Gaps | Brand is new, so branded searches will grow slowly. Focus on the tool pages. |

### Word Counter `/word-counter`

| Field | Value |
| --- | --- |
| Primary | word counter online |
| Secondary | free word counter, character counter online, count words in text, characters without spaces, reading time calculator |
| Long-tail candidates | word counter that doesn't save text, how many words is my essay, character count with and without spaces |
| Intent | T |
| Title | Word Counter – Free Online Word & Character Counter |
| H1 | Free Online Word and Character Counter |
| Internal links | Guide: How to Count Words and Characters…; Case Converter, Password Generator, Percentage Calculator |
| Gaps | The guide (October 25, 2026) covers length limits and spaces. Keep the tool page focused on the transactional query "word counter online" so the two don't compete. Competitors offer platform presets (tweet/SMS/meta description limits), a possible feature idea. |

### Image Compressor `/image-compressor`

| Field | Value |
| --- | --- |
| Primary | image compressor online |
| Secondary | compress image online, reduce image file size, compress JPG image, compress PNG, compress WebP |
| Long-tail candidates | compress image without uploading, reduce image size for email, compress photo under 200 KB, reduce image size without losing quality |
| Intent | T |
| Title | Image Compressor – Compress JPG, PNG & WebP Online |
| H1 | Compress Images Online for Smaller File Sizes |
| Internal links | Guide: How to Compress Images Online…; QR Code Generator, Word Counter, Case Converter |
| Gaps | A "target file size" mode (e.g. under 200 KB) matches a common need seen in search results. Batch compression is offered by many competitors. |

### QR Code Generator `/qr-code-generator`

| Field | Value |
| --- | --- |
| Primary | free QR code generator |
| Secondary | QR code generator from URL, create QR code online, text to QR code, download QR code PNG |
| Long-tail candidates | QR code generator no sign up, QR code that never expires, static QR code generator, QR code without tracking |
| Intent | T |
| Title | Free QR Code Generator – Create QR Codes from a Link or Text |
| H1 | Create and Download QR Codes Online |
| Internal links | Guide: How to Create a QR Code…; Image Compressor, Password Generator, Word Counter |
| Gaps | SVG download and Wi-Fi QR codes are common competitor features. "Never expires / no tracking" is a genuine differentiator to keep emphasizing. |

### Password Generator `/password-generator`

| Field | Value |
| --- | --- |
| Primary | secure password generator |
| Secondary | random password generator, strong password generator, password generator online |
| Long-tail candidates | password generator that runs offline in the browser, 16 character password generator, password generator without symbols |
| Intent | T |
| Title | Password Generator – Strong, Secure Random Passwords |
| H1 | Generate Strong Random Passwords |
| Internal links | Guide: How to Create Strong Passwords…; QR Code Generator, Word Counter, Case Converter |
| Gaps | A passphrase (random words) mode would match the guide's advice and a real search need. |

### Case Converter `/case-converter`

| Field | Value |
| --- | --- |
| Primary | case converter online |
| Secondary | uppercase to lowercase converter, lowercase to uppercase, title case converter, sentence case converter |
| Long-tail candidates | convert all caps to normal text, capitalize first letter of each sentence |
| Intent | T |
| Title | Case Converter – Uppercase, Lowercase, Title & Sentence Case |
| H1 | Convert Text to Uppercase, Lowercase and More |
| Internal links | Word Counter, Password Generator, Percentage Calculator |
| Gaps | Competitors add camelCase, snake_case and kebab-case for developers. No guide planned unless search data shows demand. |

### Percentage Calculator `/percentage-calculator`

| Field | Value |
| --- | --- |
| Primary | percentage calculator online |
| Secondary | calculate percentage, percentage increase calculator, percentage decrease calculator, what is X percent of Y calculator |
| Long-tail candidates | discount calculator percent off, how to work out percentage change, reverse percentage calculator |
| Intent | T |
| Title | Percentage Calculator – Percent of, Increase & Decrease |
| H1 | Calculate Percentages Online |
| Internal links | Guide: How to Calculate Percentages…; Word Counter, Case Converter, Image Compressor |
| Gaps | A reverse-percentage panel ("$64 is the price after 20% off – what was the original?") would match the guide and a common query. |

### Blog `/blog` and articles

| Page | Primary (candidate) | Intent | Links to |
| --- | --- | --- | --- |
| `/blog` | QuickToolsWorld guides | I | All nine articles (newest first), tools |
| `/blog/how-to-compress-images-online` | how to compress images online | I | Image Compressor (callout, steps, FAQ, conclusion) |
| `/blog/how-to-create-a-qr-code` | how to create a QR code | I | QR Code Generator |
| `/blog/how-to-create-strong-passwords` | create strong password | I (step-by-step tutorial) | Password Generator, the other three password articles, QR article (Wi-Fi), `/tools` |
| `/blog/how-to-generate-a-strong-password` | generate strong password | I/T (using a generator) | Password Generator, other password articles, `/tools` |
| `/blog/how-to-create-a-secure-password` | create secure password | I (account protection) | Password Generator, strong and generate articles, `/tools` |
| `/blog/strong-password-examples-and-suggestions` | suggest strong password | I (what a strong password looks like, getting suggestions) | Password Generator, other password articles, `/tools` |
| `/blog/what-is-a-capitalization-converter` | capitalization converter | I | Case Converter, Word Counter, `/tools` |
| `/blog/how-to-calculate-percentages` | how to calculate percentage | I | Percentage Calculator, `/tools` |
| `/blog/how-to-count-words-and-characters` | how to count words and characters | I | Word Counter, Case Converter, `/tools`, `/blog` |

### Article keyword mapping (updated October 25, 2026)

SC = query seen in Google Search Console (URL-prefix property, October 20–22, 2026, 0 clicks). SS = query from the owner's Search Console screenshot (impressions, not search volume). AC = Google autocomplete suggestion (US, English). No search volumes or difficulty scores were available.

| Article | Primary | Secondary | Evidence |
| --- | --- | --- | --- |
| Percentages | how to calculate percentage | percentage of a number, percentage of marks (6 subjects), percentage increase/decrease, percentage difference, percentage points vs percent | SC: "how to calculate percentage of a number", "how to calculate percentage increase between two numbers", "percent increase and decrease problems". AC: the rest |
| Words and characters | how to count words and characters | character count with/without spaces, do spaces count as characters, sentence and paragraph counter, word limits | AC only. The tool page keeps "word counter online" so the article doesn't compete with it |
| Strong password | how to create a strong password | create complex password, generate strong password, create secure password, suggest strong password, create a password | SS: create complex password (13), generate strong password (11), create a password (7), create secure password (5), create password, suggest strong password, suggest new password (4 each). SC: "how to let google generate a strong password" |
| QR code | how to create a QR code | QR code from a link/text, Wi-Fi QR code, static vs dynamic, how to scan, test before printing | SC: "how do i make a qr code", "how to create a dynamic qr code", "qr code for text", "make qr code for link". AC: Wi-Fi, static vs dynamic, test |
| Images | compress images online | compress JPG/PNG/WebP, reduce photo size, image size for website, lossy vs lossless | AC only |

The suggested new URLs `/blog/how-to-calculate-percentage` and `/blog/how-to-create-a-strong-password` were not created, because they would duplicate the existing articles above and split their ranking signals.

Secondary topics each article covers are listed in its table of contents. Do not create separate pages for small keyword variations (for example "compress JPG" vs "compress JPEG"). They belong on the existing page.

### Password and capitalization articles (added October 31, 2026)

Evidence: Search Console URL-prefix property, last 28 days to October 28, 2026 (988 impressions, 1 click, 262 queries). Figures are impressions, not search volume. AC = Google autocomplete (US, English), October 31, 2026. Before these articles, `/blog/how-to-create-strong-passwords` received 525 of the 988 impressions, mostly for the password queries below, so its URL was kept.

| Article | Primary | Secondary and long-tail | Evidence |
| --- | --- | --- | --- |
| How to Generate a Strong Password | generate strong password | generate secure password, strong random password, password length (8/12/14/16/20), symbols, generate password based on word, easy to remember | SC: generate strong password (59), generate password based on word (35), generate secure password (25), strong random password (7), 16 character password generator (1). AC: "… 8/14/16 characters", "… easy to remember", "… for me" |
| How to Create a Secure Password | create secure password | secure password, password manager, password reuse, MFA, phishing, breach, change passwords | SC: create secure password (39), secure password (4), how to make a secure password (3), create a secure password (2), creating secure passwords (2). AC: "secure password manager", "creating secure passwords you can remember" |
| Strong Password Examples and Suggestions | suggest strong password | strong password examples, suggested passwords, suggest new password, Chrome/iPhone suggestions, suggestion not showing, good passwords | SC: suggest strong password (39), suggested passwords (24), good passwords (4), suggest new password (4), suggest a strong password (2). AC: "… google not showing", "… chrome", "… iphone", "strong password examples easy to remember" |
| How to Create a Strong Password (existing URL) | create strong password | create a strong password, create complex password, create a password, passphrase, unique passwords, password I can remember | SC: create strong password (37), create a strong password (35), create a password (27), create complex password (27), how to create a strong password (11). AC: "… that I can remember", "… with numbers letters and symbols" |
| What Is a Capitalization Converter? | capitalization converter | convert uppercase to lowercase, lowercase to uppercase, title case, sentence case, title vs sentence case, APA | SC: capitalization converter (29), title case converter uk (5), upper word converter (1), caps converter (1). AC: "title case vs sentence case", "what is title case in apa", "convert uppercase to lowercase in word/excel" |

Cannibalization controls: each password article has a different job (tutorial, generator settings, account security, examples and browser suggestions), a different H1, introduction, tables and FAQ set, and shares under 0.5% of its 8-word phrases with any other. Each links to the others where the reader needs that topic rather than repeating it. The capitalization article explains the topic; the `/case-converter` tool page stays the target for "case converter" tool searches.

The suggested URL `/blog/how-to-create-a-strong-password` was not created; the "create strong password" article remains at `/blog/how-to-create-strong-passwords`, which already ranks for those queries.

## Internal linking rules

- Homepage → all tools, `/blog` and each article.
- Each tool page → breadcrumb, related tools, "Browse all tools" (`/tools`), and its guides (one "Read the guides" box listing all of them) plus contextual links in the body.
- Each article → its tool near the top (callout), within the step-by-step instructions, in the FAQ where useful, and in the conclusion; plus "More guides".
- "More guides" under each article → other guides for the same tool first, then the newest guides for other tools (up to six).
- Homepage → the newest guide for each tool (six cards) and "Visit the blog".
- Header and footer → Home, All Tools, Blog, About, Contact; footer also links every tool and legal page.
- Use normal `<a href>` links with short, descriptive anchor text. No keyword-stuffed anchors.
