const chai = require('chai')
const mongoose = require('mongoose')
const chaiHttp = require('chai-http')
const expect = chai.expect
const app = require('../app')

chai.use(chaiHttp)

