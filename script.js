document.documentElement.classList.add("js");

// Mobile menu toggle
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");

function setMenu(open) {
  menu.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
}

toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", (e) => {
  if (e.target.closest("a")) setMenu(false);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("open")) {
    setMenu(false);
    toggle.focus();
  }
});

// Fade-in sections as they scroll into view
const reveals = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );
  reveals.forEach((el) => revealObserver.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();

// Language buttons: tap/click toggles the score tooltip (hover and focus are handled in CSS)
const langButtons = document.querySelectorAll(".lang-btn");
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") !== "true";
    langButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
    btn.setAttribute("aria-expanded", String(open));
  });
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".lang")) langButtons.forEach((b) => b.setAttribute("aria-expanded", "false"));
});

// Project filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project[data-category]");
const filterStatus = document.getElementById("filter-status");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    let shown = 0;
    projects.forEach((p) => {
      const match = filter === "all" || p.dataset.category.split(" ").includes(filter);
      p.hidden = !match;
      if (match) {
        p.classList.add("is-visible");
        shown++;
      }
    });
    if (filterStatus) filterStatus.textContent = `แสดง ${shown} ผลงาน`;
  });
});
