const isSuficientCredit = ({ value, availableCredit }) =>
  availableCredit >= value

const getLowerLimit = ({ cards }) =>
  cards.reduce((card, currentCard) => {
    return (card.availableLimit < currentCard.availableLimit) ? card : currentCard
  })

const calcNewCardLimit = ({ card, remainingShopValue }) => {
  if (remainingShopValue > card.availableLimit) {
    return {
      ...card,
      nextAvailableLimit: 0,
      remainingShopValue: remainingShopValue - card.availableLimit
    }
  }

  return {
    ...card,
    nextAvailableLimit: card.availableLimit - remainingShopValue,
    remainingShopValue: 0
  }
}

const calcNewCardLimits = ({ cards, shopValue }) => {
  let remainingShopValue = shopValue

  const result = cards.map(card => {
    const cardWithNewLimit = calcNewCardLimit({ card, remainingShopValue })
    remainingShopValue = cardWithNewLimit.remainingShopValue
    return cardWithNewLimit
  })

  return result
}

const calcAvailableLimit = ({ cards }) =>
  cards.reduce((sum, card) => {
    return sum + card.availableLimit
  }, 0)

module.exports = {
  calcAvailableLimit,
  calcNewCardLimit,
  calcNewCardLimits,
  getLowerLimit,
  isSuficientCredit
}
