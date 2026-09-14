Tree photos go here.

CONVENTION: the filename matches the entry's `id` in trees-data.js.

    id: "eastern-hemlock"   ->   images/trees/eastern-hemlock.jpg

Then set that path on the entry:

    image: {
      src: "images/trees/eastern-hemlock.jpg",
      credit: "Photo by Jane Doe, iNaturalist (CC BY 4.0)",
      sourceUrl: "https://www.inaturalist.org/photos/..."
    }

Notes
- One photo per species — that's why this folder is flat, unlike images/trails/.
- Paths are relative to the REPO ROOT, with no leading slash. A leading slash
  (/images/...) resolves to the filesystem root when the site is opened from
  disk (file://) and the image silently fails to load.
- `credit` renders small over the bottom of the photo. Fill it in for anything
  that isn't your own photo. Leave it "" for your own and nothing renders.
- `sourceUrl` is never displayed — it's just so you can find the original again.
- Until `src` is filled in, the module draws the frond placeholder instead, so
  a species with a write-up but no photo still looks finished.
- No build step, so photos ship at whatever size you save them. The frame is
  portrait 4:5 and crops with object-fit: cover, so a portrait-ish original
  crops most predictably. ~1200-1600px on the long edge, JPEG q80 is plenty.
