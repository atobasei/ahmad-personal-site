/* ==========================================================================
   HOME PAGE — small enhancements

   The tree-of-the-day rotation is NOT here: it lives in trees.js, driven by
   the entries in trees-data.js.
   ========================================================================== */


/* --------------------------------------------------------------------------
   EMAIL ASSEMBLY

   The contact address is split across two data- attributes in index.html and
   joined here, so the full address never appears in the page source. Spam
   harvesters overwhelmingly work by running a regex for the usual address
   shape over raw HTML; there is nothing in index.html for that to match.

   To be clear about what this does and doesn't buy: a harvester that executes
   JavaScript, or one that simply reads the data- attributes, defeats it. It
   stops the common case at near-zero cost, nothing more.

   This is progressive enhancement, not a dependency. With JS off, the markup's
   own "name [at] domain [dot] com" text is still perfectly readable — a person
   can retype it. This only upgrades that into a clickable link.
   -------------------------------------------------------------------------- */
(function () {
  "use strict";

  var links = document.querySelectorAll(".contact-email");
  var index;
  var link;
  var user;
  var domain;
  var address;

  for (index = 0; index < links.length; index++) {
    link = links[index];
    user = link.getAttribute("data-u");
    domain = link.getAttribute("data-d");

    // A half-filled element would produce a broken address — leave the
    // fallback text in place instead.
    if (!user || !domain) {
      continue;
    }

    address = user + "@" + domain;

    link.href = "mailto:" + address;
    link.textContent = address;

    // Don't leave the halves sitting in the live DOM either.
    link.removeAttribute("data-u");
    link.removeAttribute("data-d");
  }
})();
