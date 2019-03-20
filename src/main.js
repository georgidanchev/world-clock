import './styles/style.scss'
import Search from './scripts/search'
import Manager from './scripts/manager'

// Instantiate components with data atributes
// as targets and call onLoad method.
new Search('[data-search]').onLoad()
new Manager('[data-clock]').onLoad()