// Component
import PdapForm from './PdapForm.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';
import { PdapInputTypes } from '../Input/types';
import { nextTick } from 'vue';

const schema = [
	{
		id: 'test-1',
		label: 'First test input',
		name: 'testOne',
		placeholder: 'Enter a value here',
		type: PdapInputTypes.TEXT,
		value: '',
		validators: {
			required: {
				message: 'This field is required',
				value: true,
			},
		},
	},
	{
		id: 'test-2',
		label: 'Second test input',
		name: 'testTwo',
		placeholder: 'Enter another value here',
		type: PdapInputTypes.TEXT,
		value: '',
		validators: {
			minLength: {
				message: 'This must be at least two characters',
				value: 2,
			},
		},
	},
	{
		id: 'checkbox-default-checked',
		name: 'checkboxDefaultChecked',
		label: 'Keep this box checked?',
		type: PdapInputTypes.CHECKBOX,
		defaultChecked: true,
	},
	{
		id: 'checkbox-default-unchecked',
		name: 'checkboxDefaultUnchecked',
		label: 'Check this box?',
		type: PdapInputTypes.CHECKBOX,
		defaultChecked: false,
	},
];

vi.mock('vue-router');
vi.mock('vue', async () => {
	const actual: Record<string, unknown> = await vi.importActual('vue');
	return {
		...actual,
		/** Shim for `exportHelper` function which throws errors on Input because actual
		 * Vue impl does not have optional chaining on `sfc.__vccOpts` check */
		exportHelper: function (
			sfc: Record<string, unknown>,
			props: [string, string][]
		) {
			const newObject = sfc?.vccOpts ?? sfc;
			for (const [key, val] of props) {
				newObject[key] = val;
			}
			return newObject;
		},
	};
});
vi.mock('@vuelidate/core', async () => {
	const actual: Record<string, unknown> =
		await vi.importActual('@vuelidate/core');

	return {
		...actual,
	};
});

const handlers = {
	submit: (values: Record<string, string>) => values,
};

const base = {
	global: {
		mocks: {
			$route: {
				fullPath: '/',
			},
			$router: {
				push: vi.fn(),
			},
		},
	},
	props: {
		schema,
		id: 'test',
		name: 'test',
	},
	attrs: {
		submit: handlers.submit,
	},
	slots: {
		default: '<button type="submit">Submit</button>',
	},
};

describe('Form component', () => {
	test('Renders component in static state', () => {
		const wrapper = mount(PdapForm, base);

		expect(wrapper.find('.pdap-form').exists()).toBe(true);
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders component in form error state', () => {
		const wrapper = mount(PdapForm, {
			...base,
			props: { ...base.props, error: 'This form is incorrect' },
		});

		expect(wrapper.find('.pdap-form').exists()).toBe(true);
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders correct inputs per schema, accepts user actions', async () => {
		const wrapper = mount(PdapForm, base);

		// Get elements
		const inputTextOne = await wrapper.find('#test-1');
		const inputTextTwo = await wrapper.find('#test-2');
		const inputCheckboxDefaultChecked = await wrapper.find(
			'#checkbox-default-checked'
		);
		const inputCheckboxDefaultUnchecked = await wrapper.find(
			'#checkbox-default-unchecked'
		);
		await nextTick();

		const elements = [
			inputTextOne,
			inputTextTwo,
			inputCheckboxDefaultChecked,
			inputCheckboxDefaultUnchecked,
		];

		// Assert existence and expected default values
		elements.forEach((element) => {
			expect(element.exists()).toBe(true);
		});
		elements.slice(0, 1).forEach((element) => {
			expect((element.element as HTMLInputElement).value).toBe('');
		});
		expect(
			(inputCheckboxDefaultChecked.element as HTMLInputElement).value
		).toBe('true');
		expect(
			(inputCheckboxDefaultUnchecked.element as HTMLInputElement).value
		).toBe('false');

		// Interact with elements
		await inputTextOne.setValue('foo');
		await inputTextTwo.setValue('bar');
		await inputCheckboxDefaultChecked.trigger('change');
		await inputCheckboxDefaultUnchecked.trigger('change');
		await nextTick();

		// Assert new values
		expect((inputTextOne.element as HTMLInputElement).value).toBe('foo');
		expect((inputTextTwo.element as HTMLInputElement).value).toBe('bar');
		expect(
			(inputCheckboxDefaultChecked.element as HTMLInputElement).value
		).toBe('false');
		expect(
			(inputCheckboxDefaultUnchecked.element as HTMLInputElement).value
		).toBe('true');
	});

	test('Submits with correct values', async () => {
		const wrapper = mount(PdapForm, base);

		const inputTextOne = wrapper.find('#test-1');
		const inputTextTwo = wrapper.find('#test-2');
		await nextTick();

		await inputTextOne.setValue('foo');
		await inputTextTwo.setValue('bar');

		await wrapper.find('form').trigger('submit');
		await nextTick();

		// TODO: This technically gets coverage, but doesn't assert against anything...
		// ....How to fix testing of emitted events and submit handler? None of this is working as
		// ....expected per Vue Test Utils docs: https://test-utils.vuejs.org/guide/essentials/forms
		// expect(wrapper.emitted('submit')?.[0][0]).toBe('foo');
		// expect(submitSpy).toHaveBeenCalled();
	});

	test('Form validation with incorrect values and clears form error state', async () => {
		const wrapper = mount(PdapForm, base);

		const inputTextOne = wrapper.find('#test-1');
		const inputTextTwo = wrapper.find('#test-2');
		await nextTick();

		await inputTextOne.setValue('');
		await inputTextTwo.setValue('a');
		await nextTick();

		// TODO: `setProps` is not the best way to to this. Find out why trigger('submit') is not working
		// await wrapper.find('form').trigger('submit');
		await wrapper.setProps({ ...base.props, error: 'Error' });
		await nextTick();

		// Assert error state
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(true);

		// Set values to correct values
		await inputTextOne.setValue('aaaaa');
		await inputTextTwo.setValue('bvvvvv');

		await wrapper.setProps({ ...base.props, error: null });
		await nextTick();

		// Assert error message no longer present
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(false);
	});
});
