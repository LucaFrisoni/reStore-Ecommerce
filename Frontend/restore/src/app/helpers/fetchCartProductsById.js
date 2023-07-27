import { totalPrice } from './totalPrice';

const { default: axios } = require('axios');

const fetchCartProductsById = async (cart, setProducts) => {
  Promise.all(
    cart.map((item) =>
      axios.get(
        `https://re-store.onrender.com/categories/technology/Detail/${item.productId}`
      )
    )
  )
    .then((values) =>
      setProducts(
        values.map((value) => {
          //se puede tambien sacar quantity cuando se incorpore
          const {
            Marca: description,
            name,
            background_image,
            precio,
            Ofertas,
          } = value.data.result[0];
          const finalPrice = Ofertas
            ? Math.round(
                Number(totalPrice([{ precio, oferta: Ofertas }])) * 100
              )
            : Number(precio) * 100;
          return {
            name,
            description,
            unit_amount: Number(finalPrice),
            quantity: 1,
            images: [background_image],
          };
        })
      )
    )
    .catch((error) => console.log(error));
};

export default fetchCartProductsById;
