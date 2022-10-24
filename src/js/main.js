const create = (tagName, container, text=null, className=null, id=null) => {
    // return HTML element (tagName.className#id) in container with text, class and id
    let element = container.appendChild(document.createElement(tagName))
    text ? element.appendChild(document.createTextNode(text)) : element
    className ? element.classList.add(className) : element
    id ? element.id = id : element
    return element
}

const container = document.querySelector("main>.container")

const createItem = (item) => {
    // return the article displaying item's informations
    const art = create("article",container,null,"article-item")
    const image = create("img",art,null,"article-item__image")
    image.src = `./src/images/articles/${item.image}.jpg`
    image.alt = `article ${item.id}`
    const infos = create("div",art,null,"article-item__infos")
    create("h3",infos,item.name)
    const tags = create("p",infos)
    item.tags.forEach(tag => create("span",tags,tag,"tag"))
    const price = create("div",infos,null,"price")
    create("span",price,`${item.price} $`)
    const add = create("button",price)
    const icon = create("i",add, null,"fas")
    icon.classList.add("fa-plus")
    return art
}

let data = []
fetch("./services/articles.json")
.then(response => response.json())
.then(response => {data = response})
.then(() => data.forEach(elt => createItem(elt)))