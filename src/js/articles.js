const create = (tagName, container, text=null, className=null, id=null) => {
    // return HTML element (tagName.className#id) in container with text, class and id
    let element = container.appendChild(document.createElement(tagName))
    text ? element.appendChild(document.createTextNode(text)) : element
    className ? element.classList.add(className) : element
    id ? element.id = id : element
    return element
}

const main = document.querySelector("main")

const createCrousel = () => {
    const carousel = create("div",main,null,"carousel")
    const carouselElts = [
        {img : "carousel1", title : "Your style", comment : "Get Up To 40% OFF", id : 0},
        {img : "carousel2", title : "Your style", comment : "Get Up To 40% OFF", id : 1},
        {img : "carousel3", title : "Your style", comment : "Get Up To 40% OFF", id : 2}
    ]
    carouselElts.forEach(elt => {
        const carouselElt = create("div",carousel,null,"carousel__element") 
        carouselElt.style.setProperty('--item', elt.id)
        const image = create("img",carouselElt)
        image.src = `./src/images/carousel/${elt.img}.jpg`
        image.alt = `carousel image ${elt.id}`
        const comment = create("div",carouselElt,null,"comment")
        create("h2",comment,elt.title)
        create("p",comment,elt.comment)
    })
    return carousel
}

const createListItem = (item) => {
    // return the article displaying item's informations
    const container = document.querySelector("main>.container")
    const art = create("article",container,null,"article-item")
    art.idItem = item.id
    const image = create("img",art,null,"article-item__image")
    image.src = `./src/images/articles/${item.images[0]}.jpg`
    image.alt = `article ${item.id}`
    const infos = create("div",art,null,"article-item__infos")
    create("h3",infos,item.name)
    const tags = create("p",infos,null,"tags")
    item.tags.forEach(tag => create("span",tags,tag,"tags__tag"))
    const price = create("div",infos,null,"price")
    create("span",price,`${item.price} $`)
    createAddToCartButton(price)
    return art
}

const addToCart = (e) => {
    e.stopPropagation()
    alert("Wow ! Trop cool 🎉")
}

const createArticleCarousel = (container, arr) => {
    const carDiv =  create("div",container,null,"carousel-manual")
    arr.forEach(elt => {
        const image = create("img",carDiv,null,"carousel-manual__image")
        image.src = `./src/images/articles/${elt}.jpg`
        image.alt = elt
    })
    return carDiv
}

const createBackButton = (container, onClick) => {
    const back = create("button",container,null,"second-button")
    back.addEventListener("click", onClick)
    const icon = create("i",back,null,"fas")
    icon.classList.add("fa-chevron-left")
    return back
}
const createAddToCartButton = (container) => {
    const add = create("button",container,null,"add-button")
    add.addEventListener("click", addToCart)
    const icon = create("i",add, null,"fas")
    icon.classList.add("fa-plus")
}


async function createArticlePage(e, elt) {
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))

    let data = []

    await fetch("./services/articles.json")
    .then(response => response.json())
    .then(response => {data = response})

    data.filter(obj => obj.id === elt.idItem)
    article = data[0]

    const container = create("div",main,null,"article-page")
    const heading = create("div",container,null,"article-page__heading")
    createBackButton(heading, createArticlesList)
    create("h2",heading,article.name)
    const tags = create("p",heading,null,"tags")
    article.tags.forEach(tag => create("span",tags,tag,"tags__tag"))
    
    createAddToCartButton(heading)

    create("p",container,article.description)

    createArticleCarousel(container, article.images)

    return container
}

async function createArticlesList() {
    
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))

    let data = []

    await fetch("./services/articles.json")
    .then(response => response.json())
    .then(response => {data = response})

    createCrousel()

    create("div",main,null,"container")
    data.forEach(elt => createListItem(elt))

    let articles = main.querySelectorAll(".article-item")

    articles.forEach(elt => elt.addEventListener("click", e => createArticlePage(e, elt)))

}

createArticlesList()