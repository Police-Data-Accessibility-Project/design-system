#!/usr/bin/env node
/* eslint-disable no-undef */
import fs from 'fs';
import path from 'path';
import url from 'url';
import { makeBadge } from 'badge-maker';
import { exec } from 'child_process';

// Shim
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

let isError = false;

exec('npm run build', (error) => {
	if (error) {
		isError = true;
	}
});

const badge = makeBadge({
	label: 'build',
	message: isError ? 'failing' : 'passing',
	color: isError ? 'red' : 'brightgreen',
	style: 'for-the-badge',
});

fs.writeFile(path.join(__dirname, '../badges/build.svg'), badge, (err) => {
	if (err) console.log(err);
	else {
		console.log('Build badge written successfully with contents:\n');
		console.log(fs.readFileSync('badges/build.svg', 'utf8'));
	}

	if (typeof fs.readFileSync('badges/build.svg', 'utf8') !== 'undefined') {
		process.exit(0);
	}
});
