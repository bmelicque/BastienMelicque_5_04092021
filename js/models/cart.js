class Cart {
    constructor(content = []) {
        this.content = content // Stores an array of products
    }
    
    // Returns the total price of the cart
    get totalPrice() {
        let sum = 0;
        this.content.forEach(item => sum += (item.price * item.quantity));
        return sum;
    }
    
    // Returns the number of items in the cart
    get quantity() {
        let sum = 0;
        this.content.forEach(item => sum += item.quantity);
        return sum;
    }
    
    // Hydrates the cart with the content of the localStorage (if it exists)
    load() {
        if (window.localStorage.cart) {
            const stored = JSON.parse(window.localStorage.cart);
            this.content = stored.content;
        }
    }
    
    // Saves this instance to localStorage
    save() {
        window.localStorage.cart = JSON.stringify(this);
    }
    
    // Adds a certain quantity of a product with the chosen lens into the current cart
    add(product, lens, quantity) {
        const found = this.content.findIndex(inCart => (product._id == inCart.id) && (lens == inCart.lens))
        console.log(found);
        if (found >= 0) {
            this.content[found].quantity += product.quantity;
        } else {
            this.content.push({
                id: product._id,
                lens: lens,
                imageUrl: product.imageUrl,
                name: product.name,
                price: product.price,
                quantity: quantity
            })
        }
        this.save();
    }

    // Takes the index (inside the "content" array) of the element to remove
    remove(index) {
        this.content.splice(index, 1);
        this.save();
    }

    // Empties the cart (both the object and the localStorage)
    empty() {
        this.content = [];
        window.localStorage.clear();
    }
} 