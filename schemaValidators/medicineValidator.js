const medicineValidator = {
  name: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'name is required',
    }
  },
  price: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: "price is required",
    },
    isNumeric: {
      errorMessage: 'price must be numeric and positive number',
      options: { no_symbols: true },
    },
  },
  amount: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: "amount is required",
    },
    isNumeric: {
      errorMessage: 'amount must be numeric and positive number',
      options: { no_symbols: true },
    },
  },
  expiredDate: {
    in: ['body'],
    isDate: {
      errorMessage: 'expiredDate must be a datetime YYYY/MM/DD',
    }

  },
  unit: {
    isIn: {
      options: [['BOX', 'JAR', 'BLISTER PACKS']],
      errorMessage: 'unit must be BOX or JAR or BLISTER PACKS'
    },
  },
}

module.exports = medicineValidator
