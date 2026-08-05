# North Cliq website

A fast, responsive five-page business website built with semantic HTML, modern CSS and vanilla JavaScript. It has no runtime dependencies and no build step.

## Project structure

```text
.
├── index.html
├── about.html
├── services.html
├── products.html
├── contact.html
├── css/
│   ├── style.css
│   └── variables.css
├── js/main.js
├── assets/
│   ├── images/
│   ├── icons/
│   └── logo/
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

## Run locally

The pages can be opened directly in a browser. A small local server is recommended so navigation behaves exactly as it will in production:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`. No installation or compilation is required.

## Content and configuration before launch

- Confirm the public domain and replace `https://northcliq.com` in `sitemap.xml` and `robots.txt` if needed.
- Replace the representative testimonial when client approval is available.
- Update the email address, Stockholm location and LinkedIn URL if required.
- The contact form currently provides accessible client-side feedback. Connect it to Cloudflare Pages Forms, Formspree or another form endpoint before accepting submissions.
- Add privacy/legal pages appropriate to the business and jurisdiction.

## Deploy to GitHub Pages

1. Push the files to the repository's default branch.
2. In the GitHub repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the default branch and the `/ (root)` folder, then save.
5. GitHub publishes the site at the Pages URL shown in that panel.

All links are relative, so the site works on both user/organisation Pages and project Pages. For a custom domain, add it in the Pages settings and update the sitemap URLs.

## Deploy to Cloudflare Pages

1. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
2. Select this repository and choose the production branch.
3. Set **Framework preset** to `None`.
4. Leave **Build command** empty.
5. Set **Build output directory** to `/` (the repository root).
6. Save and deploy, then attach the production domain under **Custom domains**.

Cloudflare will serve the repository directly. No environment variables or package installation are needed.

## Design and accessibility notes

- Theme preference is stored locally and defaults to the operating-system preference.
- Navigation, form controls and theme controls are keyboard accessible.
- Visible focus states, semantic landmarks, a skip link and reduced-motion preferences are supported.
- System fonts and CSS-generated artwork avoid render-blocking font and image downloads.

## Performance

The site is intentionally small and dependency-free. Before release, run Lighthouse against the deployed production URL in an incognito window. Scores vary by hosting and network conditions; the implementation is designed to support scores above 95 across Performance, Accessibility, Best Practices and SEO.
