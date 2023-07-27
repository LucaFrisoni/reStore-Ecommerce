const express = require("express");
const router = express.Router();
const {
  postProduct,
  getAllProducts,
  getAllProductsByCategory,
  getModelCategories,
  modifyProduct
} = require("../Controllers/controllersTecnologias");
const { ofertProduct, getOfertProducts } = require("../Controllers/ofertas");
const detailProduct = require("../Controllers/detail");
const Search = require("../Controllers/searchName");

const {
  getAccesorios,
  getComputacion,
  getElectronica,
  getConsolas,
  getCelulares,
} = require("../Controllers/subcategorias");
const upload = require("../utils/multer");
const rating = require("../Controllers/rating");

//----------getAllProducts---------------------------------------------------------------------------------------------------------------//
router.get("/allProducts", getAllProducts);
router.get("/subcategorias", getModelCategories);
//----------PostProducts---------------------------------------------------------------------------------------------------------------//
router.post("/posteo", upload.single("image"), postProduct);

//----------getSubCategories---------------------------------------------------------------------------------------------------------------//
router.get("/categoria/:category", getAllProductsByCategory);

//----------Ofertas---------------------------------------------------------------------------------------------------------------//
router.get("/Ofertas", getOfertProducts);
router.put("/Ofertas", ofertProduct);
//-----------Detail-------------------------------------------------------------------------------------------------------------//
router.get("/Detail/:id", detailProduct);
//-----------SearchByName-------------------------------------------------------------------------------------------------------------//
router.get("/searchName", Search);
//----------Rating---------------------------------------------------------------------------------------------------------------//
router.put("/rating/:product/:user", rating);


router.put("/:id", upload.single("image"), modifyProduct)



// subcatgoria
router.get("/Computacion/:compu", getComputacion);
router.get("/ElectronicaAudioVideo/:electro", getElectronica);
router.get("/ConsolasyVideojuegos/:conso", getConsolas);
router.get("/Celulares/:celu", getCelulares);
router.get("/CamarasyAccesorios/:cam", getAccesorios);

module.exports = router;
