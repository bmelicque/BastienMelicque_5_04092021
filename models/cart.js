const displayCartContent = () => {
    const cart = getCart();
    const section = document.querySelector('section');
    const totalPrice = document.getElementById('total-price');

    cart.content.forEach(element => display(element, section))
    totalPrice.textContent = formatPrice(cart.totalPrice);
}

displayCartContent();