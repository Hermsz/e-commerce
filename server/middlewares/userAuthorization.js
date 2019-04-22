const cartModel = require('../models/cart')

module.exports = {
  userAuthorization: function(req, res, next) {

    let userId = req.authenticatedUser.id

    cartModel
      .findById(userId)
      .then(foundCart => {
        if(foundCart) {
          next()
        } else {
          throw new Error('You are not authorized')
        }
      })
      .catch(err => {
        res.status(401).json(err.message)
      })
  }
}