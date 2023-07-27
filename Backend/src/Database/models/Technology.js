const mongoose = require("mongoose");

const TechnologySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  background_image: {
    type: String,
    require: true,
  },
  precio: {
    type: Number,
    require: true,
  },
  Description: {
    type: String,
    require: true,
  },
  Marca: {
    type: String,
    require: true,
  },
  Ofertas: {
    type: Number,
    default: 0,
  },
  Disabled: {
    type: Boolean,
    default: false,
  },
  favoritos: {
    type: [String], // Array de IDs de favoritos
    default: [],
  },
  rating: {
    stars: {
      type: [Number],
    },
    totalStars: {
      type: Number,
    },
    comments: {
      type: [String],
    },
  },
  stock: {
    type: Number,
    default: 1,
  },
  subcategoria: {
    type: {
      TV: {
        type: {
          Soportes: Boolean,
          DispositivosTransmision: Boolean,
          Accesorios: Boolean,
          CablesYAdaptadores: Boolean,
        },
      },
      Computacion: {
        type: {
          notebook: Boolean,
          PcEscritorio: Boolean,
          Monitores: Boolean,
          AccesoriosPc: Boolean,
          Sillas: Boolean,
          Componentes: Boolean,
          Impresoras: Boolean,
          Proyectores: Boolean,
          Conectividad: Boolean,
          Tablets: Boolean,
          AccesoriosTablet: Boolean,
        },
      },
      ElectronicaAudioVideo: {
        type: {
          Amplificadores: Boolean,
          AsistentesVirtuales: Boolean,
          Auriculares: Boolean,
          EquiposDj: Boolean,
          AccesoriosDj: Boolean,
          EstudiodeGrabacion: Boolean,
          Grabadoras: Boolean,
          HomeTheatre: Boolean,
          Megafonos: Boolean,
          Microfonos: Boolean,
          Parlantes: Boolean,
          Radios: Boolean,
          Sintonizador: Boolean,
          Tocadiscos: Boolean,
          AccesoriosParaAudio: Boolean,
          ComponentesElectronicos: Boolean,
          Drones: Boolean,
        },
      },
      ConsolasyVideojuegos: {
        type: {
          Consolas: Boolean,
          Videojuegos: Boolean,
          Accesorios: Boolean,
        },
      },
      Celulares: {
        type: {
          Smartphones: Boolean,
          Fundas: Boolean,
          Cargadores: Boolean,
        },
      },

      CamarasyAccesorios: {
        type: {
          Camaras: Boolean,
          CamarasFilmadoras: Boolean,
          Lentes: Boolean,
          EstudioseIluminacion: Boolean,
          CargadoresyBaterias: Boolean,
          Soportes: Boolean,
          Telescopios: Boolean,
          Binoculares: Boolean,
          Microscopios: Boolean,
        },
      },
    },
  },
});
TechModel = mongoose.model("Technology", TechnologySchema);
module.exports = TechModel;
