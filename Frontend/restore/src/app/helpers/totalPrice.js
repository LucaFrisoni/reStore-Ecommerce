export const totalPrice = (cart) => {
  const totalPrice = cart.reduce((prev, item) => {
    if (item.oferta > 0) {
      const descuento = parseFloat(item.oferta) / 100;
      const precio = parseFloat(item.precio);
      const precioFinal = precio - precio * descuento;
      return Number(precioFinal) + Number(prev);
    }
    return Number(item.precio) + Number(prev);
  }, 0);

  return totalPrice.toFixed(2);
};
