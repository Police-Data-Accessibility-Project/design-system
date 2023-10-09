const fs = require('fs-extra');

function copyImageAssets(args) {
	const packageImagesPath = process.cwd() + '/node_modules/pdap-design-system/dist/images';
	const destinationSubPath = args.to ?? 'assets';
	const destinationPath = process.cwd() + '/' + destinationSubPath;

	console.log(`Copying PDAP image assets to ${destinationPath}`);

	fs.copy(packageImagesPath, destinationPath, function onComplete(err) {
		if (err) {
			console.error(err);
		} else {
			console.log('PDAP image assets successfully copied.');
		}
	});
}

module.exports = { copyImageAssets };
