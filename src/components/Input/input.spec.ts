import PdapInput from './PdapInput.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import { PdapInputTypes } from './types';
import { nextTick } from 'vue';

const baseCheckbox = {
	props: {
		error: undefined,
		id: 'test-checked',
		label: 'test this checkbox input',
		name: 'testCheckbox',
		type: PdapInputTypes.CHECKBOX,
		defaultChecked: false,
	},
};

const baseText = {
	props: {
		error: undefined,
		id: 'test-text',
		label: 'test this text input',
		name: 'testText',
		placeholder: 'This is testing testing',
		type: PdapInputTypes.TEXT,
		value: '',
	},
};

describe('Input component', () => {
	test('Renders text input in okay state', () => {
		const wrapper = mount(PdapInput, baseText);

		expect(
			wrapper.find('.pdap-input').find('input[type="text"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders text input in error state', () => {
		const wrapper = mount(PdapInput, {
			...baseText,
			props: { ...baseText.props, error: 'error message' },
		});

		expect(
			wrapper.find('.pdap-input').find('input[type="text"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders password input in okay state', () => {
		const wrapper = mount(PdapInput, {...baseText, props: {...baseText.props, type: PdapInputTypes.PASSWORD}});

		expect(
			wrapper.find('.pdap-input').find('input[type="password"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders password input in error state', () => {
		const wrapper = mount(PdapInput, {
			...baseText,
			props: { ...baseText.props, error: 'error message', type: PdapInputTypes.PASSWORD},
		});

		expect(
			wrapper.find('.pdap-input').find('input[type="password"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders checkbox input in okay state', () => {
		const wrapper = mount(PdapInput, baseCheckbox);

		expect(
			wrapper.find('.pdap-input').find('input[type="checkbox"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders checkbox input in error state', () => {
		const wrapper = mount(PdapInput, {
			...baseCheckbox,
			props: { ...baseCheckbox.props, error: 'error message' },
		});

		expect(
			wrapper.find('.pdap-input').find('input[type="checkbox"]').exists()
		).toBe(true);
		expect(wrapper.find('.pdap-input-error-message').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Text input accepts user input', async () => {
		const wrapper = mount(PdapInput, baseText);

		const input = wrapper.find('input[type="text"]');
		input.setValue('nonsense');
		await nextTick();

		expect((input.element as HTMLInputElement).value).toBe('nonsense');
	});

	test('Checkbox input accepts user input', async () => {
		const wrapper = mount(PdapInput, baseCheckbox);

		const input = wrapper.find('input[type="checkbox"]');
		await nextTick();

		// First assert falsy value
		expect((input.element as HTMLInputElement).checked).toBe(false);

		// Set checkbox value
		input.trigger('change');
		await nextTick();

		expect((input.element as HTMLInputElement).checked).toBe(true);
	});
});
