const fs = require('fs-extra');

function cliImageCopy(args) {
	args = require('minimist')(args);

	const packageImagesPath = process.cwd() + '/node_modules/pdap-design-system/dist/images';
	const destinationSubPath = args.path ?? 'assets';
	const destinationPath = process.cwd() + '/' + destinationSubPath;

	console.log(`Copying PDAP image assets to ${destinationPath}`);

	// To Move a folder or file, select overwrite accordingly
	fs.copy(packageImagesPath, destinationPath, function handleError(err) {
		if (err) {
			console.error(err);
		}
	});

	console.log(`PDAP image assets successfully copied to ${destinationPath}`);
}

module.exports = { cliImageCopy };
