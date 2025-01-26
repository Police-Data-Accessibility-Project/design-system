import PdapFooter from './PdapFooter.vue';
import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';

const base = {
	stubs: {
		RouterLink: RouterLinkStub,
		FontAwesomeIcon: true,
	},
};

describe('Footer component', () => {
	beforeEach(() => {
		// Mock the CSS custom property manipulation
		document.documentElement.style.setProperty = vi.fn();
		// Setup fake timers
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	// Render
	test('Renders a footer', () => {
		const wrapper = mount(PdapFooter, base);
		expect(wrapper.find('footer').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Social Links
	test('Renders all social links', () => {
		const wrapper = mount(PdapFooter, base);
		const links = wrapper.findAll('ul li a');
		expect(links).toHaveLength(6); // Based on the injected links array

		// Verify specific links exist
		expect(wrapper.html()).toContain('Github');
		expect(wrapper.html()).toContain('Discord');
		expect(wrapper.html()).toContain('Jobs');
		expect(wrapper.html()).toContain('Newsletter');
		expect(wrapper.html()).toContain('Docs');
		expect(wrapper.html()).toContain('Email');
	});
});

// Copyright Section
test('Renders current year in copyright notice', () => {
	const wrapper = mount(PdapFooter, base);
	const currentYear = new Date().getFullYear();
	expect(wrapper.html()).toContain(`© ${currentYear}`);
});

test('Renders EIN number', () => {
	const wrapper = mount(PdapFooter, base);
	expect(wrapper.html()).toContain('EIN: 85-4207132');
});

test('Renders Guidestar badge', () => {
	const wrapper = mount(PdapFooter, base);
	const guidestarImg = wrapper.find('img[alt="platinum transparency"]');

	expect(guidestarImg.exists()).toBe(true);
	expect(guidestarImg.attributes('src')).toBe(
		'https://widgets.guidestar.org/gximage2?o=9973356&l=v4'
	);
});

describe('Link behavior', () => {
	test('External links should open in new tab', () => {
		const wrapper = mount(PdapFooter, base);
		const externalLinks = wrapper.findAll('a[href^="http"]');

		// Verify that all external links have the correct attributes
		externalLinks.forEach((link) => {
			expect(link.attributes('target')).toBe('_blank');
			expect(link.attributes('rel')).toBe('noreferrer');
		});
	});

	test('Internal links should not open in new tab', () => {
		const wrapper = mount(PdapFooter, base);
		const internalLinks = wrapper.findAll('a:not([href^="http"]):not([href^="mailto"])');

		internalLinks.forEach((link) => {
			expect(link.attributes('target')).toBeFalsy();
			expect(link.attributes('rel')).toBeFalsy();
		});
	});
});