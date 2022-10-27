const rabouleLaMoulaga = () => {
    alert("Raboule La MOULAGA et met moi bien ! 🤑")
}

async function toggleCart() {
    document.querySelector("main").replaceChildren("")

    const title = create("h2",main)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode("Your cart :"))
    const container = create("div",main,null,"articles-container")
    cart.length === 0 ? create("p",container, "Your cart is empty") : cart.forEach(elt => createListItem(elt))

    let total = 0;
    cart.length === 0 ? total = 0 : cart.forEach(obj => {
        total += obj.price
    });
    create("div",main,`Amount : ${total.toFixed(2)}$`,"price")
    const checkOut = create("button", main, "Checkout","main-button")
    checkOut.addEventListener("click", rabouleLaMoulaga)
}

const cartButtons = document.querySelectorAll(".cart-button")
cartButtons.forEach(elt => elt.addEventListener("click", toggleCart))