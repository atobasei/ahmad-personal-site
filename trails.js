/* ==========================================================================
   TRAIL REVIEWS — rendering
   Reads window.TRAILS_DATA (see trails-data.js), sorts, and renders cards.
   Extend here later, e.g. tag-based filtering — see EXTENSION POINT below.
   ========================================================================== */
(function () {
  const grid = document.getElementById("trail-grid");
  const trails = Array.isArray(window.TRAILS_DATA) ? window.TRAILS_DATA.slice() : [];

  // Most recent hike first — sorted here, not by hand-ordering the data file.
  trails.sort((a, b) => new Date(b.dateHiked) - new Date(a.dateHiked));

  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  function renderTags(tags) {
    return tags
      .map((tag) => {
        const isGsmnp = tag.toLowerCase() === "gsmnp";
        const tagClass = isGsmnp ? "tag tag--gsmnp" : "tag";
        return `<span class="${tagClass}">${isGsmnp ? "⛰ " : ""}${tag}</span>`;
      })
      .join("");
  }

  function renderCard(trail) {
    const card = document.createElement("a");
    card.className = "trail-card";
    card.href = trail.reviewUrl;

    card.innerHTML = `
      <div class="trail-card-image">
        <img src="${trail.previewImage}" alt="${trail.name}" loading="lazy">
      </div>
      <div class="trail-card-body">
        <h2 class="trail-card-name">${trail.name}</h2>
        <p class="trail-card-location">${trail.location}</p>
        <div class="trail-tags">${renderTags(trail.tags)}</div>
        <p class="trail-card-date">${dateFormatter.format(new Date(trail.dateHiked))}</p>
      </div>
    `;

    return card;
  }

  trails.forEach((trail) => grid.appendChild(renderCard(trail)));

  // EXTENSION POINT: tag-based filtering could live here — e.g. read a
  // clicked tag, filter `trails` before rendering, and re-run renderCard.
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
