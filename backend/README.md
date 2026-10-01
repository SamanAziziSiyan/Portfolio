# Portfolio API

Laravel 12 application serving read-only portfolio records and the validated contact endpoint. Start and test it through the [monorepo instructions](../README.md).

The API is intentionally separate from the frontend. It seeds normalized SQLite tables from `packages/content/portfolio.json`; no public administration or submission-listing endpoint exists. See [API contract](../docs/api.md).
