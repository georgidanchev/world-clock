import Clock from './clock'

export default class Manager {
  constructor() {
    this.body = document.body
    this.timezones = []
  }

  saveData(data) {
    this.timezones.push(data)
    localStorage.setItem('timezones',
    JSON.stringify(this.timezones))
  }

  loadData() {
    if (localStorage.getItem('timezones') != null) {
      const getLocalData = JSON.parse(localStorage.getItem('timezones'))
      this.timezones = [...getLocalData]
    } else {
      this.saveData('start')
    }
  }

  removeClock(data) {
    const newArry = this.timezones.filter(item => item !== data)
    localStorage.setItem('timezones',
    JSON.stringify(newArry))
    console.log(this.timezones)
  }


  onLoad() {
    this.loadData()

    function addClock(data) {
      new Clock('[data-clock]').onLoad(data)
    }

    if (this.timezones.length > 0) {
      this.timezones.forEach((e) => {
        addClock(e)
      })
    }

    this.body.addEventListener('addNewClock', (e) => {
      this.saveData(e.detail.string)
      addClock(e.detail.string)
    })

    this.body.addEventListener('click', (e) => {
      if (e.target.hasAttribute('data-removezone')) {
        this.removeClock(e.target.dataset.removezone)
        const parent = e.target.parentNode.parentNode.parentNode
        const target = e.target.parentNode.parentNode
        parent.removeChild(target)
      }
      
      if (e.target.hasAttribute('data-moveleft')) {
        console.log('moveleft')
      }

      if (e.target.hasAttribute('data-moveright')) {
        console.log('moveright')
      }
    })
  }
}