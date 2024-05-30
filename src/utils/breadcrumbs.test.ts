// breadcrumbs.test.ts
import { getBreadcrumbs, BreadcrumbItem } from './breadcrumbs';
import { RouteLocationNormalized } from 'vue-router';
import { describe, it, expect } from 'vitest';

describe('getBreadcrumbs', () => {
	it('should return an empty array when the route has no matched routes', () => {
		const route = {
			matched: [],
			// other properties omitted for brevity
		};

		const breadcrumbs = getBreadcrumbs(
			route as unknown as RouteLocationNormalized
		);

		expect(breadcrumbs).toEqual([]);
	});

	it('should return breadcrumbs with correct properties', () => {
		const route = {
			matched: [
				{
					name: 'Home',
					path: '/',
					meta: { breadcrumbText: 'Home' },
				},
				{
					name: 'About',
					path: '/about',
					meta: {},
				},
				{
					name: 'Contact',
					path: '/contact',
					meta: { breadcrumbText: 'Get in Touch' },
				},
			],
			// other properties omitted for brevity
		};

		const expectedBreadcrumbs: BreadcrumbItem[] = [
			{
				text: 'Home',
				path: '/',
				active: false,
			},
			{
				text: 'About',
				path: '/about',
				active: false,
			},
			{
				text: 'Get in Touch',
				path: '/contact',
				active: true,
			},
		];

		const breadcrumbs = getBreadcrumbs(
			route as unknown as RouteLocationNormalized
		);

		expect(breadcrumbs).toEqual(expectedBreadcrumbs);
	});
});
