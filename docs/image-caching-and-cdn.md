Image caching, fingerprinting and CDN recommendations

Purpose
- Ensure static images are cached aggressively by browsers and served by a CDN for low latency.

Key guidelines
- Use content-hashed filenames for immutable assets (e.g., hero.abc123.webp). Serve these with a long Cache-Control (year) and immutable.
- Serve HTML and other changing responses with short Cache-Control and use CDN edge caching + origin revalidation.
- Move critical assets into `src/` and import them so Vite can fingerprint them during build. Files in `public/` are copied verbatim and won't be hashed.

Vite tips (quick)
- In `vite.config.js` ensure build outputs include hashes (default behavior for imported assets). Example to enforce:

```js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
})
```

- Import images in code (e.g., `import hero from './assets/hero.png'`) or reference them from CSS with `url('./assets/hero.png')` so the bundler emits hashed files.

Server / CDN strategy
- Use a CDN (Cloudflare, Fastly, Bunny, AWS CloudFront) in front of your origin. Configure the CDN to:
  - Cache static assets (images, fonts, css, js) for long durations (Cache-Control: public, max-age=31536000, immutable).
  - Respect origin Cache-Control for HTML (short ttl) and use stale-while-revalidate for improved UX.

Cache headers examples (Nginx)

```
location ~* \.(?:js|css|png|jpg|jpeg|webp|avif|gif|svg)$ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

location / {
  add_header Cache-Control "no-cache, must-revalidate";
}
```

Deployment notes
- If using Netlify or Vercel, they already provide CDN and set sane caching for hashed assets. Ensure large assets are hashed by importing them.
- If you must keep images in `public/`, add a build step to copy them into `dist/assets` with a hash and update references.

Cache-busting
- When an asset changes, its filename hash changes so clients fetch the new file automatically. Avoid appending query strings for immutable assets.

Optional: automated upload to CDN storage
- For highest performance, upload optimized images to an object storage bucket or CDN origin (S3, GCS) during CI and point your app to the CDN-hosted URLs.

Verification
- Use Lighthouse and WebPageTest to verify caching headers and CDN usage. Check response headers for `Cache-Control` and `CF-Cache-Status` (Cloudflare) or equivalent.

Small checklist
- [ ] Move hero/large assets into `src/assets` and import them
- [ ] Build and verify hashed filenames in `dist/assets`
- [ ] Configure CDN/origin cache headers for immutable assets
- [ ] Deploy and verify via Lighthouse
