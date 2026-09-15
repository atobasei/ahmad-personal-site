// Run from the repo root:  node tests/<this file>
// Plain node, no dependencies. Resolves paths relative to the repo root so it
// works regardless of the directory you invoke it from.
process.chdir(require("path").join(__dirname, ".."));

// Minimal DOM stub: enough to exercise trails.js / projects.js end to end.
const fs = require("fs");
function makeEl(tag){ return {tag, className:"", href:"", target:"", rel:"", innerHTML:"", children:[],
  appendChild(c){this.children.push(c);} }; }

function run(dataFile, scriptFile, containerId){
  const container = makeEl("div");
  global.window = {
    matchMedia: () => ({matches:false, addEventListener(){}}),
    addEventListener(){}, requestAnimationFrame(){}, scrollY:0, innerHeight:800
  };
  global.document = {
    getElementById: id => id === containerId ? container : null,
    createElement: makeEl,
    querySelector: () => null
  };
  global.requestAnimationFrame = () => {};
  eval(fs.readFileSync(dataFile,"utf8"));
  eval(fs.readFileSync(scriptFile,"utf8"));
  return container.children;
}

console.log("══════ trails.js ══════");
const rows = run("trails-data.js","trails.js","trail-grid");
console.log("rows rendered:", rows.length);
rows.forEach(r => {
  console.log("  tag:", r.tag, "| class:", r.className, "| href:", r.href);
  console.log(r.innerHTML.replace(/^\s*$\n/gm,""));
});
// assertions
const html = rows.map(r=>r.innerHTML).join("");
// Sort-by-date check needs more than one entry, so feed a synthetic set
// through the same renderer via a temp data file.
const fs2 = require("fs");
const tmp = require("path").join(__dirname,"fixtures-trails.js");
fs2.writeFileSync(tmp, `window.TRAILS_DATA=[
 {id:"old",name:"Oldest",location:"A, TN",dateHiked:"2021-01-02",tags:["x"],previewImage:"a.jpg",reviewUrl:"a.html"},
 {id:"new",name:"Newest",location:"B, TN",dateHiked:"2025-11-30",tags:["gsmnp"],previewImage:"b.jpg",reviewUrl:"b.html",notes:"n",additionalImages:["c.jpg","d.jpg"]},
 {id:"mid",name:"Middle",location:"C, TN",dateHiked:"2023-06-15",previewImage:"c.jpg",reviewUrl:"c.html"}
];`);
const sorted = run(tmp,"trails.js","trail-grid").map(r=>r.innerHTML.match(/trail-row-name">([^<]+)/)[1]);
console.log("sorted order:", sorted.join(" -> "));
const sortedDates = run(tmp,"trails.js","trail-grid").map(r=>r.innerHTML.match(/trail-row-date">([^<]+)/)[1]);
console.log("dates:", sortedDates.join(" | "));

console.log("\n══════ projects.js ══════");
const prows = run("projects-data.js","projects.js","project-list");
console.log("rows rendered:", prows.length);
prows.forEach(r => console.log("  ", r.tag, r.className, "| target:", r.target, "| rel:", r.rel, "|", r.href, "\n   ", r.innerHTML.slice(0,110)+"..."));

console.log("\n══════ assertions ══════");
const ok = [];
ok.push(["trail row is an <a>", rows[0].tag==="a"]);
ok.push(["trail row links to reviewUrl", rows[0].href==="trail-review.html?id=mount-leconte-via-alum-cave-trail"]);
// Stronger invariant: every reviewUrl must point at the template with an id
// that actually matches an entry, or the row is a dead link.
{
  const fs3=require("fs"); const g={}; const prev=global.window; global.window=g;
  eval(fs3.readFileSync("trails-data.js","utf8"));
  const ids=new Set(g.TRAILS_DATA.map(t=>t.id));
  let allResolve=true;
  for(const t of g.TRAILS_DATA){
    const m=/^trail-review\.html\?id=(.+)$/.exec(t.reviewUrl||"");
    if(!m || !ids.has(m[1])) allResolve=false;
  }
  global.window=prev;
  ok.push(["every reviewUrl resolves to a real entry id", allResolve]);
}
ok.push(["gsmnp tag gets distinct class", html.includes('class="tag tag--gsmnp"')]);
ok.push(["plain tags stay plain", html.includes('class="tag">views')]);
ok.push(["date formatted (no TZ off-by-one)", html.includes("May 14, 2023")]);
ok.push(["notes NOT rendered on index", !html.includes("freshman year")]);
ok.push(["project rows = 4", prows.length===4]);
ok.push(["project rows open new tab", prows.every(r=>r.target==="_blank"&&r.rel==="noopener")]);
ok.push(["apostrophe escaped in desc", prows[3].innerHTML.includes("user&#39;s age")]);
ok.push(["sorts newest first", sorted.join()==="Newest,Middle,Oldest"]);
ok.push(["entry with notes+additionalImages renders", sorted.includes("Newest")]);
ok.push(["entry with no tags array renders", sorted.includes("Middle")]);
ok.forEach(([n,v])=>console.log((v?"  PASS  ":"  FAIL  ")+n));
process.exit(ok.every(([,v])=>v)?0:1);
