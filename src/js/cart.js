async function toggleCart() {
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))

    createBackButton(main, createArticlesList)
    const title = create("h2",main, "Your cart")
        
    const container = create("div",main,null,"articles-container")
    cart.length === 0 ? create("p",container, "Your cart is empty") : cart.forEach(elt => createListItem(elt))

    let total = 0;
    cart.length === 0 ? total = 0 : cart.forEach(obj => {
        total += obj.price
    });
    const price = create("div",main,`Amount : ${total.toFixed(2)}$`,"price")
}

const cartButton = document.querySelector(".cart-button")
cartButton.addEventListener("click", toggleCart)
