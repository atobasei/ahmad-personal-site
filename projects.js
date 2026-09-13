/* ==========================================================================
   PROJECTS — rendering
   Reads window.PROJECTS_DATA (see projects-data.js) and renders one card per
   entry into #project-grid. Mirrors trails.js so both pages behave the same.
   ========================================================================== */
(function () {
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  const projects = Array.isArray(window.PROJECTS_DATA) ? window.PROJECTS_DATA.slice() : [];

  // EXTENSION POINT: projects render in the order listed in projects-data.js.
  // To sort instead, add a field (e.g. `year`) and sort `projects` here, the
  // way trails.js sorts by dateHiked.

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function renderTags(tags) {
    if (!Array.isArray(tags)) return "";
    return tags.map(function (tag) {
      return '<span class="tag">' + escapeHtml(tag) + "</span>";
    }).join("");
  }

  // A project without a preview image gets a lettered tile rather than a
  // broken image, so the grid still reads before any art exists.
  function renderPreview(project) {
    if (project.previewImage) {
      return '<img src="' + escapeHtml(project.previewImage) + '" alt="' +
             escapeHtml(project.name) + '" loading="lazy">';
    }
    const initial = escapeHtml((project.name || "?").trim().charAt(0).toUpperCase());
    return '<div class="project-card-placeholder" aria-hidden="true">' + initial + "</div>";
  }

  function renderCard(project) {
    // Linked projects are a whole-card anchor, like trail cards. Projects with
    // no url yet render as a plain article so nothing links to nowhere.
    const card = document.createElement(project.url ? "a" : "article");
    card.className = "project-card";
    if (project.url) {
      card.href = project.url;
      if (/^https?:/i.test(project.url)) {
        card.target = "_blank";
        card.rel = "noopener";
      }
    }

    card.innerHTML =
      '<div class="project-card-image">' + renderPreview(project) + "</div>" +
      '<div class="project-card-body">' +
        '<h2 class="project-card-name">' + escapeHtml(project.name) + "</h2>" +
        '<p class="project-card-desc">' + escapeHtml(project.description) + "</p>" +
        '<div class="project-tags">' + renderTags(project.tags) + "</div>" +
        (project.url
          ? '<p class="project-card-link">' + escapeHtml(project.linkLabel || "View project") + " &rarr;</p>"
          : "") +
      "</div>";

    return card;
  }

  projects.forEach(function (project) {
    grid.appendChild(renderCard(project));
  });
})();
