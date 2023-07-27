const User = require("../Database/models/userModel");

const getUbi = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const usuario = await User.findOne({ "ubicacion._id": id });
      if (!usuario) {
        return res.status(200).json({ error: "Ubicación no encontrada" });
      }

      const ubicacion = usuario.ubicacion.find(
        (ubi) => ubi._id.toString() === id
      );

      if (!ubicacion) {
        return res.status(200).json({ error: "Ubicación no encontrada" });
      }

      return res.status(200).json(ubicacion);
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la ubicación" });
  }
};

const addUbi = async (req, res) => {
  try {
    const { id, ciudad, direccion, codigoPostal } = req.body;
    
    // Buscar el usuario por su id
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    // Crear el objeto de ubicación
    const nuevaUbicacion = {
      ciudad,
      direccion,
      codigoPostal
    };
    
    // Agregar la nueva ubicación al array de ubicaciones del usuario
    user.ubicacion.push(nuevaUbicacion);
    
    // Guardar los cambios en la base de datos
    await user.save();
    
    res.status(200).json({ message: "Ubicación agregada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al agregar la ubicación" });
  }
};

const deleteUbi = async (req, res) => {
  try {
    const { id } = req.body;

    // Verificar si se proporciona un ID válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere un ID de ubicación válido" });
    }

    // Buscar y actualizar el usuario
    const usuario = await User.findOneAndUpdate(
      { "ubicacion._id": id },
      { $pull: { ubicacion: { _id: id } } },
      { new: true }
    );

    // Verificar si el usuario existe y si se eliminó la ubicación
    if (!usuario) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    res.status(200).json({ message: "Ubicación eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la ubicación" });
  }
};

const modifyUbi = async (req, res) => {
  try {
    const { id, ciudad, direccion, codigoPostal } = req.body;

    // Verificar si se proporciona un ID válido
    if (!id) {
      return res.status(400).json({ error: "Se requiere un ID de ubicación válido" });
    }

    // Crear un objeto con los campos a modificar
    const updateFields = {};
    if (ciudad) {
      updateFields["ubicacion.$.ciudad"] = ciudad;
    }
    if (direccion) {
      updateFields["ubicacion.$.direccion"] = direccion;
    }
    if (codigoPostal) {
      updateFields["ubicacion.$.codigoPostal"] = codigoPostal;
    }

    // Buscar y actualizar la ubicación del usuario
    const usuario = await User.findOneAndUpdate(
      { "ubicacion._id": id },
      { $set: updateFields },
      { new: true }
    );

    // Verificar si el usuario existe y si se modificó la ubicación
    if (!usuario) {
      return res.status(404).json({ error: "Ubicación no encontrada" });
    }

    res.status(200).json({ message: "Ubicación modificada exitosamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al modificar la ubicación" });
  }
};

module.exports = { getUbi, addUbi,deleteUbi,modifyUbi };
