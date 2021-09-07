const formatPrice = (price) => {
    return (price / 100).toFixed(2).toString().replace(".", ",") + " €";
}

const display = (element, container) => {
    const template = document.getElementById("product");
    let clone =  document.importNode(template.content, true);
    let url = "./views/product.html?id=" + element._id;
    
    clone.querySelector(".card").setAttribute("href", url);
    clone.querySelector(".card__img").setAttribute("src", element.imageUrl);
    clone.querySelector(".card__name").textContent = element.name;
    clone.querySelector(".card__price").textContent = formatPrice(element.price);
    if (clone.querySelector(".card__description")) {
        clone.querySelector(".card__description").textContent = element.description;
    }
    
    container.appendChild(clone);
}