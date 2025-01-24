var express = require('express')
var router = express.Router()

var ProductController = require('../controllers/ProductController')

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductPost)
router.get('/:id', ProductController.getProduct)
router.get('/', ProductController.showProducts)

module.exports = router