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
      const newString = String(place).replace('_', ' ').replace('_', ' ')
      // build html with template litreal.

      // To highlight the string we have typed
      // in the input box, we use ragex.
      const regex = new RegExp(value, 'gi')

      // We replace part of the result with our regax.
      const highLight = newString.replace(regex, `<span class="highlight">${value}</span>`)

      // We return result HTML and pass it the highlighting aswell.
      return `<li class="search-cities__results" data-result data-timezone="${place}">${highLight}</li>`

      // replace ',' with '' (nothing).
    }).join('')

    // Inject suggestions.
    this.output.innerHTML = html
  }

  onLoad() {
    // There are issues when we use 'this.something'
    // in these named function as 'this' references the
    // onload method, which is not our data. So we use
    // to overcome this, we destructure our variables.

    const [body, input, output, serchBg] = [this.body, this.input, this.output, this.serchBg]

    // For span click prevention.
    let clickStop = false

    // We have few named function as their
    // functionality is used multiple times.
    function addNewClock(data) {
      // add clock sends custom event with the timezone.
      body.dispatchEvent(new CustomEvent('addNewClock', {
        detail: {
          string: data,
        },
      }))
    }

    function resetInput(time) {
      // Once we have added the clock we
      // want to reset everything back.
      // This does just that, also gives
      // the ability to add a small delay.
      setTimeout(() => {
        input.classList.remove('active')
        output.classList.remove('active')
        serchBg.classList.remove('active')
        output.innerHTML = ''
        input.value = ''
        clickStop = false
      }, time)
    }

    // On load, push json file which contains all
    // timezones into the global array array.
    this.cities.push(...json)

    // On keyup, pass the input value to the match func.
    input.addEventListener('keyup', (e) => {
      // Replace spaces with underscore as
      // the json file needs that to work.
      this.showMatches(String(input.value).replace(' ', '_').replace(' ', '_'))

      // Add active class to the input
      // for the rounded corners to be
      // removed from to bottom sides.
      e.target.classList.add('active')
    })

    // On keypress in the input field.
    input.onkeypress = (e) => {
      if (clickStop === true) return
      const key = e.charCode || e.keyCode || 0
      // If we press enter in the input field
        if (key === 13) {
        // Stop the default behavior (page refresh,
        // as we aren't posting or getting anything).
        e.preventDefault()

        // If we have only 1 result, mark that entry
        // as active to add blue background and pass
        // its dataset entry for our new clock.
        if (output.childElementCount === 1 && clickStop !== true) {
          addNewClock(output.firstChild.dataset.timezone)
          output.firstChild.classList.add('active')
          // reset everything after 0.5s.
          resetInput(300)
          clickStop = true
        }
      }
    }
    // If we click on the input itself then add
    // active class to the global background.
    input.addEventListener('click', () => {
      serchBg.classList.add('active')
    })

    // If we click on one of the results and
    // it has a dataset of timezone, then pass
    // that timezone as our new clock.
    output.addEventListener('click', (e) => {
      if (e.target.dataset.timezone && clickStop !== true) {
        addNewClock(e.target.dataset.timezone)
        e.target.classList.add('active')
        // reset everything after 0.5s.
        resetInput(300)
        clickStop = true
      }
    })

    // If we click on the transparent background and only
    // the background it means we want to click away,
    // so reset everything without any delay.
    serchBg.addEventListener('click', (e) => {
      if (e.target === serchBg && clickStop !== true) {
        resetInput()
      }
    })
  }
}