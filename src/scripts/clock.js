import { DateTime } from 'luxon'

class Clock {
  constructor(target, dateTime, digiTime, hour, min, sec) {
    this.target = document.querySelector(target)
    this.dateTime = dateTime
    this.digiTime = digiTime
    this.hour = hour
    this.min = min
    this.sec = sec
  }

  digiTime() {
    function zerofiy(num) {
      return (num < 10 ? '0' : '') + num
    }
    this.digiTime = `${zerofiy(this.hour)}:${zerofiy(this.min)}:${zerofiy(this.sec)}`
  }

  updateTime() {
    setInterval(() => {
      this.dateTime = DateTime.local()
      this.hour = this.dateTime.c.hour % 12
      this.min = this.dateTime.c.minute
      this.sec = this.dateTime.c.second
      this.digiTime()
    }, 1000)
  }
}

export default class Analogue extends Clock {
  constructor(target, digiTime, hour, min, sec, digiClock, curDegrees) {
    super(target, digiTime, hour, min, sec)
    this.curDegrees = curDegrees
    this.digiClock = digiClock
  }

  createClock() {
    // Create a blank div element
    const div = document.createElement('div')

    // Add class to it.
    div.className = 'clock-container'

    // Create the clock html structure
    div.innerHTML = `
    <h2 class="clock-title">LONDON - GMT</h2>
    <div class="clock">
      <div class="clock__face">
        <div class="clock__hands clock__hands--start">
          <div class="clock__hand clock__hand-hours" data-hrs-hand></div>
          <div class="clock__hand clock__hand-mins" data-mins-hand></div>
          <div class="clock__hand clock__hand-secs" data-secs-hand></div>
        </div>
        <div class="clock__center-buble"></div>
        <span class="clock__digi" data-clock-digi>00:00:00</span>
      </div>
    </div>
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

  intilize() {
    this.createClock()
    this.setTime()
    //
    setInterval(() => {}, 1000)
  }
}
