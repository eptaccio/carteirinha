const Wallet = require('../model')

const shop = async (req, res) => {
  const walletId = req.params.id
  const wallet = await Wallet.findOne({ _id: walletId })

  const { cards } = wallet
  const { value: shopValue } = req.body

  const bestCardsToShop = Wallet.getBestCards({
    cards: cards.toObject(),
    shopValue
  })

  const availableLimit = Wallet.calcAvailableLimit({
    cards: bestCardsToShop
  })

  if (!Wallet.isSuficientCredit({
    value: shopValue,
    availableCredit: availableLimit
  })) {
    return res.status(400).send({
      message: 'No cards available'
    })
  }

  const cardsToUpdate = Wallet.calcNewCardLimits({
    cards: bestCardsToShop,
    shopValue
  })

  await Promise.all(cardsToUpdate.map(cardToUpdate =>
    Wallet.findOneAndUpdate({
      _id: walletId,
      'cards._id': cardToUpdate._id
    },
    {
      $set: {
        'cards.$.availableLimit': cardToUpdate.nextAvailableLimit
      }
    })
  ))

  res.send({
    message: 'ok',
    data: cardsToUpdate
  })
}

module.exports = {
  shop
}
