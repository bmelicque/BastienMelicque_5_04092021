const displayCartContent = () => {
    const cart = getCart();
    const section = document.querySelector('section');
    const totalPrice = document.getElementById('total-price');
    
    cart.content.forEach(element => display(element, section))
    totalPrice.textContent = formatPrice(cart.totalPrice);
}

const displayError = source => {
    const errors = {
        "lastName": "Veuillez renseigner un nom correct",
        "firstName": "Veuillez renseigner un prénom correct",
        "address": "Veuillez renseigner une adresse correcte",
        "city": "Veuillez renseigner un nom de ville correct",
        "mail": "Veuillez renseigner une adresse e-mail correcte",
    };
    source.value = "";
    if (document.querySelector("#"+source.id+" + .form__error") == null){
        let errorMessage = document.createElement('p');
        errorMessage.textContent = errors[source.name];
        errorMessage.classList.add("form__error")
        source.after(errorMessage);
    }
}

const checkForm = form => {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    const constraints = {
        "name": new RegExp(`^[A-Za-z' -]+$`),
        "mail": new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
        "address": new RegExp(`^[0-9A-Za-z' -,]+$`)
    }

    inputs.forEach(input => {
        if (!constraints[input.dataset.type].test(input.value)) {
            displayError(input);
            isValid = false;
        }
    })

    return isValid;
}

displayCartContent();

document.getElementById('order').addEventListener('submit', e => {
    e.preventDefault();
    if (checkForm(e.target)) {
        
    }
});