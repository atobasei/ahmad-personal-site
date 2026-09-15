/* ==========================================================================
   PROJECT DATA — add or remove projects here, never in projects.html.

   Same pattern as trails-data.js: loaded as a plain script (not an ES module)
   so the site keeps working when opened straight from disk (file://), where
   fetch() of local JSON and module scripts are both blocked by CORS.

   Each entry:
     id           slug — used as the element key
     title        project title, shown as the row heading
     description  a sentence or two on what it is
     repoUrl      the project's GitHub repo; the whole row links here and
                  opens in a new tab

   Rows render in the order listed below. If you'd rather sort them, see the
   EXTENSION POINT comment in projects.js.
   ========================================================================== */
window.PROJECTS_DATA = [
  {
    id: "network-compliance-manager",
    title: "Automated Network Compliance Manager",
    description: "A tool for auditing network switch configurations against a security baseline. It connects to Aruba AOS-CX switches over SSH, runs a rule book of policy checks — SSH enabled and Telnet disabled, NTP configured, no SNMPv1/v2c community strings, BPDU guard on access ports, unused interfaces shut down — and reports what drifted, either on demand or on a schedule. Built as a six-person team project; I worked on the web dashboard, mainly the dashboard and violations pages.",
    repoUrl: "https://github.com/jzhou17/Automated-Network-Compliance-Manager",
    // The repo is private, so that URL 404s for every visitor. The row renders
    // unlinked instead of sending people to a GitHub error page. The URL stays
    // here for reference — delete this line if the repo is ever made public.
    private: true
  },
  {
    id: "2048-undo-dimensions",
    title: "2048 With Undo and Dimensions",
    description: "A version of the tile game 2048 with a true undo feature and support for board sizes beyond the standard 4x4, since different dimensions change which strategies work.",
    repoUrl: "https://github.com/atobasei/2048-with-undo-and-dimensions"
  },
  {
    id: "job-scam-extension",
    title: "Job Scam Extension",
    description: "A browser extension built for a Human Factors in Cybersecurity course project, aimed at detecting job-listing scams.",
    repoUrl: "https://github.com/baekay000/job-scam-extension"
  },
  {
    id: "skincare-recommender",
    title: "Skincare Recommender",
    description: "A team-built web app that takes a user's age, skin type, concerns, and budget through a quiz and returns tailored skincare product recommendations. Built as a group project with a full frontend, backend, and recommendation engine.",
    repoUrl: "https://github.com/utk-cs340-fall24/Skincare-Recommender"
  }
];
