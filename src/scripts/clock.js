export default class Clock {
  constructor(target, timeNow, digiTime, handHrs, handMin, handSec) {
    this.target = document.querySelector(target)
    this.timeNow = timeNow
    this.digiTime = digiTime
    this.handHrs = handHrs
    this.handMin = handMin
    this.handSec = handSec
  }

  createClock() {
    // Create a blank div element
    const div = document.createElement('div')

    // Add class to it.
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
    this.handHrs = div.querySelector('[data-hrs-hand]')
    this.handMins = div.querySelector('[data-mins-hand]')
    this.handSecs = div.querySelector('[data-secs-hand]')
    this.digiTime = div.querySelector('[data-clock-digi]')
    this.digiTime.innerText = '00:00:00'

    // Append the clock
    this.target.appendChild(div)
  }

  // playSound() {
  //   const tickAudioArray = ['./src/assets/tick_1.mp3', './src/assets/tick_2.mp3', './src/assets/tick_3.mp3', './src/assets/tick_4.mp3']
    
  //   const audio = new Audio()

  //   audio.currentTime = 0;

  //   const max = tickAudioArray.length
  //   const random = Math.floor(Math.random() * (+max - +0))

  //   // const audio = new Audio()
  //   // audio.src = tickAudioArray[0]
  //   // audio.play()
  // }

  setTime() {
    // Store time variables in object.
    const curTime = {
      hrs: this.timeNow.getHours(),
      mins: this.timeNow.getMinutes(),
      secs: this.timeNow.getSeconds(),
    }

    // Conver time to degrees.
    const curDegrees = {
      // There are 30 degrees in each hour, also
      // 6 degree for each minute and second.
      // Modulo gives us the reminder of 12,
      // as the hour we get is 24 hour fromat.
      hrs: 30 * (curTime.hrs % 12),
      mins: 6 * curTime.mins,
      secs: 6 * curTime.secs,
    }

    // If number is less the 10, add zero in front.
    function zerofiy(num) {
      return (num < 10 ? '0' : '') + num
    }

    // Set analogue clock hands.
    this.handHrs.style.transform = `rotate(${curDegrees.hrs}deg)`
    this.handMins.style.transform = `rotate(${curDegrees.mins}deg)`
    this.handSecs.style.transform = `rotate(${curDegrees.secs}deg)`

    // Set the digital clock.
    this.digiTime.innerText = `${zerofiy(curTime.hrs)}:${zerofiy(curTime.mins)}:${zerofiy(curTime.secs)}`
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