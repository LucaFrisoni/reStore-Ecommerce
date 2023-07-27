const User = require("../Database/models/userModel");

const addToFavorites = async (req, res) => {
  try {
    const { userId, productId, precio, oferta } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si el producto ya existe en los favoritos del usuario
    if (!user.favoritos.some((item) => item.productId === productId)) {
      // Si el producto no está en los favoritos, agregarlo
      user.favoritos.push({ productId, precio, oferta });
      await user.save();
    }

    res
      .status(200)
      .json({ message: "Producto agregado a favoritos con éxito" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar el producto a favoritos" });
  }
};

const removeFromFavorites = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    await User.findByIdAndUpdate(userId, {
      $pull: { favoritos: { productId } },
    });

    res
      .status(200)
      .json({ message: "Producto eliminado de favoritos con éxito" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al eliminar el producto de favoritos" });
  }
};

const getFavoriteProducts = async (req, res) => {
  try {
    const { userId } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const favoriteProducts = user.favoritos;

    res.status(200).json(favoriteProducts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos favoritos" });
  }
};

module.exports = { addToFavorites, removeFromFavorites, getFavoriteProducts };
