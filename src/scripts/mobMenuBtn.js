export default class MobMenuBtn {
  constructor(_target) {
    this.target = document.querySelector(_target)
  }

  onLoad() {
    // This target ref gets lost
    // in named functions.
    const mobMenu = this.target
    
    // Set button state to open.
    function menuOpen() {
      mobMenu.classList.add('active')
      mobMenu.dataset.active = 'true'
    }

    // Set button state to closed.
    function menuClose() {
      if (mobMenu.dataset.active === 'true') {
        mobMenu.classList.remove('active')
        mobMenu.dataset.active = 'false'
      }
    }

    // When you click menu button.
    mobMenu.addEventListener('click', () => {
      if (mobMenu.dataset.active === 'true') {
        menuClose()
      } else {
        menuOpen()
      }
    })

    // Custom Events for global event handling.
    mobMenu.addEventListener('mobMenuOpen', menuOpen())
    mobMenu.addEventListener('mobMenuClose', menuClose())
  }
}