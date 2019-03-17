const json = require('../assets/countries.json')

export default function nameRes(target) {
  const currentValues = json
  let targetCode

  console.log(target)
  Object.keys(currentValues).forEach((key) => {
    if (currentValues[key] === target) {
      // console.log(`MATCH!!! ${key}`)
      targetCode = key
      return true
    }
    return false
  })
  return targetCode
}