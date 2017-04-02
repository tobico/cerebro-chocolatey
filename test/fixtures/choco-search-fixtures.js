module.exports.searchOutput = `
Chocolatey v0.10.3
git.commandline 2.11.0.20170203 [Approved]
 Title: [Deprecated] Git (Portable, CommandLine) | Published: 2017-02-03
 Package approved as a trusted package on Mar 17 2017 02:28:19.
 Package testing status: Passing on Feb 03 2017 20:11:43.
 Number of Downloads: 11926 | Downloads for this version: 419
 Package url
 Chocolatey Package Source: n/a
 Package Checksum: 'dVfcm9zKsz5nsnUSGx8vjMRFaaVlDE4Kay0Aia8ezJoSFy3mHmC5betoKe+/76Rd4dj/nrt5P4B2ipQcjyzD2A==' (SHA512)
 Tags: deprecated
 Software Site: https://git-for-windows.github.io/
 Software License: http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 Description: #### New package name: **[git.portable](https://chocolatey.org/packages/git.portable)**

1 package found.

Did you know Pro / Business automatically syncs with Programs and
 Features? Learn more about Package Synchronizer at
 https://chocolatey.org/compare
`

module.exports.expectedOutput = [{
	name: 'git.commandline',
	version: '2.11.0.20170203',
	title: '[Deprecated] Git (Portable, CommandLine)',
	description: '#### New package name: **[git.portable](https://chocolatey.org/packages/git.portable)**'
}]
