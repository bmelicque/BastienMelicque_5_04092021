/* FUNCTIONS */
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
(async () => {
    camera = await fetchProduct(getParams('id'));
    hydrate(document.getElementById("camera"), camera);
})();


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