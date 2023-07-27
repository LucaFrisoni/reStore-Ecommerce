const User = require("../Database/models/userModel");

const banUser = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.ban === true) {
      user.ban = false;
      await user.save();
    } else {
      user.ban = true;
      await user.save();
    }

    res.status(200).json({ message: "Usuario baneado" });
  } catch (error) {
    res.status(500).json({ error: "Error al banear al usuario" });
  }
};

module.exports = banUser;
