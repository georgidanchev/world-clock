import './styles/style.scss'
import Search from './scripts/search'
import Manager from './scripts/manager'

new Search('[data-search]').onLoad()
new Manager('[data-clock]').onLoad()