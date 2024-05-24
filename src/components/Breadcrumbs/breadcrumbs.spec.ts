import { RouterLinkStub, flushPromises, mount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router';
import PdapBreadcrumbs from './PdapBreadcrumbs.vue';
import { describe, it, expect } from 'vitest';

const routes = [
	{
		path: '/product',
		name: 'Product',
		meta: { breadcrumbText: 'Product' },
		redirect: undefined,
		children: [
			{
				path: '/product/:id',
				name: 'Product ID',
				meta: { breadcrumbText: 'Product ID' },
				redirect: undefined,
				children: [
					{
						path: '/product/:id/edit',
						name: 'Edit Product ID',
						meta: { breadcrumbText: 'Edit Product ID' },
						redirect: undefined,
						children: [],
					},
				],
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

describe('PdapBreadcrumbs', () => {
	it('renders breadcrumbs correctly for a root route', async () => {
		router.push({ name: 'Product' });
		await router.isReady();

		const wrapper = mount(PdapBreadcrumbs, {
			global: {
				mocks: {
					$route: routes[0],
				},
				plugins: [router],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});

		const breadcrumbItems = wrapper.findAll('li');
		expect(breadcrumbItems).toHaveLength(1);
		// @ts-expect-error
		expect(breadcrumbItems.at(0).text()).toBe('Product');
		// @ts-expect-error
		expect(breadcrumbItems.at(0).classes()).toContain('is-active');
	});

	it('renders breadcrumbs correctly for a single-nested route', async () => {
		router.push({ name: 'Product ID', params: { id: 1234 } });
		await router.isReady();
		await flushPromises();

		const wrapper = mount(PdapBreadcrumbs, {
			global: {
				mocks: {
					$route: routes[0].children[0],
				},
				plugins: [router],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});

		const breadcrumbItems = wrapper.findAll('li');
		expect(breadcrumbItems).toHaveLength(2);
		// @ts-expect-error
		expect(breadcrumbItems.at(0).text()).toBe('Product');
		// @ts-expect-error
		expect(breadcrumbItems.at(1).text()).toBe('Product ID');
		// @ts-expect-error
		expect(breadcrumbItems.at(1).classes()).toContain('is-active');

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders breadcrumbs correctly for a double-nested route', async () => {
		router.push({ name: 'Edit Product ID', params: { id: 1234 } });
		await router.isReady();
		await flushPromises();

		const wrapper = mount(PdapBreadcrumbs, {
			global: {
				mocks: {
					$route: routes[0].children[0].children[0],
				},
				plugins: [router],
				stubs: {
					RouterLink: RouterLinkStub,
				},
			},
		});

		const breadcrumbItems = wrapper.findAll('li');
		expect(breadcrumbItems).toHaveLength(3);
		// @ts-expect-error
		expect(breadcrumbItems.at(0).text()).toBe('Product');
		// @ts-expect-error
		expect(breadcrumbItems.at(1).text()).toBe('Product ID');
		// @ts-expect-error
		expect(breadcrumbItems.at(2).text()).toBe('Edit Product ID');
		// @ts-expect-error
		expect(breadcrumbItems.at(2).classes()).toContain('is-active');

		expect(wrapper.html()).toMatchSnapshot();
	});
});
