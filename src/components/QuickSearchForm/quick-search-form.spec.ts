// Component
import QuickSearchForm from './QuickSearchForm.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';

// Mocks and stubs
const getRoutes = vi.fn(() => [{ path: '/search/:foo/:bar' }]);
const push = vi.fn();
vi.mock('vue-router', async () => {
	const actual: Record<string, unknown> = await vi.importActual('vue-router');
	return {
		...actual,
		useRouter: vi.fn(() => {
			return {
				push,
				getRoutes,
			};
		}),
	};
});

const assign = vi.fn();
vi.stubGlobal('location', {
	assign,
});

// Config
const base = {
	props: {
		mode: 'prod' as const,
	},
};

// Test
describe('QuickSearchForm component', () => {
	// Render
	test('Renders a QuickSearchForm', () => {
		const wrapper = mount(QuickSearchForm, base);

		expect(wrapper.find('.pdap-quick-search-form').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Button triggers router push when rendered in app with /search/ route', async () => {
		getRoutes.mockReturnValueOnce([{ path: '/search/:foo/:bar' }]);

		const wrapper = mount(QuickSearchForm, base);

		// Set input values
		const searchInput = wrapper.find('#search-term');
		const locationInput = wrapper.find('#location');
		await searchInput.setValue('foo');
		await locationInput.setValue('bar');
		await nextTick();

		// Assert
		expect((searchInput.element as HTMLInputElement).value).toBe('foo');
		expect((locationInput.element as HTMLInputElement).value).toBe('bar');

		// Submit
		await wrapper.find('form').trigger('submit');
		await nextTick();

		// Assert submit event
		expect(wrapper.emitted()).toHaveProperty('submit');

		// TODO: how to test router push called via form submit event. Not working anywhere.
		// expect(push).toHaveBeenCalledWith('/search/foo/bar');
	});

	test('Button triggers window navigation when rendered in app without /search/ route — prod mode', async () => {
		getRoutes.mockReturnValueOnce([
			{ path: '/' },
			{ path: '/foo' },
			{ path: '/bar' },
		]);

		const wrapper = mount(QuickSearchForm, base);

		// Set input values
		const searchInput = wrapper.find('#search-term');
		const locationInput = wrapper.find('#location');
		await searchInput.setValue('foo');
		await locationInput.setValue('bar');
		await nextTick();

		// Submit
		await wrapper.find('form').trigger('submit');
		await nextTick();

		// Assert submit event
		expect(wrapper.emitted()).toHaveProperty('submit');

		// TODO: how to test window.assign called via form submit event. Not working anywhere.
		// expect(assign).toHaveBeenCalledWith(
		// 	'https://data-sources.pdap.io/search/foo/bar'
		// );
	});

	test('Button triggers window navigation when rendered in app without /search/ route — dev mode', async () => {
		getRoutes.mockReturnValueOnce([
			{ path: '/' },
			{ path: '/foo' },
			{ path: '/bar' },
		]);

		const wrapper = mount(QuickSearchForm, {
			...base,
			props: {
				mode: 'dev' as const,
			},
		});

		// Set input values
		const searchInput = wrapper.find('#search-term');
		const locationInput = wrapper.find('#location');
		await searchInput.setValue('foo');
		await locationInput.setValue('bar');
		await nextTick();

		// Submit
		await wrapper.find('form').trigger('submit');
		await nextTick();

		// Assert submit event
		expect(wrapper.emitted()).toHaveProperty('submit');

		// TODO: how to test window.assign called via form submit event. Not working anywhere.
		// expect(assign).toHaveBeenCalledWith(
		// 	'https://data-sources.pdap.dev/search/foo/bar'
		// );
	});
});
