const Wallet = require('../model')

const createCard = async (req, res) => {
  const walletId = req.params.id
  const wallet = await Wallet.findOne({ _id: walletId })

  const {
    number,
    name,
    cvv,
    expiryDate,
    creditLimit,
    maturityDay
  } = req.body

  wallet.cards.push({
    number,
    name,
    cvv,
    expiryDate,
    creditLimit,
    maturityDay,
    availableLimit: creditLimit
  })

  await wallet.save()

  res.send({
    message: 'ok',
    data: wallet
  })
}

module.exports = {
  createCard
}
