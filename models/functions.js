const formatPrice = (price) => {
    return (price / 100).toFixed(2).toString().replace(".", ",") + " €";
}

// Affiche un produit (objet issu d'un fetch) dans un container donné
const display = (product, container) => {
    const template = document.getElementById("product");
    let clone =  document.importNode(template.content, true);
    const url = "./views/product.html?id=" + product._id;

    // Equivalences entre les données stockées dans l'objet et les données à afficher (si elle sont différentes)
    const content = {
        price: formatPrice(product.price),
        totalPrice: formatPrice(product.quantity * product.price)
    };

    // On parcoure les balises du container et on y injecte le contenu de l'objet produit
    let tags = clone.querySelectorAll('*');
    tags.forEach(tag => {
        if (tag.dataset.text) tag.textContent = content[tag.dataset.text] || product[tag.dataset.text];
        if (tag.tagName == "A") tag.href = "./views/product.html?id=" + product._id;
        if (tag.tagName == "IMG") tag.src = product.imageUrl;
        if (tag.tagName == "SELECT") {
            product.lenses.forEach(lens => {
                let option = document.createElement('option');
                option.textContent = lens;
                tag.append(option);
            });
        };
    })

    container.appendChild(clone);
}