#!/usr/bin/env node

const cli = require('../src/cli');

// Convert argv to object keyed by arg name where --{argName}
const args = require('minimist')(process.argv);

switch (true) {
	case args['copy-images']:
		return cli.copyImageAssets(args);
	default:
		return console.log(
			'No option argument was passed to pdap-design-system CLI.',
			'\n Current options are:',
			'\n --copy-images: Copy image assets to assets/ (default) or custom path passed to optional --to argument.'
		);
}
