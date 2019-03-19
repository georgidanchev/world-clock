import Clock from './clock'

export default class Manager {
  constructor() {
    this.body = document.body
    this.timeZones = []
  }

  saveData(data) {
    this.timeZones.push(data)
    localStorage.setItem('timeZones',
    JSON.stringify(this.timeZones))
  }

  loadData() {
    if (localStorage.getItem('timeZones') != null) {
      this.timeZones = JSON.parse(localStorage.getItem('timeZones'))
    }
  }

  onLoad() {
    this.loadData()

    function addClock(data) {
      new Clock('[data-clock]').onLoad(data)
    }

    if (this.timeZones.length > 0) {
      this.timeZones.forEach((e) => {
        addClock(e)
      })
    }

    this.body.addEventListener('addNewClock', (e) => {
      this.saveData(e.detail.string)
      addClock(e.detail.string)
    })
  }
}