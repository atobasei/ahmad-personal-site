/* ==========================================================================
   TREE OF THE DAY — selection + rendering

   Reads window.TREES_DATA (see trees-data.js), picks one species for the
   current calendar day, and renders it into the home page's `.well`.

   Two things worth knowing before editing:

   1. SELECTION IS DETERMINISTIC, NOT RANDOM. The tree is derived from the
      date, so every visitor sees the same species on the same day and a
      refresh never changes it. It rolls over at LOCAL midnight.

   2. ONLY TREES WITH A WRITTEN `description` ARE ELIGIBLE. Entries that are
      still blank are skipped entirely, so the module never shows a species
      with nothing to read. If no entry has a description yet, the module
      renders a "coming soon" state instead of disappearing — the well is the
      home page's centrepiece and the layout expects it to be there.

   Code style here is deliberately explicit — plain for-loops and spelled-out
   if/else rather than chained array methods — per Ahmad's preference.
   ========================================================================== */
(function () {
  "use strict";

  var MODULE_ID = "tree-of-the-day-module";
  var PLACEHOLDER_TEMPLATE_ID = "tree-placeholder-art";
  // The <h2> keeps this id because the <section> points at it with
  // aria-labelledby. Both render paths below must set it.
  var HEADING_ID = "tree-of-the-day";

  var MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

  /* ------------------------------------------------------------------------
     SELECTION (pure functions — no DOM access below this line until render)
     ------------------------------------------------------------------------ */

  // Turn a Date into a whole number of days, counting from 1970-01-01.
  //
  // We read the LOCAL calendar fields (getFullYear/getMonth/getDate) and then
  // rebuild them as a UTC timestamp. That combination is what makes the tree
  // flip at local midnight rather than at UTC midnight, while still counting
  // days in exact 24-hour units. Using the raw timestamp instead would drift
  // across DST, where a local day is 23 or 25 hours long — that would make the
  // tree skip a species in spring and repeat one in autumn.
  function getDayNumber(date) {
    var year = date.getFullYear();
    var month = date.getMonth();
    var dayOfMonth = date.getDate();
    var utcMidnight = Date.UTC(year, month, dayOfMonth);
    return Math.floor(utcMidnight / MILLISECONDS_PER_DAY);
  }

  // A tree is featurable once someone has actually written its description.
  function hasDescription(tree) {
    if (!tree) {
      return false;
    }
    if (typeof tree.description !== "string") {
      return false;
    }
    if (tree.description.trim() === "") {
      return false;
    }
    return true;
  }

  // The subset of the pool that is ready to be shown, in data-file order.
  function getEligibleTrees(trees) {
    var eligible = [];
    var index;
    var tree;

    for (index = 0; index < trees.length; index++) {
      tree = trees[index];
      if (hasDescription(tree)) {
        eligible.push(tree);
      }
    }

    return eligible;
  }

  // Pick the species for `date`. Pure: same arguments in, same tree out.
  // Returns null when nothing is eligible yet, which the caller renders as
  // the "coming soon" state.
  //
  // Plain modulo over the day number means the module walks the eligible list
  // in order, one per day, and cycles back to the start after the last one.
  // Every eligible tree therefore gets featured exactly once per cycle before
  // any repeats. The sequence follows the order of trees-data.js, so if the
  // run-of-the-mill alphabetical grouping ever feels repetitive (five hickories
  // in a row, say), reorder the entries in that file — no code change needed.
  function getTreeOfTheDay(trees, date) {
    if (!Array.isArray(trees)) {
      return null;
    }

    var eligible = getEligibleTrees(trees);
    if (eligible.length === 0) {
      return null;
    }

    var dayNumber = getDayNumber(date);
    var index = dayNumber % eligible.length;
    if (index < 0) {
      // Only reachable for dates before 1970; JS % keeps the sign.
      index = index + eligible.length;
    }

    return eligible[index];
  }

  // Exposed so the selection can be checked from the console without
  // reloading the page, e.g.
  //   getTreeOfTheDay(TREES_DATA, new Date("2026-03-01T12:00:00"))
  window.getTreeOfTheDay = getTreeOfTheDay;

  /* ------------------------------------------------------------------------
     RENDERING
     Built with createElement/textContent rather than innerHTML, so nothing in
     the data file needs HTML-escaping.
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

  // The drawn frond stands in for a photo until image.src is filled in. It
  // lives in a <template> in index.html so the artwork stays in the markup.
  function makePlaceholderArt() {
    var wrapper = makeElement("div", "tree-figure__placeholder");
    var template = document.getElementById(PLACEHOLDER_TEMPLATE_ID);

    if (template && template.content) {
      wrapper.appendChild(template.content.cloneNode(true));
    }

    wrapper.setAttribute("aria-hidden", "true");
    return wrapper;
  }

  // The image frame: a real photo when we have one, the drawn placeholder
  // otherwise. Either way it is the raised object sitting inside the well.
  function makeFigure(tree) {
    var figure = makeElement("div", "tree-figure");
    var image = null;
    var source = "";
    var credit = "";

    if (tree && tree.image) {
      if (typeof tree.image.src === "string") {
        source = tree.image.src.trim();
      }
      if (typeof tree.image.credit === "string") {
        credit = tree.image.credit.trim();
      }
    }

    if (source === "") {
      figure.appendChild(makePlaceholderArt());
    } else {
      image = document.createElement("img");
      image.src = source;
      image.alt = tree.commonName;
      image.loading = "lazy";
      figure.appendChild(image);
    }

    // A credit only means anything over an actual photo — and light-on-dark
    // credit text would be unreadable over the pale placeholder — so it is
    // rendered only when there is both a photo and a credit string.
    if (source !== "" && credit !== "") {
      figure.appendChild(makeElement("p", "tree-figure__credit", credit));
    }

    return figure;
  }

  // Descriptions are written as plain text. A blank line starts a new
  // paragraph, so longer write-ups can have structure without any markup.
  function appendDescription(container, description) {
    var paragraphs = description.trim().split(/\n\s*\n/);
    var index;
    var text;

    for (index = 0; index < paragraphs.length; index++) {
      text = paragraphs[index].trim();
      if (text !== "") {
        container.appendChild(makeElement("p", "feature-note", text));
      }
    }
  }

  // v1 shows the first fun fact only — no rotator, no carousel.
  function getFirstFunFact(tree) {
    if (!tree) {
      return "";
    }
    if (!Array.isArray(tree.funFacts)) {
      return "";
    }

    var index;
    var fact;

    for (index = 0; index < tree.funFacts.length; index++) {
      fact = tree.funFacts[index];
      if (typeof fact === "string" && fact.trim() !== "") {
        return fact.trim();
      }
    }

    return "";
  }

  function renderTree(container, tree) {
    var copy = makeElement("div", "well-copy");
    var heading = makeElement("h2", "feature-name", tree.commonName);
    var funFact = getFirstFunFact(tree);
    var factBlock;

    heading.id = HEADING_ID;

    copy.appendChild(makeElement("p", "feature-label", "Tree of the day"));
    copy.appendChild(heading);
    copy.appendChild(makeElement("p", "tree-sci", tree.scientificName));
    appendDescription(copy, tree.description);

    if (funFact !== "") {
      factBlock = makeElement("div", "tree-fact");
      factBlock.appendChild(makeElement("p", "tree-fact__label", "Fun fact"));
      factBlock.appendChild(makeElement("p", "tree-fact__text", funFact));
      copy.appendChild(factBlock);
    }

    container.appendChild(makeFigure(tree));
    container.appendChild(copy);
  }

  // Shown while no entry has a description yet. Keeps the well and its
  // artwork on the page so the home page's centrepiece does not collapse.
  function renderComingSoon(container) {
    var copy = makeElement("div", "well-copy");
    var heading = makeElement("h2", "feature-name", "Coming soon");

    heading.id = HEADING_ID;

    copy.appendChild(makeElement("p", "feature-label", "Tree of the day"));
    copy.appendChild(heading);
    // TODO (Ahmad): reword this in your own voice whenever you like.
    copy.appendChild(makeElement(
      "p",
      "feature-note",
      "The write-ups are still being written. A new tree will appear here each day once the first one is ready."
    ));

    container.appendChild(makeFigure(null));
    container.appendChild(copy);
  }

  /* ------------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------------ */

  var container = document.getElementById(MODULE_ID);
  if (!container) {
    return;
  }

  var trees;
  if (Array.isArray(window.TREES_DATA)) {
    trees = window.TREES_DATA;
  } else {
    trees = [];
  }

  var tree = getTreeOfTheDay(trees, new Date());

  if (tree === null) {
    renderComingSoon(container);
  } else {
    renderTree(container, tree);
  }
})();
