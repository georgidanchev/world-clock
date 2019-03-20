// Clock module. Uses luxon package.
import { DateTime } from 'luxon'

export default class Clock {
  constructor(_target) {
    this.target = document.querySelector(_target)
    this.dateTime = DateTime.local()
    this.timeZone = 'Europe/London'
    this.curDegrees = 0
    this.digiClock = 0
    this.digiTime = 0
    this.hour = 0
    this.min = 0
    this.sec = 0
  }

  createClock() {
    // Create a blank div element
    const div = document.createElement('div')

    // Add class to it.
    div.className = 'clock'

    // Clock title
    let cityName = this.timeZone
    // if clock title contains '/' it means
    // it has to be split. also replace '_'
    // with spaces for proper formating.
    if (cityName.includes('/')) {
      cityName = cityName.split('/')[1].replace('_', ' ').replace('_', ' ')
    }

    // Create the clock html structure.
    div.innerHTML = `
    <div class="clock-controls">
      <div class="clock-controls__wrap">
        <!-- arrow left SVG icon -->
        <svg class="clock-controls__icon" data-moveleft="${this.timeZone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-cheveron-left-circle"><circle cx="12" cy="12" r="10" fill="#64D5CA" class="primary"/><path fill="#20504F" class="secondary" d="M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z"/></svg>
        <!-- arrow right SVG icon -->
        <svg class="clock-controls__icon" data-moveright="${this.timeZone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-cheveron-right-circle"><circle cx="12" cy="12" r="10" class="primary"/><path class="secondary" d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"/></svg>
      </div>
      <!-- remove icon SVG icon-->
      <svg class="clock-controls__icon" data-removezone="${this.timeZone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-close-circle"><circle cx="12" cy="12" r="10" class="primary"/><path class="secondary" d="M13.41 12l2.83 2.83a1 1 0 0 1-1.41 1.41L12 13.41l-2.83 2.83a1 1 0 1 1-1.41-1.41L10.59 12 7.76 9.17a1 1 0 0 1 1.41-1.41L12 10.59l2.83-2.83a1 1 0 0 1 1.41 1.41L13.41 12z"/></svg>
    </div>
    <div class="clock__wrap">
      <div class="clock__face">
        <div class="clock__hands">
          <div class="clock__hand clock__hand-hours" data-hrs-hand></div>
          <div class="clock__hand clock__hand-mins" data-mins-hand></div>
          <div class="clock__hand clock__hand-secs" data-secs-hand></div>
        </div>
        <div class="clock__center-buble"></div>
        <span class="clock__digi" data-clock-digi>00:00:00</span>
      </div>
    </div>
    <h2 class="clock__title">${cityName}</h2>
    `

    // Get references for the clock hands and digi-clock
    this.handHrs = div.querySelector('[data-hrs-hand]')
    this.handMins = div.querySelector('[data-mins-hand]')
    this.handSecs = div.querySelector('[data-secs-hand]')
    this.digiClock = div.querySelector('[data-clock-digi]')

    // Append the clock to the page.
    this.target.appendChild(div)
  }

  setTime() {
    // Conver time to degrees.
    this.curDegrees = {
      // There are 30 degrees in each hour, also
      // 6 degree for each minute and second.
      // Modulo gives us the reminder of 12,
      // as the hour we get is 24 hour fromat.
      hrs: 30 * (this.hour % 12),
      mins: 6 * this.min,
      secs: 6 * this.sec,
    }

    // Set analogue clock hands.
    this.handHrs.style.transform = `rotate(${this.curDegrees.hrs}deg)`
    this.handMins.style.transform = `rotate(${this.curDegrees.mins}deg)`
    this.handSecs.style.transform = `rotate(${this.curDegrees.secs}deg)`

    // Set the digital clock.
    this.digiClock.innerText = `${this.digiTime}`
  }

  updateTime() {
    // This is called every second.

    function zerofiy(num) {
      // If less then 10 add 0 in front of
      // the number, for nice formatting.
      return (num < 10 ? '0' : '') + num
    }

    // Get the current time.
    this.dateTime = DateTime.local().setZone(this.timeZone)
    // Set the current time.
    this.hour = this.dateTime.hour
    this.min = this.dateTime.minute
    this.sec = this.dateTime.second
    // Pre-process the digi-time string.
    this.digiTime = `${this.dateTime.weekdayShort.toUpperCase()} ${zerofiy(this.hour)}:${zerofiy(this.min)}`
    // set the time.
    this.setTime()
  }

  onLoad(_timeZone) {
    // Set current timezone.
    this.timeZone = _timeZone
    // Create clock html.
    this.createClock()
    // Update the clock.
    this.updateTime()

    // Update the clock very second. This method
    // is alright for a clock, but not for a timer
    // as the 'setInterval' method can sometimes be
    // temporary forced to stop by the browser.
    // e.g. safari on scroll.
    setInterval(() => {
      this.updateTime()
    }, 1000)
  }
}
