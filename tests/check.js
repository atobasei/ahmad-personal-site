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
 {id:"new",name:"Newest",location:"B, TN",dateHiked:"2025-11-30",tags:["gsmnp"],previewImage:"b.jpg",previewCaption:"PREVIEW-CAPTION-SENTINEL",reviewUrl:"b.html",notes:"n",additionalImages:["c.jpg","d.jpg"]},
 {id:"mid",name:"Middle",location:"C, TN",dateHiked:"2023-06-15",previewImage:"c.jpg",reviewUrl:"c.html"}
];`);
const sorted = run(tmp,"trails.js","trail-grid").map(r=>r.innerHTML.match(/trail-row-name">([^<]+)/)[1]);
console.log("sorted order:", sorted.join(" -> "));
const sortedDates = run(tmp,"trails.js","trail-grid").map(r=>r.innerHTML.match(/trail-row-date">([^<]+)/)[1]);
console.log("dates:", sortedDates.join(" | "));
// previewCaption belongs to the hike page only — the index row must not show it.
const fixtureHtml = run(tmp,"trails.js","trail-grid").map(r=>r.innerHTML).join("");

console.log("\n══════ projects.js ══════");
const prows = run("projects-data.js","projects.js","project-list");
console.log("rows rendered:", prows.length);
prows.forEach(r => console.log("  ", r.tag, r.className, "| target:", r.target, "| rel:", r.rel, "|", r.href, "\n   ", r.innerHTML.slice(0,110)+"..."));

console.log("\n══════ assertions ══════");
const ok = [];
ok.push(["trail row is an <a>", rows[0].tag==="a"]);
ok.push(["index row never shows previewCaption", !fixtureHtml.includes("PREVIEW-CAPTION-SENTINEL")]);
// Derived, not hardcoded: the first row is whichever entry is newest, since
// trails.js sorts newest first. Adding a more recent hike must not break this.
{
  const fsN=require("fs"); const g={}; const prev=global.window; global.window=g;
  eval(fsN.readFileSync("trails-data.js","utf8"));
  let newest=g.TRAILS_DATA[0];
  for(const t of g.TRAILS_DATA){
    if(new Date(t.dateHiked) > new Date(newest.dateHiked)) newest=t;
  }
  global.window=prev;
  ok.push(["first row is the newest hike, linked to its reviewUrl", rows[0].href===newest.reviewUrl]);
}
// Stronger invariant: every reviewUrl must point at the template with an id
// that actually matches an entry, or the row is a dead link.
{
  const fs3=require("fs"); const g={}; const prev=global.window; global.window=g;
  eval(fs3.readFileSync("trails-data.js","utf8"));
  const ids=new Set(g.TRAILS_DATA.map(t=>t.id));
  let allResolve=true, ownId=true;
  for(const t of g.TRAILS_DATA){
    const m=/^trail-review\.html\?id=(.+)$/.exec(t.reviewUrl||"");
    if(!m || !ids.has(m[1])) allResolve=false;
    // A repeat hike copied from an earlier entry must point at ITS OWN id,
    // not the original's, or its row opens the wrong hike.
    if(!m || m[1]!==t.id) ownId=false;
  }
  global.window=prev;
  ok.push(["every reviewUrl resolves to a real entry id", allResolve]);
  ok.push(["every reviewUrl points at its own entry", ownId]);
  // Repeat hikes of the same trail need distinct ids (date-suffixed). A
  // duplicate id would make the later hike's page unreachable, since
  // trail-review.js opens the first match.
  ok.push(["every trail id is unique", ids.size===g.TRAILS_DATA.length]);
}
ok.push(["gsmnp tag gets distinct class", html.includes('class="tag tag--gsmnp"')]);
ok.push(["plain tags stay plain", html.includes('class="tag">views')]);
ok.push(["date formatted (no TZ off-by-one)", html.includes("May 14, 2023")]);
ok.push(["notes NOT rendered on index", !html.includes("freshman year")]);
ok.push(["project rows = 4", prows.length===4]);
// A project whose repo a visitor cannot open (private) renders unlinked on
// purpose — sending someone to a GitHub 404 is worse than offering no link.
ok.push(["linked project rows open in a new tab", prows.filter(r=>r.tag==="a").every(r=>r.target==="_blank"&&r.rel==="noopener")]);
ok.push(["private project renders unlinked, with a note", prows.some(r=>r.tag!=="a"&&r.innerHTML.includes("Private repository"))]);
ok.push(["no project row links nowhere", !prows.some(r=>r.href==="#")]);
ok.push(["apostrophe escaped in desc", prows[3].innerHTML.includes("user&#39;s age")]);
ok.push(["sorts newest first", sorted.join()==="Newest,Middle,Oldest"]);
ok.push(["entry with notes+additionalImages renders", sorted.includes("Newest")]);
ok.push(["entry with no tags array renders", sorted.includes("Middle")]);
ok.forEach(([n,v])=>console.log((v?"  PASS  ":"  FAIL  ")+n));
process.exit(ok.every(([,v])=>v)?0:1);
