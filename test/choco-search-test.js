const { stub } = require('sinon')
const proxyquire = require('proxyquire')
const expect = require('./utils/expect')
const { searchOutput, expectedOutput } = require('./fixtures/choco-search-fixtures')

describe('chocoSearch', () => {
	let addCommand
	let invoke
	let shell
	let chocoSearch

	beforeEach(() => {
		addCommand = stub()
		invoke = stub().returns(Promise.resolve(searchOutput))

		shell = stub().returns({
			addCommand,
			invoke
		})

		chocoSearch = proxyquire('../src/choco-search', {
			'node-powershell': shell
		})
	})

	it('handles a search by executing `choco search`', () => {
		return chocoSearch('foobar')
			.then(output => {
				expect(output).to.deep.equal(expectedOutput)

				expect(addCommand).to.have.been.calledOnce()
				expect(addCommand).to.have.been.calledWith(
					'choco search foobar -yv --page=0 --page-size=10 --order-by-popularity'
				)

				expect(invoke).to.have.been.calledOnce()
			})
			.catch(err => console.error(err))
	})

	it('strips non-word or dot chars from input', () => {
		return chocoSearch('../foo-bar123.exe -D')
			.then(() => {
				expect(addCommand).to.have.been.calledOnce()
				expect(addCommand).to.have.been.calledWith(
					'choco search ..foobar123.exeD -yv --page=0 --page-size=10 --order-by-popularity'
				)
				expect(invoke).to.have.been.calledOnce()
			})
			.catch(err => console.error(err))
	})
})
