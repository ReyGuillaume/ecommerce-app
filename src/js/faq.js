async function toggleFAQ(e) {
    e.stopPropagation()
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("FAQ"))

    const faqDIV = create("div",main,null,"faq-container")
}

const faqButtons = document.querySelectorAll(".faq-button")
faqButtons.forEach(elt => elt.addEventListener("click", toggleFAQ))
