const CartModel = require('../models/cart')
const UserModel = require('../models/user')

class CartController {

  // Find User Cart
  static getUserCart(req, res) {

    let user_id = req.authenticatedUser.id

    CartModel
      .findOne({
        userId: user_id
      })
      .populate('listProduct.productId')
      .then(foundCart => {
        // console.log(foundCart, '000000-')
        if (!foundCart) {
          res.status(200).json({err : 'you dont have any cart'})
        } else {
          // console.log('MASUKKK')
          let answer = foundCart.listProduct.map(e => {
            return {
              productId : e.productId,
              amount : e.amount
            }
          })
          
          foundCart.listProduct = answer
          foundCart.save()
          res.status(200).json(foundCart)
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // Add Product to cart
  static addToCart(req, res) {
    let user_id = req.authenticatedUser.id

    CartModel
      .findOne({
        userId: user_id
      })
      .populate('listProduct.productId')
      .then(foundCart => {
        if (!foundCart) {
          return CartModel
            .create({
              userId: user_id,
              listProduct: [{
                productId: req.body.productId,
                amount: req.body.amount
              }]
            })
        } else {

          let myCart = foundCart.listProduct
          let foundProduct = myCart.find(e => e.productId._id.toString() == req.body.productId )

          if(foundProduct !== undefined) {
            foundProduct.amount += Number(req.body.amount)
          } else {
            myCart.push({
              productId: req.body.productId,
              amount: req.body.amount
            })
          }
          return foundCart.save()
        }
      })
      .then(cardData => {
        console.log(cardData)
        res.status(200).json(cardData)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }

  // Delete Product From Cart
  static removeFromCart(req, res) {
    let user_id = req.authenticatedUser.id

    CartModel
      .findOne({
        userId : user_id
      })
      .populate('listProduct.productId')
      .then(foundUser => {

        let myCart = foundUser.listProduct
        // console.log(myCart)

        let foundProduct = myCart.find(e => e.productId._id.toString() ==  req.params.id )
        // console.log(foundProduct, 'lllllllllllll')

        if(!foundProduct) {
          throw new Error(`There is no such product in your cart`)
        } else if(foundProduct.amount > 0) {
          foundProduct.amount --
          foundUser.save()
          res.status(200).json(foundUser)
        } else {
          res.status(400).json({
            msg: 'Cannot be zero'
          })
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json(err)
      })
  }
  

  // Delete cart
  static deleteCart(req, res) {

    let user_id = req.authenticatedUser.id

    CartModel
      .findOneAndDelete({
        userId : user_id
      })
      .then(() => {
        res.status(200).json('success')
      })
      .catch(err => {
        console.log(err.message, '=====')
        res.status(500).json(err)
      })
  }

  // Add Quantity to Cart
  static updateUserCart(req, res) {
    let user_id = req.authenticatedUser.id

    CartModel
      .findOne(
        {
          userId: user_id
        })
      .then((foundCart) => {
       foundCart.listProduct.forEach( el => {
         if(el.productId == req.params.id) {
           el.amount += req.body.amount
         }  
        })
        return foundCart.save()
      })
      .then(()=> {
        res.status(200).json(`Success Update Cart`)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }



}



module.exports = CartController