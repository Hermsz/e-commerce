const { Storage } = require('@google-cloud/storage')
const gcsHelpers = require('../helpers/googleCloudStorage')
const GOOGLE_CLOUD_PROJECT_ID = 'totemic-effort-237310' // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = 'keyfile.json' // Replace with the path to the downloaded private key

const storage = new Storage({
 projectId: GOOGLE_CLOUD_PROJECT_ID,
 keyFilename: GOOGLE_CLOUD_KEYFILE,
})

exports.sendUploadToGCS = (req, res, next) => {
  // console.log('masukkk')
  // console.log(process.env)
  // console.log(process.env.NODE_ENV , '=-=-=-=-==')

 if (!req.file) {
   req.file = {}
   if(process.env.NODE_ENV == 'test') {
     req.file = {
       gcsUrl: 'www.google.com'
      }
    }
  return next();
 }
 
 // kalau lagi di testing
 // gue hanya ngebuat dummy object (file)
 // yang berisi key gcsUrl dengan value string bebas
 // req.file.gcsUrl
 // return next()


 const bucketName = "e-commerce_hermi"
 const bucket = storage.bucket(bucketName);
 const gcsFileName = `${Date.now()}-${req.file.originalname}`;
 const file = bucket.file(gcsFileName);
 const stream = file.createWriteStream({
  metadata: {
   contentType: req.file.mimetype,
  },
 });
 stream.on('error', (err) => {
  req.file.cloudStorageError = err;
  console.log(req.file.cloudStorageError)
  next(err);
 });
 stream.on('finish', () => {
  req.file.cloudStorageObject = gcsFileName;
  return file.makePublic()
   .then(() => {
    req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName);
    next();
   })
   .catch(err => {
     console.log(err.message)
   })
 });
 stream.end(req.file.buffer);
};