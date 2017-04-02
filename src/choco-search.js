/*
 * Searches chocolatey repo by using the `choco search` command. This isn't
 * ideal for autocomplete results, since the command isn't capable of sorting
 * by relevance.
 *
 * It's the easiest way to access the Chocolatey though, since there doesn't
 * appear to be a documented API. Finding some way to access the functionality
 * provided by the package search on the Chocolatey website would be a
 * potential improvement.
 */

const Shell = require('node-powershell')

const STRIP_QUERY_REGEX = /[^\w.]/g
const NAME_REGEX = /^([\w.]+) ([\d.]+)/
const TITLE_REGEX = /^\s+Title:\s+([^|]+?)\s\|/
const DESC_REGEX = /^\s+Description:\s+(.+)/
const SEARCH_FLAGS = '-yv --page=0 --page-size=10 --order-by-popularity'

const parseOutput = output => {
	const packages = []
	let pkg = null
	output.split('\n').forEach(line => {
		const nameMatch = line.match(NAME_REGEX)
		if (nameMatch) {
			const [, name, version] = nameMatch
			pkg = {
				name,
				version
			}
			packages.push(pkg)
		}

		const titleMatch = line.match(TITLE_REGEX)
		if (pkg && titleMatch) {
			pkg.title = titleMatch[1]
		}

		const descMatch = line.match(DESC_REGEX)
		if (pkg && descMatch) {
			pkg.description = descMatch[1]
		}
	})
	return packages
}

const chocoSearch = query => {
	const safeQuery = query.replace(STRIP_QUERY_REGEX, '')
	const ps = new Shell()
	ps.addCommand(`choco search ${safeQuery} ${SEARCH_FLAGS}`)
	return ps.invoke().then(parseOutput)
}

module.exports = chocoSearch
