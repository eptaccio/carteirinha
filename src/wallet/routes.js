const { Router } = require('express')
const { auth } = require('../user/auth')
const { AUTH_ROLES } = require('../../lib/authRoles')

const {
  createCard,
  createwallet,
  findCards,
  findWallet,
  findWallets,
  removeWallet,
  shop
} = require('./controller')

const walletRoutes = Router()

walletRoutes.post('/', auth(), createwallet)
walletRoutes.get('/:id', auth(), findWallet)
walletRoutes.get('/', auth({ necessaryRoles: [AUTH_ROLES.ADMIN] }), findWallets)
walletRoutes.delete('/:id', auth({ necessaryRoles: [AUTH_ROLES.ADMIN] }), removeWallet)

walletRoutes.post('/:id/card', auth(), createCard)
walletRoutes.get('/:id/card', auth(), findCards)

walletRoutes.post('/:id/shop', auth(), shop)
walletRoutes.post('/:id/resume', createwallet)

module.exports = {
  walletRoutes
}
