const sendEmail = () => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: "sender@email_address.com",
        Password: "Enter your password",
        To: 'receiver@email_address.com',
        From: "sender@email_address.com",
        Subject: "Sending Email using javascript",
        Body: "Well that was easy!!",
    }).then(function () {
        alert("mail sent successfully")
    });
}

async function toggleContact(e) {
    e.stopPropagation()
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("Contact us"))

    const contactForm = create("div",main,null,"contact-form")
    const adressInput = create("input", contactForm, null, "contact-form__input")
    
    const adressInput = create("input", contactForm, null, "contact-form__input")
    const contactButton = create("button", contactForm, "end email", "contact-form__submit")
    contactButton.addEventListener("click", sendEmail)
}

const contactButtons = document.querySelectorAll(".contact-button")
contactButtons.forEach(elt => elt.addEventListener("click", toggleContact))
