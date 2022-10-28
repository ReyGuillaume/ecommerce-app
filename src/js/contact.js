const sendEmail = (userEmail, subject, message) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: userEmail,
        Password: "Enter your password",
        To: 'receiver@email_address.com',
        From: userEmail,
        Subject: subject,
        Body: message,
    }).then(alert("mail sent successfully"));
}

const createContactForm = () => {
    const contactForm = create("div",main,null,"contact-form")
    const adressDiv = create("div", contactForm, null, "contact-form__div")
    const adressInput = create("input", adressDiv, null, "contact-form__input","adress")
    adressInput.placeholder = " "
    adressInput.type = "email"
    const adressLabel = create("label", adressDiv, "E-mail adress", "contact-form__label")
    adressLabel.htmlFor = "adress"

    const subjectDiv = create("div", contactForm, null, "contact-form__div")
    const subjectInput = create("input", subjectDiv, null, "contact-form__input","subject")
    subjectInput.placeholder = " "
    subjectInput.type = "text"
    const subjectLabel = create("label", subjectDiv, "Subject", "contact-form__label")
    subjectLabel.htmlFor = "subject"

    const messageDiv = create("div", contactForm, null, "contact-form__div")
    const messageInput = create("input", messageDiv, null, "contact-form__input","message")
    messageInput.placeholder = " "
    messageInput.type = "text"
    const messageLabel = create("label", messageDiv, "Message", "contact-form__label")
    messageLabel.htmlFor = "message"

    const submitButton = create("button", contactForm, null, "contact-form__button")
    create("span", submitButton, "Send message", "send")
    const icon = create("i", submitButton, null, "fas")
    icon.classList.add("fa-paper-plane")
    create("span", submitButton, "Message sent", "sent")

    return contactForm
}

async function toggleContact(e) {
    e.stopPropagation()
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("Contact us"))

    const form = createContactForm()
    form.querySelector(".contact-form__button").addEventListener("click", () => {
        let adress = form.querySelector("#adress").value
        let subject = form.querySelector("#subject").value
        let message = form.querySelector("#message").value

        if (adress !== "" && subject !== "" && message !== "") {
            alert("aeaz")

            sendEmail(adress, subject, message)

            form.querySelector("#adress").value = ""
            form.querySelector("#subject").value = ""
            form.querySelector("#message").value = ""
        }
    })
}


const contactButtons = document.querySelectorAll(".contact-button")
contactButtons.forEach(elt => elt.addEventListener("click", toggleContact))
