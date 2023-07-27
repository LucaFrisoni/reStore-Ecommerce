const express = require('express');
const router = express.Router();
const {
  addToCartHandler,
  removeFromCartHandler,
  getCartProductsHandler,
  cleanCartHandler,
} = require('../Controllers/carrito');

router.post('/', addToCartHandler);
router.delete('/', removeFromCartHandler);
router.delete('/checkout', cleanCartHandler);
router.get('/', getCartProductsHandler);

module.exports = router;
