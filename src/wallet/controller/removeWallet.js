const Wallet = require('../model')

const removeWallet = async (req, res) => {
  const walletId = req.params.id

  await Wallet.findByIdAndRemove({ _id: walletId })

  res.send({
    message: 'ok'
  })
}

module.exports = {
  removeWallet
}
