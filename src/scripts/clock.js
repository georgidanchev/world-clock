export default class Clock {
  constructor(target, timeNow, seconds, hour, mins) {
    this.target = document.querySelector(`${target}`)
    this.timeNow = timeNow
    this.seconds = seconds
    this.hour = hour
    this.mins = mins
  }

  createClock() {
    // Create a blank div element
    const div = document.createElement('div')

    // Create the clock html structure
    div.innerHTML = `
    <div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>
    `

    // Get references for the clock hands
    this.hour = div.querySelector('.min-hand')
    this.mins = div.querySelector('.hour-hand')
    this.seconds = div.querySelector('.second-hand')

    // Append the clock
    this.target.appendChild(div)
  }

  setTime() {
    // Get time varaibles.
    const seconds = this.timeNow.getSeconds()
    const mins = this.timeNow.getMinutes()
    const hour = this.timeNow.getMinutes()

    // Convert seconds to degrees.
    const secondsDegrees = ((seconds / 60) * 360)
    const minsDegrees = (((mins / 60) * 360) + 90)
    const hourDegrees = (((hour / 12) * 360) + 90)

    // Set the degree to the clock hand.
    this.seconds.style.transform = `rotate(${secondsDegrees}deg)`
    this.hour.style.transform = `rotate(${minsDegrees}deg)`
    this.mins.style.transform = `rotate(${hourDegrees}deg)`
  }

  intilize() {
    // Create and inject the clock html.
    this.createClock()
    // Set interval update method.
    setInterval(() => {
      // Get current time
      this.timeNow = new Date()
      // Set the current time
      this.setTime()
      // Update every second.
    }, 1000)
  }
}