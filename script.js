const nav = document.getElementById("nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.getElementById("year");
const form = document.getElementById("form-contacto");
const note = document.getElementById("form-nota");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    note.hidden = false;
    form.reset();
  });
}


