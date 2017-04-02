/**
 * Installs a chocolatey package by invoking a new instance of powershell, and
 * executing a `choco install` command in it.
 *
 * User will be prompted to authorize administrator privileges for the
 * operation.
 */

const Shell = require('node-powershell')

const chocoInstall = name => {
	const ps = new Shell()
	ps.addCommand('Start-Process', [{
		name: 'FilePath',
		value: 'powershell'
	}, {
		name: 'Verb',
		value: 'runAs'
	}, {
		name: 'ArgumentList',
		value: `choco install ${name} -yv`
	}])
	return ps.invoke()
}

module.exports = chocoInstall
