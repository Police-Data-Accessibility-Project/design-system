import { RouteLocationNormalized } from 'vue-router';

export interface BreadcrumbItem {
	text: string;
	path: string;
	active: boolean;
}

export function getBreadcrumbs(
	route: RouteLocationNormalized
): BreadcrumbItem[] {
	const breadcrumbs: BreadcrumbItem[] = [];

	for (const matched of route.matched) {
		const { name, path, meta } = matched;
		const breadcrumbText = meta.breadcrumbText ?? name;

		if (breadcrumbText) {
			breadcrumbs.push({
				text: breadcrumbText as string,
				path,
				active: false,
			});
		}
	}

	// Set "active" if breadcrumbs > 1
	if (breadcrumbs.length > 0) {
		breadcrumbs[breadcrumbs.length - 1].active = true;
	}

	return breadcrumbs;
}
