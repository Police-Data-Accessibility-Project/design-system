import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PdapInputDatePicker from './PdapInputDatePicker.vue';
import { provideKey } from '../FormV2/util';
import VueDatePicker from '@vuepic/vue-datepicker';
import { ref } from 'vue';

describe('PdapInputDatePicker', () => {
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
		id: 'test-id',
		label: 'Test Label',
	};

	const removeEventListener = vi.fn();
	// Mock window.matchMedia
	const mockMatchMedia = vi.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addEventListener: vi.fn(),
		removeEventListener,
		dispatchEvent: vi.fn(),
	}));

	beforeEach(() => {
		global.MediaQueryListEvent = vi
			.fn()
			.mockImplementation((type, eventInitDict) => ({
				type,
				matches: eventInitDict.matches,
				media: '',
				target: {
					matches: eventInitDict.matches,
				},
			}));

		window.matchMedia = mockMatchMedia;
		wrapper = mount(PdapInputDatePicker, {
			props: defaultProps,
			global: {
				provide: {
					[provideKey as symbol]: {
						setValues: mockSetValues,
						values: mockValues,
						v$: mockV$,
					},
				},
				stubs: {
					VueDatePicker: true,
				},
			},
		});
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.unstubAllGlobals();
	});

	describe('Rendering', () => {
		it('renders correctly with default props', () => {
			expect(wrapper.exists()).toBe(true);
			expect(wrapper.find('label').text()).toBe('Test Label');
			expect(wrapper.findComponent(VueDatePicker).exists()).toBe(true);
		});

		it('renders label prop when no slot is provided', () => {
			wrapper = mount(PdapInputDatePicker, {
				props: {
					...defaultProps,
					label: 'Label from prop',
				},
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			const label = wrapper.find(`label[for="${defaultProps.id}"]`);
			expect(label.exists()).toBe(true);
			expect(label.text()).toBe('Label from prop');
			expect(label.attributes('id')).toBe(
				`${defaultProps.name}-${defaultProps.id}-label`
			);
		});

		it('renders label slot when provided', () => {
			wrapper = mount(PdapInputDatePicker, {
				props: {
					...defaultProps,
					label: 'Label from prop', // This should be ignored when slot is present
				},
				slots: {
					label: '<span class="custom-label">Custom Label Content</span>',
				},
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			const label = wrapper.find(`label[for="${defaultProps.id}"]`);
			expect(label.exists()).toBe(true);
			expect(label.find('.custom-label').exists()).toBe(true);
			expect(label.text()).toBe('Custom Label Content');
			expect(label.text()).not.toBe('Label from prop');
			expect(label.attributes('id')).toBe(
				`${defaultProps.name}-${defaultProps.id}-label`
			);
		});

		it('does not render label when neither prop nor slot is provided', () => {
			wrapper = mount(PdapInputDatePicker, {
				props: {
					name: 'testName',
					id: 'test-id',
					// label prop intentionally omitted
				},
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			expect(wrapper.find('label').exists()).toBe(false);
		});

		it('renders complex label slot content', () => {
			wrapper = mount(PdapInputDatePicker, {
				props: {
					...defaultProps,
				},
				slots: {
					label: `
                  <div class="complex-label">
                      <span class="label-title">Complex Label</span>
                      <small class="label-hint">* Required field</small>
                  </div>
              `,
				},
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			const label = wrapper.find(`label[for="${defaultProps.id}"]`);
			expect(label.exists()).toBe(true);
			expect(label.find('.complex-label').exists()).toBe(true);
			expect(label.find('.label-title').text()).toBe('Complex Label');
			expect(label.find('.label-hint').text()).toBe('* Required field');
		});

		it('renders error slot when slot is provided', () => {
			mockV$.value = {
				...mockV$.value,
				testName: {
					$error: true,
					// @ts-expect-error
					$errors: [{ $message: 'Error Message' }],
				},
			};

			wrapper = mount(PdapInputDatePicker, {
				props: {
					...defaultProps,
				},
				slots: {
					error: '<span class="custom-error">Custom Error Message</span>',
				},
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			const errorElement = wrapper.find(
				'.pdap-input-error-message .custom-error'
			);
			expect(errorElement.exists()).toBe(true);
			expect(errorElement.text()).toBe('Custom Error Message');
		});
	});

	describe('Form Integration', () => {
		it('calls setValues when date changes', async () => {
			const datePicker = wrapper.findComponent(VueDatePicker);
			const newDate = new Date('2024-01-01');

			await datePicker.vm.$emit('update:modelValue', newDate);

			expect(mockSetValues).toHaveBeenCalledWith({
				[defaultProps.name]: newDate,
			});
		});

		it('updates date when form values change externally', async () => {
			const newDate = new Date('2024-01-01');
			mockValues.value = {
				[defaultProps.name]: newDate,
			};

			await wrapper.vm.$nextTick();

			// @ts-expect-error
			expect(wrapper.vm.date).toEqual(newDate);
		});

		it('clears date when form value is removed', async () => {
			mockValues.value = {
				[defaultProps.name]: undefined,
			};

			await wrapper.vm.$nextTick();

			// @ts-expect-error
			expect(wrapper.vm.date).toBeUndefined();
		});
	});

	describe('Dark Mode', () => {
		it('initializes with system dark mode preference', () => {
			const darkModeMatchMedia = vi.fn().mockImplementation(() => ({
				matches: true,
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			}));
			window.matchMedia = darkModeMatchMedia;

			wrapper = mount(PdapInputDatePicker, {
				props: defaultProps,
				global: {
					provide: {
						[provideKey as symbol]: {
							setValues: mockSetValues,
							values: mockValues,
							v$: mockV$,
						},
					},
					stubs: {
						VueDatePicker: true,
					},
				},
			});

			// @ts-expect-error
			expect(wrapper.vm.darkModePreference).toBe(true);
		});

		it('updates dark mode preference when system preference changes', async () => {
			const mockEvent = {
				matches: true,
				type: 'change',
			} as MediaQueryListEvent;

			// @ts-expect-error
			wrapper.vm.updateColorMode(mockEvent);
			await wrapper.vm.$nextTick();

			// @ts-expect-error
			expect(wrapper.vm.darkModePreference).toBe(true);
		});
	});

	describe('Validation', () => {
		it('shows validation error from v$', async () => {
			mockV$.value = {
				testName: {
					$error: true,
					// @ts-expect-error
					$errors: [{ $message: 'Validation error' }],
				},
			};

			await wrapper.vm.$nextTick();

			expect(wrapper.find('.pdap-input-error-message').text()).toBe(
				'Validation error'
			);
		});
	});

	describe('Cleanup', () => {
		it('removes event listener on unmount', async () => {
			wrapper.unmount();

			expect(removeEventListener).toHaveBeenCalledWith(
				'change',
				expect.any(Function)
			);
		});
	});
});
