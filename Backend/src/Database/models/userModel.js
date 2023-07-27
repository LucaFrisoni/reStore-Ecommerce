const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  nombre: {
    type: String,
  },
  apellido: {
    type: String,
  },
  imagenDePerfil: {
    type: String,
    default:
      "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg",
  },
  email: {
    type: String,
    unique: true,
  },
  contraseña: {
    type: String,
  },
  genero: {
    type: String,
    enum: ["Masculino", "Femenino", "Otro"],
  },
  fechaNacimiento: {
    type: Date,
  },
  ubicacion: [
    {
      ciudad: {
        type: String,
      },
      direccion: {
        type: String,
      },
      codigoPostal: {
        type: Number,
      },
    },
  ],
  carrito: [
    {
      productId: {
        type: String,
      },
      cantidad: {
        type: Number,
        default: 1,
      },
      precio: {
        type: Number,
      },
      oferta: {
        type: Number,
      },
    },
  ],
  favoritos: [
    {
      productId: {
        type: String,
      },
      precio: {
        type: Number,
      },
      oferta: {
        type: Number,
      },
    },
  ],
  orders: [
    {
      user: {
        type: String,
        required: true,
      },
      customerId: { type: String },

      orderItems: [
        {
          id: {
            type: String,
          },
          quantity: {
            type: String,
          },
          price: {
            type: Number,
          },
          calificado: {
            type: Boolean,
            default: false,
          },
        },
      ],
      paymentInfo: {
        id: {
          type: String,
        },
        status: {
          type: String,
        },
        amountPaid: {
          type: Number,
        },
      },
      orderStatus: {
        type: String,
        default: "En proceso",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  ban: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", userSchema);
