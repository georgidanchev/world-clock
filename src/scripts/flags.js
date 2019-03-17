const moment = require('moment-timezone')
const json = require('../assets/countries.json')

// export default class Flags {
//   constructor(_name) {
//     this.name = _name
//     this.flags = json
//   }

//   nameRes() {
//     const currentValues = this.flags
//     let targetCode
//     Object.keys(currentValues).forEach((key) => {
//       if (currentValues[key] === this.name) {
//         // console.log(`MATCH!!! ${key}`)
//         targetCode = key
//         return true
//       }
//       return false
//     })

//     return targetCode
//   }
// }

export default function nameRes(target) {
  const currentValues = json
  let targetCode
  Object.keys(currentValues).forEach((key) => {
    if (currentValues[key] === target) {
      // console.log(`MATCH!!! ${key}`)
      targetCode = key
      return true
    }
    return false
  })
//  console.log(`yayy${  targetCode}`)


const timeZones = moment.tz.names()
const offsetTmz = []

for (const i in timeZones) {
    offsetTmz.push(`${timeZones[i]}`)
}

console.log(offsetTmz)

  return targetCode
}