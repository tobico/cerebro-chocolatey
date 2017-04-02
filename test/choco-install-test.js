const { stub } = require('sinon')
const proxyquire = require('proxyquire')
const expect = require('./utils/expect')

describe('chocoInstall', () => {
	let addCommand
	let invoke
	let shell
	let chocoInstall

	beforeEach(() => {
		addCommand = stub()
		invoke = stub().returns(Promise.resolve(null))

		shell = stub().returns({
			addCommand,
			invoke
		})

		chocoInstall = proxyquire('../src/choco-install', {
			'node-powershell': shell
		})
	})

	it('starts an admin powershell with choco install command', () => {
		return chocoInstall('foobar')
			.then(() => {
				expect(addCommand).to.have.been.calledOnce()
				expect(addCommand).to.have.been.calledWith('Start-Process', [{
					name: 'FilePath',
					value: 'powershell'
				}, {
					name: 'Verb',
					value: 'runAs'
				}, {
					name: 'ArgumentList',
					value: 'choco install foobar -yv'
				}])

				expect(invoke).to.have.been.calledOnce()
			})
			.catch(err => console.error(err))
	})
})
