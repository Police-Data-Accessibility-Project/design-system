/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = {
	branches: ['main'],
	plugins: [
		// Run in order:
		// 1. Analyze commits to determine release type
		[
			'@semantic-release/commit-analyzer',
			{
				preset: 'angular',
				releaseRules: [
					{ type: 'docs', release: 'patch' },
					{ type: 'refactor', release: 'patch' },
					{ type: 'style', release: 'patch' },
				],
				parserOpts: {
					noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
				},
			},
		],

		// 2. Generate release notes
		[
			'@semantic-release/release-notes-generator',
			{
				preset: 'angular',
				parserOpts: {
					noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES', 'BREAKING'],
				},
				writerOpts: {
					commitsSort: ['subject', 'scope'],
				},
				presetConfig: {
					types: [
						{ type: 'feat', section: 'Features' },
						{ type: 'fix', section: 'Bug Fixes' },
						{ type: 'hotfix', section: 'Bug Fixes' },
						{ type: 'docs', section: 'Docs' },
						{ type: 'refactor', section: 'Refactoring' },
						{ type: 'perf', section: 'Performance Improvements' },
						{ type: 'ci', section: 'CI/CD Changes' },
						{ type: 'test', section: 'Tests' },
					],
				},
			},
		],

		// 3. Update CHANGELOG (must be called before /npm)
		[
			'@semantic-release/changelog',
			{
				changelogFile: 'docs/CHANGELOG.md',
			},
		],

		// 4. Publish to npm (must be called after /changelog and before /git)
		'@semantic-release/npm',

		// 5. Publish to GH
		[
			'@semantic-release/github',
			{
				assets: ['bin', 'dist', 'docs', 'README.md', 'package.json'],
			},
		],

		// 6. Update version with new release commit (must be called after /changelog and /npm)
		[
			'@semantic-release/git',
			{
				assets: ['docs', 'package.json', 'package-lock.json', 'npm-shrinkwrap.json'],
				message:
					"chore(release) <%= nextRelease.version %> - <%= new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }) %> [skip ci]\n\n<%= nextRelease.notes %> ",
			},
		],
	],
};
