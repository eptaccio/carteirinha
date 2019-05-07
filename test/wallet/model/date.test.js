const moment = require('moment')

const {
  getDaysToMaturity,
  getMaxMaturityDate,
  isMultipleCardsInDate
} = require('../../../src/wallet/model/date')

const fakeToday = date => moment().utc().date(date).startOf('date')

test('should calc DaysToMaturity', () => {
  expect(getDaysToMaturity({ maturityDay: 11, today: fakeToday(11) })).toBe(0)
  expect(getDaysToMaturity({ maturityDay: 11, today: fakeToday(12) })).toBe(30)
})

test('should get max maturity date card', () => {
  const cards = [{ daysToMaturity: 3 }, { daysToMaturity: 30 }, { daysToMaturity: 4 }]
  expect(getMaxMaturityDate({ cards })).toEqual({ daysToMaturity: 30 })
})

test('should calc MultipleCardsInDate', () => {
  expect(isMultipleCardsInDate({
    maturityDay: 10,
    cards: [{ maturityDay: 10 }, { maturityDay: 10 }, { maturityDay: 12 }]
  })).toBeTruthy()

  expect(isMultipleCardsInDate({
    maturityDay: 10,
    cards: [{ maturityDay: 10 }, { maturityDay: 11 }, { maturityDay: 12 }]
  })).toBeFalsy()
})
