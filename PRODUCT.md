# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mixed audience, arriving from different places with different expectations:

- **Professional contacts** — hiring managers, recruiters, and collaborators who follow the link Ahmad includes on job applications. Likely the highest-volume visitors, but not the audience the site is built around.
- **Fellow hikers and friends** — people who know Ahmad, or who found him through Substack, Instagram, or GitHub, reading trail notes and seeing what he's into.
- **Search arrivals** — possible but not designed for.

All of them should land on a person, not a résumé. A professional visitor is expected to be fine with — and ideally interested by — the hiking and personal material.

## Product Purpose

Ahmad Tobasei's personal website: an about-me, plus a place to publish hikes, thoughts, and tech-oriented side projects.

Explicitly **not a portfolio site**. The projects section is one piece within a larger set of sections, not the reason the site exists. Success is a visitor coming away with a sense of who Ahmad is and finding at least one thing worth reading.

## Positioning

The deliberate stance is that the portfolio is a section, not the point. A visitor who arrives for professional reasons gets a whole person — a trail journal, writing, a tree of the day — rather than a credentials page with personality bolted on.

## Operating Context

- Entry points are the link on job applications, the social profiles below, and possibly search.
- Read on both desktop and phone; no other environment established.
- Content accrues slowly over time as Ahmad hikes, writes, and builds things — the site is added to, not rebuilt.

## Capabilities and Constraints

**Surfaces today**

- Home (`index.html`) — name, bio, tree-of-the-day feature (data-driven, rotates daily), social row, section links.
- Trail Journal (`trails.html`) — one full-width row per hike, rendered from data, newest hike first. Named "Trail Journal" in all user-facing copy; the file stays `trails.html`.
- Projects (`projects.html`) — one full-width row per project, rendered from data; each row links straight to the repo on GitHub in a new tab.
- Individual hike pages (`trail-review.html`) — **one template serving every hike**, not a file per hike. The hike is chosen by query string (`trail-review.html?id=<slug>`), read from the same `trails-data.js`. Lead photo, name, a one-line meta row, the write-up, then full-width photos stacked below.

**Planned but not built**

- The Reading section exists as a link row on the home page with a placeholder href.

**Technical**

- Plain static HTML, CSS, and JS. No framework, no backend, no build step.
- Files must work when opened directly from disk (`file://`). This is why trail data is a plain global in `trails-data.js` rather than JSON loaded with `fetch()` — both `fetch()` of local JSON and ES modules are blocked by CORS on `file://`.
- Repo exists at `github.com/atobasei/ahmad-personal-site`.

**Content model**

- Trail entries live as objects in `trails-data.js` (`id`, `name`, `location`, `dateHiked`, `tags`, `previewImage`, `reviewUrl`, plus optional `notes`, `distanceMiles` and `additionalImages`). Adding a hike means adding an object, never editing HTML — including the hike's own page, which is one shared template. Sorting by `dateHiked` descending happens at render time. `notes`, `distanceMiles` and `additionalImages` render only on the hike's own page, not on the index.
- **The Trail Journal is a journal, not a trail guide.** The writing — how the hike felt — is the point of a hike page; the numbers are not. `distanceMiles` is the *only* stat in the schema and it is optional. There is deliberately no field for elevation gain, duration, difficulty or route type: if those matter for a given hike, they go in the prose. Keep the schema thin so adding a hike never becomes a data-entry chore, and don't give a hike page a stats panel — it would make the objective data the visual centrepiece of a page whose purpose is the opposite.
- Project entries follow the same pattern in `projects-data.js` (`id`, `title`, `description`, `repoUrl`), rendered in file order.
- Tree entries follow the same pattern in `trees-data.js` (`id`, `commonName`, `scientificName`, `range`, `description`, `image{src,credit,sourceUrl}`). `description` is Ahmad's quip about the tree and doubles as the publish switch: blank means the species stays out of rotation. A blank line within it starts a new paragraph, which is how one entry carries more than one thought — there is deliberately no separate `funFacts` field, and no `ecoregion` field.
- Tags are free-form strings. `gsmnp` is a distinct tag from the generic `national park` tag and is expected to appear often enough to warrant its own treatment.
- **Image paths.** Hike photos get one folder per hike, `images/trails/<trail id>/`, holding `preview.jpg` (the `previewImage`) plus numbered gallery files (the `additionalImages`). Tree photos are flat in `images/trees/`, each filename matching the entry `id`. Both folders carry a README stating the convention. Every path is stored relative to the repo root with **no leading slash** — a leading slash resolves to the filesystem root under `file://` and the image fails silently, which would break the open-from-disk rule above. Every page that reads this data sits at the repo root, so no path prefixing is needed anywhere.
- **Tree of the day rotates automatically — a different tree per day, drawn from a list, with no manual intervention.** Built. The pool lives in `trees-data.js` (63 Tennessee species); `trees.js` derives the day's pick from the local calendar date, so it is identical for every visitor on that date and changes at local midnight. Only entries with a non-empty `description` are eligible, so unfinished entries never surface; with none written the module shows a "coming soon" state rather than disappearing.

**Open decisions — do not build toward either answer yet**

- Whether writing/essays are published on the site as their own pages, stay on Substack, or appear here as excerpts linking out.
- Hosting target, and whether a build step or static-site generator becomes acceptable later. The no-build-step rule is current practice, not a confirmed permanent constraint.

## Brand Commitments

- Name: Ahmad Tobasei.
- Confirmed social profiles: Instagram (`@ahmadtobasei`), Substack (`@ahmad288961`), GitHub (`atobasei`), LinkedIn (`ahmad-tobasei-6745a3263`).
- Voice is first-person, warm, and informal — Ahmad's own bio copy is conversational and signs off with a smiley. Keep copy in that register rather than a professional-bio register.

## Evidence on Hand

- Real: the four social profile URLs above; the GitHub repo.
- Real: one trail entry (Mount LeConte via Alum Cave, hiked 2023-05-14, with Ahmad's own notes); four project entries with repo URLs; one tree write-up (American Beech, Ahmad's own); `range` for all 63 tree species, sourced from standard silvics references at a deliberately coarse granularity ("Eastern U.S.", "Southern Appalachians").
- **Not yet supplied, and must not be invented:** trail photos (`images/trails/mount-leconte-via-alum-cave-trail/preview.jpg` is referenced but not in the repo yet), the body of any individual trail review page, a description for the Automated Network Compliance Manager repo (its GitHub page 404s — URL needs confirming), reading list entries, the real bio text, tree photos, and the remaining 62 tree `description` quips. The quips are Ahmad's own voice — do not write them for him.
- No testimonials, metrics, press, or credentials have been established.

## Product Principles

1. **Personal site first, portfolio second.** Never restructure so the projects section becomes the point of the site.
2. **Two readers at once.** A hiring manager and a hiking friend should both find the same page appropriate — neither over-formal nor inside-jokey.
3. **Adding content must not mean editing markup.** The `trails-data.js` pattern is the template: new content types get a data file, not hand-written HTML per entry.
4. **Stays runnable as plain files.** No dependency that requires a server or build step to see the site work, unless and until the hosting decision changes that.
5. **Small genuine touches earn their place.** The tree of the day exists because it's fun, not because it serves a goal — features like it don't need to justify themselves by conversion.
