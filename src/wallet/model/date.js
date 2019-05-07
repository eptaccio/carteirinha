const moment = require('moment')

const getNow = () =>
  moment().utc().startOf('date')

const getCardsByMaturityDay = ({ cards, maturityDay }) =>
  cards.filter(card => card.maturityDay === maturityDay)

const isMultipleCardsInDate = ({ maturityDay, cards }) => {
  const cardsWithCurrentMaturityDay = getCardsByMaturityDay({ cards, maturityDay })
  return cardsWithCurrentMaturityDay.length > 1
}

const getDaysToMaturity = ({ maturityDay, today = getNow() }) => {
  const maturityDate = getNow().date(maturityDay)

  if (today.isAfter(maturityDate)) {
    maturityDate.add(1, 'month')
  }

  return maturityDate.diff(today, 'days')
}

const getMaxMaturityDate = ({ cards }) =>
  cards.reduce((card, currentCard) => {
    return (card.daysToMaturity > currentCard.daysToMaturity) ? card : currentCard
  })

module.exports = {
  getCardsByMaturityDay,
  getDaysToMaturity,
  getMaxMaturityDate,
  isMultipleCardsInDate
}
