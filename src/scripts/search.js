const json = require('../assets/timezones.json')

export default class Search {
  constructor(_target) {
    this.target = document.querySelector(_target)
    this.input = this.target.querySelector('[data-input]')
    this.output = this.target.querySelector('[data-output]')
    this.cities = []
  }

  findMatches(wordToMatch) {
    // Filter the array based on an input.
    return this.cities.filter((city) => {
      // Match with ragex.
      const regex = new RegExp(wordToMatch, 'gi')
      // Return the match.
      return city.match(regex)
    })
  }

  showMatches(value) {
    // Array which stores city matches.
    const matchArray = this.findMatches(value, this.cities)

    // Go over the matches array.
    const html = matchArray.map((place) => {
      // Split at '/' and keep the second part,
      // then replace up to two underscores.
      const newString = String(place.split('/')[1]).replace('_', ' ').replace('_', ' ')
      // build html with template litreal.
      return `<li data-timezone="${place}">${newString}</li>`
      // replace ',' with '' (nothing).
    }).join('')

    // Inject suggestions.
    this.output.innerHTML = html
  }


  onLoad() {
    // On load push json file into array.
    this.cities.push(...json)
    // On keyup pass value to match func.
    this.input.addEventListener('keyup', () => {
      // Replace spaces with underscore as
      // the json file needs that to work.
      this.showMatches(String(this.input.value).replace(' ', '_').replace(' ', '_'))
    })

    this.output.addEventListener('click', (e) => {
     if (e.target.dataset.timezone) {
       console.log(e.target.dataset.timezone)
     }
    })
  }
 }