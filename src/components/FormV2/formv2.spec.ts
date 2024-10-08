import { describe, it, expect, vi, beforeEach } from 'vitest';
import { nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import PdapFormV2 from './PdapFormV2.vue';
import InputCheckbox from '../InputCheckbox/PdapInputCheckbox.vue';
import InputText from '../InputText/PdapInputText.vue';
import InputPassword from '../InputPassword/PdapInputPassword.vue';

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

const submit = vi.fn((values: Record<PropertyKey, unknown>, e: Event) => ({
	values,
	e,
}));

const BASE_CONFIG = {
	props: {
		defaultValues: {
			name: '',
			email: '',
			password: '',
			'ice-cream': false,
		},
		schema: [
			{
				name: 'name',
				validators: {
					required: {
						value: true,
					},
				},
			},
			{
				name: 'email',
				validators: {
					required: { value: true },
					email: { value: true },
				},
			},
			{
				name: 'password',
				validators: {
					password: { value: true, message: 'Password is too weak' },
				},
			},
		],
		id: 'test',
		name: 'test',
	},
	attrs: {
		onSubmit: submit,
	},
	slots: {
		default: `
      <InputText
        id="name"
        name="name"
        label="Name"
        placeholder="Name"
      />
      <InputText
        id="email"
        name="email"
        label="Email"
        placeholder="Email"
      />
      <InputPassword
        id="password"
        name="password"
        label="Password"
        placeholder="Password"
      />
      <InputCheckbox
        id="ice-cream"
        name="ice-cream"
        label="Ice Cream"
        :defaultChecked="false"
      />
    `,
	},
	global: {
		stubs: {
			InputCheckbox,
			InputText,
			InputPassword,
		},
	},
};

describe('PdapFormV2', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(PdapFormV2, BASE_CONFIG);
	});

	it('renders the form element', () => {
		expect(wrapper.find('form').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders error message slot when provided', () => {
		wrapper = mount(PdapFormV2, {
			...BASE_CONFIG,
			slots: {
				error: '<div>Custom Error Message</div>',
			},
		});
		expect(wrapper.find('.pdap-form-error-message').exists()).toBe(false);
		expect(wrapper.text()).toContain('Custom Error Message');
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders error message when errorMessage prop is provided', () => {
		wrapper = mount(PdapFormV2, {
			...BASE_CONFIG,
			props: {
				...BASE_CONFIG.props,
				error: 'Form Error',
			},
		});
		expect(wrapper.find('.pdap-form-error-message').text()).toBe('Form Error');
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders default error message when form has errors', async () => {
		wrapper.find('form').trigger('submit');
		await nextTick();
		expect(wrapper.find('.pdap-form-error-message').text()).toBe(
			'Please update this form to correct the errors'
		);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('calls submit event with form values on valid submission', async () => {
		const form = await wrapper.find('form');
		await form.find('input[name="name"]').setValue('John Doe');
		await form.find('input[name="email"]').setValue('john@example.com');
		await form.find('input[name="password"]').setValue('Password123!');
		await form.find('input[name="ice-cream"]').setChecked();

		await form.trigger('submit');
		await wrapper.vm.$forceUpdate();
		await wrapper.vm.$nextTick();

		expect(submit).toHaveBeenCalledWith(
			{
				name: 'John Doe',
				email: 'john@example.com',
				password: 'Password123!',
				'ice-cream': true,
			},
			expect.any(Event)
		);
		expect(wrapper.html()).toMatchSnapshot();
	});
});
