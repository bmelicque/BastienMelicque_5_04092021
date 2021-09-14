/* ACTUAL CALL TO FUNCTIONS, HYDRATING PAGE */
let cart = new Cart();
cart.load();
document.getElementById('cart-preview').textContent = cart.quantity;

(async () => {
    const camera = await fetchProduct(getParams('id'));
    hydrate(document.getElementById("camera"), camera);
    
    document.getElementById('addToCart').addEventListener('submit', (e) => {
        e.preventDefault();
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        
        if (quantity > 0) {
            cart.add(camera, document.getElementById('lens').value, quantity);
            console.log(cart);
            window.location = './cart.html'
        }
    });
})();