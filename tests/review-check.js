// Run from the repo root:  node tests/<this file>
// Plain node, no dependencies. Resolves paths relative to the repo root so it
// works regardless of the directory you invoke it from.
process.chdir(require("path").join(__dirname, ".."));

// Exercises trail-review.js end to end against a serialisable DOM stub.
const fs = require("fs");
const SRC = fs.readFileSync("trail-review.js", "utf8");

function El(tag) {
  return { tag, className:"", id:"", textContent:"", attrs:{}, kids:[], src:"", alt:"", href:"", loading:"",
    appendChild(c){ this.kids.push(c); return c; },
    setAttribute(k,v){ this.attrs[k]=v; } };
}
function ser(el, d) {
  d = d || 0;
  const pad = "  ".repeat(d);
  let a = "";
  if (el.className) a += ` class="${el.className}"`;
  if (el.src) a += ` src="${el.src}" alt="${el.alt}"`;
  if (el.href) a += ` href="${el.href}"`;
  for (const k in el.attrs) a += ` ${k}="${el.attrs[k]}"`;
  let out = `${pad}<${el.tag}${a}>`;
  if (el.textContent) out += el.textContent;
  if (el.kids.length) out += "\n" + el.kids.map(k=>ser(k,d+1)).join("\n") + "\n" + pad;
  return out + `</${el.tag}>`;
}

function render(pool, search) {
  const container = El("article");
  const doc = { title: "Trail Journal — Ahmad Tobasei" };
  global.window = { TRAILS_DATA: pool, location: { search } };
  global.document = {
    getElementById: id => id === "trail-review" ? container : null,
    createElement: El,
    get title(){ return doc.title; }, set title(v){ doc.title = v; }
  };
  global.URLSearchParams = URLSearchParams;
  eval(SRC);
  return { html: ser(container), title: doc.title };
}

// Load the real data file.
global.window = {}; eval(fs.readFileSync("trails-data.js","utf8"));
const base = window.TRAILS_DATA;
const clone = () => JSON.parse(JSON.stringify(base));
const ID = "mount-leconte-via-alum-cave-trail";
const Q = "?id=" + ID;

console.log("════ A — the real entry as it stands today ════");
const a = render(clone(), Q);
console.log("document.title ->", a.title);
console.log(a.html);

console.log("\n════ B — mileage + gallery: plain string AND {src,caption} ════");
const b = clone();
b[0].distanceMiles = 12;
b[0].additionalImages = [
  "images/trails/" + ID + "/01-alum-cave-bluffs.jpg",
  { src: "images/trails/" + ID + "/02-cliff-tops.jpg", caption: "The clouds finally giving way." }
];
b[0].notes = "First paragraph of the write-up.\n\nSecond paragraph, after a blank line.";
const bOut = render(b, Q);
console.log(bOut.html);

console.log("\n════ C — no ?id= at all ════");
console.log(render(clone(), "").html);

console.log("\n════ D — ?id= matches nothing ════");
console.log(render(clone(), "?id=nonsense").html);

console.log("\n════ E — entry with no notes written yet ════");
const e = clone(); delete e[0].notes;
console.log(render(e, Q).html);

console.log("\n════ F — no preview and no additionalImages ════");
const f = clone(); delete f[0].previewImage; delete f[0].additionalImages;
const fOut = render(f, Q).html;
console.log(fOut);

console.log("\n════ G — captioned preview + one captioned, one plain gallery photo ════");
const g = clone();
g[0].previewCaption = "Preview caption text.";
g[0].additionalImages = [
  { src: "images/trails/" + ID + "/01.jpg", caption: "Gallery caption text." },
  "images/trails/" + ID + "/02.jpg"
];
const gOut = render(g, Q).html;
console.log(gOut);

const h = clone(); h[0].previewCaption = "   ";
const hOut = render(h, Q).html;

console.log("\n════ assertions ════");
const fractional = clone(); fractional[0].distanceMiles = 11.8;
const whole = clone(); whole[0].distanceMiles = 12.0;
const eOut = render(e, Q).html;
// Photos render below the write-up: preview first, then additionalImages.
const realExtra = Array.isArray(base[0].additionalImages) ? base[0].additionalImages.length : 0;
const photoCount = html => (html.match(/class="trail-photo"/g)||[]).length;
const firstPhotoSrc = html => { const m = /class="trail-photo">\s*<img src="([^"]*)"/.exec(html); return m ? m[1] : ""; };
const t = [
 ["A: renders the hike name", a.html.includes("Mount Leconte Via Alum Cave Trail")],
 ["A: date is May 14 2023, not May 13", a.html.includes("May 14, 2023")],
 ["A: sets document.title to the hike name", a.title === "Mount Leconte Via Alum Cave Trail — Ahmad Tobasei"],
 ["A: preview is the first photo", firstPhotoSrc(a.html) === base[0].previewImage],
 ["A: photos come after the write-up", a.html.indexOf("trail-gallery") > a.html.lastIndexOf("trail-review__para")],
 ["A: nothing renders above the title", a.html.indexOf("<img") > a.html.indexOf("trail-review__name")],
 ["A: gsmnp tag keeps its distinct class", a.html.includes('class="tag tag--gsmnp"')],
 ["A: no mileage -> no trailing separator", !a.html.includes("mi<") && (a.html.match(/trail-review__sep/g)||[]).length === 1],
 ["A: preview + every additionalImage render", photoCount(a.html) === 1 + realExtra],
 ["B: mileage renders inline", bOut.html.includes("12 mi")],
 ["B: two separators with three meta parts", (bOut.html.match(/trail-review__sep/g)||[]).length === 2],
 ["B: blank line split into 2 paragraphs", (bOut.html.match(/trail-review__para/g)||[]).length === 2],
 ["B: preview + both gallery photos render", photoCount(bOut.html) === 3],
 ["B: only the {src,caption} one has a caption", (bOut.html.match(/trail-photo__caption/g)||[]).length === 1],
 ["B: caption text correct", bOut.html.includes("The clouds finally giving way.")],
 ["C: no id -> not found", render(clone(),"").html.includes("Trail not found")],
 ["C: not-found links back to the journal", render(clone(),"").html.includes('href="trails.html"')],
 ["D: unknown id -> not found", render(clone(),"?id=nonsense").html.includes("Trail not found")],
 ["E: no notes -> still renders name + photo", eOut.includes("Mount Leconte") && eOut.includes("/preview.jpg")],
 ["E: no notes -> no empty paragraph", !eOut.includes("trail-review__para")],
 ["G: preview caption renders", gOut.includes("Preview caption text.")],
 ["G: preview caption sits before the next photo", gOut.indexOf("Preview caption text.") < gOut.indexOf("/01.jpg")],
 ["G: one caption per captioned photo only", (gOut.match(/trail-photo__caption/g)||[]).length === 2],
 ["H: blank previewCaption -> no caption", !hOut.includes("trail-photo__caption")],
 ["F: no photos at all -> no gallery", !fOut.includes("trail-gallery") && !fOut.includes("<img")],
 ["12.0 formats as '12 mi' not '12.0 mi'", render(whole,Q).html.includes("12 mi") && !render(whole,Q).html.includes("12.0")],
 ["11.8 formats as '11.8 mi'", render(fractional,Q).html.includes("11.8 mi")],
];
let ok = true;
for (const [n,v] of t) { if(!v) ok=false; console.log((v?"  PASS  ":"  FAIL  ")+n); }
process.exit(ok?0:1);
