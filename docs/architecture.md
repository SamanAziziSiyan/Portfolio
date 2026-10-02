# Architecture

## System boundary

```text
Browser → Next.js App Router → server-rendered pages
                 │
                 └→ /api/contact → Laravel /api/v1/contact → SQLite

Next.js server → Laravel public GET endpoints → relational portfolio data
              ↘ reviewed content snapshot when the API is unavailable
```

The frontend holds the one-page layout, anchor navigation, metadata and form interaction. Its server components fetch public portfolio records from Laravel when `PORTFOLIO_API_URL` is configured, with a 2.5-second timeout and a reviewed snapshot fallback for unavailable or empty collections. The contact route has no fallback: a failed API returns an error, so a message is never silently lost.

Laravel owns database schema, seeding, validation and persistence. Projects link to technologies through a pivot and to evidence entries through a one-to-many relation. Experiences have relational highlights and technology links. Products hold public product context. Contact submissions live in a separate table with no public read API. A seed run replaces stale published projects, experiences and products in one transaction without clearing contact messages.

## Rendering and performance

The main portfolio and CV view are server-rendered. The page uses native `<details>` for expandable roles and work, keeping those interactions keyboard-accessible without a client library. One small client component observes sections for reveal motion and the active navigation state; the contact form is the other client island. Reduced-motion users see static content. Official Blogina and Serione product previews are stored locally, rendered through Next Image, and attributed in alt text. The CV PDF is static. Tailwind 4 is available for utilities while the visual system is defined in one stylesheet.

## Security and operations

- Laravel validates name, RFC email and message length; a hidden website field must remain empty.
- The contact route permits five submissions per email per hour. It avoids an IP cap because Laravel sees the shared Next.js proxy address rather than each visitor's address. The proxy rejects mismatched or malformed browser origins when an Origin is sent and caps request size. Direct API callers still meet Laravel validation and throttling.
- Eloquent parameterizes database writes; no raw user-derived SQL is used.
- Laravel auto-escapes returned JSON; React escapes rendered strings. The site does not inject portfolio content as HTML.
- No admin UI or public submission listing exists. Operator access to SQLite is a deployment responsibility.
- Secrets live in ignored environment files. Compose requires `APP_KEY`, binds ports to loopback and persists SQLite in a named volume. A production deployment must add TLS, backups and an operator message workflow.
- The portfolio content is editorial data, not a user-editable CMS. Seed updates are reviewed and deployed with the code.

## Data provenance

`packages/content/portfolio.json` is the single reviewed snapshot. It is source-controlled so a reviewer can inspect every claim. The backend seeds normalized tables from it; the frontend imports it only as a fallback. Project records have nullable live and source links; the main action selects live output before source when both exist. Professional work is labeled separately from inspectable source. See [content audit](content-audit.md).
