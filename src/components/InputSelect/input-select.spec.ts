import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import PdapInputSelect from './PdapInputSelect.vue';
import { nextTick } from 'vue';
import { provideKey } from '../FormV2/util';

const options = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

const defaultProps = {
	name: 'testSelect',
	options,
	id: 'testId',
	label: 'Test Label',
};

const mockFormProvide = {
	setValues: vi.fn(),
	values: {},
	v$: { value: {} },
};

const BASE_DEFAULT = {
	props: defaultProps,
	global: {
		provide: {
			[provideKey as symbol]: mockFormProvide,
		},
	},
};

describe('PdapInputSelect', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it('renders correctly with default props', () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);
		expect(wrapper.find('label').text()).toBe('Test Label');
		expect(wrapper.find('.selected-value').text()).toBe('Select an option');
		expect(wrapper.findAll('.option').length).toBe(3);
	});

	it('opens options when clicked', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('click');
		expect(wrapper.find('.custom-select').classes()).toContain('open');
		expect(wrapper.find('.options').isVisible()).toBe(true);
	});

	it('selects an option when clicked', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('click');
		await wrapper.findAll('.option')[1].trigger('click');

		expect(wrapper.find('.selected-value').text()).toBe('Option 2');
		expect(mockFormProvide.setValues).toHaveBeenCalledWith({
			testSelect: 'option2',
		});
	});

	it('handles keyboard navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(0);

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(1);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.selected-value').text()).toBe('Option 2');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.custom-select').classes()).not.toContain('open');
	});

	it('displays error message when provided', async () => {
		const wrapper = mount(PdapInputSelect, {
			...BASE_DEFAULT,
			global: {
				...BASE_DEFAULT.global,
				provide: {
					...BASE_DEFAULT.global.provide,
					[provideKey as symbol]: {
						...mockFormProvide,
						v$: {
							value: {
								testSelect: {
									$error: true,
									$errors: [{ $message: 'Error message' }],
								},
							},
						},
					},
				},
			},
		});

		await nextTick();
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').text()).toBe(
			'Error message'
		);
	});

	// it('updates when form values change', async () => {
	// 	const wrapper = mount(PdapInputSelect, {
	// 		...BASE_DEFAULT,
	// 		props: defaultProps,
	// 		global: {
	// 			...BASE_DEFAULT.global,
	// 			provide: {
	// 				[provideKey as symbol]: {
	// 					...mockFormProvide,
	// 					values: { testSelect: 'option3' },
	// 				},
	// 			},
	// 		},
	// 	});

	// 	await wrapper.vm.$forceUpdate();
	// 	expect(wrapper.find('.selected-value').text()).toBe('Option 3');
	// });

	it('handles Tab key navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		// const options = wrapper.findAll('.option');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Tab' });
		expect(wrapper.find('.custom-select').classes()).not.toContain('open');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		// TODO: figure out why this test isn't working
		// await wrapper.find('.custom-select').trigger('keydown', { key: 'Tab' });
		// expect(options[0].classes()).toContain('selected');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Tab' });
		expect(wrapper.emitted('keydown')).toBeTruthy();
	});

	it('handles ArrowDown key navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(0);

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(1);

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(2);

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(2);
	});

	it('handles ArrowUp key navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'ArrowUp' });
		expect(wrapper.find('.custom-select').classes()).not.toContain('open');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });

		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(0);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'ArrowUp' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(-1);
	});

	it('handles Enter key navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper
			.find('.custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		// @ts-expect-error vm doesn't play well with TS
		expect(wrapper.vm.focusedOptionIndex).toBe(0);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.selected-value').text()).toBe('Option 1');
		expect(wrapper.find('.custom-select').classes()).not.toContain('open');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');
	});

	it('handles Escape key navigation', async () => {
		const wrapper = mount(PdapInputSelect, BASE_DEFAULT);

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.custom-select').classes()).toContain('open');

		await wrapper.find('.custom-select').trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.custom-select').classes()).not.toContain('open');
	});
});
