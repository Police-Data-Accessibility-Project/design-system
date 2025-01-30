// import * as VueRouter from 'vue-router';

// Component
import PdapHeader from './PdapHeader.vue';

// Utils
import { RouterLinkStub, mount } from '@vue/test-utils';
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
	stubs: {
		RouterLink: RouterLinkStub,
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

	// Props - anchor path
	test('Renders header with default logo anchor path', () => {
		const wrapper = mount(PdapHeader, base);
		expect(wrapper.props().logoAnchorPath).toBe('/');
	});

	test('Renders header with custom logo anchor path', () => {
		const wrapper = mount(PdapHeader, {
			...base,
			props: { logoAnchorPath: '/test' },
		});
		expect(wrapper.props().logoAnchorPath).toBe('/test');
	});

	test('Renders header with custom logo anchor href', () => {
		const wrapper = mount(PdapHeader, {
			...base,
			props: { logoAnchorPath: 'www.test.com' },
		});
		expect(wrapper.props().logoAnchorPath).toBe('www.test.com');
	});

	test('Header is unmounted from the DOM', async () => {
		const wrapper = mount(PdapHeader, base);

		wrapper.unmount();
	});
});
