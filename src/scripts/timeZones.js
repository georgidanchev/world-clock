const moment = require('moment-timezone')

export default function allTimeZones() {
  const timeZones = moment.tz.names()
  const offsetTmz = []

  for (const i in timeZones) {
    offsetTmz.push(`${timeZones[i]}`)
  }

  const newJes = JSON.stringify(offsetTmz)

  //console.log(newJes)
}
