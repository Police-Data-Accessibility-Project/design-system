// Component
import QuickSearchForm from './QuickSearchForm.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { useRouter } from 'vue-router';

const useRouterMock = vi.fn(() => {
	const router = useRouter();
	return {
		...router,
		routes: [{ path: '/search/' }],
		push: vi.fn(),
	};
});
// Test
describe('QuickSearchForm component', () => {
	// Render
	test('Renders a QuickSearchForm', () => {
		const wrapper = mount(QuickSearchForm);

		expect(wrapper.find('.pdap-quick-search-form').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Button triggers router push when rendered in app with /search/ route', async () => {
		const router = useRouterMock();
		const wrapper = mount(QuickSearchForm);

		// Set input values
		const searchInput = wrapper.find('#search-term');
		const locationInput = wrapper.find('#location');
		await searchInput.setValue('foo');
		await locationInput.setValue('bar');
		await nextTick();

		// Submit
		vi.spyOn(router, 'push');
		await wrapper.find('.pdap-button').trigger('click');
		await nextTick();

		// Assert
		expect((searchInput.element as HTMLInputElement).value).toBe('foo');
		expect((locationInput.element as HTMLInputElement).value).toBe('bar');

		// TODO: Figure out how to mock the router properly
		// It's possible that the refactor to Form will make this easier?
		// Or maybe we should be finding the Form child and listening for emit?
		// expect(router.push).toHaveBeenCalled();
		// expect(router.push).toHaveBeenCalledWith('/search/foo/bar');
	});
});
