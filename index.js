// Displays number of items in the cart
let cart = new Cart();
cart.load();
document.getElementById('cart-preview').textContent = cart.quantity;

// Hydrates page with cameras
(async () => {
    const cameraList = await fetchProduct();
    hydrate(document.getElementById("list"), cameraList);
})();