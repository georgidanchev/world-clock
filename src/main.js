import './styles/style.scss'
import Clock from './scripts/clock'
import MobMenuBtn from './scripts/mobMenuBtn'
import MobMenu from './scripts/mobMenu'

import TimeZones from './scripts/timeZones'

new Clock('[data-clock]').onLoad('Europe/London')
new Clock('[data-clock]').onLoad('Europe/Madrid')
new Clock('[data-clock]').onLoad('Europe/Sofia')


const time = TimeZones()

new MobMenu('[data-mob-menu]').onLoad()
new MobMenuBtn('[data-mob-btn]').onLoad()