const { Router } = require('express')
const { create, auth } = require('./controller')

const userRoutes = Router()

userRoutes.post('/', create)
userRoutes.post('/auth', auth)

module.exports = {
  userRoutes
}
