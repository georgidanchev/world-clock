export default class MobMenu {
  constructor(_taget) {
    this.body = document.body
    this.target = document.querySelector(_taget)
  }

  onLoad() {
    const [body, menuBtn] = [document.body, this.target]

    body.addEventListener('mobMenuOpen', () => {
      menuBtn.classList.add('active')
    })

    body.addEventListener('mobMenuClose', () => {
      menuBtn.classList.remove('active')
    })
  }
}