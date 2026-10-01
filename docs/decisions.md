# Engineering decisions

## SQLite for the first deployment

The portfolio is read-heavy with a low-volume contact form. SQLite removes a separate service and password from local setup, supports transactional relational data and Laravel migrations, and makes a one-instance deployment portable. A named Docker volume persists the database. The trade-off is limited horizontal write concurrency; a multi-instance deployment should switch Laravel's driver to PostgreSQL and run the same migrations.

## Shared reviewed content snapshot

A JSON file is appropriate as a seed artifact, not as the database schema. Its content is ingested into normalized Laravel tables. Next.js imports the same file as a resilient fallback; when the API responds, database content takes precedence. This avoids an empty public site during a transient API outage and keeps contact writes honest.

## No public content administration

The site is not a general-purpose CMS. Content changes go through review, seed and deployment. Omitting an admin login avoids an unnecessary authentication surface while the API retains value as the structured source and contact boundary.

## Evidence-led presentation

The labels Public source, Professional work and Historical project represent different levels of inspectability. They prevent a company product link from masquerading as a personal repository and keep older source from being endorsed as current production practice. The page presents three direct public outputs prominently, with GitHub primary only when no working public output has been established.

## Motion and assets

Typography, spacing, color and connecting lines communicate relationships. A small IntersectionObserver reveals sections and updates the active anchor; native details expose deeper content. CSS handles the rest, and `prefers-reduced-motion` disables animation. Blogina and Serione use product-preview images from the public RTL Theme listings for this local build; rights need review before deployment.
