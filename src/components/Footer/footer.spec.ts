// Component
import PdapFooter from './PdapFooter.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Footer component', () => {
	// Render
	test('Renders a footer', () => {
		const wrapper = mount(PdapFooter);

		expect(wrapper.find('.pdap-footer').exists()).toBe(true);
		expect(wrapper.find('.pdap-footer-social-links').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-footer');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - logo src
	test('Renders footer with default logo src', () => {
		const wrapper = mount(PdapFooter);
		expect(wrapper.props().logoImageSrc).toBe(
			'node_modules/pdap-design-system/dist/images/acronym.svg'
		);
	});

	test('Renders footer with custom logo src', () => {
		const wrapper = mount(PdapFooter, {
			props: { logoImageSrc: 'test' },
		});
		expect(wrapper.props().logoImageSrc).toBe('test');
	});

	// Props - anchor path
	test('Renders footer with default logo anchor path', () => {
		const wrapper = mount(PdapFooter);
		expect(wrapper.props().logoImageAnchorPath).toBe('/');
	});

	test('Renders footer with custom logo anchor path', () => {
		const wrapper = mount(PdapFooter, {
			props: { logoImageAnchorPath: '/test' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('/test');
	});

	test('Renders footer with custom logo anchor href', () => {
		const wrapper = mount(PdapFooter, {
			props: { logoImageAnchorPath: 'www.test.com' },
		});
		expect(wrapper.props().logoImageAnchorPath).toBe('www.test.com');
	});
});
