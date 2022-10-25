const cartButton = document.querySelector(".cart-button")

async function toggleCart() {
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))

    createBackButton(main, createArticlesList)

    const title = create("h2",main, "Your cart is empty")
        
    create("p",main, "Your cart is empty")
}

cartButton.addEventListener("click", toggleCart)
