import './styles/style.scss'
import Clock from './scripts/clock'
import MobMenuBtn from './scripts/mobMenuBtn'

new Clock('[data-clock]').onLoad('Europe/London')
new Clock('[data-clock]').onLoad('Europe/Madrid')
new Clock('[data-clock]').onLoad('Europe/Sofia')

new MobMenuBtn('[data-mob-menu]').onLoad()