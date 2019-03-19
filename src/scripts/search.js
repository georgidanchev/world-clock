const json = require('../assets/timezones.json')

export default class Search {
  constructor(_target) {
    this.body = document.body
    this.target = document.querySelector(_target)
    this.input = this.target.querySelector('[data-input]')
    this.output = this.target.querySelector('[data-output]')
    this.serchBg = this.target.querySelector('[data-serchBg]')
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
      return `<li class="search-cities__results" data-result data-timezone="${place}">${newString}</li>`
      // replace ',' with '' (nothing).
    }).join('')

    // Inject suggestions.
    this.output.innerHTML = html
  }


  onLoad() {
    const [body, input, output, serchBg] = [this.body, this.input, this.output, this.serchBg]

    function addNewClock(data) {
      body.dispatchEvent(new CustomEvent('addNewClock', {
        detail: {
          string: data,
        },
      }))
    }

    function resetInput(time) {
      setTimeout(() => {
        input.classList.remove('active')
        output.classList.remove('active')
        serchBg.classList.remove('active')
        output.innerHTML = ''
        input.value = ''
      }, time)
    }

    // On load push json file into array.
    this.cities.push(...json)
    // On keyup pass value to match func.
    input.addEventListener('keyup', (e) => {
      // Replace spaces with underscore as
      // the json file needs that to work.
      this.showMatches(String(input.value).replace(' ', '_').replace(' ', '_'))
      e.target.classList.add('active')
    })

    input.onkeypress = (e) => {
      // If we press enter in the input field
        const key = e.charCode || e.keyCode || 0
        if (key === 13) {
        e.preventDefault()
        if (output.childElementCount === 1) {
          addNewClock(output.firstChild.dataset.timezone)
          output.firstChild.classList.add('active')
          resetInput(500)
        }
      }
    }

    input.addEventListener('click', () => {
      serchBg.classList.add('active')
    })

    output.addEventListener('click', (e) => {
      if (e.target.dataset.timezone) {
        addNewClock(e.target.dataset.timezone)
        e.target.classList.add('active')
        resetInput(500)
      }
    })

    serchBg.addEventListener('click', (e) => {
      if (e.target === serchBg) {
        resetInput()
      }
    })
  }
 }