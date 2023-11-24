// Component
import PdapButton from './PdapButton.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Renders button component', () => {
	// Render
	test('Renders a button', () => {
		const wrapper = mount(PdapButton, {
			slots: {
				default: 'Button Content',
			},
		});

		expect(wrapper.find('button').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-button');
		expect(wrapper.html()).toContain('Button Content');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - intent
	test('Renders primary button', () => {
		const wrapper = mount(PdapButton, { props: { intent: 'primary' } });
		expect(wrapper.props()).toStrictEqual({
			intent: 'primary',
			isLoading: false,
		});
		expect(wrapper.classes()).toContain('pdap-button-primary');
	});

	test('Renders secondary button', () => {
		const wrapper = mount(PdapButton, { props: { intent: 'secondary' } });
		expect(wrapper.props().intent).toBe('secondary');
		expect(wrapper.classes()).toContain('pdap-button-secondary');
	});

	// Props - isLoading
	test('Renders loading button', () => {
		const wrapper = mount(PdapButton, { props: { isLoading: true } });
		expect(wrapper.props().isLoading).toBe(true);
		expect(wrapper.classes()).toContain('pdap-button-loading');
	});

	// Events
	test('Handles a click event', () => {
		const wrapper = mount(PdapButton);
		wrapper.find('button').trigger('click');
	});
	test('Handles a keydown event', () => {
		const wrapper = mount(PdapButton);
		wrapper.find('button').trigger('keydown');
	});
});
