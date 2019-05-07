const Wallet = require('../model')

const findCards = async (req, res) => {
  const walletId = req.params.id
  const wallet = await Wallet.findOne({ _id: walletId })

  res.send({
    message: 'ok',
    data: wallet.cards
  })
}

module.exports = {
  findCards
}
