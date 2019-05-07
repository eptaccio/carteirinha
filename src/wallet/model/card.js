const {
  getMaxMaturityDate,
  getDaysToMaturity,
  getCardsByMaturityDay,
  isMultipleCardsInDate
} = require('./date')

const {
  isSuficientCredit,
  getLowerLimit,
  calcAvailableLimit
} = require('./limit')

const isSelectedCard = ({ selectedCards, card }) =>
  selectedCards.some(selectedCard => selectedCard._id === card._id)

const getBestCard = ({ cards }) => {
  const cardsWithDatesToMaturity = cards.map(card => ({
    ...card,
    daysToMaturity: getDaysToMaturity({ maturityDay: card.maturityDay })
  }))

  const lastMaturityCard = getMaxMaturityDate({ cards: cardsWithDatesToMaturity })

  if (isMultipleCardsInDate({ cards, maturityDay: lastMaturityCard.maturityDay })) {
    const cardsWithMaxMaturityDay = getCardsByMaturityDay({
      cards: cardsWithDatesToMaturity,
      maturityDay: lastMaturityCard.maturityDay
    })

    return getLowerLimit({ cards: cardsWithMaxMaturityDay })
  }

  return lastMaturityCard
}

const getBestCards = ({ cards, selectedCards = [], shopValue }) => {
  if (!cards.length) {
    return selectedCards.reverse()
  }

  const bestCard = getBestCard({ cards })
  const currentSelectedCards = [bestCard, ...selectedCards]

  const availableCredit = calcAvailableLimit({ cards: currentSelectedCards })
  if (isSuficientCredit({ value: shopValue, availableCredit })) {
    return currentSelectedCards.reverse()
  }

  const avaibleCards = cards.filter(
    card => !isSelectedCard({ selectedCards: currentSelectedCards, card })
  )

  return getBestCards({
    cards: avaibleCards,
    selectedCards: currentSelectedCards,
    shopValue
  })
}

module.exports = {
  getBestCard,
  getBestCards
}
