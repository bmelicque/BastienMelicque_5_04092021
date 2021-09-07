let camera = {};

// Breaks down URL parameters and checks if ID is alphanumeric
const getId = () => {
    const vars = window.location.search.substr(1).split('&');
    let id = 0;
    vars.forEach(element => {
        if (element.match(/^id=[a-z0-9]+$/gi)) {
            id = element.replace("id=", "");
        }
    });

    return id;
}

const fetchOne = async () => {
    const cameraId = getId();
    
    await fetch('http://localhost:3000/api/cameras/' + cameraId)
        .then(res => res.json())
        .then(data => camera = data);

    console.log(camera);
}

const displayOne = async () => {
    await fetchOne();

    document.getElementById('product').innerHTML = `
        <div class="card">
            <img class="card__img" src=${camera.imageUrl}>
            <div class="card__content">
                <h2 class="card__name">${camera.name}</h2>
                <p class="card__price">${formatPrice(camera.price)}</p>
            </div>
        </div>
    `;
}

displayOne();
