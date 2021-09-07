let cameraList = [];

const fetchCameras = async () => {
    await fetch('http://localhost:3000/api/cameras')
    .then(res => res.json())
    .then(data => cameraList = data);
}

const displayCameras = async () => {
    await fetchCameras();
    cameraList.forEach(camera => display(camera, document.getElementById("list")));
}

displayCameras();
cartPreview();