export default class MobMenu {
  constructor(_taget) {
    this.target = document.querySelector(_taget)
  }

  onLoad() {
    const menuBtn = this.target

    document.body.addEventListener('mobMenuOpen', () => {
      menuBtn.classList.add('active')
    })

    document.body.addEventListener('mobMenuClose', () => {
      menuBtn.classList.remove('active')
    })
  }
}