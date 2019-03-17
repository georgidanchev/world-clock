export default class MobMenuBtn {
  constructor(_target) {
    this.body = document.body
    this.target = document.querySelector(_target)
  }

  onLoad() {
    // 'this.target' ref gets lost.
    const [mobMenuBtn, body] = [this.target, this.body]

    // Set button state to open.
    function menuBtnOpen() {
      mobMenuBtn.classList.add('active')
      mobMenuBtn.dataset.active = 'true'
      body.dispatchEvent(new CustomEvent('mobMenuOpen', {}))
    }

    // Set button state to closed.
    function menuBtnClose() {
      if (mobMenuBtn.dataset.active === 'true') {
        mobMenuBtn.classList.remove('active')
        mobMenuBtn.dataset.active = 'false'
        body.dispatchEvent(new CustomEvent('mobMenuClose', {}))
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
    body.addEventListener('mobBtnClose', menuBtnClose())
  }
}