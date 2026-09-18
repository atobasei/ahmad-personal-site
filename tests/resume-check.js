// Run from the repo root:  node tests/resume-check.js
// Plain node, no dependencies. Resolves paths relative to the repo root so it
// works regardless of the directory you invoke it from.
//
// Covers resume.html: every section renders from resume-data.js, the PDF
// links resolve, and — the important one — NO PHONE NUMBER appears anywhere
// on the public site, including inside the published PDF.
process.chdir(require("path").join(__dirname, ".."));

const fs = require("fs");
const zlib = require("zlib");

/* ---------- tiny DOM stub that serialises itself ---------- */
function El(tag) {
  return {
    tag, className: "", textContent: "", kids: [],
    appendChild(c) { this.kids.push(c); return c; }
  };
}
function ser(e) {
  let o = "<" + e.tag + (e.className ? ' class="' + e.className + '"' : "") + ">";
  if (e.textContent) o += e.textContent;
  for (const k of e.kids) o += ser(k);
  return o + "</" + e.tag + ">";
}

const container = El("div");
global.window = {};
eval(fs.readFileSync("resume-data.js", "utf8"));
const data = window.RESUME_DATA;
global.document = {
  getElementById: id => (id === "resume" ? container : null),
  createElement: El
};
eval(fs.readFileSync("resume.js", "utf8"));
const html = ser(container);

/* ---------- phone detection ---------- */
// Any US-style number: (615) 668-1046, 615-668-1046, 615.668.1046, 615 668 1046
const PHONE = /\(?\b\d{3}\)?[\s.\-]?\d{3}[\s.\-]\d{4}\b/;

// The PDF's text lives in compressed streams, so inflate every stream and
// look inside. Kerned text is split into pieces like (668)-250(-1046), so
// check the distinctive digit groups rather than only the whole pattern.
function pdfLeaks(path) {
  const buf = fs.readFileSync(path);
  const chunks = [buf.toString("latin1")];
  let at = 0;
  for (;;) {
    const s = buf.indexOf("stream", at);
    if (s < 0) break;
    let start = s + 6;
    if (buf[start] === 0x0d) start++;
    if (buf[start] === 0x0a) start++;
    const end = buf.indexOf("endstream", start);
    if (end < 0) break;
    try { chunks.push(zlib.inflateSync(buf.slice(start, end)).toString("latin1")); } catch (e) {}
    at = end + 9;
  }
  const all = chunks.join("\n");
  // NOT the loose PHONE pattern: PDF font tables are long runs of
  // space-separated numbers ("722 500 1000") that it matches spuriously.
  // A phone number in page text always carries its punctuation.
  const STRICT = /\(\d{3}\)\s?\d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b|\b\d{3}\.\d{3}\.\d{4}\b/;
  return STRICT.test(all) || /\(668/.test(all) || /668-1046|668\)|\(1046|1046\)/.test(all);
}

const ok = [];
ok.push(["Education renders", html.includes("University of Tennessee") && html.includes(">Education<")]);
ok.push(["Experience renders every role",
  data.experience.every(x => html.includes(x.role)) && html.includes(">Experience<")]);
ok.push(["Projects render every project",
  data.projects.every(x => html.includes(x.name)) && html.includes(">Projects<")]);
ok.push(["Skills render every label", data.skills.every(x => html.includes(">" + x.label + "<"))]);
ok.push(["Coursework renders", html.includes(">Relevant Coursework<") && html.includes("Biologically Inspired Computation")]);
ok.push(["every bullet renders",
  data.experience.concat(data.projects).every(x => x.bullets.every(b => html.includes(b)))]);

const page = fs.readFileSync("resume.html", "utf8");
const hrefs = [...page.matchAll(/href="(files\/[^"]+)"/g)].map(m => m[1]);
ok.push(["page links to the PDF", hrefs.length >= 1]);
ok.push(["every PDF link resolves to a real file", hrefs.every(h => fs.existsSync(h))]);
ok.push(["Download button uses the download attribute", /class="resume-button[^"]*"[^>]*download/.test(page)]);

const siteFiles = ["resume-data.js", "resume.html", "resume.js", "index.html", "trails.html",
  "projects.html", "trail-review.html", "trails-data.js", "projects-data.js"];
const withPhone = siteFiles.filter(f => PHONE.test(fs.readFileSync(f, "utf8")));
ok.push(["no phone number in any site file", withPhone.length === 0, withPhone.join(", ")]);
const pdfs = hrefs.filter((h, i) => hrefs.indexOf(h) === i && h.endsWith(".pdf") && fs.existsSync(h));
const leaking = pdfs.filter(pdfLeaks);
ok.push(["no phone number inside the published PDF", pdfs.length > 0 && leaking.length === 0, leaking.join(", ")]);

let pass = true;
for (const [n, v, extra] of ok) {
  if (!v) pass = false;
  console.log((v ? "  PASS  " : "  FAIL  ") + n + (!v && extra ? "   [" + extra + "]" : ""));
}
module.exports = { pdfLeaks };
if (require.main === module) process.exit(pass ? 0 : 1);
