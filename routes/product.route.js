const {Router} = require('express')
const router = Router()
const productController = require('../controllers/product.controller');

router.post('/product',productController.product_create);
router.get('/product/:categoryId',productController.fetch_products);

module.exports = router;