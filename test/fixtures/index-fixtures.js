const sinon = require('sinon')

module.exports = {
	searchResults: [
		{
			name: 'foo',
			version: '1.2.3',
			title: 'bar',
			description: 'foobar'
		}
	],
	terms: {
		invalid: [
			'foobar',
			'n',
			'np',
			'npm',
			'npmlol',
			'npm ',
			'npm76'
		],
		valid: [
			{
				term: 'choco foo',
				query: 'foo'
			}, {
				term: 'choco bar',
				query: 'bar'
			}, {
				term: 'choco  baz ',
				query: 'baz'
			}, {
				term: 'choco    qux      corge',
				query: 'qux      corge'
			}, {
				term: 'choco choco',
				query: 'choco'
			}, {
				term: 'choco 42',
				query: '42'
			}
		]
	},
	displayResultMatcher: result => ({
		icon: sinon.match.any,
		id: `choco-${result.name}`,
		term: result.name,
		title: `${result.title} (${result.version})`,
		subtitle: result.description,
		clipboard: `choco install ${result.name} -yv`,
		onSelect: sinon.match.func
	})
}
