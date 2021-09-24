/* FUNCTIONS */
// Displays an error message on the field passed in argument
const displayError = element => {
    element.value = "";
    if (document.querySelector(`#${element.id} + .contact-form__error`) == null){
        const errors = {
            "lastName": "Veuillez renseigner un nom correct (sans chiffres ni caractères spéciaux)",
            "firstName": "Veuillez renseigner un prénom correct (sans chiffres ni caractères spéciaux)",
            "address": "Veuillez renseigner une adresse correcte (sans caractères spéciaux)",
            "city": "Veuillez renseigner un nom de ville correct (sans chiffres ni caractères spéciaux)",
            "email": "Veuillez renseigner une adresse e-mail correcte",
        };
        
        let errorMessage = document.createElement('p');
        errorMessage.textContent = errors[element.name];
        errorMessage.classList.add("contact-form__error");
        element.after(errorMessage);
    }
}

// Checks a form; returns a boolean and calls "displayError" for each error in the form
const checkForm = form => {
    let isValid = true;
    const inputs = form.querySelectorAll('input');
    const constraints = {
        "name": new RegExp(`^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$`),
        "email": new RegExp('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'),
        "address": new RegExp(`^[0-9A-Za-zÀ-ÖØ-öø-ÿ' -,.]+$`)
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
    const params = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contact: contact,
            products: products
        }),
        mode: 'cors'
    }
    fetch('http://localhost:3000/api/cameras/order', params)
    .then(res => res.json())
    .then(res => {
        const price = cart.totalPrice;
        cart.clear();
        window.location = `./views/order-status.html?id=${res.orderId}&price=${price}`;
    })
}

/* HYDRATING THE PAGE */
let cart = new Cart();
cart.load();
document.getElementById('cart-preview').textContent = cart.quantity;
if (cart.quantity) {
    hydrate(document.querySelector('section'), cart.content);
    document.getElementById('total-price').textContent = formatPrice(cart.totalPrice);
}
else document.querySelector('.main').innerHTML = `<h1 class="main__title">Votre panier est vide</h1>`;

// "Delete" buttons on each cart item
document.querySelectorAll('.cart-item__remove').forEach((button, index) => {
    button.addEventListener('click', e => {
        e.stopPropagation();
        e.preventDefault();
        cart.remove(index);
        document.location.reload();
    })
})

// On form submit: checks user input in the form, then posts the order to the backend
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    if (checkForm(e.target)) {
        let contact = {};
        e.target.querySelectorAll('input').forEach(input => contact[input.name] = input.value);
        const products = cart.content.reduce((acc, item) => {
            for (let i = 0; i < item.quantity; i++) {
                acc.push(item.id);
            }
            return acc;
        }, []);

        postOrder(contact, products);
    }
});