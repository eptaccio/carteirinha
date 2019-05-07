const Wallet = require('../model')

const findWallets = async (req, res) => {
  const wallets = await Wallet.find({ })

  res.send({
    message: 'ok',
    data: wallets
  })
}

module.exports = {
  findWallets
}
