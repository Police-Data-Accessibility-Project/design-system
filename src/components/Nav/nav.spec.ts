// import * as VueRouter from 'vue-router';

// Component
import PdapNav from './PdapNav.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';

// Mocks
vi.mock('vue-router');
const base = {
	global: {
		mocks: {
			$route: {
				fullPath: '/',
			},
		},
		provide: {
			navLinks: [
				{ path: '/', text: 'Home' },
				{ path: '/a', text: 'Home A' },
				{ path: '/b', text: 'Home B' },
				{ path: '', text: 'Link', href: 'https://www.google.com' },
			],
		},
	},
};

// Test
describe('Nav component', () => {
	test('Renders a nav component', () => {
		const wrapper = mount(PdapNav, base);

		expect(wrapper.find('.pdap-nav').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders desktop nav', () => {
		vi.stubGlobal('innerWidth', 1400);
		const wrapper = mount(PdapNav, base);

		expect(wrapper.find('.pdap-nav').isVisible()).toBe(true);
	});

	test('Renders mobile nav', () => {
		// TODO: how to check?
	});

	test('Throws an error if no data provided', () => {
		// TODO: how to implement? Should the component emit the error instead of throwing it?
	});
});
