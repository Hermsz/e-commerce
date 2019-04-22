const chai = require('chai')
const mongoose = require('mongoose')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')
const Usermodel = require('../models/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')

chai.use(chaiHttp)

let token = ""
let productID = ""

describe('product end point test', function() {

  // Dummy User
  before(function(done) {
    let newUser = {
      firstName: 'Azhar',
      lastName: 'Nazli',
      email: 'azhar@gmail.com',
      role: 'admin',
      password: '12345'
    }

    Usermodel
      .create(newUser)
      .then(newUser => {
        const { id, email } = newUser
        let payload = {  id, email }
        token = jwt.sign(payload, process.env.JWT_SECRET)
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  // Dummy user login
  describe('POST Success Login', function () {
    it('Should expect success Login in product', function (done) {
  
      let user = {
        email: 'azhar@gmail.com',
        password: '12345',
      }
  
      chai.request(app)
        .post('/users/webLogin')
        .send(user)
        .then((res) => {
          // console.log(res, '000000')
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('token')
          token = res.body.token
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  })

  // Success Create Product
  it('should expect success create product', function(done) {

    let newProduct = {
      name: 'Monitor Dell',
      image: './image.jpg',
      price: 200,
      stock: 30
    }

    chai.request(app)
        .post('/products')
        .send(newProduct)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(200)
          expect(res.body).to.be.an('object')
          expect(res.body).to.have.property('_id')
          expect(res.body).to.have.property('name')
          expect(res.body).to.have.property('image')
          expect(res.body).to.have.property('price')
          expect(res.body).to.have.property('stock')
          productID = res.body._id
          done()
        })
        .catch(err => {
          console.log(err)
        })
  })

    // Success Update Product
    it('should update product', function() {

      chai.request(app)
          .put(`/products/${productID}`)
          .send({
            name: 'makanan',
            price: 3000,
            image: "-0-0-0",
            stock: 90
          })
          .set({ token })
          .then(res => {
            // console.log(res.body, '-0-0-0-00-')
            expect(res).to.have.status(200)
          })
          .catch(err => {
            console.log(err)
          })

    })

  // Success Delete Product
  it('should delete product', function(done) {

    chai.request(app)
        .delete(`/products/${productID}`)
        .set({ token })
        .then(res => {
          expect(res).to.have.status(200)
          done()
        })
        .catch(err => {
          console.log(err)
        })
  })







})










