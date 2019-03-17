import './styles/style.scss'
import Clock from './scripts/clock'
import MobMenuBtn from './scripts/mobMenuBtn'
import MobMenu from './scripts/mobMenu'
import Search from './scripts/search'

new Clock('[data-clock]').onLoad('Europe/London')
new Clock('[data-clock]').onLoad('Europe/Madrid')
new Clock('[data-clock]').onLoad('Asia/Hong_Kong')


new MobMenu('[data-mob-menu]').onLoad()
new MobMenuBtn('[data-mob-btn]').onLoad()
new Search('[data-search]').onLoad()