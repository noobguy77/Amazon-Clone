const {Router} = require('express')
const router = Router()

const categoryController = require('../controllers/category.controller')

router.post('/category',categoryController.category_create);

module.exports = router;