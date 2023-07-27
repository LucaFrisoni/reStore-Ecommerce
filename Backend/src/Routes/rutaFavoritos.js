const express = require("express");
const router = express.Router();
const {
  addToFavorites,
  removeFromFavorites,
  getFavoriteProducts,
} = require("../Controllers/favoritesController");

router.post("/add", addToFavorites);

router.delete("/remove", removeFromFavorites);

router.get("/", getFavoriteProducts);

module.exports = router;
