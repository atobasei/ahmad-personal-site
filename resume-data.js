/* ==========================================================================
   RESUME DATA — rendered on resume.html by resume.js.

   Same pattern as the other data files: a plain global, not fetched JSON, so
   the site keeps working when opened from disk (file://).

   This is the text of the PDF resume, kept in sync by hand. When the resume
   changes, update BOTH:
     1. this file (what the page shows), and
     2. files/Ahmad_Tobasei_Resume.pdf (what "Download PDF" serves).

   THE PHONE NUMBER NEVER GOES ON THE SITE — not here, not in the PDF. The
   published PDF has the contact line rewritten without it; the full version
   is for sending to employers directly. tests/resume-check.js fails if a
   phone number shows up in any of these files.

   Shape:
     name, location, email
     education   [{ school, place, degree, date }]
     experience  [{ role, org, place, dates, bullets[] }]
     projects    [{ name, stack, bullets[] }]
     skills      [{ label, items }]        items is a plain string
     coursework  plain string
   ========================================================================== */
window.RESUME_DATA = {
  name: "Ahmad Tobasei",
  location: "Murfreesboro, TN",
  email: "ahmadtobasei123@gmail.com",

  education: [
    {
      school: "University of Tennessee",
      place: "Knoxville, TN",
      degree: "B.S. Computer Science; Minor in Machine Learning, GPA: 3.7",
      date: "Aug. 2022 – May 2026"
    }
  ],

  experience: [
    {
      role: "Remote Sensing Research Assistant",
      org: "SEER Lab, University of Tennessee",
      place: "Knoxville, TN",
      dates: "Sep. 2024 – May 2026",
      bullets: [
        "Automated mosaicking and band harmonization pipelines in Python using SLURM managing 50–100+ GB datasets and chained job dependencies",
        "Handled recurring out of memory and disk quota failures by repartitioning jobs and changing how intermediate files were cleaned up, allowing large file operations to complete end to end",
        "Applied Random Forest models for land cover classification on field survey data, resampling iteratively to improve accuracy from 60.3% to 81.2%"
      ]
    },
    {
      role: "Developer",
      org: "Hack4Impact",
      place: "Knoxville, TN",
      dates: "Sep. 2023 – May 2024",
      bullets: [
        "Built the dashboard list component for the organization’s applicant tracking system, working in scrum sprints on a 6 person team",
        "Implemented frontend and backend features using JavaScript and HTML/CSS and integrated database functionality using MongoDB"
      ]
    }
  ],

  projects: [
    {
      name: "Fake Job Posting Predictor",
      stack: "Python, LLMs, RAG, Chrome Extension",
      bullets: [
        "Created a Retrieval Augmented Generation (RAG) system to classify online job postings as real or fraudulent and provide explanations for each result.",
        "Integrated this system into a Chrome extension allowing for in browser use"
      ]
    },
    {
      name: "Unix Shell Implementation",
      stack: "C, Linux",
      bullets: [
        "Created a shell based on Bash supporting Unix command parsing, multiprocessing, I/O redirection, and signal handling"
      ]
    },
    {
      name: "Skincare Recommender",
      stack: "Python, React, Node.js, Firebase",
      bullets: [
        "Developed a skincare recommendation platform scoring products on user preferences such as skin type, concerns, and price filters",
        "Implemented a Python based selection algorithm connected to a React frontend and Node.js backend, with Firebase handling authentication and storage"
      ]
    },
    {
      name: "Automated Network Compliance & Configuration Manager",
      stack: "Python, JSON, Networking",
      bullets: [
        "Built a system to retrieve and compare network device configurations against baseline compliance policies",
        "Detected configuration errors, generated remediation actions, and designed parsing logic and rule sets"
      ]
    }
  ],

  skills: [
    { label: "Languages", items: "Python, C, C++, Java, JavaScript, TypeScript, SQL" },
    { label: "Frameworks", items: "React, Node.js, Flask" },
    { label: "Developer Tools", items: "Git, GitHub, Docker, Linux, SLURM, MongoDB, QGIS" },
    { label: "Libraries", items: "scikit-learn, NumPy, pandas, geopandas" }
  ],

  coursework: "Data Structures and Algorithms, Systems Programming, Software Engineering, Machine Learning, Deep Learning, Advanced LLMs, Cybersecurity"
};
