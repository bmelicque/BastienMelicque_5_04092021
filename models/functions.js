const formatPrice = (price) => {
    return (price / 100).toFixed(2).toString().replace(".", ",") + " €";
}