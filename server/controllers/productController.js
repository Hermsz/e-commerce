const Product = require('../models/product')

class ProductController {

  static findAll(req, res) {
    Product
      .find({})
      .then(products => {
        res.status(200).json(products)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static createProduct(req, res) {
    console.log(req.file, 'masuk kesiniii')
    let product = {
      name: req.body.name,
      image: req.file.gcsUrl,
      price: req.body.price,
      stock: req.body.stock
    }
    Product
      .create(product)
      .then(newProduct => {
        res.status(200).json(newProduct)
      })
      .catch(err => {
        res.status(500).json(err)
      })
    }
    
    static updateProduct(req, res) {

      if(!req.file) {
        req.file.gcsUrl = req.body.image
      }
      Product
      .findByIdAndUpdate(
        req.params.id
      , {
        name: req.body.name,
        price: req.body.price,
        image: req.file.gcsUrl,
        stock: req.body.stock
      }, { new: true })
      .then(product => {
        res.status(200).json(product)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static deleteProduct(req, res) {
    Product
      .findOneAndRemove({
        _id: req.params.id
      })
      .then(product => {
        // console.log(product)
        res.status(200).json(product)
      })
      .catch(err => {
        console.log(err)
        res.status(500).json(err)
      })
  } 

  

}

module.exports = ProductController