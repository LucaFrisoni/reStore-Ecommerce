const User = require("../Database/models/userModel");

const getUsersOrders = async (req, res) => {
  try {
    const users = await User.find({ orders: { $exists: true, $ne: [] } })
      .sort({ "orders.createdAt": -1 })
      .populate("orders.customerId"); // Agregar populate para obtener los detalles del cliente en cada orden

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontraron usuarios con órdenes" });
    }

    const usersData = users.map((user) => ({
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      ubicacion: user.ubicacion,
      orders: user.orders,
    }));

    res.status(200).json({ users: usersData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios y sus órdenes" });
  }
};

module.exports = getUsersOrders;
