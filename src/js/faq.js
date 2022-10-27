async function toggleFAQ(e) {
    e.stopPropagation()
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("FAQ"))
}

const faqButtons = document.querySelectorAll(".faq-button")
faqButtons.forEach(elt => elt.addEventListener("click", toggleFAQ))
