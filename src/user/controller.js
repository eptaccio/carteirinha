const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('./model')
const { config } = require('../../config')

const create = async (req, res) => {
  const { password, username } = req.body

  const user = new User({ password, name: username })

  await user.save()

  res.send({ message: 'ok' })
}

const auth = async (req, res) => {
  const { password, username } = req.body

  const user = await User.findOne({ name: username })

  if (!user) {
    return res.status(400).send({
      message: 'User not found',
      statusCode: 402
    })
  }

  const isCorrectPassword = bcrypt.compareSync(password, user.password)
  if (!isCorrectPassword) {
    return res.status(400).send({ message: 'Invalid password' })
  }

  const token = jwt.sign({ name: user.name, id: user.id }, config.APP_SECRET)

  return res.send({
    message: 'ok',
    token
  })
}

module.exports = {
  create,
  auth
}
