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
| Internal links | Case Converter, Password Generator, Percentage Calculator |
| Gaps | No guide yet. A future article could cover "How long is 1,000 words?" or essay/social-media length limits, if Search Console shows demand. Competitors offer platform presets (tweet/SMS/meta description limits), a possible feature idea. |

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
| `/blog` | QuickToolsWorld guides | I | All four articles, tools |
| `/blog/how-to-compress-images-online` | how to compress images online | I | Image Compressor (callout, steps, FAQ, conclusion) |
| `/blog/how-to-create-a-qr-code` | how to create a QR code | I | QR Code Generator |
| `/blog/how-to-create-strong-passwords` | how to create a strong password | I | Password Generator |
| `/blog/how-to-calculate-percentages` | how to calculate percentages | I | Percentage Calculator |

Secondary topics each article covers are listed in its table of contents. Do not create separate pages for small keyword variations (for example "compress JPG" vs "compress JPEG"). They belong on the existing page.

## Internal linking rules

- Homepage → all tools, `/blog` and each article.
- Each tool page → breadcrumb, related tools, "Browse all tools" (`/tools`), and its guide where one exists.
- Each article → its tool near the top (callout), within the step-by-step instructions, in the FAQ where useful, and in the conclusion; plus "More guides".
- Header and footer → Home, All Tools, Blog, About, Contact; footer also links every tool and legal page.
- Use normal `<a href>` links with short, descriptive anchor text. No keyword-stuffed anchors.
