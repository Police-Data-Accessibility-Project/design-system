import { RouterLinkStub, mount } from '@vue/test-utils';
import { describe, expect, test, beforeEach, vi, afterEach } from 'vitest';
import PdapFooter from './PdapFooter.vue';
import { nextTick } from 'vue';

const base = {
	stubs: {
		RouterLink: RouterLinkStub,
		FontAwesomeIcon: true,
	},
};

const originalMatchMedia = window.matchMedia;

const createMatchMedia = (matches: boolean) => {
	const listeners: Array<(e: MediaQueryListEvent) => void> = [];

	return {
		matches,
		addEventListener: vi.fn((event, callback) => {
			if (event === 'change' && typeof callback === 'function') {
				listeners.push(callback);
			}
		}),
		removeEventListener: vi.fn((event, callback) => {
			if (event === 'change' && typeof callback === 'function') {
				const index = listeners.indexOf(callback);
				if (index > -1) {
					listeners.splice(index, 1);
				}
			}
		}),
		// Legacy API fallbacks for jsdom
		addListener: vi.fn((callback) => {
			if (typeof callback === 'function') {
				listeners.push(callback);
			}
		}),
		removeListener: vi.fn((callback) => {
			if (typeof callback === 'function') {
				const index = listeners.indexOf(callback);
				if (index > -1) {
					listeners.splice(index, 1);
				}
			}
		}),
		dispatchEvent: vi.fn(),
		media: '(min-width: 1024px)',
		onchange: null,
		triggerChange(newMatches: boolean) {
			this.matches = newMatches;
			listeners.forEach((listener) =>
				listener({ matches: newMatches } as MediaQueryListEvent)
			);
		},
	};
};

const setMatchMedia = (matches: boolean) => {
	const mock = createMatchMedia(matches);
	window.matchMedia = vi.fn().mockReturnValue(mock);
	return mock;
};

const mountFooter = async (options = {}) => {
	const wrapper = mount(PdapFooter, {
		...base,
		...options,
		stubs: {
			...base.stubs,
			...(options as { stubs?: Record<string, unknown> })?.stubs,
		},
	});
	await nextTick();
	return wrapper;
};

describe('Footer component', () => {
	beforeEach(() => {
		document.documentElement.style.setProperty = vi.fn();
		setMatchMedia(true);
	});

	afterEach(() => {
		window.matchMedia = originalMatchMedia;
		vi.restoreAllMocks();
	});

	// Render
	test('Renders a footer', async () => {
		const wrapper = await mountFooter();
		expect(wrapper.find('footer').exists()).toBe(true);
	});

	// Social Links
	test('Renders all social links', async () => {
		const wrapper = await mountFooter();
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
test('Renders current year in copyright notice', async () => {
	const wrapper = await mountFooter();
	const currentYear = new Date().getFullYear();
	expect(wrapper.html()).toContain(`© ${currentYear}`);
});

test('Renders EIN number', async () => {
	const wrapper = await mountFooter();
	expect(wrapper.html()).toContain('EIN: 85-4207132');
});

test('Renders Guidestar badge', async () => {
	const wrapper = await mountFooter();
	const guidestarImg = wrapper.find('img[alt="guidestar transparency seal"]');

	expect(guidestarImg.exists()).toBe(true);
	expect(guidestarImg.attributes('src')).toBe(
		'/src/assets/candid-platinum.svg'
	);
});

describe('Link behavior', () => {
	test('External links should open in new tab', async () => {
		const wrapper = await mountFooter();
		const externalLinks = wrapper.findAll('a[href^="http"]');

		// Verify that all external links have the correct attributes
		externalLinks.forEach((link) => {
			expect(link.attributes('target')).toBe('_blank');
			expect(link.attributes('rel')).toBe('noreferrer');
		});
	});

	test('Internal links should not open in new tab', async () => {
		const wrapper = await mountFooter();
		const internalLinks = wrapper.findAll(
			'a:not([href^="http"]):not([href^="mailto"])'
		);

		internalLinks.forEach((link) => {
			expect(link.attributes('target')).toBeFalsy();
			expect(link.attributes('rel')).toBeFalsy();
		});
	});

	test('shows collapse toggle on desktop and collapses by default', async () => {
		setMatchMedia(true);
		const wrapper = await mountFooter();
		const button = wrapper.get('[data-testid="pdap-footer-toggle"]');

		expect(button.attributes('aria-expanded')).toBe('false');
		expect(
			wrapper.get('[data-testid="pdap-footer-content"]').attributes('style')
		).toContain('display: none');
	});

	test('hides collapse toggle on mobile and content stays expanded', async () => {
		setMatchMedia(false);
		const wrapper = await mountFooter();

		expect(wrapper.find('[data-testid="pdap-footer-toggle"]').exists()).toBe(
			false
		);
		expect(
			wrapper.get('[data-testid="pdap-footer-content"]').attributes('style') ||
				''
		).not.toContain('display: none');
	});

	test('respects collapseOnFirstRender prop', async () => {
		setMatchMedia(true);
		const wrapper = await mountFooter({
			props: { collapseOnFirstRender: false },
		});

		const button = wrapper.get('[data-testid="pdap-footer-toggle"]');
		expect(button.attributes('aria-expanded')).toBe('true');
	});

	test('toggle button expands and collapses content', async () => {
		setMatchMedia(true);
		const wrapper = await mountFooter();

		const button = wrapper.get('[data-testid="pdap-footer-toggle"]');
		await button.trigger('click');
		expect(button.attributes('aria-expanded')).toBe('true');
		await button.trigger('click');
		expect(button.attributes('aria-expanded')).toBe('false');
	});

	test('prop changes reset collapse state', async () => {
		setMatchMedia(true);
		const wrapper = await mountFooter();
		const button = wrapper.get('[data-testid="pdap-footer-toggle"]');
		expect(button.attributes('aria-expanded')).toBe('false');

		await wrapper.setProps({ collapseOnFirstRender: false });
		await nextTick();
		expect(button.attributes('aria-expanded')).toBe('true');

		await wrapper.setProps({ collapseOnFirstRender: true });
		await nextTick();
		expect(button.attributes('aria-expanded')).toBe('false');
	});
});
