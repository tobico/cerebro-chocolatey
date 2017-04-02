const { spy } = require('sinon')
const proxyquire = require('proxyquire')
const expect = require('./utils/expect')
const fixtures = require('./fixtures/index-fixtures')

const icon = 'someicon'
const debounce = spy(fn => fn)
const memoize = spy(fn => fn)
const chocoSearch = spy(() => Promise.resolve(fixtures.searchResults))

const plugin = proxyquire('../src/index', {
	'p-debounce': debounce,
	'cerebro-tools': { memoize },
	'./choco-search': chocoSearch,
	'./assets/choco-logo.svg': icon
})

const itShouldIgnoreInvalidTerms = () => {
	fixtures.terms.invalid.forEach(term => {
		it(`should ignore the term: ${term}`, () => {
			const display = spy()
			const returned = plugin.fn({ display, term })

			expect(display.called).to.equal(false)
			expect(returned).to.equal(null)
		})
	})
}

const itShouldHandleValidTerms = () => {
	fixtures.terms.valid.forEach(({ term, query }) => {
		it(`should handle the term: "${term}"`, () => {
			const display = spy()
			const hide = spy()

			return plugin.fn({ display, hide, term })
				.then(() => {
					expect(display).to.have.callCount(2)
					expect(hide).to.have.callCount(1)
					expect(chocoSearch).to.have.been.calledOnce()

					expect(display).to.have.been.calledWithMatch({ icon, id: 'choco-loading', title: 'Searching Chocolatey packages ...' })
					expect(hide).to.have.been.calledWithExactly('choco-loading')
					expect(chocoSearch).to.have.been.calledWithExactly(query)

					fixtures.searchResults.forEach(result => {
						const matcher = fixtures.displayResultMatcher(result)
						expect(display).to.have.been.calledWithMatch(matcher)
					})
				})
				.catch(err => console.error(err))
		})
	})
}

describe('plugin', () => {
	beforeEach(() => {
		debounce.reset()
		memoize.reset()
		chocoSearch.reset()
	})

	describe('fn()', () => {
		itShouldIgnoreInvalidTerms()
		itShouldHandleValidTerms()
	})
})
