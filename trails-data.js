/* ==========================================================================
   PLACEHOLDER TRAIL DATA — replace/add entries here, no HTML editing needed.

   Loaded as a plain script (not an ES module) so the site keeps working when
   opened directly from disk (file://) — module scripts and fetch() of local
   JSON both get blocked by CORS in that case, a plain global does not.

   Each entry:
     id            slug — used to build the review page filename/link
     name          trail name
     location      "Park/Area, State" style string
     dateHiked     ISO date string, e.g. "2026-05-12"
     tags          array of strings — "gsmnp" is its own tag, kept distinct
                   from the generic "national park" tag
     previewImage  path/filename to a preview photo (placeholder for now)
     reviewUrl     link target for the full review (page doesn't exist yet)
   ========================================================================== */
window.TRAILS_DATA = [
  {
    id: "alum-cave-mount-leconte",
    name: "Alum Cave Trail to Mount LeConte",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2026-06-02",
    tags: ["views", "strenuous", "gsmnp", "national park"],
    previewImage: "images/trails/placeholder-1.jpg",
    reviewUrl: "trails/alum-cave-mount-leconte.html"
  },
  {
    id: "ramsey-cascades",
    name: "Ramsey Cascades",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2026-04-18",
    tags: ["waterfall", "old-growth", "gsmnp", "national park"],
    previewImage: "images/trails/placeholder-2.jpg",
    reviewUrl: "trails/ramsey-cascades.html"
  },
  {
    id: "angels-landing",
    name: "Angels Landing",
    location: "Zion National Park, UT",
    dateHiked: "2026-03-09",
    tags: ["views", "exposure", "chains", "national park"],
    previewImage: "images/trails/placeholder-3.jpg",
    reviewUrl: "trails/angels-landing.html"
  },
  {
    id: "charlies-bunion",
    name: "Charlies Bunion",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2026-01-27",
    tags: ["views", "ridgeline", "gsmnp"],
    previewImage: "images/trails/placeholder-4.jpg",
    reviewUrl: "trails/charlies-bunion.html"
  }
];
