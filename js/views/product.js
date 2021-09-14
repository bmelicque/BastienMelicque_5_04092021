// Loading the cart and displaying the preview
let cart = new Cart();
cart.load();
document.getElementById('cart-preview').textContent = cart.quantity;

(async () => {
    // Goes fetch and display the camera
    const camera = await fetchProduct(getParams('id'));
    hydrate(document.getElementById("camera"), camera);
    document.title = `${camera.name} – Orinoco`
    
    // "Add to cart" button
    document.getElementById('addToCart').addEventListener('submit', (e) => {
        e.preventDefault();
        const quantity = parseInt(document.getElementById('quantity').value, 10);
        
        if (quantity > 0) {
            cart.add(camera, document.getElementById('lens').value, quantity);
            window.location = './cart.html'
        }
    });
})();