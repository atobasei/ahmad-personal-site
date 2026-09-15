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
                     "Southern Appalachians". Already filled in for all 63.
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
    description: "Easy to recognize even from a distance — smooth, pale gray bark that stays smooth for the tree's whole life, unlike almost every other hardwood. Beeches tend to hold onto their dried, papery leaves through much of winter, a trait called marcescence, so a beech grove in January still looks half-dressed.\n\nThat smooth bark is also why beech trees are the most carved-on trees in America — old initials can stay legible for decades.",
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
    description: "PLACEHOLDER — write your quip about the Green Ash here.",
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
    description: "PLACEHOLDER — write your quip about the White Ash here.",
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
    description: "PLACEHOLDER — write your quip about the American Basswood here.",
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
    description: "PLACEHOLDER — write your quip about the Baldcypress here.",
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
    description: "PLACEHOLDER — write your quip about the Black Cherry here.",
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
    description: "PLACEHOLDER — write your quip about the Black Walnut here.",
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
    description: "PLACEHOLDER — write your quip about the Blackgum here.",
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
    description: "PLACEHOLDER — write your quip about the Boxelder here.",
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
    description: "PLACEHOLDER — write your quip about the Ohio Buckeye here.",
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
    description: "PLACEHOLDER — write your quip about the Yellow Buckeye here.",
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
    description: "PLACEHOLDER — write your quip about the Red Buckeye here.",
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
    description: "PLACEHOLDER — write your quip about the Eastern Cottonwood here.",
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
    description: "PLACEHOLDER — write your quip about the Eastern Redcedar here.",
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
    description: "PLACEHOLDER — write your quip about the American Elm here.",
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
    description: "PLACEHOLDER — write your quip about the Slippery Elm here.",
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
    description: "PLACEHOLDER — write your quip about the Winged Elm here.",
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
    description: "PLACEHOLDER — write your quip about the Flowering Dogwood here.",
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "hackberry",
    commonName: "Hackberry",
    scientificName: "Celtis occidentalis",
    range: "Eastern and central U.S.",
    description: "PLACEHOLDER — write your quip about the Hackberry here.",
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
    description: "PLACEHOLDER — write your quip about the Eastern Hemlock here.",
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
    description: "PLACEHOLDER — write your quip about the Carolina Hemlock here.",
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
    description: "PLACEHOLDER — write your quip about the Bitternut Hickory here.",
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
    description: "PLACEHOLDER — write your quip about the Mockernut Hickory here.",
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
    description: "PLACEHOLDER — write your quip about the Pignut Hickory here.",
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
    description: "PLACEHOLDER — write your quip about the Shagbark Hickory here.",
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
    description: "PLACEHOLDER — write your quip about the Shellbark Hickory here.",
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
    description: "PLACEHOLDER — write your quip about the Black Locust here.",
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
    description: "PLACEHOLDER — write your quip about the Honey Locust here.",
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
    description: "PLACEHOLDER — write your quip about the Red Maple here.",
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
    description: "PLACEHOLDER — write your quip about the Silver Maple here.",
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
    description: "PLACEHOLDER — write your quip about the Sugar Maple here.",
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
    description: "PLACEHOLDER — write your quip about the Black Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Bur Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Chestnut Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Pin Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Post Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Live Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Water Oak here.",
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
    description: "PLACEHOLDER — write your quip about the White Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Willow Oak here.",
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
    description: "PLACEHOLDER — write your quip about the Persimmon here.",
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
    description: "PLACEHOLDER — write your quip about the Loblolly Pine here.",
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
    description: "PLACEHOLDER — write your quip about the Shortleaf Pine here.",
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
    description: "PLACEHOLDER — write your quip about the Virginia Pine here.",
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
    description: "PLACEHOLDER — write your quip about the Eastern White Pine here.",
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
    description: "PLACEHOLDER — write your quip about the Red Mulberry here.",
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
    description: "PLACEHOLDER — write your quip about the River Birch here.",
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
    description: "PLACEHOLDER — write your quip about the Sassafras here.",
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
    description: "PLACEHOLDER — write your quip about the Sourwood here.",
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
    description: "PLACEHOLDER — write your quip about the Sweetgum here.",
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
    description: "PLACEHOLDER — write your quip about the Sycamore here.",
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
    description: "PLACEHOLDER — write your quip about the Tulip-Poplar here.",
    image: {
      src: "images/trees/tulip-poplar.jpg",
      credit: "",
      sourceUrl: ""
    }
  }
];
