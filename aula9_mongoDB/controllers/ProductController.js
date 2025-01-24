var Product = require('../models/Product')

module.exports = class ProductController {
    static async showProducts(req, res) {
        var products = await Product.getProducts()

        res.render('products/all', { products })
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static createProductPost(req, res) {
        var name = req.body.name
        var price = req.body.price
        var description = req.body.description

        var product = new Product(name, price, description)
        product.save()

        res.redirect('/products')
    }

    static async getProduct(req, res) {
        var id = req.params.id

        var product = await Product.getProductsById(id)

        res.render('products/product', { product })
    }
}