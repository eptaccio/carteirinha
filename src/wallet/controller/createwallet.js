const Wallet = require('../model')

const createwallet = async (req, res) => {
  const wallet = new Wallet({ user: req.user._id, cards: [] })

  await wallet.save()

  res.send({
    message: 'New Wallet created',
    data: {
      id: wallet._id
    }
  })
}

module.exports = {
  createwallet
}
