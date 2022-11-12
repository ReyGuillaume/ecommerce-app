const body = document.querySelector("body")
const main = document.querySelector("main")

const create = (tagName, container, text=null, className=null, id=null, src=null, alt=null) => {
    // return HTML element (tagName.className#id) in container with text, class and id
    let elt = container.appendChild(document.createElement(tagName))
    text ? elt.appendChild(document.createTextNode(text)) : elt
    className ? elt.classList.add(className) : elt
    id ? elt.id = id : elt
    src ? elt.src = src : elt
    alt ? elt.alt = alt : elt
    return elt
}


const createCrousel = (container) => {
    const carousel = create("div",container,null,"carousel")
    const carouselElts = [
        {img : "carousel1", title : "Winter is comming", comment : "Get Up To 40% OFF", id : 0},
        {img : "carousel2", title : "Your style", comment : "Get Up To 50% OFF", id : 1},
        {img : "carousel3", title : "Your style", comment : "Get Up To 40% OFF", id : 2}
    ]
    carouselElts.forEach(elt => {
        const carouselElt = create("div",carousel,null,"carousel__element") 
        carouselElt.style.setProperty('--item', elt.id)
        create("img",carouselElt,null,null,null,`./src/images/carousel/${elt.img}.jpg`,`carousel image ${elt.id}`)
        const comment = create("div",carouselElt,null,"comment")
        create("h2",comment,elt.title)
        create("p",comment,elt.comment)
    })
    return carousel
}

const searchForArticles = (e) => {
    const articles = document.querySelectorAll(".articles-container>.article-item")
	const searchedString = e.target.value.toLowerCase()
    articles.forEach(elt => elt.querySelector(".article-item__infos h3").textContent.toLowerCase().includes(searchedString) ? elt.classList.remove("hide-item") : elt.classList.add("hide-item"))
}

const createSearchBox = (container) => {
    const searchBox = create("div",container,null,"search-box")
    const input = create("input",searchBox,null,"search-box__input")
    input.type = "text"
    input.placeholder = "Start Looking For A Specific Article"
    input.addEventListener("input", searchForArticles)
    const label = create("label",searchBox,null,"search-box__label","search-input")
    label.htmlFor = "search-input"
    label.addEventListener("click", e => label.classList.toggle("open"))
    const icon = create("i",label,null,"fas")
    icon.classList.add("fa-search")
    return searchBox
}

async function handleClickOnActionDiv(e, container, itemId) {
    e.stopPropagation()
    setTimeout(() => createActionsDivContent(container, itemId),250)
}

async function createActionsDivContent(container, itemId) {
    container.replaceChildren("")
    let containNbItem = cart.filter(obj => obj.id === itemId).length
    if (containNbItem > 0) {
        createCartActionButton(container, itemId, "delete")
        container.appendChild(document.createTextNode(containNbItem))
    }
    createCartActionButton(container, itemId)
}

async function createActionsDiv(container, itemId) {
    const actions = create("div",container, null, "actions")
    await createActionsDivContent(actions, itemId)
    actions.addEventListener("click", e => handleClickOnActionDiv(e, actions, itemId))
    return actions
}

const createListItem = (item) => {
    // return the article displaying item's informations
    const container = document.querySelector("main>.articles-container")
    const art = create("article",container,null,"article-item")
    art.idItem = item.id
    create("img",art,null,"article-item__image",null,`./src/images/articles/${item.images[0]}.jpg`,`article ${item.id}`)
    const infos = create("div",art,null,"article-item__infos")
    create("h3",infos,item.name)
    const tags = create("p",infos,null,"tags")
    item.tags.forEach(tag => create("span",tags,tag,"tags__tag"))
    const price = create("div",infos,null,"price")
    create("span",price,`${item.price.toFixed(2)} $`)
    
    createActionsDiv(price, item.id)

    art.addEventListener("click", e => createArticlePage(e, art))
    return art
}

let cart = []

async function fetchData() {
    let data = []
    await fetch("./services/articles.json")
    .then(response => response.json())
    .then(response => {data = response})
    return data
}

async function addToCart(e, indice) {
    const data = await fetchData()
    const article = data.filter(obj => obj.id === indice)

    cart.push(...article)
}

const deleteFromCart = (e, indice) => {
    let del = false
    let i = 0
    // let cartCopy = cart.filter(obj => obj.id !== indice)
    cartCopy = [...cart]
    while (!del && i < cartCopy.length) {
        if (cartCopy[i].id === indice) {
            cartCopy.splice(i, 1)
            del = true
        }
        i++
    }
    cart = cartCopy
}

const createArticleCarousel = (container, arr) => {
    const car =  create("div",container,null,"carousel-manual-container")
    const carList =  create("ul",car,null,"carousel-manual__alt-list")
    arr.forEach(elt => {
        const item = create("li",carList,null,"carousel-manual__alt")
        create("img",item,null,"carousel-manual__alt-image",null,`./src/images/articles/${elt}.jpg`,elt)
    })
    const carDiv =  create("div",car,null,"carousel-manual__carousel")
    arr.forEach(elt => create("img",carDiv,null,"carousel-manual__image",null,`./src/images/articles/${elt}.jpg`,elt))
    return car
}

const createBackButton = (container, onClick) => {
    const back = create("button",container,null,"second-button")
    back.classList.add("back-button")
    back.addEventListener("click", onClick)
    const icon = create("i",back,null,"fas")
    icon.classList.add("fa-chevron-left")
    return back
}

const createAddToCartAnimation = (e, text) => {
    const anim = create("p",body,text,"add-to-cart-anim")
    setTimeout(() => body.removeChild(anim),2000)
}

const createCartActionButton = (container, indice, action="add") => {
    const button = create("button",container,null,"action-button")
    button.addEventListener("click", e => {
        action === "delete" ? deleteFromCart(e,indice) : addToCart(e,indice)
        action === "delete" ? createAddToCartAnimation(e, "- 1") : createAddToCartAnimation(e, "+ 1")
        // createActionsDiv(container, indice)
    })
    const icon = create("i",button, null,"far")
    action === "delete" ? icon.classList.add("fa-trash-alt") : icon.classList.add("fa-plus")
    return button
}

async function createArticlePage(e, elt) {
    document.querySelector("main").replaceChildren("")

    const data = await fetchData()
    let article = data.filter(obj => obj.id === elt.idItem)
    article = article[0]

    const container = create("div",main,null,"article-page")
    const heading = create("div",container,null,"article-page__heading")
    const title = create("h2",heading)
    createBackButton(title, createArticlesList)
    title.appendChild(document.createTextNode(article.name))
    const tags = create("p",heading,null,"tags")
    article.tags.forEach(tag => create("span",tags,tag,"tags__tag"))

    createActionsDiv(heading, elt.idItem)

    create("p",container,article.description)

    createArticleCarousel(container, article.images)

    return container
}

async function addArticleToList() {
    const data = await fetchData()
    data.forEach(elt => createListItem(elt))
}

async function createArticlesList() {
    
    document.querySelector("main").replaceChildren("")

    const data = await fetchData()

    createCrousel(main)
    createSearchBox(main)

    create("div",main,null,"articles-container")
    data.forEach(elt => createListItem(elt))

    const seeMoreButton = create("button",main,"See more...","main-button")
    seeMoreButton.classList.add("see-more")
    seeMoreButton.addEventListener("click", addArticleToList)

}

createArticlesList()