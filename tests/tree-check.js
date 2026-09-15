// Run from the repo root:  node tests/<this file>
// Plain node, no dependencies. Resolves paths relative to the repo root so it
// works regardless of the directory you invoke it from.
process.chdir(require("path").join(__dirname, ".."));

const fs = require("fs");
global.window = {};
global.document = { getElementById: () => null, createElement: () => ({}) };
eval(fs.readFileSync("trees-data.js", "utf8"));
eval(fs.readFileSync("trees.js", "utf8"));
const pick = window.getTreeOfTheDay;
const ALL = window.TREES_DATA;
const N = ALL.length;   // pool size changes as Ahmad adds/removes species

// Helper: clone the pool and fill in N descriptions to simulate Ahmad writing.
// Exactly n eligible entries. Must CLEAR first: the real data now carries a
// placeholder quip on every entry, so without the clear every entry would be
// eligible and these tests wouldn't isolate the case they mean to.
function withDescriptions(n) {
  const pool = JSON.parse(JSON.stringify(ALL));
  for (const t of pool) t.description = "";
  for (let i = 0; i < n; i++) pool[i].description = "written write-up #" + i;
  return pool;
}

const results = [];
function check(name, cond, extra) { results.push([name, cond, extra || ""]); }

// ---- 1. zero eligible -> null (the coming-soon fallback) ----
// Built explicitly rather than relying on the real data being empty: Ahmad has
// started writing quips, so ALL is no longer an empty pool.
const emptyPool = JSON.parse(JSON.stringify(ALL));
for (const t of emptyPool) t.description = "";
check("zero descriptions -> null (coming-soon state)", pick(emptyPool, new Date()) === null);
// Every entry now carries at least a placeholder quip, so the whole pool is
// eligible and the rotation actually cycles.
check("real data: every entry is eligible", ALL.every(t => t.description.trim() !== ""));
check("real data: pick is stable for a given day",
      pick(ALL, new Date(2026,8,15)).id === pick(ALL, new Date(2026,8,15)).id);

// ---- 2. only eligible trees are ever returned ----
const pool5 = withDescriptions(5);
const eligibleIds = new Set(pool5.slice(0,5).map(t => t.id));
let onlyEligible = true;
for (let d = 0; d < 400; d++) {
  const date = new Date(2026, 0, 1 + d, 12, 0, 0);
  if (!eligibleIds.has(pick(pool5, date).id)) onlyEligible = false;
}
check("never features an entry with a blank description", onlyEligible);

// ---- 3. SAME TREE ALL DAY: every hour + minute edges of one day ----
let sameAllDay = true;
const probes = [];
for (let h = 0; h < 24; h++) probes.push(new Date(2026, 2, 17, h, 30, 0));
probes.push(new Date(2026, 2, 17, 0, 0, 0));      // 00:00:00.000
probes.push(new Date(2026, 2, 17, 23, 59, 59, 999)); // last ms of the day
const firstId = pick(pool5, probes[0]).id;
for (const p of probes) if (pick(pool5, p).id !== firstId) sameAllDay = false;
check("same tree at every hour of a given day", sameAllDay, "-> " + firstId);

// ---- 4. CHANGES AT LOCAL MIDNIGHT (not before, not after) ----
const endOfDay   = pick(pool5, new Date(2026, 2, 17, 23, 59, 59, 999)).id;
const startNext  = pick(pool5, new Date(2026, 2, 18,  0,  0,  0,   0)).id;
check("rolls over exactly at local midnight", endOfDay !== startNext,
      endOfDay + " -> " + startNext);

// ---- 5. DETERMINISTIC across "visitors"/reloads ----
let deterministic = true;
for (let i = 0; i < 50; i++) {
  if (pick(pool5, new Date(2026, 6, 4, 9, 15)).id !== pick(pool5, new Date(2026, 6, 4, 21, 45)).id) deterministic = false;
}
check("two visitors at different times get the same tree", deterministic);

// ---- 6. DST: no skipped or repeated day across both US transitions ----
// US Central 2026: DST starts Mar 8, ends Nov 1.
function walkDays(startY, startM, startD, count, pool) {
  const seq = [];
  for (let i = 0; i < count; i++) seq.push(pick(pool, new Date(startY, startM, startD + i, 12, 0)).id);
  return seq;
}
const pool7 = withDescriptions(7);
const springSeq = walkDays(2026, 2, 4, 10, pool7);   // spans Mar 8 (spring forward)
const fallSeq   = walkDays(2026, 9, 28, 10, pool7);  // spans Nov 1 (fall back)
function advancesByOne(seq, pool) {
  const ids = pool.slice(0,7).map(t=>t.id);
  for (let i = 1; i < seq.length; i++) {
    const prev = ids.indexOf(seq[i-1]), cur = ids.indexOf(seq[i]);
    if (cur !== (prev + 1) % ids.length) return false;
  }
  return true;
}
check("no skip/repeat across spring-forward DST", advancesByOne(springSeq, pool7), springSeq.slice(0,5).join(" -> "));
check("no skip/repeat across fall-back DST", advancesByOne(fallSeq, pool7), fallSeq.slice(0,5).join(" -> "));

// ---- 7. full coverage: every eligible tree appears once per cycle ----
const poolAll = withDescriptions(N);
const seen = new Set();
for (let d = 0; d < N; d++) seen.add(pick(poolAll, new Date(2026, 0, 1 + d, 12)).id);
check(`all ${N} featured once across a ${N}-day cycle, no repeats`, seen.size === N);
check(`day ${N+1} wraps back to day 1's tree`,
      pick(poolAll, new Date(2026,0,1,12)).id === pick(poolAll, new Date(2026,0,1+N,12)).id);

// ---- 8. adding a description mid-cycle doesn't crash / stays in bounds ----
let stable = true;
for (let n = 1; n <= N; n++) {
  const t = pick(withDescriptions(n), new Date(2026, 5, 9, 12));
  if (!t || !t.id) stable = false;
}
check(`works with any number of completed entries (1..${N})`, stable);

console.log("TZ =", Intl.DateTimeFormat().resolvedOptions().timeZone, "\n");
let pass = true;
for (const [n, c, e] of results) {
  if (!c) pass = false;
  console.log((c ? "  PASS  " : "  FAIL  ") + n + (e ? "   [" + e + "]" : ""));
}
process.exit(pass ? 0 : 1);
