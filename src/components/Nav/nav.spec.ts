// import * as VueRouter from 'vue-router';

// Component
import PdapNav from './PdapNav.vue';

// Utils
import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

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
		config: {
			warnHandler(msg, instance, trace) {
				if (
					// TODO: investigate these cases (happening anywhere nav is rendered)
					msg.includes('Invalid prop: type check failed for prop') ||
					msg.includes('missing template')
				) {
					// ignore warning
					return;
				}
				console.warn(msg, instance, trace);
			},
		},
	},
	stubs: {
		RouterLink: RouterLinkStub,
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

	test('Renders empty nav when links are undefined', () => {
		const wrapper = mount(PdapNav, {
			...base,
			global: {
				provide: {
					navLinks: undefined,
				},
			},
		});

		expect(wrapper.find('.pdap-nav').exists()).toBe(true);
	});

	test('Triggers toggleIsExpanded function on update click', async () => {
		vi.stubGlobal('innerWidth', 700);
		const wrapper = mount(PdapNav, base);

		const button = wrapper.find('.pdap-nav-open-button');
		const nav = wrapper.find('.pdap-nav');

		button.trigger('click');
		await nextTick();
		expect(nav.attributes('aria-expanded')).toBe('true');
		await nextTick();
		button.trigger('click');
		await nextTick();
		expect(nav.attributes('aria-expanded')).toBe('false');
	});

	test('Nav is unmounted from the DOM', async () => {
		const wrapper = mount(PdapNav, base);

		wrapper.unmount();
	});
});
