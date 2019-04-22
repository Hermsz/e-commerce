const router = require('express').Router()
const productController = require('../controllers/productController')
const { authentication } = require('../middlewares/authentication')
const { isAdmin } = require('../middlewares/isAdmin')
const gcsMiddlewares = require('../middlewares/googleImage')
const Multer = require('multer')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  },
});

router.get('/', productController.findAll)
router.use(authentication)
router.post('/', multer.single('image'), isAdmin, gcsMiddlewares.sendUploadToGCS, productController.createProduct)
router.delete('/:id', isAdmin, productController.deleteProduct)
router.put('/:id', multer.single('image'), isAdmin, gcsMiddlewares.sendUploadToGCS, productController.updateProduct)
module.exports = router