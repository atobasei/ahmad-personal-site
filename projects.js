/* ==========================================================================
   PROJECTS — rendering
   Reads window.PROJECTS_DATA (see projects-data.js) and renders one
   full-width row per entry into #project-list. Mirrors trails.js so both
   pages stay data-driven in the same way.

   Each row is a single anchor straight to the project's GitHub repo, opened
   in a new tab. Styles live in section 9 of style.css under
   .project-list / .project-row — deliberately flatter than the trail rows
   and much flatter than the home page's tree-of-the-day well.
   ========================================================================== */
(function () {
  const list = document.getElementById("project-list");
  if (!list) return;

  const projects = Array.isArray(window.PROJECTS_DATA) ? window.PROJECTS_DATA.slice() : [];

  // EXTENSION POINT: projects render in the order listed in projects-data.js.
  // To sort instead, add a field (e.g. `year`) and sort `projects` here, the
  // way trails.js sorts by dateHiked.

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // A row links to the repo only when there's a repo a visitor can actually
  // open. A private repo would send them to a GitHub 404, which is worse than
  // no link at all — those render as plain markup with a small note instead.
  function isLinkable(project) {
    if (project.private === true) {
      return false;
    }
    if (!project.repoUrl) {
      return false;
    }
    return true;
  }

  function renderRow(project) {
    const linkable = isLinkable(project);
    let row;

    if (linkable) {
      // Whole row is the link. External target, so noopener is required.
      row = document.createElement("a");
      row.href = project.repoUrl;
      row.target = "_blank";
      row.rel = "noopener";
      row.className = "project-row";
    } else {
      row = document.createElement("article");
      row.className = "project-row project-row--nolink";
    }

    row.innerHTML =
      '<h2 class="project-row-title">' + escapeHtml(project.title) + "</h2>" +
      '<p class="project-row-desc">' + escapeHtml(project.description) + "</p>" +
      (linkable ? "" : '<p class="project-row-note">Private repository</p>');

    return row;
  }

  projects.forEach(function (project) {
    list.appendChild(renderRow(project));
  });
})();
