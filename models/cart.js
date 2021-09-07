// PROTOTYPE !!!!!
const displayCartContent = () => {
    const cart = getCart();
    const section = document.querySelector('section');

    cart.content.forEach(element => display(element, section))
    console.log(cart.content);
}

displayCartContent();