# CLAUDE.md

Working notes for Ahmad Tobasei's personal site. `PRODUCT.md` covers *what the
site is for*; this file covers *how to work on it without breaking things*.

Most of what follows is a rule someone already got wrong once.

---

## The one constraint everything else follows from

**The site must work when opened straight from disk (`file://`).** Over
`file://`, `fetch()` of local files and ES modules are both blocked by CORS.

So every data file is a **plain global loaded with a `<script>` tag**, never
JSON read with `fetch()`, never `import`/`export`:

```js
window.TREES_DATA = [ … ];
```

A local server (`python3 -m http.server 8000`) is fine for previewing, and it
*will* make `fetch()` appear to work — do not be fooled into "modernising" the
data files on the strength of that. Test from `file://` before believing a
change is safe.

No build step, no framework, no backend, no dependencies. Plain HTML/CSS/JS.

---

## Layout

```
index.html          home — bio, tree of the day, page links, socials, contact
trails.html         Trail Journal index (one row per hike)
trail-review.html   ONE template serving every hike, selected by ?id=<slug>
projects.html       projects list

trees-data.js       52 tree species        -> window.TREES_DATA
trails-data.js      hikes                  -> window.TRAILS_DATA
projects-data.js    4 projects             -> window.PROJECTS_DATA

trees.js            picks + renders the day's tree
trails.js           renders the hike rows
trail-review.js     reads ?id= and renders one hike
projects.js         renders the project rows
script.js           home-page odds and ends (currently: email assembly)
style.css           one stylesheet, sectioned and numbered

images/trees/<id>.jpg              one photo per species, flat
images/trails/<trail-id>/          one folder per hike
tests/                             node test suite, no dependencies
```

**Adding content never means editing HTML.** Add an object to a data file.
This is a stated product principle, not a preference.

---

## Rules that are easy to break

### Dates: always format with `timeZone: "UTC"`

`new Date("2023-05-14")` parses as UTC midnight, so formatting it in any
timezone behind UTC prints **the day before**. This shipped as a real bug once
(May 14 rendering as May 13) and has to be re-fixed every time a date is
formatted somewhere new. See `trails.js` and `trail-review.js`.

### "Trail Journal" is the display name; `trails.html` is the filename

They deliberately do not match. Don't rename either to agree with the other —
the filename is load-bearing for existing links, the display name is Ahmad's.

### `trail-review.html` is one file for every hike

Selected by `?id=<slug>`, matched against `id` in `trails-data.js`. Adding a
hike means adding a data object — never a new page. `reviewUrl` must always
look like `trail-review.html?id=<that entry's id>`; `tests/check.js` asserts
every `reviewUrl` resolves to a real entry.

Because it's one template, `document.title` is set in JS. Link previews will
show the generic title — a known, accepted tradeoff.

### Trees: `description` is the publish switch

A species appears in rotation **only** when `description` is non-empty. Blank
keeps it out. With none written, the module shows a "coming soon" state rather
than vanishing, because the well is the home page's centrepiece.

Rotation is derived from the local calendar date — same tree all day for a
given viewer, cycling through all 52 before repeating, and DST-safe. It is
not random; do not make it random.

### The tree quips are Ahmad's to write

51 of 52 entries currently hold `PLACEHOLDER — write your quip about the X
here.` **Never write these for him.** They exist so the rotation runs during
development. Count what's left:

```
grep -c PLACEHOLDER trees-data.js
```

Only `american-beech` has real writing. Same rule for trail `notes`.

### The Trail Journal is a journal, not a trail guide

It's about how a hike felt, not its stats. `distanceMiles` is the **only**
stat in the schema and it's optional. There is deliberately no field for
elevation gain, duration, difficulty, or route type — if those matter for a
hike, they go in the prose. Don't add a stats panel; it would make the numbers
the visual centrepiece of a page whose point is the opposite.

### THE DEPTH RULE

Each page gets **at most one** dimensional element, and it is *recessed*, not
raised — the `.well`. Read the long comment at the top of `style.css` before
touching anything shadow-related. Notably: the 1px light line on the well's
bottom inside edge is load-bearing; deleting it flattens the effect.

The tree photo sits at ~40% width inside the well *on purpose* — full width
would leave no visible floor around it and it would read as the well's surface
rather than an object sitting in it.

Hike pages and project rows are deliberately flat.

### Images

- Tree photos: `images/trees/<entry id>.jpg`, flat, filename matches `id`.
- Hike photos: `images/trails/<trail id>/preview.jpg` plus numbered gallery files.
- Paths are stored **relative to the repo root with no leading slash**. A
  leading slash resolves to the filesystem root under `file://` and fails
  silently. Every page sits at the repo root, so nothing needs prefixing.
- **Never upscale.** `sips -Z N` scales *up* as well as down — it enlarged 14
  photos once, adding bytes and blur for no detail. Cap at
  `min(target, original long edge)`, and verify against each original's size,
  not just against the target.
- `images/trees/_originals/` holds untouched pre-conversion copies. Gitignored;
  never commit it. It's the only source if images need re-converting.

### Code style

Ahmad prefers explicit over clever:

- plain `for` loops and spelled-out `if`/`else`, not `.filter().map()` chains
- `createElement` + `textContent` rather than HTML strings (also removes any
  need for escaping)
- verbose and readable beats compact

`trees.js` and `trail-review.js` are the reference for this. `trails.js` and
`projects.js` predate the preference and use template literals with an
`escapeHtml` helper — fine as-is, but new code follows the newer style.

### The contact email is assembled in JS on purpose

`index.html` carries the address split across `data-u` / `data-d`; `script.js`
joins it. The full address must **never** appear in the HTML source — that's
the entire point. Don't "tidy" the `[at]`/`[dot]` fallback text into a normal
address, and don't add a plain `mailto:`.

(For the record: plain text offers no protection over a `mailto:` link.
Harvesters regex the raw HTML and don't care which it is.)

---

## Tests

Plain node, no dependencies, run from the repo root:

```
node tests/check.js          # trail + project rows            13 assertions
node tests/tree-check.js     # rotation, determinism, DST      12
node tests/render-check.js   # tree module rendering           19
node tests/review-check.js   # hike page rendering             20
```

64 total. They run the real render code against a small DOM stub. **Run them
after any change to a data file or renderer** — they have caught the date
off-by-one and several stale assumptions after schema changes.

When a schema changes, expect some to fail *by design* — a test that hardcodes
a species count or assumes a particular tree is the pick. Fix the test to
derive from the data rather than loosening the assertion.

---

## Known issues

- **The Automated Network Compliance Manager repo is private.** Its link on
  `projects.html` 404s for every visitor, and every project row is a whole-row
  link. Unresolved — options are to make the upstream public, or to support
  unlinked rows in `projects.js` (it currently always renders an anchor and
  falls back to a dead `href="#"`).
- **51 tree quips are placeholders.** The site would display them if published
  as-is.
- **`images/trails/mount-leconte-via-alum-cave-trail/` is empty** — the Mount
  LeConte entry points at `preview.jpg`, which doesn't exist yet, so that row
  shows alt text on an empty background.
- **The Reading link on the home page goes nowhere** (`href="#"`).

---

## Working with Ahmad

- Voice is first-person, warm, informal. Not a professional-bio register.
- He writes his own content. Offer structure, not prose.
- He commits frequently himself — check `git log` before assuming the working
  tree reflects only your changes.
