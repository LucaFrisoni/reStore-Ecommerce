const TechSchema = require("../Database/models/Technology");
const getComputacion = async (req, res) => {
  const compu = req.params.compu;
  const consultas = {
    notebook: { "subcategoria.Computacion.notebook": true },
    PcEscritorio: { "subcategoria.Computacion.PcEscritorio": true },
    Monitores: { "subcategoria.Computacion.Monitores": true },
    AccesoriosPc: { "subcategoria.Computacion.AccesoriosPc": true },
    Sillas: { "subcategoria.Computacion.Sillas": true },
    Componentes: { "subcategoria.Computacion.Componentes": true },
    Impresoras: { "subcategoria.Computacion.Impresoras": true },
    Proyectores: { "subcategoria.Computacion.Proyectores": true },
    Conectividad: { "subcategoria.Computacion.Conectividad": true },
    Tablets: { "subcategoria.Computacion.Tablets": true },
    AccesoriosTablet: { "subcategoria.Computacion.AccesoriosTablet": true },
  };
  if (!consultas.hasOwnProperty(compu)) {
    return res.status(400).json({
      status: "error",
      message: "La subcategoría solicitada no existe",
    });
  }
  try {
    const allcomputacion = await TechSchema.find(consultas[compu]);
    res.status(200).json(allcomputacion);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

const getElectronica = async (req, res) => {
  const electro = req.params.electro;
  const consultas = {
    Amplificadores: {
      "subcategoria.ElectronicaAudioVideo.Amplificadores": true,
    },
    AsistentesVirtuales: {
      "subcategoria.ElectronicaAudioVideo.AsistentesVirtuales": true,
    },
    Auriculares: { "subcategoria.ElectronicaAudioVideo.Auriculares": true },
    EquiposDj: { "subcategoria.ElectronicaAudioVideo.EquiposDj": true },
    AccesoriosDj: { "subcategoria.ElectronicaAudioVideo.AccesoriosDj": true },
    EstudiodeGrabacion: {
      "subcategoria.ElectronicaAudioVideo.EstudiodeGrabacion": true,
    },
    Grabadores: { "subcategoria.ElectronicaAudioVideo.Grabadores": true },
    HomeTheatre: { "subcategoria.ElectronicaAudioVideo.HomeTheatre": true },
    Megafonos: { "subcategoria.ElectronicaAudioVideo.Megafonos": true },
    Microfonos: { "subcategoria.ElectronicaAudioVideo.Microfonos": true },
    Parlantes: {
      "subcategoria.ElectronicaAudioVideo.Parlantes": true,
    },
    Radios: {
      "subcategoria.ElectronicaAudioVideo.Radios": true,
    },
    Sintonizador: {
      "subcategoria.ElectronicaAudioVideo.Sintonizador": true,
    },
    Tocadiscos: {
      "subcategoria.ElectronicaAudioVideo.Tocadiscos": true,
    },
    AccesoriosParaAudio: {
      "subcategoria.ElectronicaAudioVideo.AccesoriosParaAudios": true,
    },
    ComponentesElectronicos: {
      "subcategoria.ElectronicaAudioVideo.ComponentesElectronicos": true,
    },
    Drones: {
      "subcategoria.ElectronicaAudioVideo.Drones": true,
    },
  };
  if (!consultas.hasOwnProperty(electro)) {
    return res.status(400).json({
      status: "error",
      message: "La subcategoría solicitada no existe",
    });
  }
  try {
    const electronica = await TechSchema.find(consultas[electro]);
    res.status(200).json(electronica);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

// ->

const getConsolas = async (req, res) => {
  const { conso } = req.params;
  const consultas = {
    Consolas: { "subcategoria.ConsolasyVideojuegos.Consolas": true },
    Videojuegos: { "subcategoria.ConsolasyVideojuegos.Videojuegos": true },
    Accesorios: { "subcategoria.ConsolasyVideojuegos.Accesorios": true },
  };
  if (!consultas.hasOwnProperty(conso)) {
    return res.status(400).json({
      status: "error",
      message: "La subcategoría solicitada no existe",
    });
  }
  try {
    const consolasVideojuegos = await TechSchema.find(consultas[conso]);
    res.status(200).json(consolasVideojuegos);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

// ->
const getCelulares = async (req, res) => {
  const { celu } = req.params;
  const consultas = {
    Smartphones: { "subcategoria.Celulares.Smartphones": true },
    Fundas: { "subcategoria.Celulares.Fundas": true },
    Cargadores: { "subcategoria.Celulares.Cargadores": true },
  };
  if (!consultas.hasOwnProperty(celu)) {
    return res.status(400).json({
      status: "error",
      message: "La subcategoría solicitada no existe",
    });
  }
  try {
    const celulares = await TechSchema.find(consultas[celu]);
    res.status(200).json(celulares);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

const getAccesorios = async (req, res) => {
  const { cam } = req.params;
  console.log(cam);

  const consultas = {
    Camaras: { "subcategoria.CamarasyAccesorios.Camaras": true },
    CamarasFilmadores: {
      "subcategoria.CamarasyAccesorios.CamarasFilmadores": true,
    },
    Lentes: { "subcategoria.CamarasyAccesorios.Lentes": true },
    EstudioseIluminacion: {
      "subcategoria.CamarasyAccesorios.EstudioseIluminacion": true,
    },
    CargadoresyBaterias: {
      "subcategoria.CamarasyAccesorios.CargadoresyBaterias": true,
    },
    Soportes: { "subcategoria.CamarasyAccesorios.Soportes": true },
    Telescopios: {
      "subcategoria.CamarasyAccesorios.Telescopios": true,
    },
    Binoculares: {
      "subcategoria.CamarasyAccesorios.Binoculares": true,
    },
    Microscopios: { "subcategoria.CamarasyAccesorios.Microscopios": true },
  };

  if (!consultas.hasOwnProperty(cam)) {
    return res.status(400).json({
      status: "error",
      message: "La subcategoría solicitada no existe",
    });
  }
  try {
    const camaras = await TechSchema.find(consultas[cam]);
    res.status(200).json(camaras);
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Ha ocurrido un error en el servidor",
    });
  }
};

module.exports = {
  getAccesorios,
  getCelulares,
  getConsolas,
  getElectronica,
  getComputacion,
};
