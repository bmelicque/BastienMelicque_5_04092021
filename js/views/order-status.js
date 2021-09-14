const params = getParams();
document.getElementById('orderNumber').textContent = params.id;
document.getElementById('orderPrice').textContent = formatPrice(params.price);