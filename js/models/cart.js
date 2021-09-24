class Cart {
    constructor(content = []) {
        this.content = content // Stores an array of products
    }
    
    // Returns the total price of the cart
    get totalPrice() {
        return this.content.reduce((sum, item) => (sum + (item.price * item.quantity)), 0);
    }
    
    // Returns the number of items in the cart
    get quantity() {
        return this.content.reduce((sum, item) => (sum + item.quantity), 0);
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
        if (quantity > 0) {
            const found = this.content.findIndex(inCart => (product._id == inCart.id) && (lens == inCart.lens))
            if (found >= 0) {
                this.content[found].quantity += quantity;
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
    }

    // Takes the index (inside the "content" array) of the element to remove
    remove(index) {
        if (index >= 0 && index < this.content.length) {
            this.content.splice(index, 1);
            this.save();
        }
    }

    // Empties the cart (both the object and the localStorage)
    clear() {
        this.content = [];
        window.localStorage.clear();
    }
} 