const debounce = require('p-debounce')
const { memoize } = require('cerebro-tools')
const icon = require('./assets/choco-logo.svg')
const config = require('./config')
const search = require('./choco-search')
const install = require('./choco-install')

const searchPackages = debounce(memoize(search, config.memoization), config.debounce)

const queryFromTerm = term => {
	const match = term.match(/^choco (.+)$/)
	return match ? match[1].trim() : null
}

const displayResult = (display, { name, version, title, description }) => {
	display({
		icon,
		id: `choco-${name}`,
		term: name,
		title: `${title} (${version})`,
		subtitle: description,
		clipboard: `choco install ${name} -yv`,
		onSelect: () => install(name)
	})
}

const fn = ({ term, display, hide }) => {
	const query = queryFromTerm(term)
	if (!query) {
		return null
	}

	display({ icon, id: 'choco-loading', title: 'Searching Chocolatey packages ...' })

	return searchPackages(query)
		.then(results => {
			hide('choco-loading')

			results.forEach(result => displayResult(display, result))
		})
}

module.exports = {
	icon,
	fn,
	keyword: config.plugin.keyword,
	name: 'Install packages with Chocolatey'
}
