const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  listProduct: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    amount: {
      type: Number
    }
  }]
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart