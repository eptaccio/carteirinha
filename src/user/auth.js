const { config } = require('../../config')
const User = require('./model')
const jwt = require('jsonwebtoken')

const containsNecessaryRoles = ({ userRoles, necessaryRoles }) =>
  necessaryRoles.every(role => userRoles.includes(role))

const auth = ({ necessaryRoles = [] } = {}) => {
  return async (req, res, next) => {
    const token = req.headers['x-api-key']

    try {
      const userInfo = jwt.verify(token, config.APP_SECRET)
      if (!userInfo) {
        throw new Error('Invalid api-key')
      }

      const user = await User.findById(userInfo.id)
      req.user = user

      if (!user) {
        throw new Error('User not found')
      }

      if (!necessaryRoles.length) {
        return next()
      }

      if (!containsNecessaryRoles({ userRoles: user.roles, necessaryRoles })) {
        throw new Error('Invalid roles')
      }

      next()
    } catch (error) {
      return res
        .status(400)
        .send({ error, message: error.message || 'Authentication failure' })
    }
  }
}

module.exports = {
  auth
}
