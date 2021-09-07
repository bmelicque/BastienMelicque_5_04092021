let cameraList = [];

const fetchCameras = async () => {
    await fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => cameraList = data);
}

const displayCameras = async () => {
    await fetchCameras();

    console.log(cameraList);

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
        `}).join("");
}

displayCameras();