// Run from the repo root:  node tests/<this file>
// Plain node, no dependencies. Resolves paths relative to the repo root so it
// works regardless of the directory you invoke it from.
process.chdir(require("path").join(__dirname, ".."));

const fs = require("fs");
const SRC = fs.readFileSync("trees.js", "utf8");

function El(tag) {
  return { tag, className:"", id:"", textContent:"", attrs:{}, kids:[], src:"", alt:"", loading:"",
    appendChild(c){ this.kids.push(c); return c; },
    setAttribute(k,v){ this.attrs[k]=v; } };
}
function ser(el, d) {
  d = d || 0;
  if (el.tag === "#frag") { let o=""; for (const k of el.kids) o += ser(k,d); return o; }
  const pad = "  ".repeat(d);
  let a = "";
  if (el.className) a += ` class="${el.className}"`;
  if (el.id) a += ` id="${el.id}"`;
  if (el.src) a += ` src="${el.src}" alt="${el.alt}"`;
  for (const k in el.attrs) a += ` ${k}="${el.attrs[k]}"`;
  let out = `${pad}<${el.tag}${a}>`;
  if (el.textContent) out += el.textContent;
  if (el.kids.length) out += "\n" + el.kids.map(k=>ser(k,d+1)).join("\n") + "\n" + pad;
  return out + `</${el.tag}>`;
}

const RealDate = Date;
function render(pool, when) {
  const container = El("div");
  const template = { content: { cloneNode(){ const f=El("#frag"); f.appendChild(El("svg")); return f; } } };
  global.window = { TREES_DATA: pool };          // real global, no source rewriting
  global.document = {
    getElementById: id => id === "tree-of-the-day-module" ? container
                        : id === "tree-placeholder-art" ? template : null,
    createElement: El
  };
  global.Date = function(...a){ return a.length ? new RealDate(...a) : new RealDate(when); };
  global.Date.UTC = RealDate.UTC;
  global.Date.prototype = RealDate.prototype;
  try { eval(SRC); } finally { global.Date = RealDate; }
  return container;
}

// Parse the data file back out as real objects.
global.window = {}; eval(fs.readFileSync("trees-data.js","utf8"));
const base = window.TREES_DATA;
const clone = () => JSON.parse(JSON.stringify(base));
const HEMLOCK = base.findIndex(t => t.id === "eastern-hemlock");

// Selection walks only entries whose description is written, so each state
// below blanks every description first and then fills in exactly the one it
// wants featured. Without this, whichever entry Ahmad has actually written
// (American Beech today) would be the pick and these states wouldn't isolate.
function poolWithOnly(index, patch) {
  const pool = clone();
  for (const tree of pool) tree.description = "";
  if (index !== null) Object.assign(pool[index], patch);
  return pool;
}

console.log("════ STATE A — nothing written yet (the coming-soon fallback) ════");
const aPool = poolWithOnly(null, null);
console.log(ser(render(aPool, new RealDate(2026,8,14))));

console.log("\n════ STATE B — filled in, with photo + credit + a 2-paragraph quip ════");
const b = poolWithOnly(HEMLOCK, {
  description: "A slow, shade-tolerant conifer of cool coves and north slopes.\n\nSecond paragraph, confirming a blank line starts a new one.",
  image: { src:"images/trees/eastern-hemlock.jpg", credit:"Photo by Jane Doe, iNaturalist (CC BY 4.0)", sourceUrl:"https://example.org/ref" }
});
console.log(ser(render(b, new RealDate(2026,8,14))));

console.log("\n════ STATE C — filled in, NO photo (placeholder shown, credit suppressed) ════");
const c = poolWithOnly(HEMLOCK, {
  description: "Write-up with no photo yet.",
  image: { src:"", credit:"Photo by Somebody", sourceUrl:"" }
});
console.log(ser(render(c, new RealDate(2026,8,14))));

console.log("\n════ STATE D — Ahmad's real data, untouched ════");
const dOut = ser(render(clone(), new RealDate(2026,8,14)));
console.log(dOut);

console.log("\n════ assertions ════");
const bOut = ser(render(b, new RealDate(2026,8,14)));
const cOut = ser(render(c, new RealDate(2026,8,14)));
const aOut = ser(render(aPool, new RealDate(2026,8,14)));
const t = [
 ["A: falls back to coming-soon", aOut.includes("Coming soon") && aOut.includes("tree-figure__placeholder")],
 ["A: heading keeps aria-labelledby target id", aOut.includes('id="tree-of-the-day"')],
 ["B: common name prominent", bOut.includes('class="feature-name" id="tree-of-the-day">Eastern Hemlock')],
 ["B: scientific name in its own italic element", bOut.includes('class="tree-sci">Tsuga canadensis')],
 ["B: real photo used, not placeholder", bOut.includes('src="images/trees/eastern-hemlock.jpg"') && !bOut.includes("tree-figure__placeholder")],
 ["B: alt text set to common name", bOut.includes('alt="Eastern Hemlock"')],
 ["B: blank line split into 2 paragraphs", (bOut.match(/class="feature-note"/g)||[]).length === 2],
 ["B: range renders under the scientific name", bOut.includes('class="tree-range">Northeastern U.S.')],
 ["D: real data renders a tree (rotation is live)", dOut.includes('class="feature-name"') && !dOut.includes("Coming soon")],
 ["D: that tree's range renders", dOut.includes('class="tree-range"')],
 ["D: that tree's photo renders from images/trees/", dOut.includes('src="images/trees/')],
 // Paragraph splitting, checked with a fixed two-paragraph sample so the test
 // does not depend on how many paragraphs Ahmad happens to write.
 ["D: a two-paragraph quip renders as two paragraphs",
   (() => { const only = clone(); for (const t of only) t.description = "";
            only.find(t => t.id === "american-beech").description = "First thought.\n\nSecond thought.";
            const o = ser(render(only, new RealDate(2026,8,14)));
            return o.includes("American Beech") && (o.match(/class="feature-note"/g)||[]).length === 2; })()],
 ["B: no fun-fact markup emitted anywhere", !bOut.includes("tree-fact")],
 ["B: merged quip renders as 2 paragraphs", (bOut.match(/class="feature-note"/g)||[]).length === 2],
 ["B: credit rendered over the image", bOut.includes('class="tree-figure__credit">Photo by Jane Doe, iNaturalist (CC BY 4.0)')],
 ["C: placeholder art when src empty", cOut.includes("tree-figure__placeholder")],
 ["C: credit suppressed when there is no photo", !cOut.includes("tree-figure__credit")],
 ["C: range still renders with no photo", cOut.includes('class="tree-range"')],
 ["A: coming-soon state has no range line", !aOut.includes("tree-range")],
];
let ok = true;
for (const [n,v] of t) { if(!v) ok=false; console.log((v?"  PASS  ":"  FAIL  ")+n); }
process.exit(ok?0:1);
