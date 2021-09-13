/* FUNCTIONS COMMON TO ALL/MOST PAGES */

// Formats prices into displayable strings
const formatPrice = price => {
    return (price / 100).toFixed(2).toString().replace(".", ",") + " €";
}

// Takes a container and a product object
// Hydrates the container with the data from the object
const hydrate = (container, product) => {
    if (Array.isArray(product)) product.forEach(item => hydrate(container, item))
    else {
        const template = document.getElementById("product");
        let clone =  document.importNode(template.content, true);
        
        // Used to convert the data into the displayed info if they are different
        const content = {
            price: formatPrice(product.price),
            totalPrice: formatPrice(product.quantity * product.price)
        };
        
        // Browses the tags of the container and injects data from the object
        let tags = clone.querySelectorAll('*');
        tags.forEach(tag => {
            if (tag.dataset.text) tag.textContent = content[tag.dataset.text] || product[tag.dataset.text];
            if (tag.tagName == "A") tag.href = "./views/product.html?id=" + product._id;
            if (tag.tagName == "IMG") tag.src = product.imageUrl;
            if (tag.dataset.append) {
                product.lenses.forEach(lens => {
                    let option = document.createElement('option');
                    option.textContent = lens;
                    tag.append(option);
                });
            };
        })
        
        container.appendChild(clone);
    }
}

// Returns asked parameter from the URL
// If no argument, returns an object containing all the parameters
const getParams = (asked = '') => {
    const vars = window.location.search.substr(1).split('&');
    let params = {};
    
    vars.forEach(element => {
        const [key, value] = element.split('=');
        params[key] = value;
    });
    
    if (asked) return params[asked];
    else return params;
}

// Takes an id and returns the fetched product (with "get" method)
// If no id is passed, returns a table with all the products
const fetchProduct = async (id = '') => {
    return await fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(res => res.json())
}