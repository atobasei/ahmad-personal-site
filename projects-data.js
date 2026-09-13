/* ==========================================================================
   PROJECT DATA — add or remove projects here, never in projects.html.

   Same pattern as trails-data.js: loaded as a plain script (not an ES module)
   so the site keeps working when opened straight from disk (file://), where
   fetch() of local JSON and module scripts are both blocked by CORS.

   Each entry:
     id            slug, used as the element key
     name          project title
     description   one or two lines — what it is
     tags          array of short strings (language, kind, whatever is useful)
     previewImage  path to a preview image, or "" to show a lettered tile
     url           where the project lives; "" renders the card unlinked
     linkLabel     the text on the card's link line (e.g. "View on GitHub")

   Cards render in the order listed below. If you'd rather sort them, see the
   EXTENSION POINT comment in projects.js.
   ========================================================================== */
window.PROJECTS_DATA = [
  {
    id: "2048",
    name: "2048",
    // TODO: replace with your own description of the build
    description: "The tile-sliding puzzle game, built from scratch to run in the browser.",
    tags: ["JavaScript", "Game"],
    previewImage: "",          // TODO: add images/projects/2048.png
    url: "",                   // TODO: link to the repo or a live demo
    linkLabel: "View project"
  },

  /* ---- placeholder entries below — replace or delete ---- */
  {
    id: "placeholder-two",
    name: "Placeholder project",
    description: "Placeholder description. Swap this entry for a real project.",
    tags: ["Placeholder"],
    previewImage: "",
    url: "",
    linkLabel: "View project"
  },
  {
    id: "placeholder-three",
    name: "Placeholder project",
    description: "Placeholder description. Swap this entry for a real project.",
    tags: ["Placeholder"],
    previewImage: "",
    url: "",
    linkLabel: "View project"
  }
];
