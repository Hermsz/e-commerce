const userModel = require('../models/user')

module.exports = {
  isAdmin: function(req, res, next) {

    let userId = req.authenticatedUser.id
    
    userModel
      .findById(userId)
      .then(user => {
        if((user.role).toLowerCase() == 'admin') {
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