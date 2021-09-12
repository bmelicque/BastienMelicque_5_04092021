/* FUNCTIONS */
// Breaks down URL parameters and checks if ID is alphanumeric
const getId = () => {
    const vars = window.location.search.substr(1).split('&');
    let id = '';
    vars.forEach(element => {
        if (element.match(/^id=[a-z0-9]+$/gi)) {
            id = element.replace("id=", "");
        }
    });
    return id;
}

// Fetches the camera corresponding to the ID passed in the URL
// Injects the data into the global "camera" variable
const fetchOne = async () => {
    const cameraId = getId();
    
    await fetch(`http://localhost:3000/api/cameras/${cameraId}`)
    .then(res => res.json())
    .then(data => camera = data)
}

// Hydrates page template with fetched camera
const displayOne = async () => {
    await fetchOne();
    display(camera, document.getElementById("camera"));
}

// Gets quantity input, returns it as a number instead of a string
const getQuantity = () => {
    let value = Number.parseInt(document.getElementById('quantity').value);
    return Number.isInteger(value) ? value : 0;
}


/* ACTUAL CALL TO FUNCTIONS, HYDRATING PAGE */
let cart = new Cart();
cart.load();
// document.getElementById('cart-preview').textContent = cart.quantity;

let camera = {};
displayOne();


/* EVENT LISTENERS */
document.getElementById('addToCart').addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = getQuantity();
    
    if (quantity > 0) cart.add(camera, document.getElementById('lens').value, quantity);
    else document.getElementById('quantity').classList.add('form__error');
});

document.getElementById('cart__minus').addEventListener('click', () => {
    const quantity = document.getElementById('quantity');
    quantity.value = quantity.value > 0 ? quantity.value - 1 : 0;
});

document.getElementById('cart__plus').addEventListener('click', () => {
    document.getElementById('quantity').value ++;
});