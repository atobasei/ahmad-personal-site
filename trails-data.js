/* ==========================================================================
   TRAIL DATA — add or remove hikes here, no HTML editing needed.

   Loaded as a plain script (not an ES module) so the site keeps working when
   opened directly from disk (file://) — module scripts and fetch() of local
   JSON both get blocked by CORS in that case, a plain global does not.

   Each entry:
     id               slug — used to build the review page link. Must be UNIQUE.
                      Hiking the same trail again? Add a new entry and append
                      the date to the id, e.g.
                        "mount-leconte-via-alum-cave-trail-2025-10-04"
                      Leave the first hike's id as it is so its link keeps
                      working. Each visit gets its own notes, photo folder
                      (images/trails/<id>/) and reviewUrl.
     name             trail name
     location         "Park/Area, State" style string
     dateHiked        ISO date string, e.g. "2023-05-14"
     tags             array of strings — "gsmnp" is its own tag, kept distinct
                      from the generic "national park" tag
     previewImage     path to the preview photo shown on this index page, and
                      the first photo on the hike's own page (below the
                      write-up, above the additionalImages)
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
     previewCaption   a line shown under the preview photo on the hike's own
                      page. Never shown on this index page.
     additionalImages array of photos after the preview photo. Each item is
                      either a plain path string, or { src, caption } if you
                      want to say something about that particular photo.
                      Captions are never required.

   On the hike's own page every photo sits below the write-up, preview first,
   in a two-column grid (one column on phones), each caption under its photo.

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
    // previewCaption: "",   — optional, a line under the preview photo
    reviewUrl: "trail-review.html?id=mount-leconte-via-alum-cave-trail",
     distanceMiles: 12,  // — optional, uncomment if you want it shown
    notes: "My very first time on Mount Leconte. I went alone on the last week of my freshman year of college as I'd felt a drive to for a while. I was nervous as I'd never done a hike this long or so strenuous before. It was about twelve miles and 3,000 feet of elevation gain total and I was totally exhausted but I'll never forget the feeling of sitting the cliff tops in the clouds. I waited and waited and waited and approximately two hours after I reached Leconte lodge the clouds finally gave way to a sea of rich emerald greens and blues. The Spruce-fir, the heath balds, the mosses, the hemlocks I felt like I'd never seen a place so beautiful in my life.",
    // To caption a photo, swap its path for { src: "…/01.jpg", caption: "…" }
    additionalImages: [
      "images/trails/mount-leconte-via-alum-cave-trail/01.jpg",
      "images/trails/mount-leconte-via-alum-cave-trail/02.jpg",
      "images/trails/mount-leconte-via-alum-cave-trail/03.jpg",
      "images/trails/mount-leconte-via-alum-cave-trail/04.jpg"
    ]
  },
  {
    id: "longs-peak-via-the-keyhole",
    name: "Long’s Peak Via The Keyhole",
    location: "Rocky Mountain National Park, CO",
    dateHiked: "2025-09-01",
    tags: ["views", "scrambling", "rocky mountains", "national park"],
    previewImage: "images/trails/longs-peak-via-the-keyhole/preview.jpg",
    reviewUrl: "trail-review.html?id=longs-peak-via-the-keyhole",
    distanceMiles: 15,
    // To caption a photo, swap its path for { src: "…/01.jpg", caption: "…" }
    additionalImages: [
      "images/trails/longs-peak-via-the-keyhole/01.jpg",
      "images/trails/longs-peak-via-the-keyhole/02.jpg",
      "images/trails/longs-peak-via-the-keyhole/03.jpg"
    ],
    notes: "Definitely the most difficult hike I’d ever done to date. As someone who is usually unintimidated by heights I assumed the physical aspect of this hike would be the most difficult but the toll associated with scrambling surprised me. This hike is usually split up into six components: the approach, the boulderfield, the ledges, the trough, the narrows, and the homestretch. Each of these sections looks different physically and feel distinct from one another mentally as well.\n\nWe started early at two in the morning for a few reasons, one the hike was going to be incredibly long (15 miles and 5,000 vertical feet of climbing) and we needed to be off the summit before noon to avoid thunderstorms, and two it was Labor day and we knew the crowds would be pretty bad. The parking lot for longs peak trailhead notoriously fills up as early as 3:00 or 4:00 in the summers and we really didn’t want to be walking up the road or stress about parking. That being said this meant that for the first five miles of the hike we were completely engulfed in darkness. Before I knew it we reached the boulderfield. I remember insisting to my cousin who accompanied me that we were not yet in the boulderfield as it felt like it hadn’t been very long and I was sure we had more climbing to do first. It became quickly apparent I was wrong however as the sky became brighter and the Long’s peak diamond came into view on our left. Soon at 6:20 am we found ourselves at the notorious notch in the ridge for which this trail is named, the keyhole, and had a quick breakfast as the sunrise came up over the horizon from the great plains way off in the distance.\n\nFinally the real difficult section had begun; I found the ledges to be relatively easy though I traversed with care. Looking down into the valley on the other side felt surreal as small snowfields and lakes littered the shadowy pockets in the mountain valley below creating a spectacled appearance. As I continued across the ledges and down towards the trough I felt the real difficulty begin to dawn on me and began to slow a bit as I got more tired. The trough was straightforward yet exhausting. 600 vertical feet in less than a quarter of a mile, with small amounts of ice and loose scree adding to the mental component. As I neared the top of the trough I found myself struggling with moves that weren’t very technically difficult not because the moves were hard, but because I'd spent all my focus getting there. Strangely the narrows were a bit of a break from this. Despite the fact that they are the most exposed section on the entire hike, the traverse was relatively straightforward barring the very last moves that transition you into the homestretch. This section was my last major challenge, the piece I found to personally be most difficult. I stopped constantly and was clinging onto those polished granite slabs for dear life. When I finally made it to the summit I was so out of it that I barely even cared I’d made it at all. In a state of delirium I dropped my food from my hands (not off the mountain) multiple times.\n\nThe way down was surprisingly relatively simple. I took it slow, and made things easy where I could. My cousin humorously commented as to whether I was going to slide down on my butt the whole time but I didn’t care. I made it and I was going to make it back that much had been decided as far as I was concerned. Soon we were back below the boulderfield once again and the exhaustion reached us both where one foot was just dragging in front of the other with no words being spoken. We took a few short breaks and were especially reinvigorated at the chasm lake junction. An incredible view of Long's peak and the diamond shown bright in the sun where previously we’d been in total darkness and this view was a pleasant surprise.\n\nAfter finally making it down and having time to settle your brain does funny things by making a joke out of your misery. I know I did not enjoy myself for a large portion of this hike, I know it was the most exhausted I’d ever felt from any trail at all, and yet I can't help but look back fondly and want to do it again. Though to be completely fair I think working on general fitness and scrambling skills could greatly alleviate much of the difficulty I experienced and make trips like this more manageable in the future."
  },
  {
    id: "mount-cammerer-via-low-gap-trail",
    name: "Mount Cammerer Via Low Gap Trail",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2025-10-25",
    tags: ["fall foliage", "national park", "views", "fire tower", "gsmnp"],
    previewImage: "images/trails/mount-cammerer-via-low-gap-trail/preview.jpg",
    reviewUrl: "trail-review.html?id=mount-cammerer-via-low-gap-trail",
    distanceMiles: 11,
    // To caption a photo, swap its path for { src: "…/01.jpg", caption: "…" }
    additionalImages: [
      "images/trails/mount-cammerer-via-low-gap-trail/01.jpg",
      "images/trails/mount-cammerer-via-low-gap-trail/02.jpg",
      "images/trails/mount-cammerer-via-low-gap-trail/03.jpg"
    ],
    notes: "In what became a bit of a tradition for me, I embarked on a hike during the last few days in October in order to catch the fall colors of the Smokies. This mountain, Mount Cammerer, sits on the main Smokies ridge along the Appalachian Trail towards the northern border of the park and has a comparatively modest elevation of 4928 feet though it still rises quite dramatically on the Tennessee side with the trail to its summit taking more than 3,000 feet of climbing. This slightly lower elevation actually makes it ideal for fall color viewing in the Smokies as the higher peaks over 6,000 feet are typically enveloped in thick swatches of spruce-fir forest which are composed almost entirely of evergreens and don’t experience the typical fall foliage patterns. Cammerer is also notable for its octagonal fire tower that sits close to the summit in a rocky heath bald offering panoramic views in all directions of the valley on the west and more mountains to the east.\n\nI found the trail to be enjoyable overall, it was a brisk chilly morning that felt refreshing and wonderful especially given all the moving you knew you were about to be doing. The campground in Cosby where the hike starts reminded me of other frontcountry Smokies campgrounds I’d seen before like Smokemont and Cades Cove. Gusts of wind brought the pleasant sound of rustles and a cascade of yellow leaves which seemed to be the dominant color at the moment. As we climbed up to the Appalachian Trail we got more and more glimpses of the surrounding mountain landscape with views of the much higher Tricorner Knob and Guyot area to the southwest. Approaching the actual fire tower you enter a slightly more rugged landscape of shrubs and heath that I’ve come to know and love in the southern Appalachians. From there through thick columns of rhododendron you hop up and around a few rocks and before you know it you’re there.\n\nThe views from the fire tower itself were magnificent. Though we were close to a week early for true peak fall colors, it was still an incredible sight to see with the partially cloudy weather casting rays of shadows and sun onto the sea of trees adding depth to the already beautiful landscape. Me and my friends soaked up the views, had our snacks, and chatted with the many people also up on the fire tower that day. Cammerer is known for being a great fall color spot in the Smokies and it seemed that it was many people’s tradition to hike it at the same time as well. After a little while we knew our time at the summit had come to pass and began to make the slow descent back to our car."
  },
  {
    id: "albright-grove-loop-trail",
    name: "Albright Grove Loop Trail",
    location: "Great Smoky Mountains National Park, TN",
    dateHiked: "2024-10-13",
    tags: ["old-growth", "gsmnp", "national park"],
    previewImage: "images/trails/albright-grove-loop-trail/preview.jpg",
    reviewUrl: "trail-review.html?id=albright-grove-loop-trail",
    distanceMiles: 6,
    // To caption a photo, swap its path for { src: "…/01.jpg", caption: "…" }
    additionalImages: [
      "images/trails/albright-grove-loop-trail/01.jpg",
      "images/trails/albright-grove-loop-trail/02.jpg",
      "images/trails/albright-grove-loop-trail/03.jpg"
    ],
    notes: "A trail I was super excited to do, Albright Grove Loop Trail is a small .7 mile loop accessible through a couple miles of hiking along the Maddron Bald Trail from Cosby, Tennessee. This trail is known for being one of the few pockets of old growth cove hardwood forest left in the Appalachians. Despite the view that many hold of the Smokies as being a pristine wilderness, about 75 percent of the park has been aggressively logged with only about 20 percent being left untouched. Of this 20 percent the majority was on high ridgelines and mountain peaks. These areas experienced their own challenges even after the park’s establishment well into the 20th century with acid rain and the balsam woolly adelgid leading to much of the original trees there to die as well. While there are a significant amount of old growth pockets left in the Smokies, Albright Grove Loop Trail is unique in the type of environment it held onto, its ease of access and its grandeur.\n\nFor a tree lover like myself, this trail definitely delivered. As I began on an old logging road I noticed signs of settlers, old homesteads, the famous Baxter cabin built out of a single American chestnut tree, and a small creek meandering along the side of the trail. Given all the evidence of past settlement I was seeing, I felt a little surprised that an old growth forest was supposedly just a few miles away from the park border so close to all these homesteads but I continued onwards. It was a very quiet day on trail and I seldom passed any other hikers. You always know if you’re the first person to walk on a trail that day, an endless cycle of accidentally walking into spiderwebs won’t let you forget that fact.\n\nMaking my way over fallen trees which I could only assume were because of Helene I soon realized the logging road had disappeared and I was left in a complex dense mess of wood and heath. Soon thereafter, immediately upon entering the loop trail itself I found myself face to face with what may have been the largest tulip poplar I’d ever seen in my entire life. A large cavity and split was present at its base, something I’m not too used to seeing poplars do, and its mossy trunk extended upwards what I assume to be something close to 130 feet tall. Like many old growth forests, Albright Grove exhibits what's known as pit and mound topography. Old trees fall over often picking up swatches of dirt with their roots and new trees grow on top of them and around them. This pattern of repeated disturbance and decomposition leads to the lumpy forest floor landscape which provides shade for wildlife and dry and wet spots on the forest floor leading to a greater diversity of life. As I continued forward I saw many more giant poplars, one being larger than the first, and many trees with a similarly gnarled base. Among the other notable trees I saw were eastern hemlocks, magnolias, yellow birch, and some sugar maples with such textured bark.\n\nOne amazing thing about old growth trees is how uniform the trunk size can be, you can take a cross section 50 feet off the ground and one 10 feet off the ground and they look almost identical. Over time, tall trees can shift their mechanical weight and grow at just the right amount to become as balanced and stable as possible leading to this less tapered cylindrical look. I slowly took the time to appreciate much of what I was seeing, took photos of many trees, stood in the trunks of fallen giants, and peered my head into the damp mossy cavities and holes (though maybe I shouldn’t have in fear of wildlife).\n\nThe walk back to my car felt so quick as I couldn’t stop thinking about everything I saw. Though much of the oldest trees are on the decline and many hemlocks were unfortunately standing skeletons due to the hemlock woolly adelgid, Albright Grove was still a sight to behold and definitely a place I’d like to visit again."
  }
];
