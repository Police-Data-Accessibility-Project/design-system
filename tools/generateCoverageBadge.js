#!/usr/bin/env node
import { load } from 'cheerio';
import fs from 'fs';
import path from 'path';
import url from 'url';
import { makeBadge } from 'badge-maker';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const $coverage = load(
	fs.readFileSync(
		path.join(__dirname, '../coverage/index.html'),
		'utf8',
		(err, data) => {
			if (err) {
				console.error(err);
				return;
			}
			console.log(data);
		}
	)
);

const totalCoverageElements = $coverage('.pad1').find('.strong');

// Get elements that report total coverage.
const coveragePercentage =
	totalCoverageElements
		.map(function () {
			// Convert text content, strip % character, and convert to number
			return Number($coverage(this).text().replace(/%/, '').trim());
		})
		.toArray()
		// Add up
		.reduce((acc, cur) => acc + cur, 0) /
	// Divide by total
	totalCoverageElements.length;

fs.writeFile(
	path.join(__dirname, '../badges/coverage.svg'),
	getCoverageBadge(coveragePercentage),
	(err) => {
		if (err) console.log(err);
		else {
			console.log('Coverage badge written successfully with contents:\n');
			console.log(fs.readFileSync('badges/coverage.svg', 'utf8'));
		}
	}
);

function getCoverageBadge(coveragePercentage) {
	const level =
		coveragePercentage > 98
			? 'high'
			: coveragePercentage > 90
			? 'medium'
			: 'low';

	const colors = new Map([
		['low', 'red'],
		['medium', 'yellow'],
		['high', 'brightgreen'],
	]);

	const format = {
		label: 'coverage',
		message: `${coveragePercentage}%`,
		color: colors.get(level),
		style: 'for-the-badge',
	};

	return makeBadge(format);
}
