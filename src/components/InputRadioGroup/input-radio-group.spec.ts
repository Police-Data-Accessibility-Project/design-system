import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import RadioGroup from './PdapInputRadioGroup.vue';
import { provideKey } from '../FormV2/util';
import { ref } from 'vue';

describe('RadioGroup', () => {
	let wrapper: VueWrapper;
	const mockSetValues = vi.fn();
	const mockValues = ref({});
	const mockV$ = ref({
		testName: {
			$error: false,
			$errors: [],
		},
	});

	const defaultProps = {
		name: 'testName',
	};

	beforeEach(() => {
		mockSetValues.mockClear();
	});

	const createWrapper = (props = {}, slots = {}) => {
		return mount(RadioGroup, {
			props: {
				...defaultProps,
				...props,
			},
			slots,
			global: {
				provide: {
					[provideKey as symbol]: {
						setValues: mockSetValues,
						values: mockValues,
						v$: mockV$,
					},
				},
			},
		});
	};

	it('renders correctly with default props', () => {
		wrapper = createWrapper();
		expect(wrapper.find('.pdap-input-radio-group').exists()).toBe(true);
	});

	it('renders slot content', () => {
		wrapper = createWrapper(
			{},
			{
				default: '<div class="test-content">Test Content</div>',
			}
		);
		expect(wrapper.find('.test-content').exists()).toBe(true);
	});

	it('shows error message when error exists', async () => {
		mockV$.value.testName.$error = true;
		// @ts-expect-error
		mockV$.value.testName.$errors = [{ $message: 'Test error message' }];
		wrapper = createWrapper();
		expect(wrapper.find('.pdap-input-error').exists()).toBe(true);
	});

	it('shows custom error slot when provided and error exists', () => {
		mockV$.value.testName.$error = true;
		wrapper = createWrapper(
			{},
			{
				error: '<div class="custom-error">Custom Error</div>',
			}
		);
		expect(wrapper.find('.custom-error').exists()).toBe(true);
	});
});
