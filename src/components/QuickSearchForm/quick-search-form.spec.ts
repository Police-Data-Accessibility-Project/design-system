// Component
import QuickSearchForm from './QuickSearchForm.vue';

// Utils
import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
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

	describe('Form triggers router push when rendered in app with /search/ route', async () => {
		let searchInput;
		let locationInput;
		let wrapper;

		beforeEach(() => {
			getRoutes.mockReturnValueOnce([{ path: '/search/:foo/:bar' }]);

			wrapper = mount(QuickSearchForm, base);

			// Set input values
			searchInput = wrapper.find('#search-term');
			locationInput = wrapper.find('#location');
		});

		test('Form triggers router push with both values set', async () => {
			await searchInput.setValue('foo');
			await locationInput.setValue('bar');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			// Assert router push
			expect(push).toHaveBeenCalledWith('/search/foo/bar');
		});

		test('Form triggers router push with first value set, second unset', async () => {
			await searchInput.setValue('foo');
			await locationInput.setValue('');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			// Assert router push
			expect(push).toHaveBeenCalledWith('/search/foo/all');
		});

		test('Form triggers router push with second value set, first unset', async () => {
			await searchInput.setValue('');
			await locationInput.setValue('bar');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			// Assert router push
			expect(push).toHaveBeenCalledWith('/search/all/bar');
		});
	});

	describe('Form triggers window navigation when rendered in app without /search/ route — prod mode', async () => {
		let searchInput;
		let locationInput;
		let wrapper;

		beforeEach(() => {
			getRoutes.mockReturnValueOnce([
				{ path: '/' },
				{ path: '/foo' },
				{ path: '/bar' },
			]);

			wrapper = mount(QuickSearchForm, base);

			// Set input values
			searchInput = wrapper.find('#search-term');
			locationInput = wrapper.find('#location');
		});

		test('Form triggers navigation with both values set', async () => {
			await searchInput.setValue('foo');
			await locationInput.setValue('bar');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			expect(assign).toHaveBeenCalledWith(
				'https://data-sources.pdap.io/search/foo/bar'
			);
		});

		test('Form triggers navigation with first value set, second unset', async () => {
			await searchInput.setValue('foo');
			await locationInput.setValue('');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			expect(assign).toHaveBeenCalledWith(
				'https://data-sources.pdap.io/search/foo/all'
			);
		});

		test('Form triggers navigation with second value set, first unset', async () => {
			await searchInput.setValue('');
			await locationInput.setValue('bar');
			await nextTick();

			// Submit
			await wrapper.find('form').trigger('submit');
			await nextTick();
			await wrapper.vm.$forceUpdate();

			expect(assign).toHaveBeenCalledWith(
				'https://data-sources.pdap.io/search/all/bar'
			);
		});
	});

	test('Form triggers window navigation when rendered in app without /search/ route — custom baseUrlForRedirect', async () => {
		const baseUrlForRedirect = 'https://data-sources.pdap.dev';
		getRoutes.mockReturnValueOnce([
			{ path: '/' },
			{ path: '/foo' },
			{ path: '/bar' },
		]);

		const wrapper = mount(QuickSearchForm, {
			...base,
			props: {
				baseUrlForRedirect,
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
		await wrapper.vm.$forceUpdate();

		// Assert submit event
		expect(assign).toHaveBeenCalledWith(
			'https://data-sources.pdap.dev/search/foo/bar'
		);
	});

	test('Form errors when submitted with both inputs blank', async () => {
		const wrapper = mount(QuickSearchForm, base);

		// Submit
		await wrapper.find('form').trigger('submit.prevent');
		await nextTick();
		await wrapper.vm.$forceUpdate();

		// Assert error message
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(true);
		expect(wrapper.get('.pdap-form-error-message').text()).toBe(
			'Either a search term or a location is required.'
		);
	});
});
