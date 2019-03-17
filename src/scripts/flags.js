const json = require('../assets/countries.json')

export default function nameRes(target) {
  const currentValues = json
  let targetCode

  Object.keys(currentValues).forEach((key) => {
    if (currentValues[key] === target) {
      // We got a match, reference the code.
      targetCode = key
      return true
    }
    return false
  })

  // Pass the code.
  return targetCode
}