/* ==========================================================================
   RESUME — rendering

   Reads window.RESUME_DATA (see resume-data.js) and renders the sections into
   #resume on resume.html. The page heading and the PDF buttons live in the
   HTML; everything below them comes from here.

   Code style is deliberately explicit — plain for-loops and spelled-out
   if/else, createElement/textContent rather than HTML strings — matching
   trees.js and trail-review.js. Nothing in the data file needs escaping.
   ========================================================================== */
(function () {
  "use strict";

  var CONTAINER_ID = "resume";

  /* ------------------------------------------------------------------------
     SMALL HELPERS
     ------------------------------------------------------------------------ */

  function makeElement(tagName, className, text) {
    var element = document.createElement(tagName);
    if (className) {
      element.className = className;
    }
    if (text) {
      element.textContent = text;
    }
    return element;
  }

  function isNonEmptyArray(value) {
    if (!Array.isArray(value)) {
      return false;
    }
    if (value.length === 0) {
      return false;
    }
    return true;
  }

  // A section with the site's standard small uppercase label.
  function makeSection(label) {
    var section = makeElement("section", "resume-section");
    section.appendChild(makeElement("h2", "section-label", label));
    return section;
  }

  // Two-column line: something on the left, something pushed to the right
  // (dates, places). Stacks on narrow screens — see style.css.
  function makeSplitLine(className, leftText, rightText) {
    var line = makeElement("div", "resume-line " + className);
    line.appendChild(makeElement("span", "resume-line__left", leftText));
    if (rightText) {
      line.appendChild(makeElement("span", "resume-line__right", rightText));
    }
    return line;
  }

  function makeBullets(bullets) {
    var list = makeElement("ul", "resume-bullets");
    var index;

    for (index = 0; index < bullets.length; index++) {
      list.appendChild(makeElement("li", null, bullets[index]));
    }

    return list;
  }

  /* ------------------------------------------------------------------------
     SECTIONS
     ------------------------------------------------------------------------ */

  function renderEducation(container, education) {
    if (!isNonEmptyArray(education)) {
      return;
    }

    var section = makeSection("Education");
    var index;
    var entry;
    var item;

    for (index = 0; index < education.length; index++) {
      entry = education[index];
      item = makeElement("div", "resume-item");
      item.appendChild(makeSplitLine("resume-line--title", entry.school, entry.place));
      item.appendChild(makeSplitLine("resume-line--sub", entry.degree, entry.date));
      section.appendChild(item);
    }

    container.appendChild(section);
  }

  function renderExperience(container, experience) {
    if (!isNonEmptyArray(experience)) {
      return;
    }

    var section = makeSection("Experience");
    var index;
    var entry;
    var item;

    for (index = 0; index < experience.length; index++) {
      entry = experience[index];
      item = makeElement("div", "resume-item");
      item.appendChild(makeSplitLine("resume-line--title", entry.role, entry.dates));
      item.appendChild(makeSplitLine("resume-line--sub", entry.org, entry.place));
      if (isNonEmptyArray(entry.bullets)) {
        item.appendChild(makeBullets(entry.bullets));
      }
      section.appendChild(item);
    }

    container.appendChild(section);
  }

  function renderProjects(container, projects) {
    if (!isNonEmptyArray(projects)) {
      return;
    }

    var section = makeSection("Projects");
    var index;
    var entry;
    var item;
    var title;

    for (index = 0; index < projects.length; index++) {
      entry = projects[index];
      item = makeElement("div", "resume-item");

      title = makeElement("p", "resume-line resume-line--title");
      title.appendChild(makeElement("span", "resume-line__left", entry.name));
      if (entry.stack) {
        title.appendChild(makeElement("span", "resume-stack", entry.stack));
      }
      item.appendChild(title);

      if (isNonEmptyArray(entry.bullets)) {
        item.appendChild(makeBullets(entry.bullets));
      }
      section.appendChild(item);
    }

    container.appendChild(section);
  }

  function renderSkills(container, skills) {
    if (!isNonEmptyArray(skills)) {
      return;
    }

    var section = makeSection("Technical Skills");
    var list = makeElement("dl", "resume-skills");
    var index;

    for (index = 0; index < skills.length; index++) {
      list.appendChild(makeElement("dt", null, skills[index].label));
      list.appendChild(makeElement("dd", null, skills[index].items));
    }

    section.appendChild(list);
    container.appendChild(section);
  }

  function renderCoursework(container, coursework) {
    if (typeof coursework !== "string") {
      return;
    }
    if (coursework.trim() === "") {
      return;
    }

    var section = makeSection("Relevant Coursework");
    section.appendChild(makeElement("p", "resume-text", coursework.trim()));
    container.appendChild(section);
  }

  /* ------------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------------ */

  var container = document.getElementById(CONTAINER_ID);
  if (!container) {
    return;
  }

  var data = window.RESUME_DATA;
  if (!data) {
    return;
  }

  renderEducation(container, data.education);
  renderExperience(container, data.experience);
  renderProjects(container, data.projects);
  renderSkills(container, data.skills);
  renderCoursework(container, data.coursework);
})();
