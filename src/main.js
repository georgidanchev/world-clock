import './styles/style.scss'
import Clock from './scripts/clock'
import Search from './scripts/search'

new Clock('[data-clock]').onLoad('Europe/London')
new Clock('[data-clock]').onLoad('Europe/Madrid')
new Clock('[data-clock]').onLoad('Asia/Hong_Kong')

new Search('[data-search]').onLoad()