export default class Clock {
  constructor(target, timeNow, digTime, seconds, hour, mins) {
    this.target = document.querySelector(`${target}`)
    this.timeNow = timeNow
    this.digiTime = digTime
    this.hour = hour
    this.mins = mins
    this.seconds = seconds
  }

  createClock() {
    // Create a blank div element
    const div = document.createElement('div')
    div.className = 'clock'

    // Create the clock html structure
    div.innerHTML = `
    <div class="clock__face">
      <div class="clock__hands">
        <div class="clock__hand clock__hand-hours" data-hrs-hand></div>
        <div class="clock__hand clock__hand-mins" data-mins-hand></div>
        <div class="clock__hand clock__hand-secs" data-secs-hand></div>
      </div>
      <div class="clock__center-buble"></div>
      <span class="clock__digi" data-clock-digi></span>
    </div>`

    // Get references for the clock hands
    this.hour = div.querySelector('[data-hrs-hand]')
    this.mins = div.querySelector('[data-mins-hand]')
    this.seconds = div.querySelector('[data-secs-hand]')
    this.digiTime = div.querySelector('[data-clock-digi]')
    this.digiTime.innerText = '00:00:00'
    // Append the clock
    this.target.appendChild(div)
  }

  setTime() {
    const curTime = {
      hrs: this.timeNow.getHours(),
      mins: this.timeNow.getMinutes(),
      secs: this.timeNow.getSeconds(),
    }

    const curDegrees = {
      hrs: ((curTime.hrs / 12) * 360),
      mins: ((curTime.mins / 60) * 360),
      secs: ((curTime.secs / 60) * 360),
    }

    function format12(hour) {
      return hour > 12 ? hour - 12 : hour
    }

    function zerofiy(num) {
      return (num < 10 ? '0' : '') + num
    }

     console.info(`${format12(curTime.hrs)}:${zerofiy(curTime.mins)}:${zerofiy(curTime.secs)}`)


    // // Set the degree to the clock hand.
    this.hour.style.transform = `rotate(${curDegrees.hrs}deg)`
    this.mins.style.transform = `rotate(${curDegrees.mins}deg)`
    this.seconds.style.transform = `rotate(${curDegrees.secs}deg)`
    this.digiTime.innerText = `${zerofiy(format12(curTime.hrs))}:${zerofiy(curTime.mins)}:${zerofiy(curTime.secs)}`
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