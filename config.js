
require('dotenv').config()
require('express-async-errors')

const { env } = process

const config = {
  APP_PORT: env.APP_PORT || 3000,
  DB_URI: env.DB_URI,
  APP_SECRET: env.APP_SECRET || 'potato'
}

module.exports = {
  config
}
