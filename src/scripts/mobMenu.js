export default class MobMenu {
  constructor(_taget) {
    this.target = document.querySelector(_taget)
  }

  onLoad() {
    const menuBtn = this.target

    document.body.addEventListener('mobMenuOpen', () => {
      menuBtn.style.backgroundColor = 'red'
    })

    document.body.addEventListener('mobMenuClose', () => {
      menuBtn.style.backgroundColor = 'blue'
    })
  }
}