# SEIF4D Portfolio

Production-ready static portfolio built with HTML, CSS and vanilla JavaScript.

## Included
- Responsive desktop + app-like mobile interface
- Semantic HTML and accessible navigation
- SEO metadata, canonical, Open Graph and Twitter cards
- Schema.org JSON-LD for Person, WebSite, WebPage and selected work
- robots.txt + sitemap.xml
- GEO / generative-discovery support through structured entity copy and `llms.txt`
- PWA manifest + icons
- Security/cache headers for Vercel and Netlify
- 404 page
- Reduced-motion support
- Lazy-loaded project images and fixed dimensions to reduce CLS

## Publish
### Vercel
Upload the folder or import the repo. No build command is required.

### Netlify
Drag the folder into Netlify or connect the repo. No build command is required.

### GitHub Pages
Publish the folder from a repository. Assets use relative paths, working seamlessly on both custom root domains and repository subpaths (`username.github.io/repo/`).

## Before launch
1. Point `seif4d.com` to the hosting provider.
2. Confirm each social URL in `index.html`, JSON-LD, and `llms.txt`.
3. Add Google Search Console / Bing Webmaster Tools after the domain is live.
4. Replace any project marked “CASE STUDY”, “VENTURE”, or “STUDIO” with a public case-study URL when available.
5. Keep `sitemap.xml` lastmod updated when content changes.
