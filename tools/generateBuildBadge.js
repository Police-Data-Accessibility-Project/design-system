#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import url from 'url';
import { makeBadge } from 'badge-maker';
import { exec } from 'child_process';
import process from 'process';

// Shim
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

async function writeBuildBadge() {
	let isError = false;

	await exec('npm run build', (error) => {
		if (error) {
			isError = true;
		}
	});

	fs.writeFile(
		path.join(__dirname, '../badges/build.svg'),
		makeBadge({
			label: 'build',
			message: isError ? 'failing' : 'passing',
			color: isError ? 'red' : 'brightgreen',
			style: 'for-the-badge',
		}),
		(err) => {
			if (err) console.log(err);
			else {
				console.log('Build badge written successfully with contents:\n');
				console.log(fs.readFileSync('badges/build.svg', 'utf8'));
			}
		}
	);
}

try {
	await writeBuildBadge();
	process.exit(0);
} catch (e) {
	console.error(e);
	process.exit(1);
}
