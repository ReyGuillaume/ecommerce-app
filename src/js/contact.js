// toggleNav

async function toggleCart(e) {
    e.stopPropagation()
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("Contact us"))
}

const contactButtons = document.querySelectorAll(".contact-button")
contactButtons.forEach(elt => elt.addEventListener("click", toggleCart))
