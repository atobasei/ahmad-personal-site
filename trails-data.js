/* ==========================================================================
   TRAIL DATA — add or remove hikes here, no HTML editing needed.

   Loaded as a plain script (not an ES module) so the site keeps working when
   opened directly from disk (file://) — module scripts and fetch() of local
   JSON both get blocked by CORS in that case, a plain global does not.

   Each entry:
     id               slug — used to build the review page filename/link
     name             trail name
     location         "Park/Area, State" style string
     dateHiked        ISO date string, e.g. "2023-05-14"
     tags             array of strings — "gsmnp" is its own tag, kept distinct
                      from the generic "national park" tag
     previewImage     path to the preview photo shown on this index page, and
                      the lead photo on the hike's own page
     reviewUrl        link to the hike's page. Always of the form
                      "trail-review.html?id=<the id above>" — trail-review.html
                      is ONE file that serves every hike, so there is no page
                      to create when you add a hike.

   Optional — all may be present or absent on any entry; nothing breaks either
   way. None of these show on this index page; they render on the hike's own
   page (trail-review.html):
     notes            the write-up. Plain text; a BLANK LINE starts a new
                      paragraph. This is the point of the page — write as much
                      or as little as you want.
     distanceMiles    number, e.g. 12 or 11.8. Renders as "12 mi" next to the
                      date. Leave it out and nothing renders — no empty slot.
     additionalImages array of photos below the write-up. Each item is either
                      a plain path string, or { src, caption } if you want to
                      say something about that particular photo. Captions are
                      never required.

   ON PURPOSE, THERE IS NO elevation/duration/difficulty/route-type FIELD.
   This is a journal, not a trail guide — it's about how the hike felt. If the
   3,000 feet of gain matters, say so in `notes`. Keep this schema thin so
   adding a hike never becomes a data-entry chore.

   PHOTOS: each hike gets its own folder under images/trails/, named after the
   entry's `id` — see images/trails/README.md. Paths are relative to the repo
   root with NO leading slash: a leading slash resolves to the filesystem root
   when the site is opened from disk (file://) and the image fails silently.
   Every page that reads this data sits at the repo root, so these paths need
   no prefixing anywhere.

   Sorting is done at render time (newest hike first) in trails.js, so the
   order of the entries below does not matter.
   ========================================================================== */
window.TRAILS_DATA = [
  {
    id: "mount-leconte-via-alum-cave-trail",
    name: "Mount Leconte Via Alum Cave Trail",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2023-05-14",
    tags: ["views", "national park", "gsmnp"],
    previewImage: "images/trails/mount-leconte-via-alum-cave-trail/preview.jpg",
    reviewUrl: "trail-review.html?id=mount-leconte-via-alum-cave-trail",
    // distanceMiles: 12,   — optional, uncomment if you want it shown
    notes: "My very first time on Mount Leconte. I went alone on the last week of my freshman year of college as I'd felt a drive to for a while. I was nervous as I'd never done a hike this long or so strenuous before. It was about twelve miles and 3,000 feet of elevation gain total and I was totally exhausted but I'll never forget the feeling of sitting the cliff tops in the clouds. I waited and waited and waited and approximately two hours after I reached Leconte lodge the clouds finally gave way to a sea of rich emerald greens and blues. The Spruce-fir, the heath balds, the mosses, the hemlocks I felt like I'd never seen a place so beautiful in my life."
    // additionalImages: [
    //   "images/trails/mount-leconte-via-alum-cave-trail/01-alum-cave-bluffs.jpg",
    //   {
    //     src: "images/trails/mount-leconte-via-alum-cave-trail/02-cliff-tops.jpg",
    //     caption: "The clouds finally giving way, about two hours in."
    //   }
    // ]
  }
];
