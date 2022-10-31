const createSignForm = () => {
    const hoverlay = create("div",body,null,"hoverlay")
    hoverlay.addEventListener("click", e => hoverlay.remove())
    const form = create("div",hoverlay,null,"sign-form")
    form.addEventListener("click", e => e.stopPropagation())
    return form
}

// ================================== Sign In ================================== 

const handleSignIn = (e, form) => {
    let adress = form.querySelector("#adress").value
    let password = form.querySelector("#password").value

    if (adress !== "" && password !== "") {
        console.log(adress, password)

        alert("you're connected")

        form.querySelector("#adress").value = ""
        form.querySelector("#password").value = ""
    } else {alert("A textarea is empty...")}
}

async function toggleSignInForm(e) {
    e.stopPropagation()

    const form = createSignForm()
    create("h2",form, "Sign in")
    createFormDiv(form, "adress", "email", "E-mail adress")
    createFormDiv(form, "password", "password", "Password")
    const signInButton = create("button", form, "Sign in", "sign-in-form__button")
    signInButton.addEventListener("click", e => handleSignIn(e, form))
    
    return form
}

const signInButtons = document.querySelectorAll(".sign-in-button")
signInButtons.forEach(elt => elt.addEventListener("click", toggleSignInForm))

// ================================== Sign Up ================================== 

const handleSignUp = (e, form) => {
    let adress = form.querySelector("#adress").value
    let password = form.querySelector("#password").value
    let passwordCopy = form.querySelector("#passwordCopy").value
    
    if (adress !== "" && password !== "" && passwordCopy === password) {
        console.log(adress, password)
        
        alert("your account has been create")
        
        form.querySelector("#adress").value = ""
        form.querySelector("#password").value = ""
        form.querySelector("#passwordCopy").value = ""
    } else {alert("A textarea is empty or your password is not optimized")}
}

async function toggleSignUpForm(e) {
    e.stopPropagation()
    
    const form = createSignForm()
    create("h2",form, "Sign up")
    createFormDiv(form, "adress", "email", "E-mail adress")
    createFormDiv(form, "password", "password", "Password")
    createFormDiv(form, "passwordCopy", "password", "Confirm your password")
    const signUpButton = create("button", form, "Sign up", "sign-up-form__button")
    signUpButton.addEventListener("click", e => handleSignUp(e, form))

    return form
}

const signUpButtons = document.querySelectorAll(".sign-up-button")
signUpButtons.forEach(elt => elt.addEventListener("click", toggleSignUpForm))
