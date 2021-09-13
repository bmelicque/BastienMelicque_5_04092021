// Displays an error message on the field passed in argument
const displayError = element => {
    element.value = "";
    if (document.querySelector("#"+element.id+" + .form__error") == null){
        const errors = {
            "lastName": "Veuillez renseigner un nom correct",
            "firstName": "Veuillez renseigner un prénom correct",
            "address": "Veuillez renseigner une adresse correcte",
            "city": "Veuillez renseigner un nom de ville correct",
            "email": "Veuillez renseigner une adresse e-mail correcte",
        };

        let errorMessage = document.createElement('p');
        errorMessage.textContent = errors[element.name];
        errorMessage.classList.add("form__error");
        element.after(errorMessage);
    }
}

// Checks a form; returns a boolean
const checkForm = form => {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    const constraints = {
        "name": new RegExp(`^[A-Za-z' -]+$`),
        "email": new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
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

// Uses the post method to send the order to the backend
// Redirects the user on the next page
const postOrder = async (contact, products) => {
    fetch('http://localhost:3000/api/cameras/order', {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        contact: contact,
        products: products
    }),
    mode: 'cors'
}).then(res => res.json())
.then(res => {
    const URL = "./order-status.html?id=" + res.orderId + "&price=" + cart.totalPrice;
    window.location = URL;
})
}

// Hydrating page
let cart = new Cart();
cart.load();
cart.content.forEach(product => hydrate(document.querySelector('section'), product));
document.getElementById('total-price').textContent = formatPrice(cart.totalPrice);


document.getElementById('order').addEventListener('submit', e => {
    e.preventDefault();
    if (checkForm(e.target)) {
        const inputs = e.target.querySelectorAll('input');
        let contact = {};
        let products = [];
        inputs.forEach(input => contact[input.name] = input.value);
        cart.content.forEach(item => {
            for (let i = 0; i < item.quantity; i++) {
                products.push(item.id);
            }
        });
        
        postOrder(contact, products);
    }
});