const TechModel = require("../Database/models/Technology");
const UserModel = require("../Database/models/userModel");

const rating = async (req, res) => {
  try {
    const { rate, comment } = req.body;
    const { product, user } = req.params; // Obtener los IDs del producto y usuario de los parámetros de la URL

    // Buscar el producto por su ID
    const productObj = await TechModel.findById(product);

    if (!productObj) {
      return res.status(404).json({ message: "Producto no existe" });
    }

    // Agregar la calificación (rate) como número entero al array 'stars' en el objeto 'rating' del producto
    productObj.rating.stars.push(parseFloat(rate));

    // Agregar el comentario al array 'comments' en el objeto 'rating' del producto
    productObj.rating.comments.push(comment);

    // Calcular el nuevo promedio de calificaciones
    const totalRatings = productObj.rating.stars.length;
    let newRating = 0;
    if (totalRatings !== 0) {
      const sum = productObj.rating.stars.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      newRating = Math.round(sum / totalRatings);
    }

    // Actualizar el campo 'totalStars' en el objeto 'rating' del producto con el nuevo promedio
    productObj.rating.totalStars = newRating;

    // Marcar el producto como calificado en la lista de productos comprados del usuario
    const userObj = await UserModel.findById(user);
    if (userObj) {
      const purchasedOrder = userObj.orders.find((order) =>
        order.orderItems.find((item) => item.id === product)
      );
      if (purchasedOrder) {
        const purchasedProduct = purchasedOrder.orderItems.find((item) => item.id === product);
        if (purchasedProduct) {
          purchasedProduct.calificado = true;
        }
      }
      await userObj.save();
    }

    // Guardar los cambios en la base de datos
    await productObj.save();

    res.status(200).json({ message: "Calificación enviada exitosamente", newRating });
  } catch (error) {
    res.status(400).json({ message: "Error al calificar" });
    console.error(error);
  }
};

module.exports = rating;
