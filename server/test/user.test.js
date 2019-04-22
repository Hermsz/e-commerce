const chai = require('chai')
const mongoose = require('mongoose')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

let token = ""

after(function (done) {
  mongoose.connect(`mongodb://localhost/e-commerce-${process.env.NODE_ENV}`, {
      useNewUrlParser: true
    },
    function () {
      mongoose.connection.db.dropDatabase();
      done()
    })
});

// Success Register User
describe('POST /register', function () {
  it('expect return status 201 and an object user', function (done) {

    let user = {
      firstName: 'Martin',
      lastName: 'Suhendra',
      email: 'martin@gmail.com',
      role: 'user',
      password: '12345'
    }

    chai.request(app)
      .post('/users/register')
      .send(user)
      .then((res) => {
        expect(res).to.have.status(201)
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.property('_id')
        expect(res.body).to.have.property('firstName')
        expect(res.body).to.have.property('lastName')
        expect(res.body).to.have.property('role')
        expect(res.body).to.have.property('email')
        expect(res.body).to.have.property('password')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

// Error Register Possibilities
describe('POST /register', function () {

  //Duplicate Email
  it('it should return error status 500 with {Error : Duplicate Email}', function (done) {

    let user = {
      firstName: 'Martin',
      lastName: 'Suhendra',
      email: 'martin@gmail.com',
      password: '12345'
    }

    chai.request(app)
      .post('/users/register')
      .send(user)
      .then((res) => {

        const {
          message
        } = res.body.errors.email
        console.log(message)

        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  //Empty firstName
  it('it should return error status 500 with {Error : FirstName is required}', function (done) {

    let user = {
      firstName: '',
      lastName: 'Suhendra',
      email: 'martin@gmail.com',
      password: '12345'
    }

    chai.request(app)
      .post('/users/register')
      .send(user)
      .then((res) => {
        const {
          message
        } = res.body.errors.firstName
        console.log(message)

        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  //Empty lastName
  it('it should return error status 500 with {Error : lastName is required}', function (done) {

    let user = {
      firstName: 'Martin',
      lastName: '',
      email: 'martin@gmail.com',
      password: '12345'
    }

    chai.request(app)
      .post('/users/register')
      .send(user)
      .then((res) => {
        const {
          message
        } = res.body.errors.lastName
        console.log(message)

        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  // Empty Email Address
  it('expect return status 401', function (done) {

    let user = {
      firstName: 'Martin',
      lastName: 'Suhendra',
      email: '',
      password: '12345'
    }

    chai.request(app)
      .post('/users/register')
      .send(user)
      .then((res) => {
        const {
          message
        } = res.body.errors.email
        console.log(message)

        expect(res).to.have.status(500)
        expect(res.body).to.be.an('object')
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
})

// Success Login
describe('POST Success Login', function () {
  it('Should expect success Login', function (done) {

    let user = {
      email: 'martin@gmail.com',
      password: '12345'
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

// // Failed Login
// describe('Failed Login', function() {
//   it('Should expect failed login', function(done) {

//   })
// })


