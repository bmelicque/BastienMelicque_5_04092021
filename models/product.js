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

// Returns a pair of indexes [index of id in cart, index of lens in customs]
const findInCart = (id, lens) => {
    const cart = getCart();
    let found = cart.content.findIndex(element => (element.id == id));
    
    return (found >= 0) ? [found, cart.content[found].customs.findIndex(custom => (custom.lens == lens))] : [found, found];
}

const addToCart = (id, lens, quantity) => {
    let cart = getCart();
    
    // Check if item already in cart
    const found = findInCart(id, lens);
    
    // Add item if new, or change the content of the cart
    if (found[0] >= 0) {
        let foundItem = cart.content[found[0]];
        foundItem.quantity += quantity;
        
        if (found[1] >= 0) {
            foundItem.customs[found[1]].quantity += quantity;
        } else cart.content[found[0]].customs.push({
            lens: lens,
            quantity: quantity
        })
        
    } else cart.content.push({
        id: id,
        name: camera.name,
        imageUrl: camera.imageUrl,
        price: camera.price,
        quantity: quantity,
        customs: [{
            lens: lens,
            quantity: quantity
        }]
    });
    
    // Change quantity of items in the cart
    cart.quantity += quantity;
    cart.totalPrice += quantity * camera.price;
    
    // Save cart to local storage
    window.localStorage.cart = JSON.stringify(cart);
}

displayOne();


document.getElementById('addToCart').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const lens = document.getElementById('lens').value;
    const quantity = checkQuantity();
    
    if (quantity > 0) addToCart(getId(), lens, quantity);
});

document.getElementById('cart__minus').addEventListener('click', () => {
    const quantity = document.getElementById('quantity');
    quantity.value = quantity.value > 0 ? quantity.value - 1 : 0;
});

document.getElementById('cart__plus').addEventListener('click', () => {
    document.getElementById('quantity').value ++;
});

document.getElementById('quantity').addEventListener('blur', () => {
    document.getElementById('quantity').value = checkQuantity();
})