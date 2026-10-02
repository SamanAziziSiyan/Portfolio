# REST API

Base path: `/api/v1`. JSON responses use a `data` property for reads.

| Method | Path | Result |
| --- | --- | --- |
| `GET` | `/projects` | Ordered projects with technologies, evidence, and nullable `live_url`, `repository_url`, `image_url`, `image_alt` |
| `GET` | `/projects/{slug}` | One project, or 404 |
| `GET` | `/experiences` | Ordered experience entries with highlights and technologies |
| `GET` | `/products` | Verified public product context |
| `POST` | `/contact` | Validates and persists a message; returns 201 |

Contact JSON: `{"name":"Jane Engineer","email":"jane@example.com","message":"A useful message of at least twenty characters."}`. A `website` field, if present with a value, is rejected as a honeypot. Validation errors return 422. The route limits each email address to five requests per hour and returns 429 when exceeded. No public endpoint exposes stored contact messages.

The Next.js application proxies its same-origin `/api/contact` route to this Laravel endpoint. The public GET endpoints are also useful to a future controlled client or data export; they are not an artificial echo of the frontend's component state.

`live_url` points to a public output or product page when one is available; it is the primary visitor action. `repository_url` points to inspectable source and is null for proprietary themes. A source-only project may have a null `live_url`. The UI never manufactures a demo URL from a repository README.
