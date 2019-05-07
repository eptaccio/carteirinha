
const express = require('express')

const bodyParser = require('body-parser')
const helmet = require('helmet')

const app = express()

const { logger, db } = require('./lib')
const { config } = require('./config')

const { userRoutes } = require('./src/user/routes')
const { walletRoutes } = require('./src/wallet/routes')

db.connect()

app.use(bodyParser.json())
app.use(helmet())

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
  next(err)
})

app.use('/user', userRoutes)
app.use('/wallet', walletRoutes)

app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.listen(config.APP_PORT, function () {
  logger.info(`running on ${config.APP_PORT}`)
})
