const { model } = require('mongoose')
const { WalletSchema } = require('./schemas/walletSchema')

const {
  getBestCards
} = require('./card')

const {
  calcNewCardLimits,
  calcAvailableLimit,
  isSuficientCredit
} = require('./limit')

WalletSchema.statics = {
  ...WalletSchema.statics,
  getBestCards,
  calcAvailableLimit,
  isSuficientCredit,
  calcNewCardLimits
}

module.exports = model('Wallet', WalletSchema)
