
const {
  calcAvailableLimit,
  calcNewCardLimit,
  calcNewCardLimits,
  getLowerLimit
} = require('../../../src/wallet/model/limit')

test('should get lower limit card', () => {
  const cards = [{ availableLimit: 300 }, { availableLimit: 100 }, { avaiebleLimit: 10 }]
  expect(getLowerLimit({ cards })).toEqual({ avaiebleLimit: 10 })
})

test('should sum available credit', () => {
  const cards = [{ availableLimit: 110 }, { availableLimit: 110 }]
  expect(calcAvailableLimit({ cards })).toBe(220)
})

test('should calc new card limit', () => {
  expect(calcNewCardLimit({ card: { availableLimit: 10 }, remainingShopValue: 120 }))
    .toEqual({ availableLimit: 10, nextAvailableLimit: 0, remainingShopValue: 110 })
})

test('should calc new cards limit', () => {
  const cards = [
    { availableLimit: 10 },
    { availableLimit: 20 },
    { availableLimit: 30 }
  ]

  expect(calcNewCardLimits({ cards, shopValue: 40 }))
    .toEqual([
      { availableLimit: 10, nextAvailableLimit: 0, remainingShopValue: 30 },
      { availableLimit: 20, nextAvailableLimit: 0, remainingShopValue: 10 },
      { availableLimit: 30, nextAvailableLimit: 20, remainingShopValue: 0 }
    ])
})
