/* ==========================================================================
   TRAIL REVIEW — one hike, rendered from the query string

   This is the renderer behind trail-review.html. That one file serves every
   hike; which hike it shows comes from the URL:

       trail-review.html?id=mount-leconte-via-alum-cave-trail

   The id matches the `id` field of an entry in trails-data.js. Adding a hike
   therefore means adding an object to that file — never creating a new page.

   The page is a JOURNAL, not a trail guide. The write-up is what matters
   here, so the layout keeps the prose central and the numbers quiet: the only
   stat is an optional mileage that sits inline with the date. Don't add a
   stats panel; if a hike's elevation gain matters, it belongs in the prose.

   Order on the page: title, meta, tags, then the write-up, then every photo
   (previewImage first, then additionalImages) stacked below it.

   Code style is deliberately explicit — plain for-loops and spelled-out
   if/else rather than chained array methods — matching trees.js.

   Everything is built with createElement/textContent rather than HTML
   strings, so nothing written in trails-data.js needs HTML-escaping.
   ========================================================================== */
(function () {
  "use strict";

  var CONTAINER_ID = "trail-review";

  // timeZone:"UTC" matters, and this is the second place it matters — see the
  // same note in trails.js. `new Date("2023-05-14")` parses a bare ISO date as
  // UTC midnight, so formatting it in a timezone behind UTC prints the day
  // before (May 13 in US timezones). Formatting in UTC prints the date as it
  // was written in trails-data.js.
  var dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  });

  /* ------------------------------------------------------------------------
     LOOKUP
     ------------------------------------------------------------------------ */

  // Read ?id= from the URL. Works over file:// as well as http, as long as the
  // page is reached by following a link (which is how trails.html reaches it).
  function getRequestedId() {
    var search = window.location.search;
    if (!search) {
      return "";
    }

    var params = new URLSearchParams(search);
    var id = params.get("id");
    if (id === null) {
      return "";
    }

    return id.trim();
  }

  function findTrailById(trails, id) {
    if (id === "") {
      return null;
    }

    var index;
    for (index = 0; index < trails.length; index++) {
      if (trails[index].id === id) {
        return trails[index];
      }
    }

    return null;
  }

  /* ------------------------------------------------------------------------
     SMALL HELPERS
     ------------------------------------------------------------------------ */

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function isNonEmptyString(value) {
    if (typeof value !== "string") {
      return false;
    }
    if (value.trim() === "") {
      return false;
    }
    return true;
  }

  // "12" not "12.0", "11.8" stays "11.8".
  function formatDistance(distanceMiles) {
    if (typeof distanceMiles !== "number") {
      return "";
    }
    if (!isFinite(distanceMiles)) {
      return "";
    }

    var rounded = Math.round(distanceMiles * 10) / 10;
    var text;

    if (rounded === Math.round(rounded)) {
      text = String(Math.round(rounded));
    } else {
      text = String(rounded);
    }

    return text + " mi";
  }

  /* ------------------------------------------------------------------------
     PIECES OF THE PAGE
     ------------------------------------------------------------------------ */

  // A full-width photo, optionally with a caption under it. Used for every
  // photo in the gallery, the preview included.
  function makePhoto(source, altText, caption, className) {
    var figure = makeElement("figure", className);
    var image = document.createElement("img");

    image.src = source;
    image.alt = altText;
    image.loading = "lazy";
    figure.appendChild(image);

    if (isNonEmptyString(caption)) {
      figure.appendChild(makeElement("figcaption", "trail-photo__caption", caption.trim()));
    }

    return figure;
  }

  // Location · date · mileage. Each piece is dropped entirely when absent, so
  // a hike with no mileage shows no separator and no empty slot.
  function makeMetaLine(trail) {
    var meta = makeElement("p", "trail-review__meta");
    var parts = [];
    var distance = formatDistance(trail.distanceMiles);
    var index;

    if (isNonEmptyString(trail.location)) {
      parts.push(trail.location.trim());
    }
    if (isNonEmptyString(trail.dateHiked)) {
      parts.push(dateFormatter.format(new Date(trail.dateHiked)));
    }
    if (distance !== "") {
      parts.push(distance);
    }

    for (index = 0; index < parts.length; index++) {
      if (index > 0) {
        meta.appendChild(makeElement("span", "trail-review__sep", "·"));
      }
      meta.appendChild(makeElement("span", null, parts[index]));
    }

    return meta;
  }

  // Same treatment as the index rows — "gsmnp" keeps its own fill and glyph
  // because it recurs often enough to be worth spotting at a glance.
  function makeTags(tags) {
    if (!Array.isArray(tags)) {
      return null;
    }
    if (tags.length === 0) {
      return null;
    }

    var list = makeElement("div", "trail-tags");
    var index;
    var tag;
    var isGsmnp;
    var pill;

    for (index = 0; index < tags.length; index++) {
      tag = String(tags[index]);
      isGsmnp = tag.toLowerCase() === "gsmnp";

      if (isGsmnp) {
        pill = makeElement("span", "tag tag--gsmnp", "⛰ " + tag);
      } else {
        pill = makeElement("span", "tag", tag);
      }

      list.appendChild(pill);
    }

    return list;
  }

  // `notes` is written as plain text. A blank line starts a new paragraph, so
  // a long write-up gets structure without any markup. Same behaviour as tree
  // descriptions — see appendDescription() in trees.js.
  function appendNotes(container, notes) {
    var paragraphs = notes.trim().split(/\n\s*\n/);
    var index;
    var text;

    for (index = 0; index < paragraphs.length; index++) {
      text = paragraphs[index].trim();
      if (text !== "") {
        container.appendChild(makeElement("p", "trail-review__para", text));
      }
    }
  }

  // Every photo for the page, in display order: the preview first, then the
  // additionalImages. Either may be missing. The preview is turned into the
  // same { src, caption } shape a gallery item uses when it has a caption.
  function collectPhotos(trail) {
    var photos = [];
    var index;

    if (isNonEmptyString(trail.previewImage)) {
      if (isNonEmptyString(trail.previewCaption)) {
        photos.push({ src: trail.previewImage, caption: trail.previewCaption });
      } else {
        photos.push(trail.previewImage);
      }
    }

    if (Array.isArray(trail.additionalImages)) {
      for (index = 0; index < trail.additionalImages.length; index++) {
        photos.push(trail.additionalImages[index]);
      }
    }

    return photos;
  }

  // Gallery entries may be a plain path string OR { src, caption }, so a photo
  // can carry a line of writing without captions ever being required.
  function appendGallery(container, photos, trailName) {
    var gallery = makeElement("div", "trail-gallery");
    var index;
    var entry;
    var source;
    var caption;
    var added = 0;

    for (index = 0; index < photos.length; index++) {
      entry = photos[index];
      source = "";
      caption = "";

      if (typeof entry === "string") {
        source = entry.trim();
      } else if (entry && typeof entry === "object") {
        if (isNonEmptyString(entry.src)) {
          source = entry.src.trim();
        }
        if (isNonEmptyString(entry.caption)) {
          caption = entry.caption.trim();
        }
      }

      if (source !== "") {
        gallery.appendChild(makePhoto(source, trailName, caption, "trail-photo"));
        added = added + 1;
      }
    }

    if (added > 0) {
      container.appendChild(gallery);
    }
  }

  /* ------------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------------ */

  function renderTrail(container, trail) {
    var header = makeElement("div", "trail-review__head");
    var tags = makeTags(trail.tags);

    // This one file serves every hike, so the tab title has to be set here.
    document.title = trail.name + " — Ahmad Tobasei";

    header.appendChild(makeElement("h1", "trail-review__name", trail.name));
    header.appendChild(makeMetaLine(trail));
    if (tags !== null) {
      header.appendChild(tags);
    }
    container.appendChild(header);

    // A hike with no write-up yet still gets a real page — just without the
    // prose block, rather than an empty column.
    if (isNonEmptyString(trail.notes)) {
      appendNotes(container, trail.notes);
    }

    // Photos sit below the write-up for now, the preview leading them.
    appendGallery(container, collectPhotos(trail), trail.name);
  }

  // Shown when the id is missing or matches nothing — a mistyped URL, or a
  // link to a hike that has since been removed from the data file.
  function renderNotFound(container) {
    var link = document.createElement("a");

    container.appendChild(makeElement("h1", "trail-review__name", "Trail not found"));
    container.appendChild(makeElement(
      "p",
      "trail-review__para",
      "That hike isn't in the journal. It may have been renamed, or the link may be wrong."
    ));

    link.className = "trail-review__back";
    link.href = "trails.html";
    link.textContent = "Back to the Trail Journal";
    container.appendChild(link);
  }

  /* ------------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------------ */

  var container = document.getElementById(CONTAINER_ID);
  if (!container) {
    return;
  }

  var trails;
  if (Array.isArray(window.TRAILS_DATA)) {
    trails = window.TRAILS_DATA;
  } else {
    trails = [];
  }

  var trail = findTrailById(trails, getRequestedId());

  if (trail === null) {
    renderNotFound(container);
  } else {
    renderTrail(container, trail);
  }
})();
