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
     range           free-text range/habitat note; "" until written
     ecoregion       array of ecoregion names; [] until known
     description     the write-up. THIS FIELD IS THE ON/OFF SWITCH: a tree is
                     only eligible to be featured once this is non-empty, so
                     half-finished entries never show up on the home page.
     funFacts        array of strings; the first one is what renders
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

   TO ADD A WRITE-UP: fill in `description` (and optionally funFacts/image) on
   an entry below. Nothing else needs touching — not the HTML, not trees.js.
   ========================================================================== */
window.TREES_DATA = [
  {
    id: "american-beech",
    commonName: "American Beech",
    scientificName: "Fagus grandifolia",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "green-ash",
    commonName: "Green Ash",
    scientificName: "Fraxinus pennsylvanica",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "white-ash",
    commonName: "White Ash",
    scientificName: "Fraxinus americana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "american-basswood",
    commonName: "American Basswood",
    scientificName: "Tilia americana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "baldcypress",
    commonName: "Baldcypress",
    scientificName: "Taxodium distichum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-cherry",
    commonName: "Black Cherry",
    scientificName: "Prunus serotina",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-walnut",
    commonName: "Black Walnut",
    scientificName: "Juglans nigra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "blackgum",
    commonName: "Blackgum",
    scientificName: "Nyssa sylvatica",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "boxelder",
    commonName: "Boxelder",
    scientificName: "Acer negundo",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "ohio-buckeye",
    commonName: "Ohio Buckeye",
    scientificName: "Aesculus glabra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "yellow-buckeye",
    commonName: "Yellow Buckeye",
    scientificName: "Aesculus flava",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-buckeye",
    commonName: "Red Buckeye",
    scientificName: "Aesculus pavia",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-cottonwood",
    commonName: "Eastern Cottonwood",
    scientificName: "Populus deltoides",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-redcedar",
    commonName: "Eastern Redcedar",
    scientificName: "Juniperus virginiana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "american-elm",
    commonName: "American Elm",
    scientificName: "Ulmus americana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "slippery-elm",
    commonName: "Slippery Elm",
    scientificName: "Ulmus rubra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "winged-elm",
    commonName: "Winged Elm",
    scientificName: "Ulmus alata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "flowering-dogwood",
    commonName: "Flowering Dogwood",
    scientificName: "Cornus florida",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
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
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sugarberry",
    commonName: "Sugarberry",
    scientificName: "Celtis laevigata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-hemlock",
    commonName: "Eastern Hemlock",
    scientificName: "Tsuga canadensis",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "carolina-hemlock",
    commonName: "Carolina Hemlock",
    scientificName: "Tsuga caroliniana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "bitternut-hickory",
    commonName: "Bitternut Hickory",
    scientificName: "Carya cordiformis",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "mockernut-hickory",
    commonName: "Mockernut Hickory",
    scientificName: "Carya tomentosa",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "pignut-hickory",
    commonName: "Pignut Hickory",
    scientificName: "Carya glabra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shagbark-hickory",
    commonName: "Shagbark Hickory",
    scientificName: "Carya ovata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shellbark-hickory",
    commonName: "Shellbark Hickory",
    scientificName: "Carya laciniosa",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-locust",
    commonName: "Black Locust",
    scientificName: "Robinia pseudoacacia",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "honey-locust",
    commonName: "Honey Locust",
    scientificName: "Gleditsia triacanthos",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-maple",
    commonName: "Red Maple",
    scientificName: "Acer rubrum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "silver-maple",
    commonName: "Silver Maple",
    scientificName: "Acer saccharinum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sugar-maple",
    commonName: "Sugar Maple",
    scientificName: "Acer saccharum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "black-oak",
    commonName: "Black Oak",
    scientificName: "Quercus velutina",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "blackjack-oak",
    commonName: "Blackjack Oak",
    scientificName: "Quercus marilandica",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "bur-oak",
    commonName: "Bur Oak",
    scientificName: "Quercus macrocarpa",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "cherrybark-oak",
    commonName: "Cherrybark Oak",
    scientificName: "Quercus pagoda",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "chestnut-oak",
    commonName: "Chestnut Oak",
    scientificName: "Quercus prinus",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "chinkapin-oak",
    commonName: "Chinkapin Oak",
    scientificName: "Quercus muehlenbergii",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "northern-red-oak",
    commonName: "Northern Red Oak",
    scientificName: "Quercus rubra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "nuttall-oak",
    commonName: "Nuttall Oak",
    scientificName: "Quercus nuttallii",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "pin-oak",
    commonName: "Pin Oak",
    scientificName: "Quercus palustris",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "post-oak",
    commonName: "Post Oak",
    scientificName: "Quercus stellata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "scarlet-oak",
    commonName: "Scarlet Oak",
    scientificName: "Quercus coccinea",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "southern-red-oak",
    commonName: "Southern Red Oak",
    scientificName: "Quercus falcata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shingle-oak",
    commonName: "Shingle Oak",
    scientificName: "Quercus imbricaria",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shumard-oak",
    commonName: "Shumard Oak",
    scientificName: "Quercus shumardii",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "swamp-chestnut-oak",
    commonName: "Swamp Chestnut Oak",
    scientificName: "Quercus michauxii",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "swamp-white-oak",
    commonName: "Swamp White Oak",
    scientificName: "Quercus bicolor",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "water-oak",
    commonName: "Water Oak",
    scientificName: "Quercus nigra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "white-oak",
    commonName: "White Oak",
    scientificName: "Quercus alba",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "willow-oak",
    commonName: "Willow Oak",
    scientificName: "Quercus phellos",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "persimmon",
    commonName: "Persimmon",
    scientificName: "Diospyros virginiana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "loblolly-pine",
    commonName: "Loblolly Pine",
    scientificName: "Pinus taeda",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "shortleaf-pine",
    commonName: "Shortleaf Pine",
    scientificName: "Pinus echinata",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "virginia-pine",
    commonName: "Virginia Pine",
    scientificName: "Pinus virginiana",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "eastern-white-pine",
    commonName: "Eastern White Pine",
    scientificName: "Pinus strobus",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "red-mulberry",
    commonName: "Red Mulberry",
    scientificName: "Morus rubra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "river-birch",
    commonName: "River Birch",
    scientificName: "Betula nigra",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sassafras",
    commonName: "Sassafras",
    scientificName: "Sassafras albidum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sourwood",
    commonName: "Sourwood",
    scientificName: "Oxydendrum arboreum",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sweetgum",
    commonName: "Sweetgum",
    scientificName: "Liquidambar styraciflua",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "sycamore",
    commonName: "Sycamore",
    scientificName: "Platanus occidentalis",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  },
  {
    id: "yellow-poplar",
    commonName: "Yellow-Poplar",
    scientificName: "Liriodendron tulipifera",
    range: "",
    ecoregion: [],
    description: "",
    funFacts: [],
    image: {
      src: "",
      credit: "",
      sourceUrl: ""
    }
  }
];
