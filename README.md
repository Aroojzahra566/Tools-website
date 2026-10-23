# QuickToolsWorld – free online tools

**https://quicktoolsworld.com** · *Your everyday tools. One quick stop.*

A fast, privacy-friendly website with six browser-based tools:

| Tool | Route |
| --- | --- |
| Word Counter | `/word-counter` |
| Image Compressor | `/image-compressor` |
| QR Code Generator | `/qr-code-generator` |
| Password Generator | `/password-generator` |
| Case Converter | `/case-converter` |
| Percentage Calculator | `/percentage-calculator` |

Plus `/`, `/tools`, `/blog` (with four guides), `/about`, `/contact`, `/privacy-policy`, `/terms`, `/disclaimer`, a custom 404, `/sitemap.xml`, `/robots.txt` and `/ads.txt`.

Every tool runs entirely in the browser. There is no backend, database or account system, and user input is never uploaded.

**Stack:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, `lucide-react` (icons), `qrcode` (QR generation). Every page is prerendered as static HTML.

## Run locally

```bash
npm install
cp .env.example .env.local   # then edit the values
npm run dev                  # http://localhost:3000
```

Checks:

```bash
npm run lint
npx tsc --noEmit
npm run build && npm run start
```

## Configuration

| What | Where |
| --- | --- |
| Brand name, wordmark split, tagline, social links, legal "last updated" date | `lib/site.ts` |
| Production domain | `lib/site.ts` (default `https://quicktoolsworld.com`), or override with `NEXT_PUBLIC_SITE_URL` |
| Contact email | `lib/site.ts` (default `support@quicktoolsworld.com`), or override with `NEXT_PUBLIC_CONTACT_EMAIL` |
| Tool list, titles, descriptions, related tools | `lib/tools.ts` |
| AdSense | `lib/ads.ts` + `NEXT_PUBLIC_ADSENSE_*` variables |
| Design tokens (colors, shadows, radii), shared component styles | `app/globals.css` |
| Logo and favicon | `components/layout/logo.tsx` (mark + wordmark), `app/icon.svg`, `app/apple-icon.tsx`, `app/favicon.ico` |

To rename the brand, change `name` and `wordmark` in `lib/site.ts`. The logo mark is text-free, so it does not need to change. If you change its colors, update `app/icon.svg` to match and regenerate `app/favicon.ico` from it.

Social links are empty by default and the footer hides them. Add real profiles to `socialLinks` in `lib/site.ts` when they exist.

The copyright year in the footer updates itself in the browser. `copyrightYear` in `lib/site.ts` is only the fallback in the prebuilt HTML.

## Project structure

```
app/                      Routes (one folder per page), sitemap, robots, ads.txt, icons, OG image
  blog/                   Blog listing and one folder per article
components/
  blog/                   Article layout, post card, tool callout
  layout/                 Header, footer, logo
  tools/                  Interactive tool UIs (client components)
  ui/                     Reusable pieces: FAQ, breadcrumbs, notices, copy button, ad slot…
  tool-page.tsx           Shared layout for every tool page
  info-page.tsx           Shared layout for About/legal pages
lib/
  site.ts, ads.ts         Central configuration
  tools.ts                Tool registry (names, titles, H1s, descriptions)
  blog.ts                 Blog post registry (titles, dates, related tool)
  metadata.ts             Per-page SEO metadata helper
  tools/*.ts              Pure tool logic (no React), e.g. password.ts, percentage.ts
docs/seo-keyword-map.md   SEO audit, keyword map and internal linking rules
```

### Adding a tool

1. Add an entry to `lib/tools.ts` and an icon to `components/tool-icon.tsx`.
2. Put the logic in `lib/tools/<name>.ts` and the UI in `components/tools/<name>.tsx`.
3. Create `app/<slug>/page.tsx` using `<ToolPage>` with real instructions, explanation and FAQs.

The homepage, All Tools page, footer, mobile menu and sitemap update automatically.

## Deploy

The site works on any host that supports Next.js 16. The simplest option is **Vercel**:

1. Push this repository to GitHub, GitLab or Bitbucket.
2. In Vercel, select **Add New → Project** and import the repository. The defaults (Next.js, `npm run build`) are correct.
3. No environment variables are required. `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_CONTACT_EMAIL` default to `https://quicktoolsworld.com` and `support@quicktoolsworld.com`.
4. Deploy.

Other options: Netlify, Cloudflare (via OpenNext), or any Node.js server with `npm run build && npm run start`. Cache Components requires the Node.js runtime.

> `NEXT_PUBLIC_*` values are built into the pages, so **redeploy after changing them**.

### Custom domain (quicktoolsworld.com)

1. In your host's dashboard (Vercel: **Project → Settings → Domains**), add both `quicktoolsworld.com` and `www.quicktoolsworld.com`. Make `quicktoolsworld.com` the primary domain and let `www` redirect to it, because that is the address used in canonical URLs and the sitemap.
2. At your domain registrar, create the DNS records your host shows you (Vercel: an `A` record for the apex domain and a `CNAME` for `www`). Wait for the host to show both as valid and for HTTPS certificates to be issued.
3. Open `https://quicktoolsworld.com`, `https://www.quicktoolsworld.com` and `http://quicktoolsworld.com` and check that all three end up at `https://quicktoolsworld.com`.

If you ever choose `www` as the primary domain instead, set `NEXT_PUBLIC_SITE_URL=https://www.quicktoolsworld.com` and redeploy so canonical URLs match.

## Contact form (Brevo)

The Contact page has a form that sends messages to `support@quicktoolsworld.com` through [Brevo](https://www.brevo.com)'s transactional email API. The form posts to `app/api/contact/route.ts`, which runs on the server. The Brevo API key never reaches the browser.

**Environment variables** (server-only; add them to `.env.local` locally and to your host's environment settings in production):

| Variable | Required | Purpose |
| --- | --- | --- |
| `BREVO_API_KEY` | Yes | Brevo API v3 key (Brevo → SMTP & API → API keys) |
| `CONTACT_TO_EMAIL` | No | Inbox that receives messages (default `support@quicktoolsworld.com`) |
| `CONTACT_FROM_EMAIL` | No | Sender address. **It must be verified in Brevo** (default `support@quicktoolsworld.com`) |
| `CONTACT_FROM_NAME` | No | Sender name (default "QuickToolsWorld Contact Form") |

**Required one-time setup in Brevo.** Without it, messages are not delivered:

1. In Brevo, open **Senders, domains & dedicated IPs → Domains** and add `quicktoolsworld.com`. Brevo shows DNS records to add: a Brevo code TXT record, DKIM and DMARC.
2. Add those records in your DNS (currently managed at Hostinger), and update your SPF record to include Brevo, for example `v=spf1 include:_spf.mail.hostinger.com include:spf.brevo.com ~all`. Use the exact values Brevo shows you.
3. Wait for Brevo to show the domain as **Authenticated**. A quicker alternative is **Senders → Add a sender** for `support@quicktoolsworld.com` and clicking the verification link Brevo emails to that inbox. Authenticating the domain gives better deliverability.

Until the sender is verified, the server refuses to send and the form shows an error pointing visitors to the email address. Brevo accepts API requests from unverified senders and rejects them afterwards, which would otherwise create false "sent" messages.

**Spam protection:** hidden honeypot field, minimum fill time (3 seconds), same-origin check, per-IP rate limit (5 messages per 10 minutes, kept in memory per server instance), duplicate-submission guard, and length limits. Messages are not stored by the site and their contents are never logged.

**Hosting:** the form needs a Node.js server (Vercel, Netlify or a Node host). A purely static export cannot run `/api/contact`.

## Google Search Console

Nobody can guarantee rankings or that Google will index every page, but these steps let you see what Google actually does with the site.

### Verify and submit the sitemap

1. Go to [Google Search Console](https://search.google.com/search-console) and choose **Add property**.
2. Pick **Domain** and enter `quicktoolsworld.com`. This covers `www` and non-`www`, and `http` and `https`.
3. Google shows a `TXT` record. Add it to your DNS at the registrar, wait a few minutes, and select **Verify**.
4. Open **Indexing → Sitemaps**, enter `sitemap.xml` and select **Submit**. The full address is `https://quicktoolsworld.com/sitemap.xml`, and it lists 18 pages: the homepage, all tools, the blog, the four articles and the information pages.

If you prefer a **URL prefix** property, you can verify with an HTML meta tag instead. Add the code Google gives you to the `verification` field of the `metadata` export in `app/layout.tsx`, for example `verification: { google: "code-from-search-console" }`. Never commit a made-up code.

### Inspect key pages

Use **URL inspection** on these pages and select **Request indexing** for each one once:

- `https://quicktoolsworld.com/`
- `https://quicktoolsworld.com/tools` and each tool page, such as `/image-compressor`
- `https://quicktoolsworld.com/blog`
- each article, such as `/blog/how-to-compress-images-online`

**View tested page → Screenshot** shows what Google's smartphone crawler sees. The headings, text and links should all be there without clicking anything.

### Reports to check

| Report | What to look for | How often |
| --- | --- | --- |
| **Indexing → Pages** | Pages listed as "Crawled – currently not indexed" or "Discovered – not indexed". New sites often take weeks. | Weekly at first |
| **Performance → Search results** | Queries, impressions, clicks, CTR and average position. Filter by page to see which queries each tool attracts. | Weekly |
| **Experience → Core Web Vitals** | LCP, INP and CLS from real Chrome users. It appears only once there is enough traffic. | Monthly |
| **Enhancements** | Breadcrumb structured data errors | After deploys |
| **Security & Manual actions** | Should say "No issues detected" | Monthly |

Google removed the separate Mobile Usability report in 2023. Use Lighthouse in Chrome DevTools or [PageSpeed Insights](https://pagespeed.web.dev/) to check mobile behavior.

### Using the data

- After 4–8 weeks, compare the queries in **Performance** with `docs/seo-keyword-map.md`. Update titles, descriptions and on-page wording to match how people actually search, without stuffing keywords.
- Pages with many impressions but a low click-through rate often need a clearer title or description.
- Queries that show a need the site doesn't yet answer are candidates for a new guide or tool feature.

### Analytics (optional)

The site has no analytics, and the Privacy Policy says so. If you add Google Analytics or another analytics tool:

1. Get the real measurement ID from your analytics account. Never use a placeholder ID.
2. Load the script in `app/layout.tsx`. With Google tools, `@next/third-parties/google` is the simplest option.
3. Update the Privacy Policy to describe what is collected, and ask for consent where the law requires it. Google's certified CMP (see the AdSense section) can handle analytics consent too.
4. Never send tool input, such as text, passwords or images, to analytics.

## SEO and content notes

- `docs/seo-keyword-map.md` holds the audit, the keyword map and the internal linking rules. `docs/keyword-research.md` holds the keyword research: autocomplete evidence for the US and Pakistan, priorities, and how to add real volumes from Keyword Planner.
- **Structured data:** WebSite and Organization (homepage), WebApplication (each tool, free, with no ratings), BreadcrumbList (all pages), BlogPosting (articles) and FAQPage (homepage, tools and articles). FAQ text is generated from the visible FAQ, so the two always match. Google currently shows FAQ rich results only for a few authoritative government and health sites, so treat FAQPage as context for search engines and AI answers, not a guaranteed rich result.
- **`/llms.txt`:** a plain-text summary of the tools and guides for AI assistants and answer engines, generated from `lib/tools.ts` and `lib/blog.ts`. This is an emerging convention, not a standard, and no answer engine is guaranteed to read it.
- **AI crawlers:** `robots.txt` allows all crawlers, so the content is available to search engines and AI systems. If you'd rather block specific AI crawlers, such as `GPTBot` or `CCBot`, add rules in `app/robots.ts`. Google's AI features use the normal Googlebot.
- Page titles, H1s and descriptions for tools live in `lib/tools.ts`. Blog post details live in `lib/blog.ts`.
- **Sitemap dates:** `lastModified` comes from `contentLastModified` in `lib/site.ts` for the core pages, and from each post's `updated` date for articles. Change these only when content meaningfully changes.

### Adding a blog post

1. Add an entry to `posts` in `lib/blog.ts` with the title, description, dates, reading time and related tool.
2. Create `app/blog/<slug>/page.tsx`. Copy an existing article: it uses `ArticleLayout` (breadcrumbs, byline, table of contents, structured data, related articles) and `ToolCallout`.
3. Give every `h2` an `id` that matches the `s` object, so the table of contents links work.
4. The blog listing, homepage guides section, sitemap and the tool page's "Read the guide" link update automatically.

Articles are attributed to "QuickToolsWorld" (`author` in `lib/site.ts`). Name a person only if they really wrote or reviewed the article.

### Before publishing the articles

The four articles in `app/blog/` are complete, and their facts and calculations have been checked, but they deserve a human read-through before launch. If you publish on a different day, update `published` and `updated` in `lib/blog.ts` to the real date.

## Growing traffic responsibly (off-page SEO)

A short, practical plan. None of it guarantees rankings.

1. **Be genuinely useful where people already ask.** When someone on Reddit, Stack Exchange, Quora or a forum asks how to shrink a photo for a form or make a QR code, answer the question fully. Link to a tool or guide only when it directly helps, and follow each community's self-promotion rules.
2. **Let the privacy angle earn links.** "Runs in your browser, nothing uploaded" is useful to teachers, librarians, small businesses and privacy-focused writers. Resource pages, such as school IT guides or library tool lists, are natural places to be mentioned. Contact the people who run them individually, and only when the site is a good fit.
3. **Make the guides worth citing.** Keep the articles accurate and up to date so other writers can reference them.
4. **List the site in a few relevant directories**, such as privacy-friendly tool lists and open web directories, not bulk submission services.
5. **Improve from real data.** Use Search Console queries to refine existing pages before writing new ones.
6. **Keep content current.** Re-check facts when browser support or guidance changes, such as NIST password guidance or WebP support, and update `updated` in `lib/blog.ts` when you do.
7. **Publish new guides only for a real need**, such as a question that keeps appearing in Search Console or in visitor emails.

**Never:** buy backlinks, use private blog networks, send automated mass outreach, post fake reviews, or trade links in bulk. These break Google's spam policies and can get the site removed from search results.

## Enabling Google AdSense

The AdSense script (`adsbygoogle.js`, publisher `ca-pub-1544968719280843`, set in `lib/ads.ts`) loads in the `<head>` of every page, together with the `google-adsense-account` meta tag and `/ads.txt`. **Ad units are off** until you enable them (Step 3), so no ad space is reserved. Note that if Auto ads are turned on in the AdSense dashboard, Google can place ads using the script alone. AdSense approval is decided by Google and is not guaranteed.

### Before you apply

- [ ] Deploy on `quicktoolsworld.com` and check that canonical URLs and the sitemap use it.
- [ ] Make sure `support@quicktoolsworld.com` exists and that someone reads it (set up the mailbox or forwarding with your domain or email provider). Send it a test email.
- [ ] Review the About, Privacy Policy, Terms and Disclaimer pages and confirm they match how you run the site. In particular, confirm:
  - **Hosting provider and its log retention.** The Privacy Policy says your host keeps technical logs, such as IP addresses, for a limited period. Check your host's privacy notice and data processing terms.
  - **Email provider.** The policy says your email provider stores support emails. Decide how long you keep them, and delete them when they're no longer needed.
  - **Operator identity.** The policy and terms name "QuickToolsWorld" as the operator. Some laws, including GDPR for EU/UK visitors and some national business-disclosure rules, require a legal name and postal address. Add these if they apply to you.
  - **Governing law.** The Terms don't name a governing law or jurisdiction. Add one if you want to (a lawyer can advise).
  - **Age threshold.** The policy uses 13, as in US COPPA. Some countries use up to 16 for consent.
- [ ] Submit the sitemap in Search Console and wait until the pages are indexed.
- [ ] Check that you meet AdSense's eligibility requirements (for example age and, in some countries, how long the site has existed).

### Step 1: Apply and verify

1. Sign up at [adsense.google.com](https://adsense.google.com) and add your site.
2. Already done in code (`lib/ads.ts`; `NEXT_PUBLIC_ADSENSE_CLIENT` can override the ID). Each deploy includes:
   - the AdSense script in `<head>` (the "AdSense code snippet" verification method),
   - the `google-adsense-account` meta tag, and
   - `/ads.txt` containing `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`.
3. Request review in AdSense. Leave `NEXT_PUBLIC_ADSENSE_ENABLED=false` during review.

### Step 2: Set up consent (required for the EEA, UK and Switzerland)

Google requires publishers that serve ads to users in the EEA, the UK and Switzerland to use a **Google-certified consent management platform (CMP)** integrated with the IAB TCF. A basic home-made cookie banner does not meet this requirement.

The simplest compliant option is Google's own CMP:

1. In AdSense, go to **Privacy & messaging → European regulations** and create a GDPR message for your site. Publish it.
2. Optionally create a **US state regulations** message as well, if you serve users in those states.
3. The message is delivered by the AdSense script, so no extra code is needed. It adds its own link that lets visitors change their choice.

If you prefer a third-party certified CMP, load its script before the AdSense script in `app/layout.tsx` and follow its documentation.

### Step 3: Turn ads on after approval

1. In AdSense, create display ad units under **Ads → By ad unit** and copy each unit's `data-ad-slot` number.
2. Set:
   ```
   NEXT_PUBLIC_ADSENSE_ENABLED=true
   NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BELOW=1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_TOOL_FOOTER=0987654321
   ```
3. Redeploy. The Privacy Policy switches automatically to its advertising and cookie disclosures (`app/privacy-policy/page.tsx`). Review that wording and update `legalLastUpdated` in `lib/site.ts`.

**Where ads appear:** only on tool pages, below the finished tool and before the related-tools section, labelled "Advertisement" and separated by borders. They are never placed inside tool controls, next to download, copy or upload buttons, or beside calculator results. Keep it that way if you add placements, and avoid AdSense Auto ads unless you exclude tool areas. Never ask visitors to click ads.

## Privacy notes for maintainers

- Do not add analytics, error tracking or other third-party scripts without updating the Privacy Policy, and asking for consent where required.
- Tools must not send user input to any server. Keep processing client-side.
- `lib/tools/password.ts` must only use `crypto.getRandomValues()`.

## Known limitations

- The Image Compressor uses the browser's built-in encoders, so results differ slightly between browsers. Safari versions before 17 can't save WebP, and the option is disabled when that's the case. Animated images become a single frame. EXIF metadata is not kept.
- Automatic Title and Sentence case can't recognise proper nouns or every abbreviation (explained on the page).
- The contact form opens the visitor's email app (`mailto:`). There is no server-side form, so visitors without a configured email app need to copy the address.
- QR codes are static. There are no dynamic or editable codes and no scan tracking.
