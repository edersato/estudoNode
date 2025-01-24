var conn = require('../db/conn')

const { ObjectId } = require('mongodb')

class Product {
    constructor(name, price, description) {
        this.name = name;
        this.price = price;
        this.description= description;
    }

    save() {
        var product = conn.db().collection('products').insertOne({
            name: this.name,
            price: this.price,
            description: this.description
        })

        return product
    }

    static getProducts() {
        var products = conn.db().collection('products').find().toArray()

        return products
    }

    static async getProductsById(id) {
        var product = await conn.db().collection('products').findOne({ _id: new ObjectId(id) })

        return product
    }
}

module.exports = Product