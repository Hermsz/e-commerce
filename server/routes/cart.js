const router = require('express').Router()
const cartController = require('../controllers/cartController')
const { authentication } = require('../middlewares/authentication')
// const { userAuthorization } = require('../middlewares/userAuthorization')


router.use(authentication)
router.get('/', cartController.getUserCart)
// // router.use(userAuthorization)
router.post('/', cartController.addToCart)
router.delete('/:id', cartController.removeFromCart)
router.delete('/', cartController.deleteCart)
router.put('/:id', cartController.updateUserCart)


module.exports = router