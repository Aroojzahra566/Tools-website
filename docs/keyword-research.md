# QuickToolsWorld – keyword research

Research date: October 22, 2026. Read together with `docs/seo-keyword-map.md`, which maps each page and records internal linking rules.

## What data this is based on, and what it is not

| Source | Used? | What it tells us |
| --- | --- | --- |
| Google Keyword Planner | **No.** It needs a signed-in Google Ads account, which isn't available here | Monthly search volume ranges by country |
| Google Trends | **No.** Not accessible from this environment | Relative interest over time and by country |
| Google Search Console | **No.** Not connected yet | Real impressions, clicks and positions for this site |
| **Google autocomplete** | **Yes.** 47 seed keywords were queried for both **US English (`gl=us`) and Pakistan (`gl=pk`)** | Which longer queries people commonly type. Suggestions are ordered by popularity, but they have **no volumes** |
| **Search results (manual review)** | **Yes.** The main query for each tool, plus "compress image to 100kb" and "percentage calculator of marks" | Who ranks, what type of page ranks, and what features searchers expect |

**There are no search volumes, difficulty scores or CPC values in this document.** Every volume and difficulty column says *unverified*. Priority is based on autocomplete evidence, relevance and what the site can genuinely deliver, not on traffic numbers.

### How to get the real numbers yourself

1. **Keyword Planner** (free): sign in at [ads.google.com](https://ads.google.com), then go to **Tools → Keyword Planner → Get search volume and forecasts**. Paste the keywords from the tables below, then set **Locations** to *Pakistan* and run it again with *All locations* or *United States*. You'll see monthly volume ranges and competition. Without an active ad campaign, volumes appear as broad ranges, such as 1K–10K.
2. **Google Trends** ([trends.google.com](https://trends.google.com)): compare up to five terms, such as *compress image to 100kb* vs *compress image to 200kb*, set the region to Pakistan or Worldwide, and the time range to 12 months.
3. **Search Console** (after 4–8 weeks of data): **Performance → Search results**, filtered by **Page** and **Country**. This shows the queries the site actually appears for. It is the most reliable source, so update this file with it.

## Key findings

1. **Size-target image compression is the dominant long-tail theme.** Almost every image seed autocompletes to a size: *to 100kb, 200kb, 50kb, 20kb, 500kb, 1mb*. Several of these appear only in Pakistan's suggestions (*to 100kb*, *to 500kb*, *to 25kb*, *in kb*). Search results are dominated by single-purpose "compress image to 100KB" pages, often aimed at government and exam form uploads. **Action taken:** a real **Target size** feature in the Image Compressor (20 KB, 50 KB, 100 KB, 200 KB, 500 KB, 1 MB), plus content explaining it.
2. **Students in Pakistan search for "percentage of marks" and CGPA.** *percentage calculator of marks*, *calculate percentage of marks* and *from cgpa* appear only in Pakistan's suggestions. **Action taken:** a marks section on the tool page and in the percentages guide. CGPA formulas vary by institution, so the content points to the institution's formula instead of inventing one.
3. **"Percentage difference" is a distinct query** that the calculator didn't support. **Action taken:** added a fifth panel, *Percentage difference between X and Y*.
4. **Password searches are length-driven:** *8, 10, 12, 14, 15, 16, 20 characters*. Many also ask for *with words* or *easy to remember* (passphrases). **Action taken:** quick length buttons (8, 12, 16, 20, 32) and a length guidance section. **Not built:** a passphrase mode (see recommendations).
5. **QR searchers want trust signals:** *free no expiration*, *that doesn't expire*, *no sign up*. Static codes genuinely never expire, so the title and description now say so. *with logo* and *for location* are also common. Location is now covered in the content (via a map share link); logo support isn't built.
6. **Word counter searches mention languages:** *hindi, arabic, french, chinese*, and *urdu* in Pakistan. Testing confirmed the counter handles Urdu, Hindi and Arabic correctly; Chinese and Japanese are counted as approximate dictionary words. **Action taken:** a language FAQ that says exactly that.
7. **Head terms are extremely competitive** (big brands and long-established tool sites: Grammarly, QuillBot, iLovePDF, 11zon, Canva, Adobe, QR Code Monkey, Omni Calculator). They are worth targeting on-page, but realistic early impressions will come from the long-tail rows marked **High** below.

## Keyword table

Columns:
- **Volume / KD:** always *unverified* (see above).
- **Evidence:** where the term appeared. *AC-US* and *AC-PK* mean US or Pakistan autocomplete; *seed* means it was one of the starting terms.
- **SERP:** page types observed in the search results.

### Word Counter → `/word-counter`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| word counter | Tool | unverified | seed, AC-US/PK | Exact | Tool pages, Google Docs help, browser extensions | Title and H1 | Medium (very competitive) |
| word counter online / free word counter | Tool | unverified | AC-US/PK | Exact | Tool pages | H1 "Free Online Word and Character Counter" | Medium |
| character counter / character counter online | Tool | unverified | AC-US/PK | Exact | Tool pages | Title "Count Words & Characters" | Medium |
| character count with spaces / without spaces | Tool | unverified | AC-US | Exact (both counts shown) | Tool pages, Excel help | Title "With or Without Spaces"; existing FAQ | **High** |
| word counter urdu / hindi / arabic | Tool | unverified | AC-PK (urdu), AC-US | Supported (tested) | Mixed | Language FAQ added | **High** |
| reading time calculator | Tool | unverified | seed, AC-US | Supported (reading and speaking time) | Calculator pages | Covered in content | Medium |
| word count checker | Tool | unverified | seed, AC-US/PK | Exact | Tools, Grammarly | Natural mention only | Low |
| word counter pdf / picture / extension | Tool | unverified | AC-US/PK | **Not supported** | — | Don't target | — |

### Image Compressor → `/image-compressor` · Guide: `/blog/how-to-compress-images-online`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| compress image to 100kb | Tool | unverified | AC-US/PK (many variants) | **Now supported** (Target size) | Single-purpose "to 100KB" tool pages | Feature built; title, H2 and FAQ | **High** |
| compress image to 200kb / 50kb / 20kb / 500kb / 1mb | Tool | unverified | AC-US/PK | **Now supported** | Same | Same section and presets | **High** |
| reduce image size in kb | Tool | unverified | AC-PK | Supported | Tool pages | Covered by target-size content | **High** |
| image compressor / image compressor online | Tool | unverified | seed, AC-US/PK | Exact | Tool sites (TinyPNG, iLovePDF, 11zon) | Title | Medium |
| compress jpg / compress png | Tool | unverified | seed, AC-US/PK | Exact | Tool pages | Title "Compress JPG & PNG" | Medium |
| image size reducer | Tool | unverified | seed, AC-US/PK | Exact | Tool pages | Natural mention | Medium |
| reduce image size without losing quality | Info + tool | unverified | seed, AC-US/PK | Explained honestly (no lossless guarantee) | Guides and tools | Guide covers it | Medium |
| image compressor for discord / iphone / mac | Tool | unverified | AC-US | Works in any browser, not platform-specific | — | Don't create separate pages | Low |
| bulk image compressor | Tool | unverified | AC-US | **Not supported** (one image at a time) | — | Possible future feature | — |

### QR Code Generator → `/qr-code-generator` · Guide: `/blog/how-to-create-a-qr-code`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| free qr code generator no expiration / that doesn't expire | Tool | unverified | AC-US | Exact (static codes) | Tool sites, Reddit threads | Title "Codes Never Expire"; FAQ | **High** |
| qr code generator no sign up | Tool | unverified | AC-US | Exact | Tool sites | Title "No Sign-Up" | **High** |
| url to qr code / create qr code from link | Tool | unverified | seed, AC-US/PK | Exact | Tool pages | H1, guide section | Medium |
| text to qr code | Tool | unverified | seed, AC-US | Exact | Tool pages | Guide section | Medium |
| qr code generator / free qr code generator | Tool | unverified | seed, AC-US/PK | Exact | Large brands (Canva, Adobe, QR Code Monkey) | Title | Medium (very competitive) |
| create qr code for location | Tool | unverified | AC-US/PK | Supported via map share link | Mixed | Example and guide paragraph added | Medium |
| create qr code for pdf | Tool | unverified | AC-PK | Partly (link to a hosted PDF) | Mixed | Explained honestly in content | Low |
| qr code generator with logo | Tool | unverified | AC-US/PK | **Not supported** | — | Possible future feature | — |
| qr code png download | Tool | unverified | seed, AC-US | Ambiguous (many want a QR icon image) | Image and stock sites | Don't target | Low |

### Password Generator → `/password-generator` · Guide: `/blog/how-to-create-strong-passwords`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| password generator 12 / 16 / 8 / 20 characters | Tool | unverified | AC-US/PK (most frequent pattern) | Exact | Tool pages, password-manager brands | Length buttons and length section | **High** |
| random password generator | Tool | unverified | seed, AC-US/PK | Exact | Password-manager brands (LastPass, Norton, Bitwarden) | Title now leads with "Random" | Medium |
| strong / secure password generator | Tool | unverified | seed, AC-US/PK | Exact | Same | Title and H1 | Medium |
| password generator easy to remember / with words | Tool | unverified | AC-US/PK | **Not supported** (no passphrase mode) | Brands, EFF-style generators | Possible future feature | — |
| how long should a password be | Info | unverified | related | Answered | Guides, NIST/CISA | Guide and tool page | Medium |

### Case Converter → `/case-converter`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| case converter / text case converter | Tool | unverified | seed, AC-US/PK | Exact | Tool sites | Title | Medium |
| uppercase to lowercase converter / caps to lowercase | Tool | unverified | seed, AC-US | Exact | Tool pages, Excel and Word help | H1 | Medium |
| lowercase to uppercase converter | Tool | unverified | seed, AC-US | Exact | Same | H1 | Medium |
| title case converter | Tool | unverified | seed, AC-US | Exact (general style) | Tool sites, AP/Chicago-specific tools | Title, FAQ on style guides | Medium |
| sentence case converter | Tool | unverified | seed, AC-US | Exact | Tool pages | Title | Medium |
| proper case converter | Tool | unverified | AC-US | Related (explained) | Excel help | FAQ added | Low |
| convert text to uppercase in excel / word | Info | unverified | AC-US | Different product | Microsoft help | Don't target | — |

### Percentage Calculator → `/percentage-calculator` · Guide: `/blog/how-to-calculate-percentages`

| Keyword | Intent | Volume / KD | Evidence | Relevance | SERP | Action | Priority |
| --- | --- | --- | --- | --- | --- | --- | --- |
| percentage calculator of marks / calculate percentage of marks | Tool + info | unverified | **AC-PK only** | Supported ("X is what % of Y") | Single-purpose marks calculators, education sites | Section, FAQ and guide section | **High (Pakistan)** |
| percentage difference calculator / between two numbers | Tool | unverified | seed, AC-US/PK | **Now supported** (new panel) | Calculator portals (Omni, Calculator Soup) | Panel, H3 and guide section | **High** |
| percentage increase calculator / decrease calculator | Tool | unverified | seed, AC-US | Exact | Calculator portals | Title | Medium |
| what is x percent of y | Tool + info | unverified | seed, AC-US | Exact | Calculators, featured snippets | Panel and guide | Medium |
| percentage calculator | Tool | unverified | seed, AC-US/PK | Exact | Calculator portals (very competitive) | Title | Medium |
| cgpa to percentage | Tool | unverified | AC-PK | **Not supported** (formulas vary by institution) | University pages | Explained, no calculator | — |
| percentage formula in excel | Info | unverified | AC-US/PK | Different product | Microsoft help | Don't target | — |

## Cannibalization check

| Query theme | Tool page | Guide | Resolution |
| --- | --- | --- | --- |
| compress image (to 100 KB) | Transactional: do it now | Informational: understand and avoid mistakes | Different intent. The tool page title targets the action; the guide title is "How to…". They link to each other. |
| create a QR code | Transactional | How-to and safety | Same approach |
| strong password | Transactional (generate) | Informational (habits, storage, MFA) | Same approach |
| calculate percentage / of marks | Transactional (calculate) | Formulas and worked examples | Same approach. Marks content is short on the tool page and full in the guide. |

No two pages target the same query with the same intent, and no duplicate pages were created.

## Recommendations not implemented (future, only if the data supports them)

1. **Passphrase mode** in the Password Generator ("with words" / "easy to remember"). It would need a vetted word list, such as the EFF list (CC BY 3.0, credit required).
2. **QR code with a logo.** It must keep error correction high enough to scan reliably.
3. **Batch image compression** (several images at once).
4. **Word Counter guide**, for example "How many pages is 1,000 words?", only if Search Console shows related impressions.
5. **Re-run this research with Keyword Planner volumes for Pakistan and worldwide**, then reorder priorities.
