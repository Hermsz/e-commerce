const CartModel = require('../models/cart')
const UserModel = require('../models/user')

class CartController {

  // Find User Cart
  static getUserCart(req, res) {

    let user_id = req.authenticatedUser.id

    CartModel
      .findOne({
        userId : user_id
      })
      .then(foundCart => {
        if(!foundCart) {
          throw new Error(`You don't have any cart`)
        } else {
          res.status(200).json(foundCart)
        }
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  }
  
  // Find All User Cart CARA AFIT
  // static getUserCart(req, res) {

  //   let userId = req.authenticatedUser.id

  //   UserModel
  //     .findByIdAndUpdate(userId)
  //     .populate('cart')
  //     .select('cart')
  //     .then(foundUser => {
  //       res.status(200).json(foundUser.cart)
  //     })
  //     .catch(err => {
  //       res.status(500).json(err.message)
  //     })
  // }

  static addToCart(req, res) {

    let user_id = req.authenticatedUser.id

    CartModel
        .findOne({
          userId: user_id
        })
        .then(foundCart => {
          console.log(foundCart, '-------')
          if(!foundCart) {
            return CartModel
                        .create({
                          userId: user_id,
                          listProduct: [{
                            productId: req.body.productId,
                            amount: req.body.amount
                          }]
                        })

          } else {
            foundCart.listProduct.push({
              productId: req.body.productId,
              amount: req.body.amount
            }) 
            return foundCart.save()
          }
        })
        .then(cardData =>  {
          // console.log('masukkkk')
          res.status(200).json(cardData)
        })
        .catch(err => {
          res.status(500).json(err.message)
        })
  }
  // Add To User Cart
  // static addToCart(req, res) {

  //   let userId = req.authenticatedUser.id
  //   UserModel
  //     .findByIdAndUpdate(userId, {
  //       $push: {
  //         cart: req.body.productId
  //       }
  //     })
  //     .populate('cart')
  //     .select('cart')
  //     .then(foundUser => {
  //       res.status(201).json(foundUser.cart)
  //     })
  //     .catch(err => {
  //       res.status(500).json(err.message)
  //     })
  // }

  static removeFromCart(req, res) {

    let user_id = req.authenticatedUser.id
    
    CartModel
    .findOne({
      userId: user_id,
      $pull: {
        
      }
    })
    .then(foundCart => {
      if(foundCart) {
        // console.log('masukkkkkk', foundCart)
            foundCart.listProduct.filter(e => {
              console.log(e._id, req.params.id, '=-=-=-=-=')
              if(!e._id.equals(req.params.id)) {
                return e
              } 
            })
            return foundCart.save()
          }
        })
        .then(cardData => {
          res.status(200).json(cardData)
        })
        .catch(err => {
          res.status(500).json(err)
        })
  }

  // static removeFromCart(req, res) {

  //   let user_id = req.authenticatedUser.id
    
  //   CartModel
  //   .findOne({
  //     userId: user_id
  //   })
  //   .then(foundCart => {
  //     if(foundCart) {
  //       // console.log('masukkkkkk', foundCart)
  //           foundCart.listProduct.filter(e => {
  //             console.log(e._id, req.params.id, '=-=-=-=-=')
  //             if(!e._id.equals(req.params.id)) {
  //               return e
  //             } 
  //           })
  //           return foundCart.save()
  //         }
  //       })
  //       .then(cardData => {
  //         res.status(200).json(cardData)
  //       })
  //       .catch(err => {
  //         res.status(500).json(err)
  //       })
  // }

  // // Remove From User Cart
  // static removeFromCart(req, res) {
  //   let userId = req.authenticatedUser.id

  //   UserModel
  //     .findByIdAndUpdate(userId, {
  //       $pull: {
  //         cart: req.params.productId
  //       }
  //     })
  //     .populate('cart')
  //     .select('cart')
  //     .then(foundUser => {
  //       res.status(200).json(foundUser.cart)
  //     })
  //     .catch(err => {
  //       res.status(500).json(err.message)
  //     })
  // }


  // Read All Card
  static findAll(req, res) {
    CartModel
      .find()
      .then(allProduct => {
        res.status(200).json(allProduct)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

  static update(req, res) {
    CartModel
      .findByIdAndUpdate(req.params.id, { ...req.body })
      .then(card => {
        res.status(200).json(card)
      })
      .catch(err => {
        res.status(500).json(err.massage)
      })
  }

  static deleteCart(req, res) {
    CartModel
      .findById({
        _id: req.params.id
      })
      .then(deleted => {
        res.status(200).json(deleted)
      })
      .catch(err => {
        res.status(500).json(err)
      })
  }

}

module.exports = CartController