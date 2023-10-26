#!/usr/bin/env node

const cli = require('../src/cli');

// Convert argv to object keyed by arg name where --{argName}
const args = require('minimist')(process.argv);

switch (true) {
	case args['copy-assets']:
		return cli.copyAllAssets(args);
	case args['copy-images']:
		return cli.copyImageAssets(args);
	case args['copy-styles']:
		return cli.copyStyleAssets(args);
	default:
		return console.log(
			'No option argument was passed to pdap-design-system CLI.',
			'\n Current options are:',
			'\n --copy-assets: Copy all assets to assets/ (default) or custom path passed to optional --to argument.',
			'\n --copy-images: Copy only image assets to assets/ (default) or custom path passed to optional --to argument.',
			'\n --copy-styles: Copy only CSS assets to assets/ (default) or custom path passed to optional --to argument.'
		);
}
