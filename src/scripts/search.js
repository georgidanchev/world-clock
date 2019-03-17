const json = require('../assets/timezones.json')

export default class Search {
  constructor(_target) {
    this.body = document.body
    this.target = document.querySelector(_target)
    this.input = this.target.querySelector('[data-input]')
    this.output = this.target.querySelector('[data-output]')
    this.cities = []
  }

  findMatches(wordToMatch) {
    return this.cities.filter((city) => {
      const regex = new RegExp(wordToMatch, 'gi')
      return city.match(regex)
    })
  }

  showMatches(value) {
    const matchArray = this.findMatches(value, this.cities)

    const html = matchArray.map((place) => {
      const newPlace = String(place.split('/')[1]).replace('_', ' ')

      return `<li data-timezone="${place}">${newPlace}</li>`
    }).join('')

    this.output.innerHTML = html
  }


  onLoad() {
    this.cities.push(...json)
    // this.input.addEventListener('change', () => {
    //   this.showMatches(this.input.value)
    //   console.log('first')
    // })
    this.input.addEventListener('keyup', () => {
      this.showMatches(this.input.value)
    })
  }
 }