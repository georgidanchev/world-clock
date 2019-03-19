import { DateTime } from 'luxon'
import Clock from './clock'

export default class Manager {
  constructor(_target) {
    this.body = document.body
    this.timezones = []
    this.clockTraget = _target
  }

  saveData(allData, data) {
    if (allData === true) {
      localStorage.setItem('timezones',
      JSON.stringify(this.timezones))
    } else {
      this.timezones.push(data)
      localStorage.setItem('timezones',
      JSON.stringify(this.timezones))
    }
  }

  loadData() {
    if (localStorage.getItem('timezones') != null) {
      const getLocalData = JSON.parse(localStorage.getItem('timezones'))
      this.timezones = [...getLocalData]
    } else {
      this.saveData(false, DateTime.local().zoneName)
    }
  }

  initAllClocks() {
    this.loadData()
    document.querySelector(this.clockTraget).innerHTML = ''

    if (this.timezones.length > 0) {
      this.timezones.forEach((e) => {
         new Clock(this.clockTraget).onLoad(e)
      })
    }
  }

  moveArryEntry(data, forward) {
    const timezones = [...this.timezones]
    const index = timezones.indexOf(data)

    if (forward === true) {
      let temp = timezones[index + 1]
      if (temp != null) {
        timezones[index + 1] = timezones[index]
        timezones[index] = temp
      } else {
        [temp] = [timezones[0]]
        timezones[0] = timezones[index]
        timezones[index] = temp
      }
    } else {
      let temp = timezones[index - 1]
      if (temp != null) {
        timezones[index - 1] = timezones[index]
        timezones[index] = temp
      } else {
        [temp] = [timezones[timezones.length - 1]]
        console.log(temp)
        timezones[timezones.length - 1] = timezones[index]
        timezones[index] = temp
      }
    }
    this.timezones = [...timezones]
    this.saveData(true)
    this.initAllClocks()
  }

  removeClock(data) {
    const newArry = this.timezones.filter(item => item !== data)
    localStorage.setItem('timezones',
    JSON.stringify(newArry))
    this.initAllClocks()
  }

  onLoad() {
    const [clockTraget] = [this.clockTraget]

    this.initAllClocks()

    function addClock(data) {
      new Clock(clockTraget).onLoad(data)
    }

    this.body.addEventListener('addNewClock', (e) => {
      this.saveData(false, e.detail.string)
      addClock(e.detail.string)
    })

    this.body.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-removezone')) {
        this.removeClock(e.target.dataset.removezone)
      }

      if (e.target.hasAttribute('data-moveleft')) {
        this.moveArryEntry(e.target.dataset.moveleft, false)
      }

      if (e.target.hasAttribute('data-moveright')) {
        this.moveArryEntry(e.target.dataset.moveright, true)
      }
    })
  }
}