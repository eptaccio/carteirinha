const { Schema } = require('mongoose')

const CardSchema = Schema({
  number: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  creditLimit: {
    type: Number,
    required: true
  },
  availableLimit: {
    type: Number
  },
  maturityDay: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

module.exports = {
  CardSchema
}
