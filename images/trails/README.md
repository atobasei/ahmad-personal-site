Hike photos go here.

CONVENTION: one FOLDER per hike, named after the entry's `id` in trails-data.js.

    id: "mount-leconte-via-alum-cave-trail"
      -> images/trails/mount-leconte-via-alum-cave-trail/

Inside that folder:

    preview.jpg              the photo on the trails.html row  (previewImage)
    01-alum-cave-bluffs.jpg  gallery photos, numbered in the   (additionalImages)
    02-cliff-tops.jpg        order you want them shown

Then set the paths on the entry:

    previewImage: "images/trails/mount-leconte-via-alum-cave-trail/preview.jpg",
    additionalImages: [
      "images/trails/mount-leconte-via-alum-cave-trail/01-alum-cave-bluffs.jpg",
      "images/trails/mount-leconte-via-alum-cave-trail/02-cliff-tops.jpg"
    ]

Notes
- A folder each (rather than one flat pile) because a single hike will end up
  with a preview plus a gallery, and they should stay together.
- Paths are relative to the REPO ROOT, with no leading slash. A leading slash
  (/images/...) resolves to the filesystem root when the site is opened from
  disk (file://) and the image silently fails to load. Every page that reads
  this data sits at the repo root, so no prefixing is needed anywhere.
- `preview.jpg` shows on the trails.html row AND as the first photo on the
  hike's own page, below the write-up.
- `additionalImages` shows only on the hike's own page, after the preview.
  Each item is either a plain path string or { src, caption } — see
  trails-data.js. The preview gets a caption with `previewCaption`.
- On the hike page the photos form a two-column grid (one column on phones),
  each caption under its photo. Photos keep their own shape — nothing is
  cropped — so portrait and landscape shots can be mixed freely.
- No build step, so photos ship at whatever size you save them. The row
  thumbnail is at most ~260px wide; ~1200-1600px on the long edge, JPEG q80
  is plenty and keeps the repo small. Never scale a photo UP.
- Strip metadata before committing (`exiftool -all= -tagsfromfile @
  -icc_profile`), which keeps the colour profile. Phone photos can carry GPS.
  If a photo was stored sideways with a rotate tag, rotate the pixels first
  (`sips -r 90`) or it will turn sideways once the tag is gone.
- Untouched phone originals go in `_originals/<id>/` here. That folder is
  gitignored — never commit it.
