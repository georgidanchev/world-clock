import { DateTime } from 'luxon'
import Flags from './flags'

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

    const cityName = this.timeZone.split('/')[1].replace('_', ' ').replace('_', ' ')

    // Create the clock html structure.
    div.innerHTML = `
    <div class="clock-controls">
      <div class="clock-controls__wrap">
        <!-- arrow left -->
        <svg class="clock-controls__icon" data-moveleft="${this.timeZone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-cheveron-left-circle"><circle cx="12" cy="12" r="10" fill="#64D5CA" class="primary"/><path fill="#20504F" class="secondary" d="M13.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L10.42 12l3.3 3.3z"/></svg>
        <!-- arrow right -->
        <svg class="clock-controls__icon" data-moveright="${this.timeZone}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon-cheveron-right-circle"><circle cx="12" cy="12" r="10" class="primary"/><path class="secondary" d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"/></svg>
      </div>
      <!-- remove icon -->
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
    <h2 class="clock__title"><img class="clock__title-img" src="/src/assets/flags/${Flags(cityName)}.png" alt=""> ${cityName}</h2>
    `

    // Get references for the clock hands
    this.handHrs = div.querySelector('[data-hrs-hand]')
    this.handMins = div.querySelector('[data-mins-hand]')
    this.handSecs = div.querySelector('[data-secs-hand]')
    this.digiClock = div.querySelector('[data-clock-digi]')

    // Append the clock
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
    function zerofiy(num) {
      return (num < 10 ? '0' : '') + num
    }

    this.dateTime = DateTime.local().setZone(this.timeZone)
    this.hour = this.dateTime.hour
    this.min = this.dateTime.minute
    this.sec = this.dateTime.second
    this.digiTime = `${this.dateTime.weekdayShort.toUpperCase()} ${zerofiy(this.hour)}:${zerofiy(this.min)}`
    this.setTime()
  }

  onLoad(_timeZone) {
    this.timeZone = _timeZone
    

    this.createClock()
    this.updateTime()

    setInterval(() => {
      this.updateTime()
    }, 1000)
  }
}
