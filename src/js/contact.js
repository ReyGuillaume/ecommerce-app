const sendEmail = (userEmail, subject, message) => {
    Email.send({
        Host: "smtp.gmail.com",
        Username: userEmail,
        Password: "Enter your password",
        To: 'receiver@email_address.com',
        From: userEmail,
        Subject: subject,
        Body: message,
    })
    .then(alert("mail sent successfully"))
}

const createFormDiv = (container, inputID, inputType, inputLabel, isTextarea=false) => {
    const div = create("div", container, null, "form__div")
    isTextarea ? inputTag = "textarea" : inputTag = "input"
    const input = create(inputTag, div, null, "form__input",inputID)
    input.placeholder = " "
    input.type = inputType
    const label = create("label", div, inputLabel, "form__label")
    label.htmlFor = inputID
    return div
}

const createContactForm = () => {
    const contactForm = create("div",main,null,"contact-form")

    createFormDiv(contactForm, "adress", "email", "E-mail adress")
    createFormDiv(contactForm, "subject", "text", "Subject")
    createFormDiv(contactForm, "message", "text", "Message", true)

    const submitButton = create("button", contactForm, null, "form__button")
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
    const formButton = form.querySelector(".form__button")

    formButton.addEventListener("click", () => {
        let adress = form.querySelector("#adress").value
        let subject = form.querySelector("#subject").value
        let message = form.querySelector("#message").value

        if (adress !== "" && subject !== "" && message !== "") {
            formButton.classList.add("focus-elt")

            sendEmail(adress, subject, message)

            form.querySelector("#adress").value = ""
            form.querySelector("#subject").value = ""
            form.querySelector("#message").value = ""
        } else {alert("A textarea is empty...")}
    })
}


const contactButtons = document.querySelectorAll(".contact-button")
contactButtons.forEach(elt => elt.addEventListener("click", toggleContact))
