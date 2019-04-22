const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product Name is required']
  },
  image: {
    type: String
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  stock: {
    type: Number,
    required: [true, 'Quantity Stock is required']
  }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product