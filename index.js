// Goes fetch all cameras
const fetchCameras = async () => {
    await fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => cameraList = data);
}

// Calls "display" function for each fetched camera
const displayCameras = async () => {
    await fetchCameras();
    cameraList.forEach(camera => display(camera, document.getElementById("list")));
}


// Displays number of items in the cart
let cart = new Cart();
cart.load();
document.getElementById('cart-preview').textContent = cart.quantity;

// Calls the display functions
let cameraList = [];
displayCameras();


console.log(Number.isInteger(Number.parseInt(2)));