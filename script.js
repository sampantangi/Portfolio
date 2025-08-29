(function () {
  const root = document.documentElement;
  const prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;
  const saved = localStorage.getItem("theme_topnav");
  applyTheme(saved || (prefersLight ? "light" : "dark"));

  function applyTheme(mode) {
    if (mode === "light") root.classList.add("light");
    else root.classList.remove("light");
  }

  const t = document.getElementById("themeToggle");
  if (t)
    t.addEventListener("click", () => {
      const isLight = root.classList.toggle("light");
      localStorage.setItem("theme_topnav", isLight ? "light" : "dark");
    });

  // Mobile menu
  const menuBtn = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (menuBtn && menu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = getComputedStyle(menu).display !== "none";
      menu.style.display = isOpen ? "none" : "flex";
      menuBtn.setAttribute("aria-expanded", String(!isOpen));
    });
  }

  if (!window.DATA) {
    console.warn("DATA missing");
    return;
  }

  // Header / Hero
  document.getElementById("siteName").textContent = DATA.name || "Your Name";
  document.getElementById("footerName").textContent = DATA.name || "Your Name";
  document.getElementById("siteRole").textContent =
    DATA.title || "Full-Stack .NET Developer";
  document.getElementById("heroName").textContent = DATA.name || "Your Name";
  document.getElementById("heroTitle").textContent =
    DATA.title || "Full-Stack .NET Developer";
  document.getElementById("heroAbout").textContent =
    DATA.hero || DATA.about || "";
  document.getElementById("year").textContent = new Date().getFullYear();

  const resumeTop = document.getElementById("resumeLink");
  const resumeBtn = document.getElementById("resumeBtn");
  if (DATA.resume) {
    resumeTop.href = DATA.resume;
    resumeBtn.href = DATA.resume;
  }

  if (DATA.email)
    document.getElementById("emailLink").href = "mailto:" + DATA.email;
  if (DATA.photo) document.getElementById("profilePhoto").src = DATA.photo;

  // About
  document.getElementById("aboutText").textContent = DATA.about || "";
  const highlights = document.getElementById("highlights");
  (DATA.highlights || []).forEach((h) => {
    const li = document.createElement("li");
    li.textContent = h;
    highlights.appendChild(li);
  });

  // Experience
  const exp = document.getElementById("experienceList");
  (DATA.experience || []).forEach((job) => {
    const el = document.createElement("div");
    el.className = "item";
    el.innerHTML = `
      <h3>${job.role} <span class="muted">@ ${job.company}</span></h3>
      <div class="meta">${job.start} — ${job.end || "Present"} • ${
      job.location || ""
    }</div>
      <ul class="bullets">${(job.points || [])
        .map((p) => `<li>${p}</li>`)
        .join("")}</ul>
      ${job.stack ? `<p class="muted">Stack: ${job.stack.join(", ")}</p>` : ""}
    `;
    exp.appendChild(el);
  });

  // My Stack
  const techStack = document.getElementById("techStack");
  (DATA.myStack || []).forEach((tech) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tech;
    techStack.appendChild(chip);
  });

  // Education
  const edu = document.getElementById("educationList");
  (DATA.education || []).forEach((e) => {
    const wrap = document.createElement("div");
    wrap.className = "item";
    wrap.innerHTML = `
      <h3>${e.degree} — ${e.school}</h3>
      <div class="meta">${e.start} — ${e.end || "Present"} • ${
      e.location || ""
    }</div>
      ${e.notes ? `<p class="muted">${e.notes}</p>` : ""}
    `;
    edu.appendChild(wrap);
  });

  // Projects
  const grid = document.getElementById("projectsGrid");
  (DATA.projects || []).forEach((p) => {
    const el = document.createElement("article");
    el.className = "project";
    el.innerHTML = `
      <h3>${p.name}</h3>
      ${p.tagline ? `<p class="muted">${p.tagline}</p>` : ""}
      <p>${p.desc || ""}</p>
      ${
        (p.tags || []).length
          ? `<div class="chips">${p.tags
              .map((t) => `<span class="chip">${t}</span>`)
              .join("")}</div>`
          : ""
      }
      <div class="links">
        ${
          p.live
            ? `<a href="${p.live}" target="_blank" rel="noopener">Live</a>`
            : ""
        }
        ${
          p.github
            ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>`
            : ""
        }
      </div>
    `;
    grid.appendChild(el);
  });

  // Skills
  const skills = document.getElementById("skillsChips");
  (DATA.skills || []).forEach((s) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = s;
    skills.appendChild(chip);
  });
})();
