const { Schema, model } = require('mongoose')
const { CardSchema } = require('./cardSchema')

const WalletSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cards: {
    type: [CardSchema],
    default: []
  },
  limit: Number,
  availableLimit: Number
}, {
  timestamps: true
})

module.exports = {
  WalletSchema
}
