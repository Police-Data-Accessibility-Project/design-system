import PdapFooter from './PdapFooter.vue';
import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

const mockFundraisingData = {
	raised: 5000,
	goal: 10000,
};

const base = {
	props: {
		fundraisingData: mockFundraisingData,
	},
	stubs: {
		RouterLink: RouterLinkStub,
		FontAwesomeIcon: true,
	},
};

describe('Footer component', () => {
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
		expect(wrapper.html()).toContain('LinkedIn');
		expect(wrapper.html()).toContain('Jobs');
		expect(wrapper.html()).toContain('Newsletter');
		expect(wrapper.html()).toContain('Docs');
	});

	// Fundraising Section
	describe('Fundraising meter', () => {
		test('Displays correct fundraising amounts', () => {
			const wrapper = mount(PdapFooter, base);
			const fundraisingText = wrapper
				.find('a[href="https://pdap.io/donate"]')
				.text();

			expect(fundraisingText).toContain('$5000');
			expect(fundraisingText).toContain('$10000');
		});

		test('Shows celebration emoji when goal is met', () => {
			const wrapper = mount(PdapFooter, {
				...base,
				props: {
					fundraisingData: {
						raised: 10000,
						goal: 10000,
					},
				},
			});

			expect(wrapper.html()).toContain('🎉');
		});

		test('Does not show celebration emoji when goal is not met', () => {
			const wrapper = mount(PdapFooter, base);
			expect(wrapper.html()).not.toContain('🎉');
		});

		test('Sets fundraising progress style variable correctly', async () => {
			const wrapper = mount(PdapFooter, base);
			await wrapper.vm.$nextTick(); // Wait for mounted hook

			const footerElement = wrapper.element as HTMLElement;
			const progressStyle = footerElement.style.getPropertyValue(
				'--fundraising-progress'
			);
			expect(progressStyle).toBe('50%'); // 5000/10000 * 100
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
			const internalLinks = wrapper.findAll('a:not([href^="http"])');

			internalLinks.forEach((link) => {
				expect(link.attributes('target')).toBeFalsy();
				expect(link.attributes('rel')).toBeFalsy();
			});
		});
	});
});
