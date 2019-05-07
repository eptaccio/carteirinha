const bcrypt = require('bcryptjs')
const { Schema, model } = require('mongoose')

const UserSchema = Schema({
  name: {
    required: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  roles: {
    required: false,
    type: [String]
  }
}, {
  timestamps: true
})

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password, 10)

  next()
})

module.exports = model('User', UserSchema)
