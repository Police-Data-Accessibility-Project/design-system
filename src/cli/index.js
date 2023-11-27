import fs from 'fs-extra';

function copyImageAssets(args) {
	const packageImagesPath =
		process.cwd() + '/node_modules/pdap-design-system/dist/images';
	const destinationSubPath = (args.to ?? 'assets') + '/images';
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

function copyStyleAssets(args) {
	const packageStylesPath = process.cwd() + '/node_modules/pdap-design-system/';
	const destinationSubPath = (args.to ?? 'assets') + '/styles';
	const destinationPath = process.cwd() + '/' + destinationSubPath;

	console.log(`Copying PDAP Style assets to ${destinationPath}`);

	fs.copy(packageStylesPath, destinationPath, function onComplete(err) {
		if (err) {
			console.error(err);
		} else {
			console.log('PDAP Style assets successfully copied.');
		}
	});
}

export default {
	copyAllAssets: function copyAllAssets(args) {
		return Object.values(this).forEach((handler) => {
			if (handler.name !== this.copyAllAssets.name) handler(args);
		});
	},
	copyImageAssets,
	copyStyleAssets,
};
