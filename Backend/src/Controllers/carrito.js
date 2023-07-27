const User = require('../Database/models/userModel');

// agregar usuario al carrito
const addToCartHandler = async (req, res) => {
  try {
    const { userId, productId, precio, oferta } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // verifico si el producto existe o si ya está en el carrito del usuario
    if (!user.carrito.some((item) => item.productId === productId)) {
      // si el producto no está en el carrito, agregarlo con una cantidad inicial de 1
      user.carrito.push({ productId, cantidad: 1, precio, oferta });
      await user.save();
    }
    //si esta agregarle cantidad

    res.status(200).json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// eliminar usuario del carrito
const removeFromCartHandler = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await User.findByIdAndUpdate(userId, {
      $pull: { carrito: { productId } },
    });

    res
      .status(200)
      .json({ message: 'Producto eliminado del carrito con éxito' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al eliminar el producto del carrito' });
  }
};
const getCartProductsHandler = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log(userId);

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const products = user.carrito;

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al obtener los productos del carrito' });
  }
};

//limpiar el carrito
const cleanCartHandler = async (req, res) => {
  const { userId } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { $set: { carrito: [] } });

    res.status(200).json({ message: 'Carrito vaciado con exito' });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error al eliminar los productos del carrito' });
  }
};

module.exports = {
  addToCartHandler,
  removeFromCartHandler,
  getCartProductsHandler,
  cleanCartHandler,
};
