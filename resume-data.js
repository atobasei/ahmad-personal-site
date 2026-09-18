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
      date: "May 2026"
    }
  ],

  experience: [
    {
      role: "Remote Sensing Research Assistant",
      org: "SEER Lab, University of Tennessee",
      place: "Knoxville, TN",
      dates: "Sep. 2024 – May 2026",
      bullets: [
        "Used SLURM on the HiPerGator cluster to run Python pipelines that composited PlanetScope imagery into monthly mosaics, producing large datasets at 3 m resolution",
        "Fixed repeated memory and storage quota failures by changing how jobs were partitioned and how intermediate files were cleaned up, letting the pipeline finish end to end",
        "Applied Random Forest models for land cover classification using field survey data and used resampling methods to iteratively achieve more accurate models"
      ]
    },
    {
      role: "Software Developer",
      org: "Hack4Impact",
      place: "Knoxville, TN",
      dates: "Sep. 2023 – May 2024",
      bullets: [
        "Collaborated on a team to design and build an applicant tracking system for a nonprofit partner",
        "Implemented frontend and backend features using JavaScript and HTML/CSS, and connected them to database logic"
      ]
    }
  ],

  projects: [
    {
      name: "Fraudulent Job Posting Detector",
      stack: "Python, LLMs, RAG, Chrome Extension",
      bullets: [
        "Created a Retrieval Augmented Generation (RAG) pipeline to classify job postings as real or fraudulent and explain each result",
        "Integrated the system into a Chrome extension allowing for in browser use and explanations"
      ]
    },
    {
      name: "Automated Network Compliance & Configuration Manager",
      stack: "Python, JSON, Networking",
      bullets: [
        "Built a system to retrieve and compare network device configurations against baseline compliance policies",
        "Detected configuration errors and generated remediation actions to enforce policy compliance",
        "Designed parsing and validation logic to support multiple device types and rule sets"
      ]
    },
    {
      name: "Skincare Recommendation Platform",
      stack: "Python, React, Node.js, Firebase",
      bullets: [
        "Developed a skincare recommendation platform based on user preferences such as skin type, concerns, and price",
        "Implemented a Python based selection algorithm connected to a React frontend and Node.js backend"
      ]
    },
    {
      name: "Unix Shell Implementation",
      stack: "C, Linux",
      bullets: [
        "Implemented a basic Bash like shell supporting Unix command parsing, multiprocessing, I/O redirection, and signal handling"
      ]
    }
  ],

  skills: [
    { label: "Languages", items: "C, C++, Python, Java, JavaScript, TypeScript" },
    { label: "Frameworks", items: "React, Node.js, Flask" },
    { label: "Developer Tools", items: "Git, GitHub, Docker, Linux, SLURM, QGIS" },
    { label: "Libraries", items: "scikit-learn, NumPy, pandas, geopandas" }
  ],

  coursework: "Data Structures and Algorithms, Systems Programming, Software Engineering, Machine Learning, Deep Learning, Large Language Models, Cybersecurity, Biologically Inspired Computation"
};
