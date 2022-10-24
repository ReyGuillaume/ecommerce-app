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
}

        // <div class="carousel">

        //     <div style="--item: 0" class="carousel__element">
        //         <img src="./src/images/carousel/carousel1.jpg" alt="carousel first image">
        //         <div class="comment">
        //             <h2>Your style</h2>
        //             <p>Get Up To 40% OFF</p>
        //         </div>
        //     </div>

        //     <div style="--item: 1" class="carousel__element">
        //         <img src="./src/images/carousel/carousel2.jpg" alt="carousel second image">
        //         <div class="comment">
        //             <h2>Your style</h2>
        //             <p>Get Up To 40% OFF</p>
        //         </div>
        //     </div>

        //     <div style="--item: 2" class="carousel__element">
        //         <img src="./src/images/carousel/carousel3.jpg" alt="carousel third image">
        //         <div class="comment">
        //             <h2>Your style</h2>
        //             <p>Get Up To 40% OFF</p>
        //         </div>
        //     </div>
        // </div>

const createItem = (item) => {
    // return the article displaying item's informations
    const container = document.querySelector("main>.container")
    const art = create("article",container,null,"article-item")
    art.idItem = item.id
    const image = create("img",art,null,"article-item__image")
    image.src = `./src/images/articles/${item.image}.jpg`
    image.alt = `article ${item.id}`
    const infos = create("div",art,null,"article-item__infos")
    create("h3",infos,item.name)
    const tags = create("p",infos)
    item.tags.forEach(tag => create("span",tags,tag,"tag"))
    const price = create("div",infos,null,"price")
    create("span",price,`${item.price} $`)
    const add = create("button",price,null,"add-button")
    add.addEventListener("click", addToCart)
    const icon = create("i",add, null,"fas")
    icon.classList.add("fa-plus")
    return art
}

const addToCart = (e) => {
    e.stopPropagation()
    alert("Wow ! Trop cool 🎉")
}

async function createArticlePage(e, elt) {
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))
    
    const back = create("button",main,null,"second-button")
    back.addEventListener("click", createArticlesList)
    const icon = create("i",back,null,"fas")
    icon.classList.add("fa-chevron-left")

    let data = []

    await fetch("./services/articles.json")
    .then(response => response.json())
    .then(response => {data = response})

    data.filter(obj => obj.id === elt.idItem)
    create("h2",main,data[0].name)

}

async function createArticlesList() {
    
    document.querySelectorAll("main>*").forEach(elt => main.removeChild(elt))

    let data = []

    await fetch("./services/articles.json")
    .then(response => response.json())
    .then(response => {data = response})

    createCrousel()

    create("div",main,null,"container")
    data.forEach(elt => createItem(elt))

    let articles = main.querySelectorAll(".article-item")

    articles.forEach(elt => elt.addEventListener("click", e => createArticlePage(e, elt)))

}

createArticlesList()