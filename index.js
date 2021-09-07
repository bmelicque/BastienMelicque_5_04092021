let cameraList = [];

const fetchCameras = async () => {
    await fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => cameraList = data);
}

const displayCameras = async () => {
    await fetchCameras();

    console.log(cameraList);

    /*
    document.getElementById("list").innerHTML = cameraList.map(camera => {
        let price = formatPrice(camera.price);
        let url = "./views/product.html?id=" + camera._id;
        return `
        <li>
            <a class="card" href=${url}>
                <img class="card__img" src=${camera.imageUrl}>
                <div class="card__content">
                    <h2 class="card__name">${camera.name}</h2>
                    <p class="card__price">${price}</p>
                </div>
            </a>
        </li>
        `}).join(""); */

    const template = document.getElementById("product");
    const list = document.getElementById("list");

    cameraList.forEach(camera => {
        let clone =  document.importNode(template.content, true);
        let url = "./views/product.html?id=" + camera._id;
        clone.querySelector(".card").setAttribute("href", url);
        clone.querySelector(".card__img").setAttribute("src", camera.imageUrl);
        clone.querySelector(".card__name").textContent = camera.name;
        clone.querySelector(".card__price").textContent = formatPrice(camera.price);
        if (clone.querySelector(".card__description")) {
            clone.querySelector(".card__description").textContent = camera.description;
        }
        
        list.appendChild(clone);
    });

    console.log(template);
}

displayCameras();