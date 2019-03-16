export default class MobMenuBtn {
  constructor(_target) {
    this.target = document.querySelector(_target)
  }

  onLoad() {
    // This target ref gets lost
    // in named functions.
    const mobMenuBtn = this.target

    // Set button state to open.
    function menuBtnOpen() {
      mobMenuBtn.classList.add('active')
      mobMenuBtn.dataset.active = 'true'
      document.body.dispatchEvent(new CustomEvent('mobMenuOpen', {}))
    }

    // Set button state to closed.
    function menuBtnClose() {
      if (mobMenuBtn.dataset.active === 'true') {
        mobMenuBtn.classList.remove('active')
        mobMenuBtn.dataset.active = 'false'
        document.body.dispatchEvent(new CustomEvent('mobMenuClose', {}))
      }
    }

    // When you click menu button.
    mobMenuBtn.addEventListener('click', () => {
      if (mobMenuBtn.dataset.active === 'true') {
        menuBtnClose()
      } else {
        menuBtnOpen()
      }
    })

    // Custom Events for global event handling.
    document.body.addEventListener('mobBtnClose', menuBtnClose())
  }
}