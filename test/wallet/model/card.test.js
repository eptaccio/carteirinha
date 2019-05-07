const mockdate = require('mockdate')

const {
  getBestCard,
  getBestCards
} = require('../../../src/wallet/model/card')

test('should return the best card with same maturityDay', () => {
  mockdate.set('10/10/2019')

  const cards = [{ maturityDay: 10, availableLimit: 1 }, { maturityDay: 10, availableLimit: 10 }]
  expect(getBestCard({ cards })).toEqual({ maturityDay: 10, availableLimit: 1, daysToMaturity: 0 })

  mockdate.reset()
})

test('should return the best card with diferent maturityDay', () => {
  mockdate.set('10/10/2019')

  const cards = [{
    maturityDay: 12,
    availableLimit: 100
  },
  {
    maturityDay: 10,
    availableLimit: 10
  }]

  expect(getBestCard({ cards }))
    .toEqual({ maturityDay: 12, availableLimit: 100, daysToMaturity: 2 })

  mockdate.reset()
})

test('should return the best card with same maturityDay', () => {
  mockdate.set('10/10/2019')

  const cards = [{
    maturityDay: 12,
    availableLimit: 100
  },
  {
    maturityDay: 12,
    availableLimit: 120
  }]

  expect(getBestCard({ cards }))
    .toEqual({ maturityDay: 12, availableLimit: 100, daysToMaturity: 2 })

  mockdate.reset()
})

test('should be return the lower available credit of the last maturity days', () => {
  mockdate.set('10/10/2019')

  const cards = [
    { _id: 1, availableLimit: 110, maturityDay: 10 },
    { _id: 2, availableLimit: 110, maturityDay: 11 },
    { _id: 3, availableLimit: 130, maturityDay: 12 },
    { _id: 4, availableLimit: 120, maturityDay: 12 }
  ]

  expect(getBestCards({ cards, shopValue: 120 }))
    .toEqual([{ _id: 4, availableLimit: 120, maturityDay: 12, daysToMaturity: 2 }])

  mockdate.reset()
})
