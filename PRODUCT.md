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

The deliberate stance is that the portfolio is a section, not the point. A visitor who arrives for professional reasons gets a whole person — trail reviews, writing, a tree of the day — rather than a credentials page with personality bolted on.

## Operating Context

- Entry points are the link on job applications, the social profiles below, and possibly search.
- Read on both desktop and phone; no other environment established.
- Content accrues slowly over time as Ahmad hikes, writes, and builds things — the site is added to, not rebuilt.

## Capabilities and Constraints

**Surfaces today**

- Home (`index.html`) — name, bio, tree-of-the-day feature, social row, section links.
- Trail reviews index (`trails.html`) — cards rendered from data, newest hike first.

**Planned but not built**

- Projects and Reading sections exist as cards on the home page with placeholder hrefs.
- Individual trail review pages do not exist; `reviewUrl` values in the data are placeholders.

**Technical**

- Plain static HTML, CSS, and JS. No framework, no backend, no build step.
- Files must work when opened directly from disk (`file://`). This is why trail data is a plain global in `trails-data.js` rather than JSON loaded with `fetch()` — both `fetch()` of local JSON and ES modules are blocked by CORS on `file://`.
- Repo exists at `github.com/atobasei/ahmad-personal-site`.

**Content model**

- Trail entries live as objects in `trails-data.js` (`id`, `name`, `location`, `dateHiked`, `tags`, `previewImage`, `reviewUrl`). Adding a hike means adding an object, never editing HTML. Sorting by `dateHiked` descending happens at render time.
- Tags are free-form strings. `gsmnp` is a distinct tag from the generic `national park` tag and is expected to appear often enough to warrant its own treatment.
- **Tree of the day should rotate automatically — a different tree per day, drawn from a list, with no manual intervention.** Not yet built; the home page currently holds a hand-coded placeholder.

**Open decisions — do not build toward either answer yet**

- Whether writing/essays are published on the site as their own pages, stay on Substack, or appear here as excerpts linking out.
- Hosting target, and whether a build step or static-site generator becomes acceptable later. The no-build-step rule is current practice, not a confirmed permanent constraint.

## Brand Commitments

- Name: Ahmad Tobasei.
- Confirmed social profiles: Instagram (`@ahmadtobasei`), Substack (`@ahmad288961`), GitHub (`atobasei`), LinkedIn (`ahmad-tobasei-6745a3263`).
- Voice is first-person, warm, and informal — Ahmad's own bio copy is conversational and signs off with a smiley. Keep copy in that register rather than a professional-bio register.

## Evidence on Hand

- Real: the four social profile URLs above; the GitHub repo.
- **Not yet supplied, and must not be invented:** trail photos (`images/trails/placeholder-*.jpg` are placeholders), any actual trail review content, project descriptions, reading list entries, the real bio text, and the tree-of-the-day list. The four trail entries currently in `trails-data.js` are placeholder data.
- No testimonials, metrics, press, or credentials have been established.

## Product Principles

1. **Personal site first, portfolio second.** Never restructure so the projects section becomes the point of the site.
2. **Two readers at once.** A hiring manager and a hiking friend should both find the same page appropriate — neither over-formal nor inside-jokey.
3. **Adding content must not mean editing markup.** The `trails-data.js` pattern is the template: new content types get a data file, not hand-written HTML per entry.
4. **Stays runnable as plain files.** No dependency that requires a server or build step to see the site work, unless and until the hosting decision changes that.
5. **Small genuine touches earn their place.** The tree of the day exists because it's fun, not because it serves a goal — features like it don't need to justify themselves by conversion.
