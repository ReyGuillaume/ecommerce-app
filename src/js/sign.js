const createSignForm = () => {
    const hoverlay = create("div",body,null,"hoverlay")
    hoverlay.addEventListener("click", e => hoverlay.remove())
    const form = create("div",hoverlay,null,"sign-form")
    form.addEventListener("click", e => e.stopPropagation())
    return form
}

async function toggleSignInForm(e) {
    e.stopPropagation()

    const form = createSignForm()
    create("h2",form, "Sign in form...")
}

const signInButtons = document.querySelectorAll(".sign-in-button")
signInButtons.forEach(elt => elt.addEventListener("click", toggleSignInForm))

async function toggleSignUpForm(e) {
    e.stopPropagation()

    const form = createSignForm()
    create("h2",form, "Sign up form...")
}

const signUpButtons = document.querySelectorAll(".sign-up-button")
signUpButtons.forEach(elt => elt.addEventListener("click", toggleSignUpForm))
