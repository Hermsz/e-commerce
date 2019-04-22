require('dotenv').config()

const express = require('express')
const app = express()
const routes = require('./routes')
const cors = require('cors')
const port = 3000

const mongoose = require('mongoose')
mongoose.connect(`mongodb://localhost/e-commerce-${process.env.NODE_ENV}`, { useNewUrlParser: true})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ encoded: false }))

app.use('/', routes)

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})

module.exports = app