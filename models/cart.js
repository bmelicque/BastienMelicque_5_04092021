const displayCartContent = () => {
    const cart = getCart();
    const section = document.querySelector('section');
    const totalPrice = document.getElementById('total-price');
    
    cart.content.forEach(element => display(element, section))
    totalPrice.textContent = formatPrice(cart.totalPrice);
}

const checkForm = form => {
    const constraints = {
        "name": new RegExp(`^[A-Za-z' -]+$`),
        "mail": new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
        "address": new RegExp(`^[0-9A-Za-z' -,]+$`)
    }

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        if (!constraints[input.dataset.type].test(input.value)) {
            // console.log("Erreur !");
            // Ajouter message d'erreur qui apparaît dans le formulaire
            return false
        }
    })
}

displayCartContent();

document.getElementById('order').addEventListener('submit', e => {
    e.preventDefault();
    if (checkForm(e.target)) {
        // Déclencher le POST
    }
});