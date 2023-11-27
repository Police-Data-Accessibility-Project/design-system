// import * as VueRouter from 'vue-router';

// Component
import PdapHeader from './PdapHeader.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';

// Mocks
const base = {
	global: {
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
};

vi.mock('vue-router');

// Test
describe('Header component', () => {
	// Render
	test('Renders a header', () => {
		const wrapper = mount(PdapHeader, base);

		expect(wrapper.find('.pdap-header').exists()).toBe(true);
		expect(wrapper.find('.pdap-nav').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-header');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - logo src
	test('Renders header with default logo src', () => {
		const wrapper = mount(PdapHeader, base);
		expect(wrapper.props().logoImageSrc).toBe(
			'node_modules/pdap-design-system/dist/images/lockup.svg'
		);
	});

	test('Renders header with custom logo src', () => {
		const wrapper = mount(PdapHeader, {
			...base,
			props: { logoImageSrc: 'test' },
		});
		expect(wrapper.props().logoImageSrc).toBe('test');
	});

	// Props - anchor path
	test('Renders header with default logo anchor path', () => {
		const wrapper = mount(PdapHeader, base);
		expect(wrapper.props().logoImageAnchorPath).toBe('/');
	});

	test('Renders header with custom logo anchor path', () => {
		const wrapper = mount(PdapHeader, {
			...base,
			props: { logoImageAnchorPath: '/test' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('/test');
	});

	test('Renders header with custom logo anchor href', () => {
		const wrapper = mount(PdapHeader, {
			...base,
			props: { logoImageAnchorPath: 'www.test.com' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('www.test.com');
	});
});
