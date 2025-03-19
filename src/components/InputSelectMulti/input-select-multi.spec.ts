import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PdapInputSelectMulti from './PdapInputSelectMulti.vue';
import { provideKey } from '../FormV2/util';

const options = [
	{ value: 'option1', label: 'Option 1' },
	{ value: 'option2', label: 'Option 2' },
	{ value: 'option3', label: 'Option 3' },
];

const defaultProps = {
	name: 'test-select',
	options,
	id: 'testId',
	label: 'Test Label',
};

const mockFormProvide = {
	setValues: vi.fn(),
	values: {},
	v$: { value: {} },
};

describe('PdapInputSelectMulti', () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	const mountComponent = (props = {}, global = { provide: {} }) => {
		return mount(PdapInputSelectMulti, {
			props: {
				...defaultProps,
				...props,
			},
			global: {
				...global,
				provide: {
					...(global?.provide ?? {}),
					[provideKey as symbol]: mockFormProvide,
				},
			},
		});
	};

	it('renders with required label', () => {
		const wrapper = mountComponent();
		expect(wrapper.find('label').text()).toBe('Test Label');
	});

	it('throws error when no label is provided', () => {
		expect(() => mountComponent({ label: undefined })).toThrow(
			'All form inputs must have a label, passed as a slot or a prop'
		);
	});

	it('displays placeholder when no options are selected', () => {
		const wrapper = mountComponent();
		expect(wrapper.find('.selected-value').text()).toBe('Select options');
		expect(wrapper.find('.value-is-placeholder').exists()).toBe(true);
	});

	it('opens options when clicked', async () => {
		const wrapper = mountComponent();

		await wrapper.find('.pdap-custom-select').trigger('click');
		expect(wrapper.find('.pdap-custom-select').classes()).toContain('open');
		expect(wrapper.find('.pdap-custom-select-options').isVisible()).toBe(true);
	});

	it('selects and deselects options', async () => {
		const wrapper = mountComponent();

		// Open dropdown
		await wrapper.find('.pdap-custom-select').trigger('click');

		// Select first option
		await wrapper.findAll('.pdap-custom-select-option')[0].trigger('click');

		// Verify selection
		expect(wrapper.find('.selected-value').text()).toBe('Option 1');
		expect(mockFormProvide.setValues).toHaveBeenCalledWith({
			'test-select': ['option1'],
		});
	});

	it('handles keyboard navigation', async () => {
		const wrapper = mountComponent();

		await wrapper
			.find('.pdap-custom-select')
			.trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.pdap-custom-select').classes()).toContain('open');

		await wrapper
			.find('.pdap-custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		expect(wrapper.vm.focusedOptionIndex).toBe(0);

		await wrapper
			.find('.pdap-custom-select')
			.trigger('keydown', { key: 'ArrowDown' });
		expect(wrapper.vm.focusedOptionIndex).toBe(1);

		await wrapper
			.find('.pdap-custom-select')
			.trigger('keydown', { key: 'Enter' });
		expect(wrapper.find('.selected-value').text()).toBe('Option 2');

		await wrapper
			.find('.pdap-custom-select')
			.trigger('keydown', { key: 'Escape' });
		expect(wrapper.find('.pdap-custom-select').classes()).not.toContain('open');
	});

	// it('displays error message when provided', async () => {
	// 	const wrapper = mountComponent(defaultProps, {
	// 		provide: {
	// 			[provideKey as symbol]: {
	// 				...mockFormProvide,
	// 				v$: {
	// 					value: {
	// 						'test-select': {
	// 							$error: true,
	// 							$errors: [{ $message: 'Error message' }],
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	});

	// 	await nextTick();
	// 	expect(wrapper.find('.pdap-input-error-message').text()).toBe(
	// 		'This field is required'
	// 	);
	// 	expect(wrapper.find('.pdap-input-error').exists()).toBe(true);
	// });

	it('emits change event when selection changes', async () => {
		const wrapper = mountComponent();

		await wrapper.find('.pdap-custom-select').trigger('click');
		await wrapper.findAll('.pdap-custom-select-option')[0].trigger('click');

		expect(wrapper.emitted('change')).toBeTruthy();
		expect(wrapper.emitted('change')[0][0]).toEqual([
			{ label: 'Option 1', value: 'option1' },
		]);
	});

	it('handles multiple selections', async () => {
		const wrapper = mountComponent();

		await wrapper.find('.pdap-custom-select').trigger('click');
		await wrapper.findAll('.pdap-custom-select-option')[0].trigger('click');
		await wrapper.findAll('.pdap-custom-select-option')[1].trigger('click');

		expect(wrapper.find('.selected-value').text()).toBe('Option 1, Option 2');
		expect(mockFormProvide.setValues).toHaveBeenLastCalledWith({
			'test-select': ['option1', 'option2'],
		});
	});
});
