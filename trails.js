/* ==========================================================================
   TRAIL JOURNAL — rendering
   Reads window.TRAILS_DATA (see trails-data.js), sorts newest hike first, and
   renders one full-width row per trail into #trail-grid.

   Layout note: each entry renders as a horizontal row (image on one side,
   info stacked beside it), not a card in a grid. The sorting and data shape
   are unchanged — only the markup/classes differ. Styles live in section 9
   of style.css under .trail-list / .trail-row.

   Extend here later, e.g. tag-based filtering — see EXTENSION POINT below.
   ========================================================================== */
(function () {
  const grid = document.getElementById("trail-grid");
  if (!grid) return;

  const trails = Array.isArray(window.TRAILS_DATA) ? window.TRAILS_DATA.slice() : [];

  // Most recent hike first — sorted here, not by hand-ordering the data file.
  trails.sort((a, b) => new Date(b.dateHiked) - new Date(a.dateHiked));

  // timeZone:"UTC" matters. `new Date("2023-05-14")` parses a bare ISO date as
  // UTC midnight, so formatting it in a timezone behind UTC would print the
  // day before (May 13 in US timezones). Formatting in UTC prints the date as
  // it was written in trails-data.js.
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  });

  // Trail names and locations are author-written, but they are interpolated
  // into HTML below, so escape them rather than trusting quotes/ampersands.
  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // "gsmnp" keeps its own fill + peak glyph because it recurs often enough to
  // be worth spotting at a glance. See .tag--gsmnp in style.css.
  function renderTags(tags) {
    if (!Array.isArray(tags)) return "";
    return tags
      .map((tag) => {
        const isGsmnp = String(tag).toLowerCase() === "gsmnp";
        const tagClass = isGsmnp ? "tag tag--gsmnp" : "tag";
        return `<span class="${tagClass}">${isGsmnp ? "\u26f0 " : ""}${escapeHtml(tag)}</span>`;
      })
      .join("");
  }

  function renderRow(trail) {
    // The whole row is the link, same as the old whole-card link.
    const row = document.createElement("a");
    row.className = "trail-row";
    row.href = trail.reviewUrl || "#";

    // NOTE: `notes` and `additionalImages` are optional fields on an entry and
    // are deliberately NOT rendered here — this index page only shows the
    // summary. They belong to the individual trail review pages. Reading only
    // the fields below means an entry works whether or not they are present.
    row.innerHTML = `
      <div class="trail-row-image">
        <img src="${escapeHtml(trail.previewImage)}" alt="${escapeHtml(trail.name)}" loading="lazy">
      </div>
      <div class="trail-row-body">
        <h2 class="trail-row-name">${escapeHtml(trail.name)}</h2>
        <p class="trail-row-location">${escapeHtml(trail.location)}</p>
        <div class="trail-tags">${renderTags(trail.tags)}</div>
        <p class="trail-row-date">${dateFormatter.format(new Date(trail.dateHiked))}</p>
      </div>
    `;

    return row;
  }

  trails.forEach((trail) => grid.appendChild(renderRow(trail)));

  // EXTENSION POINT: tag-based filtering could live here — e.g. read a
  // clicked tag, filter `trails` before rendering, and re-run renderRow.
})();

/* ==========================================================================
   LANDSCAPE BACKDROP — parallax
   The SVG is taller than the viewport; slide it up at a fraction of the
   scroll distance so you descend through the landscape more slowly than the
   page scrolls. Raise RATE for a stronger effect (1 would match the page).
   ========================================================================== */
(function () {
  const art = document.querySelector(".trails-hero__art");
  if (!art) return;

  const RATE = 0.35;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let maxShift = 0;
  let queued = false;

  function measure() {
    maxShift = Math.max(0, art.getBoundingClientRect().height - window.innerHeight);
  }

  function apply() {
    queued = false;
    if (reducedMotion.matches) {
      art.style.transform = "";
      return;
    }
    // clamped so the art never pans past its own bottom edge
    const shift = Math.min(window.scrollY * RATE, maxShift);
    art.style.transform = `translate3d(0, ${-shift}px, 0)`;
  }

  function onScroll() {
    if (!queued) {
      queued = true;
      requestAnimationFrame(apply);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", function () {
    measure();
    apply();
  });
  reducedMotion.addEventListener("change", apply);

  measure();
  apply();
})();
