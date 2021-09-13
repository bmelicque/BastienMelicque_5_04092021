/* ACTUAL CALL TO FUNCTIONS, HYDRATING PAGE */
let cart = new Cart();
cart.load();
// document.getElementById('cart-preview').textContent = cart.quantity;

let camera = {};
(async () => {
    camera = await fetchProduct(getParams('id'));
    hydrate(document.getElementById("camera"), camera);
})();

document.getElementById('addToCart').addEventListener('submit', (e) => {
    e.preventDefault();
    const quantity = parseInt(document.getElementById('quantity').textContent, 10);
    
    if (quantity > 0) {
        cart.add(camera, document.getElementById('lens').value, quantity);
        window.location = './cart.html'
    }
});