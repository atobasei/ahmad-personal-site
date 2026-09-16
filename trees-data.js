/* ==========================================================================
   TREE DATA — the pool the "tree of the day" rotates through.

   Same pattern as trails-data.js and projects-data.js: a plain global, not a
   .json file loaded with fetch(). The site has to keep working when opened
   straight from disk (file://), where fetch() of local JSON and ES modules
   are both blocked by CORS. The shape below is exactly the intended JSON
   schema, so it can move to a real .json file later if the site ever gets
   served over http.

   Each entry:
     id              slug, kebab-case of the common name — stable lookup key
     commonName      display name
     scientificName  binomial, rendered in italics
     range           where it grows, written broadly: "Eastern U.S.",
                     "Southern Appalachians". Filled in for every entry.
     description     YOUR QUIP about the tree — whatever you find worth saying.
                     THIS FIELD IS THE ON/OFF SWITCH: a tree is only eligible
                     to be featured once this is non-empty, so entries you
                     haven't written yet never show up on the home page.
                     A BLANK LINE starts a new paragraph.
     image.src       path to a photo, or "" for the drawn placeholder. Photos
                     live flat in images/trees/ named after the entry's `id`,
                     e.g. "images/trees/eastern-hemlock.jpg" — see
                     images/trees/README.md. Relative to the repo root with NO
                     leading slash: a leading slash resolves to the filesystem
                     root when the site is opened from disk (file://) and the
                     image fails silently.
     image.credit    plain display string, e.g. "Photo by Jane Doe, iNaturalist
                     (CC BY 4.0)". Rendered small over the photo. "" renders
                     nothing. Fill this in for any photo that isn't your own.
     image.sourceUrl reference only, for Ahmad — never rendered anywhere.

   TO PUT A TREE INTO ROTATION: write its `description`. Nothing else needs
   touching — not the HTML, not trees.js.
   ========================================================================== */
window.TREES_DATA = [
  {
    id: "american-beech",
    commonName: "American Beech",
    scientificName: "Fagus grandifolia",
    range: "Eastern U.S. and southeastern Canada",
    description: "Easily recognized by its smooth gray bark and marcescence in winter. This unique hardwood tree is a constant presence in the eastern US and its beechnuts were historically used by wildlife and natives alike.",
    image: {
      src: "images/trees/american-beech.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "green-ash",
    commonName: "Green Ash",
    scientificName: "Fraxinus pennsylvanica",
    range: "Eastern and central U.S. and southern Canada",
    description: "A fast growing tree, the green ash, also known as the red ash, is a common tree across much of the eastern United States and into the great plains and Canada. The flowers pictured are strictly wind pollinated and exist in compact panicles.",
    image: {
      src: "images/trees/green-ash.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "white-ash",
    commonName: "White Ash",
    scientificName: "Fraxinus americana",
    range: "Eastern U.S. and southeastern Canada",
    description: "Also called the American Ash this large tree exhibits typical alternating leaves with a point and rough furrowed bark. Unfortunately Ash trees face large threats due to the emerald ash borer, an invasive insect that burrows in Ash bark and feeds on the tree’s nutrients. Like the American elm this tree is thought to have a symbiotic relationship with morel mushrooms!",
    image: {
      src: "images/trees/white-ash.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "american-basswood",
    commonName: "American Basswood",
    scientificName: "Tilia americana",
    range: "Northeastern U.S. and southeastern Canada",
    description: "The American Basswood is a large deciduous tree with big heart shaped leaves that provide ample shade in areas where it grows. The tree also exhibits small yellow flowers in late spring that develop into woody nuts as the season continues. This tree is also prized by beekeepers as honey produced by its flowers is known to have a distinctive pleasant flavor and aroma.",
    image: {
      src: "images/trees/american-basswood.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "baldcypress",
    commonName: "Baldcypress",
    scientificName: "Taxodium distichum",
    range: "Southeastern U.S. and the lower Mississippi Valley",
    description: "An especially large swamp tree, this conifer is one of the true giants of the south thriving in wetlands all across the southern United States. This tree is also known to grow knobs known as cypress knees which are aerial roots that grow out of the root system upwards. Currently the oldest living Bald Cypress tree is estimated to be 1,500 years old.",
    image: {
      src: "images/trees/baldcypress.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-cherry",
    commonName: "Black Cherry",
    scientificName: "Prunus serotina",
    range: "Eastern U.S. and southeastern Canada",
    description: "The native black cherry, not to be confused with ornamental cherry blossoms or commercial cherry varieties, is a large and relatively fast growing hardwood known for its small cherry fruits. This tree is especially ecologically useful for many animals and birds and is a favorite for many black bears in Tennessee. Pictured is a black bear eating wild cherries in cades cove in the great smoky mountains national park.",
    image: {
      src: "images/trees/black-cherry.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-walnut",
    commonName: "Black Walnut",
    scientificName: "Juglans nigra",
    range: "Eastern and central U.S.",
    description: "An incredibly famous hardwood tree, our native walnut grows broadly across much of the eastern half of the country. Its large nuts are prized by humans and animals alike and the husk that surrounds them turns an inky black as it rots away in the fall hence the tree's name.",
    image: {
      src: "images/trees/black-walnut.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "blackgum",
    commonName: "Blackgum",
    scientificName: "Nyssa sylvatica",
    range: "Eastern U.S.",
    description: "Also known as Tupelo or Sourgum, the blackgum tree is a medium sized tree known for its brilliant red coloration in the fall. The leaves also have a distinct waxy appearance and the bark exhibits a rough blocky texture. This tree also appears isolated from the rest of its range by hundreds of miles in Mexico’s “cloud forests” on high mountains!",
    image: {
      src: "images/trees/blackgum.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "boxelder",
    commonName: "Boxelder",
    scientificName: "Acer negundo",
    range: "Across much of the U.S. and southern Canada",
    description: "The Boxelder is a quick growing medium sized tree widespread across much of the eastern United States, the mountain west, and the great plains. While lacking the typical maple leaf shape, the box elder is a true maple and is a close relative of others such as the red and sugar maple. This becomes more apparent when looking at its growth habit and its winged samara (helicopter like) seeds.",
    image: {
      src: "images/trees/boxelder.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "ohio-buckeye",
    commonName: "Ohio Buckeye",
    scientificName: "Aesculus glabra",
    range: "Midwestern and central U.S.",
    description: "Famous for the spiky shells around its fruit, this medium sized buckeye is also the mascot for Ohio State university. Like other buckeyes it shares a palmately compound leaf structure and is toxic to humans in all forms.",
    image: {
      src: "images/trees/ohio-buckeye.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "yellow-buckeye",
    commonName: "Yellow Buckeye",
    scientificName: "Aesculus flava",
    range: "Ohio Valley and Appalachian U.S.",
    description: "The largest of all north american buckeyes, this tree features all the typical buckeye characteristics including the five leaflet palmately compound leaves and large seeds. Raw fruits and seeds are highly toxic to humans and most animals alike.",
    image: {
      src: "images/trees/yellow-buckeye.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-buckeye",
    commonName: "Red Buckeye",
    scientificName: "Aesculus pavia",
    range: "Southeastern U.S.",
    description: "More of a large shrub, this buckeye species is named for its elongated tube-like red flowers which are known to attract hummingbirds and other pollinators. Like other buckeyes it creates the smooth chestnut looking nuts though they are notably smaller and lighter in color than the large yellow buckeye.",
    image: {
      src: "images/trees/red-buckeye.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-cottonwood",
    commonName: "Eastern Cottonwood",
    scientificName: "Populus deltoides",
    range: "Eastern and central U.S. and southern Canada",
    description: "One of the fastest growing and larger trees found in the east, this tree is named for the white fluff surrounding its seeds which can carpet the ground in areas where cottonwood is abundant. Cottonwoods prefer moist soils and often grow on the edges of riverbanks and wetlands across much of the country. While much larger than its other populus genus cousins, its leaves and branching habit show some resemblance to other related trees such as Aspens.",
    image: {
      src: "images/trees/eastern-cottonwood.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-redcedar",
    commonName: "Eastern Redcedar",
    scientificName: "Juniperus virginiana",
    range: "Eastern and central U.S.",
    description: "Technically a juniper rather than a cedar, this tree commonly occupies new growth forests and is one of the first species to establish after disturbances. Specifically here in Tennessee I’ve noticed it dominates disturbed areas with a heavy limestone presence. The inner bark for which it is named is notably a deep crimson color and can look especially striking.",
    image: {
      src: "images/trees/eastern-redcedar.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "american-elm",
    commonName: "American Elm",
    scientificName: "Ulmus americana",
    range: "Eastern and central U.S. and southern Canada",
    description: "The American elm is a larger deciduous tree growing across much of the eastern United States and southern Canada. Despite major losses due to Dutch elm disease, American elms are slowly making a comeback with much human effort. Among its many features it's also known to share a symbiotic relationship with morel mushrooms!",
    image: {
      src: "images/trees/american-elm.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "slippery-elm",
    commonName: "Slippery Elm",
    scientificName: "Ulmus rubra",
    range: "Eastern and central U.S. and southern Ontario",
    description: "The Slippery elm is a medium sized tree growing widely across the eastern United States. Like other elms it features the typical leaf serrations, rough texture, and oval shape. The inner bark of this tree contains a slippery gel with a long history of both indigenous medicinal use and later use by American settlers.",
    image: {
      src: "images/trees/slippery-elm.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "winged-elm",
    commonName: "Winged Elm",
    scientificName: "Ulmus alata",
    range: "Southeastern U.S.",
    description: "Named for the woody growth along new branches, the winged elm is a common, medium sized, tree growing across the southeast. Like other elms it features doubly serrated leaves and asymmetrical growth across the stems.",
    image: {
      src: "images/trees/winged-elm.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "flowering-dogwood",
    commonName: "Flowering Dogwood",
    scientificName: "Cornus florida",
    range: "Eastern U.S. and southern Ontario",
    description: "A common ornamental tree, the flowering dogwood is a small tree with bark that develops into thick blocky chunks with age. The flower petals are biologically modified leaves rather than true flower petals and can vary in color from white to bright pink!",
    image: {
      src: "images/trees/flowering-dogwood.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "hackberry",
    commonName: "Hackberry",
    scientificName: "Celtis occidentalis",
    range: "Eastern and central U.S.",
    description: "The Hackberry is an especially common fast growing tree that tends to be an early successional tree after disturbances. Similar to trees like winged elm, the bark and branches exhibit woody growth and furrows where the bark beneath can be relatively smooth in comparison.",
    image: {
      src: "images/trees/hackberry.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-hemlock",
    commonName: "Eastern Hemlock",
    scientificName: "Tsuga canadensis",
    range: "Northeastern U.S. and southeastern Canada, south through the Appalachians",
    description: "One of my absolute favorite trees, the eastern hemlock is one of the largest trees on the east coast growing up to 173 feet tall. Its leaves are small, flat, and waxy lying together on a single plane in space. The new growth leaves also exhibit a bright green color that turns into a deep emerald with age as shown in the image. Hemlocks are notably able to survive as small trees in the understory for many years before suddenly exhibiting rapid growth when a gap in the canopy emerges.",
    image: {
      src: "images/trees/eastern-hemlock.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "carolina-hemlock",
    commonName: "Carolina Hemlock",
    scientificName: "Tsuga caroliniana",
    range: "Southern Appalachians",
    description: "A close relative of Eastern hemlock, this hemlock variety is endemic to the southern Appalachians. Unlike the leaves of the eastern hemlock which lie flat on a plane, the needles of the Carolina hemlock can sprout in all directions. This tree also has slightly larger cones and thrives in dryer rockier areas where eastern hemlock often struggles.",
    image: {
      src: "images/trees/carolina-hemlock.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "bitternut-hickory",
    commonName: "Bitternut Hickory",
    scientificName: "Carya cordiformis",
    range: "Eastern U.S. and southeastern Canada",
    description: "Bitternut hickory is a large hardwood known for its yellow buds and hickory shells. Like other hickories it has alternate pinnately compound leaves and develops deep furrows in its bark with age.",
    image: {
      src: "images/trees/bitternut-hickory.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "mockernut-hickory",
    commonName: "Mockernut Hickory",
    scientificName: "Carya tomentosa",
    range: "Eastern U.S.",
    description: "Mockernut Hickory is another large hickory species common across much of the eastern united states. Like other hickories it produces nuts (covered by green husks in the photo) and has pinnately compound leaves. It is distinguishable from other hickories by its dense hairs that grow on new buds and on the underside of its leaves.",
    image: {
      src: "images/trees/mockernut-hickory.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "pignut-hickory",
    commonName: "Pignut Hickory",
    scientificName: "Carya glabra",
    range: "Eastern U.S. and southern Ontario",
    description: "Slightly less common than other hickories, this tree is distinguishable from others by its smoother bark and elongated almost pear shaped nuts. While humans often consider pignut to be more bitter than other hickories this species is still heavily utilized by wildlife across its range.",
    image: {
      src: "images/trees/pignut-hickory.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shagbark-hickory",
    commonName: "Shagbark Hickory",
    scientificName: "Carya ovata",
    range: "Eastern U.S. and southeastern Canada",
    description: "Easily identifiable by its gray, peeling bark, Shagbark hickory is a large hardwood especially common in Tennessee where I’m from. Its nuts are sweet and rich with a similar flavor to pecans or walnuts and its wood is also used for many purposes such as smoking meats and making durable tools.",
    image: {
      src: "images/trees/shagbark-hickory.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shellbark-hickory",
    commonName: "Shellbark Hickory",
    scientificName: "Carya laciniosa",
    range: "Ohio and upper Mississippi Valleys",
    description: "One of the larger hickory species, this hickory has large scale-like bark that runs vertically without the exaggerated peeling of shagbark hickory. Its leaflets also contain 7 to 9 leaves as opposed to 5 in shagbarks. Its nuts are also the largest and sweetest of all hickories. I find this tree to personally be very beautiful and exemplary for hickories.",
    image: {
      src: "images/trees/shellbark-hickory.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-locust",
    commonName: "Black Locust",
    scientificName: "Robinia pseudoacacia",
    range: "Appalachian and Ozark U.S., naturalized far beyond",
    description: "The black locust is a medium sized tree in the legume family and shares many similarities in flower and leaf structure with other legumes. Its small white flowers develop into elongated seed pods. The tree also contains short prickles under each leaf though it lacks the elongated spines of its neighbor the honey locust.",
    image: {
      src: "images/trees/black-locust.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "honey-locust",
    commonName: "Honey Locust",
    scientificName: "Gleditsia triacanthos",
    range: "Central and eastern U.S.",
    description: "A common medium sized tree in the legume family, the honey locust is easily identifiable by its large spines that grow all over the bark and branches. These spines can vary in size and density and can sometimes entirely cover the tree. It is theorized that the tree developed them as a defense mechanism for north american megafauna such as mammoths or ground sloths.",
    image: {
      src: "images/trees/honey-locust.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-maple",
    commonName: "Red Maple",
    scientificName: "Acer rubrum",
    range: "Eastern U.S. and eastern Canada",
    description: "Arguably the most famous of all maples, this common backyard tree is known for its brilliant red foliage in the fall and typical five lobed leaves. This tree’s leaf is also featured on the Canadian flag. In differentiating it from other maple its leaves are generally larger, it has a slightly more vertical growing habit, and its bark starts smoother when young and develops into longer vertical plates.",
    image: {
      src: "images/trees/red-maple.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "silver-maple",
    commonName: "Silver Maple",
    scientificName: "Acer saccharinum",
    range: "Eastern and central U.S. and southeastern Canada",
    description: "Like other maples, the silver maple shares the general maple leaf shape with a slightly more serrated and elongated look though their fall color display is slightly less dramatic. These trees also tend to have more grayish bark and a silvery underside to their leaves. Silver maples also have a very unique branching habit where they tend to branch often early at small angles making the tree look like it has multiple trunks.",
    image: {
      src: "images/trees/silver-maple.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sugar-maple",
    commonName: "Sugar Maple",
    scientificName: "Acer saccharum",
    range: "Northeastern U.S. and southeastern Canada",
    description: "The Sugar maple is another especially famous maple tree, tapped in the spring for its prized sap which is then boiled into maple syrup. It has an especially fiery orange fall color display with some of the brightest coloration on any tree. As it grows older sugar maple bark develops into irregular furrows and plates that can curl outwards. This photo is of an especially old sugar maple I took in Murfreesboro, TN.",
    image: {
      src: "images/trees/sugar-maple.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-oak",
    commonName: "Black Oak",
    scientificName: "Quercus velutina",
    range: "Eastern and central U.S.",
    description: "The Black oak is a common oak across much of the country identifiable by its dark bark, vertical furrows, small acorns, and distinctive yellowish hue along the inner bark. Its leaves, like many oaks, can range in shape but they typically contain 5 to 7 pointed lobes and a deep emerald green color.",
    image: {
      src: "images/trees/black-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "bur-oak",
    commonName: "Bur Oak",
    scientificName: "Quercus macrocarpa",
    range: "Central and midwestern U.S. and south-central Canada",
    description: "The Burr Oak is a large oak tree in the White Oak family. It is known for its large acorns which are the largest of any North American oak and contain mossy bristles on their cap. Like most white oaks the lobes on the leaves are rounded rather than pointed though it still maintains the common oak tree leaf lobe appearance.",
    image: {
      src: "images/trees/bur-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "chestnut-oak",
    commonName: "Chestnut Oak",
    scientificName: "Quercus prinus",
    range: "Eastern U.S., centered on the Appalachians",
    description: "Named for its leaves, the Chestnut Oak leaves bear close similarity to both the American and Chinese chestnut trees. Its bark tends to be deeply furrowed and its acorns are a little elongated and less rounded as opposed to other oaks.",
    image: {
      src: "images/trees/chestnut-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "pin-oak",
    commonName: "Pin Oak",
    scientificName: "Quercus palustris",
    range: "Eastern and central U.S.",
    description: "A member of the Red Oak family, Pin Oak trees are known for their especially pinned leaf shape with anywhere from five to seven sharp lobes. The lower branches on Pin Oak also often slope downwards giving the tree an identifiable shape from afar.",
    image: {
      src: "images/trees/pin-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "post-oak",
    commonName: "Post Oak",
    scientificName: "Quercus stellata",
    range: "Eastern and south-central U.S.",
    description: "Known for their cross-shaped leaves, the post oak is another white oak family tree and is considerably more tolerant than other species of drought and fire. Its wood is also very rot resistant and is therefore prized by many. Personally I love the leaf shape as it really completes the transition in oak tree leaves from willow to water to post to white oak, each one showing a different phenotype with some shared characteristics.",
    image: {
      src: "images/trees/post-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "live-oak",
    commonName: "Live Oak",
    scientificName: "Quercus virginiana",
    range: "Southeastern U.S. coastal plain",
    description: "The Southern Live Oak is an especially famous and beautiful tree common along the gulf coast but will grow as far north as Virginia. Its wide branching habit gives it a distinct shape with branches often touching the ground before spreading outwards once again. The leaves on this tree are also dark and glossy and stay on year round.",
    image: {
      src: "images/trees/live-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "water-oak",
    commonName: "Water Oak",
    scientificName: "Quercus nigra",
    range: "Southeastern U.S.",
    description: "The Water Oak resembles many other oaks in its growth habits and bark appearance though it branches out slightly more than other red oak family oaks. Its leaves look somewhere in between that of a typical oak leaf and that of a live or willow oak where it was almost trying to become an oak leaf but gave up. As the name may imply these trees love water rich environments.",
    image: {
      src: "images/trees/water-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "white-oak",
    commonName: "White Oak",
    scientificName: "Quercus alba",
    range: "Eastern U.S. and southeastern Canada",
    description: "The White Oak is a massive deciduous oak tree native to much of North America. Its leaves display the typical lobed oak appearance with rounded edges and its bark develops into gray plates and furrows with age. Many of the common oldest trees across the eastern United States are white oaks and large specimens are not uncommon to find.",
    image: {
      src: "images/trees/white-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "willow-oak",
    commonName: "Willow Oak",
    scientificName: "Quercus phellos",
    range: "Southeastern U.S.",
    description: "The Willow Oak is named for its early spring flowers which droop like that of a willow. Outside this, they are easily identifiable by their leaves which are small, short, and slender, lacking the more common oak tree leaf. If you went to the University of Tennessee you may recognize this tree as the one that lines the ped as its planted all over campus as a shade and landscaping tree.",
    image: {
      src: "images/trees/willow-oak.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "persimmon",
    commonName: "Persimmon",
    scientificName: "Diospyros virginiana",
    range: "Southeastern and central U.S.",
    description: "The American Persimmon is a medium sized tree with an especially sweet fruit found across much of the eastern United States. Its fruits start green and hard and incredibly astringent, though tend to soften significantly in the fall after the first frost. The Persimmon’s bark is its most dramatic feature with an exaggerated blocky look that makes it easy to distinguish even in winter.",
    image: {
      src: "images/trees/persimmon.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "loblolly-pine",
    commonName: "Loblolly Pine",
    scientificName: "Pinus taeda",
    range: "Southeastern U.S.",
    description: "The loblolly is a fast growing pine common across the southern coastal plain. Its bark develops into large separated plates with age and it can grow to be over 150 feet tall. Loblolly pine has had its entire genome sequenced and was the largest sequenced genome at the time of completion.",
    image: {
      src: "images/trees/loblolly-pine.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shortleaf-pine",
    commonName: "Shortleaf Pine",
    scientificName: "Pinus echinata",
    range: "Southeastern and south-central U.S.",
    description: "The Shortleaf pine is a common southern pine and occurs in many habitats though it prefers faster draining soils. Due to lack of fire and ecological changes shortleaf pine has seen increased hybridization with other species and a decrease in its overall population though this has recently been combatted with more educated ecological practices.",
    image: {
      src: "images/trees/shortleaf-pine.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "virginia-pine",
    commonName: "Virginia Pine",
    scientificName: "Pinus virginiana",
    range: "Mid-Atlantic and southern Appalachian U.S.",
    description: "A small pine native to a small range on the east coast. This pine tree is identifiable by its small cones, slightly gnarled appearance, and short needles that grow in bunches of two. This tree thrives in drier or rockier soils where other trees often struggle.",
    image: {
      src: "images/trees/virginia-pine.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-white-pine",
    commonName: "Eastern White Pine",
    scientificName: "Pinus strobus",
    range: "Northeastern U.S. and southeastern Canada, south through the Appalachians",
    description: "One of the most common and typical pine trees of the northeast and Appalachia, this tree bears that characteristic pine appearance with large bunches of needles, a tall tree, and elongated brown cones. Eastern white pine is often planted ornamentally as well as a barrier tree.",
    image: {
      src: "images/trees/eastern-white-pine.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-mulberry",
    commonName: "Red Mulberry",
    scientificName: "Morus rubra",
    range: "Eastern and central U.S. and southern Ontario",
    description: "Not to be confused with the invasive white mulberry, the red mulberry exhibits broader leaves with a slightly fuzzy texture. Fruits are often slightly hidden below leaves and serve as a vital food source for many animals. Though leaf shape can vary they are generally heart shaped with less lobes than white mulberry trees.",
    image: {
      src: "images/trees/red-mulberry.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "river-birch",
    commonName: "River Birch",
    scientificName: "Betula nigra",
    range: "Eastern U.S.",
    description: "Easily identifiable by its papery peeling bark, river birch is a common landscaping tree across much of the country. This tree also often has a salmon tone to its bark and a nice yellow fall color display. Like the name implies they typically thrive in low floodplains and wet environments.",
    image: {
      src: "images/trees/river-birch.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sassafras",
    commonName: "Sassafras",
    scientificName: "Sassafras albidum",
    range: "Eastern U.S. and southern Ontario",
    description: "Identifiable by its leaf shape, Sassafras is the original plant behind root beer and its roots and bark were commonly used historically by many different peoples. The leaves typically have three lobes, two lobes like a mitten, or none at all with all three shapes often appearing even on the same branch. Unfortunately sassafras has since been banned in all food as it was found to be carcinogenic.",
    image: {
      src: "images/trees/sassafras.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sourwood",
    commonName: "Sourwood",
    scientificName: "Oxydendrum arboreum",
    range: "Southeastern U.S., centered on the Appalachians",
    description: "A known tree for honey, this tree produces bell shaped white flowers in the summer which attract bees and pollinators and make delicious honey. The leaves on this tree also turn a deep crimson in the fall and its flowers can even hold on until then as shown in the image.",
    image: {
      src: "images/trees/sourwood.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sweetgum",
    commonName: "Sweetgum",
    scientificName: "Liquidambar styraciflua",
    range: "Southeastern U.S.",
    description: "A common tree with a very vertical growing habit, this tree has almost perfectly star shaped leaves and produces spiky balls with their seeds. The fall foliage on sweetgum also shows some variability with colors ranging from yellows to reds to browns with reds being most common.",
    image: {
      src: "images/trees/sweetgum.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sycamore",
    commonName: "Sycamore",
    scientificName: "Platanus occidentalis",
    range: "Eastern and central U.S. and southern Ontario",
    description: "An easily recognizable tree for its white peeling bark and large slightly fuzzy leaves, the Sycamore is common both ornamentally in the wild often growing along riverbanks and floodplains. The tree also creates small balls that contains its seeds which look similar to sweetgum seed pods without the spines.",
    image: {
      src: "images/trees/sycamore.jpg",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "tulip-poplar",
    commonName: "Tulip-Poplar",
    scientificName: "Liriodendron tulipifera",
    range: "Eastern U.S.",
    description: "The Tennessee state tree also known as the Yellow poplar, is truly picturesque in its beauty. In the spring the tree produces flowers resembling tulips hence the name. The young bark looks almost smooth and gray with small vertical lines that develop into large furrows with age. The world's tallest tulip poplar is found in the great smoky mountains national park and measures an astonishing 191 feet tall!",
    image: {
      src: "images/trees/tulip-poplar.jpg",
      credit: "",
      sourceUrl: ""
    }
  }
];
