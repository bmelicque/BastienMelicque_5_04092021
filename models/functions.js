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
    if (clone.querySelector(".card__options")) {
        element.lenses.forEach(lens => {
            let option = document.createElement("option");
            option.setAttribute("value", lens);
            option.textContent = lens;

            clone.querySelector(".card__options > select").appendChild(option);
        })
    }
    if (clone.querySelector(".card__quantity")) {
        clone.querySelector(".card__quantity").textContent = element.quantity;
    }
    if (clone.querySelector(".card__total-price")) {
        clone.querySelector(".card__total-price").textContent = formatPrice(element.quantity * element.price);
    }
    
    container.appendChild(clone);
}

const getCart = () => {
    // Checking if the cart exists
    if (!(window.localStorage.cart)) {
        const emptyCart = {
            quantity: 0,
            totalPrice: 0,
            content: []
        };

        window.localStorage.setItem("cart", JSON.stringify(emptyCart));
        return emptyCart;
    }
    
    return JSON.parse(window.localStorage.cart);
}

const cartPreview = () => {
    const cart = getCart();
    document.getElementById('cart-preview').textContent = cart.quantity;
    console.log(cart.quantity);
}

const checkQuantity = () => {
    let value = document.getElementById('quantity').value;

    value = Number.parseInt(value);

    return Number.isInteger(value) ? value : 0;
}