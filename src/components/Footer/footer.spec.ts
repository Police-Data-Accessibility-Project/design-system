// Component
import PdapFooter from './PdapFooter.vue';

// Utils
import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

const base = {
	stubs: {
		RouterLink: RouterLinkStub,
	},
};

// Test
describe('Footer component', () => {
	// Render
	test('Renders a footer', () => {
		const wrapper = mount(PdapFooter, base);

		expect(wrapper.find('.pdap-footer').exists()).toBe(true);
		expect(wrapper.find('.pdap-footer-social-links').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-footer');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - logo src
	test('Renders footer with default logo src', () => {
		const wrapper = mount(PdapFooter, base);
		expect(wrapper.props().logoImageSrc).toBe('/src/assets/acronym.svg');
	});

	test('Renders footer with custom logo src', () => {
		const wrapper = mount(PdapFooter, {
			...base,
			props: { logoImageSrc: 'test' },
		});
		expect(wrapper.props().logoImageSrc).toBe('test');
	});

	// Props - anchor path
	test('Renders footer with default logo anchor path', () => {
		const wrapper = mount(PdapFooter, base);
		expect(wrapper.props().logoImageAnchorPath).toBe('/');
	});

	test('Renders footer with custom logo anchor path', () => {
		const wrapper = mount(PdapFooter, {
			...base,
			props: { logoImageAnchorPath: '/test' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('/test');
	});

	test('Renders footer with custom logo anchor href', () => {
		const wrapper = mount(PdapFooter, {
			...base,
			props: { logoImageAnchorPath: 'www.test.com' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('www.test.com');
	});
});
