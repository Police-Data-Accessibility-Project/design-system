import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ErrorBoundary from './PdapErrorBoundary.vue';
import { nextTick } from 'vue';

let wrapper;

describe('ErrorBoundary', () => {
	beforeEach(() => {
		wrapper = mount(ErrorBoundary, {
			slots: {
				default: '<div data-test="default-slot" />',
			},
		});
	});

	it('renders slot content with no error', () => {
		expect(wrapper.find('[data-test="default-slot"]').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders error content with error', async () => {
		wrapper.vm.interceptError(new Error('Generic error'));
		await nextTick();

		expect(wrapper.find('[data-test="error-boundary-message"]').exists()).toBe(
			true
		);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('calls the onError callback when an error occurs', async () => {
		const onErrorSpy = vi.fn();

		wrapper = mount(ErrorBoundary, {
			props: {
				onError: onErrorSpy,
			},
			slots: {
				default: '<div>Default Content</div>',
			},
		});

		const testError = new Error('Test Error');
		wrapper.vm.interceptError(testError);
		await nextTick();

		expect(onErrorSpy).toHaveBeenCalledWith(testError, undefined, undefined);
	});
});
