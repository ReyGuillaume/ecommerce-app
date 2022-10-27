// ======================== Nav toggler ========================
const nav = document.querySelector("nav")
nav.querySelector(".toggle-menu").addEventListener("click", () => nav.classList.toggle("shown"))

// ======================== Nav-item toggler ========================
const menu = document.querySelector(".menu")
menu.querySelectorAll(".menu__item")
.forEach(item => item.addEventListener("click", () => {
    menu.querySelector(".selected").classList.toggle("selected")
    item.classList.toggle("selected")
}))

// ======================== Accueil toggler ========================
const accueilButtons = document.querySelectorAll(".accueil-button")
accueilButtons.forEach(elt => elt.addEventListener("click", createArticlesList))
