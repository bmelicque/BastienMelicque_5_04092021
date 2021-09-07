let camera = {};

// Breaks down URL parameters and checks if ID is alphanumeric
const getId = () => {
    const vars = window.location.search.substr(1).split('&');
    let id = 0;
    vars.forEach(element => {
        if (element.match(/^id=[a-z0-9]+$/gi)) {
            id = element.replace("id=", "");
        }
    });
    
    return id;
}

const fetchOne = async () => {
    const cameraId = getId();
    
    await fetch('http://localhost:3000/api/cameras/' + cameraId)
    .then(res => res.json())
    .then(data => camera = data);
}

const displayOne = async () => {
    await fetchOne();
    display(camera, document.getElementById("camera"));
}

const addToCart = (id, lens, quantity) => {
    let cart = getCart();
    
    // Check if item already in cart
    const found = cart.content.findIndex(element => ((element.id == id) && (element.lens == lens)));
    
    // Add / Change quantity
    if (found >= 0) {
        cart.content[found].quantity = Number.parseInt(cart.content[found].quantity) + Number.parseInt(quantity);
    }
    else cart.content.push({
        id: id,
        lens: lens,
        quantity: quantity
    })
    
    // Change quantity of items in the cart
    cart.quantity = Number.parseInt(cart.quantity) + Number.parseInt(quantity);
    
    // Save cart to local storage
    window.localStorage.cart = JSON.stringify(cart);
}

displayOne();

document.getElementById('addToCart').addEventListener('submit', (e) => {
    const lens = document.getElementById('lens').value;
    const quantity = Number.parseInt(document.getElementById('quantity').value);

    addToCart(getId(), lens, quantity);
    e.preventDefault();

    console.log(window.localStorage.cart);
})