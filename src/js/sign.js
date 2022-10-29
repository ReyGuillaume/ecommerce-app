async function toggleSignInForm(e) {
    e.stopPropagation()

    // const title = create("h2",main)
    // createBackButton(title, createArticlesList)
    // title.appendChild(document.createTextNode("FAQ"))

    // const faqDIV = create("div",main,null,"faq-container")
}

const signInButtons = document.querySelectorAll(".sign-in-button")
signInButtons.forEach(elt => elt.addEventListener("click", toggleSignInForm))
