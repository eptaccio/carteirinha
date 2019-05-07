const { logger } = require('./logger')
const { db } = require('./db')
const { AUTH_ROLES } = require('./authRoles')

module.exports = {
  logger,
  db,
  AUTH_ROLES
}
