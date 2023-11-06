// Component
import Button from './Button.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Button component', () => {
	// Render
	test('Renders a button', () => {
		const wrapper = mount(Button);
		expect(wrapper.find('button').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-button');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - intent
	test('Renders primary button', () => {
		const wrapper = mount(Button, { props: { intent: 'primary' } });
		expect(wrapper.props()).toStrictEqual({
			className: undefined,
			intent: 'primary',
			isLoading: false,
		});
		expect(wrapper.classes()).toContain('pdap-button-primary');
	});

	test('Renders secondary button', () => {
		const wrapper = mount(Button, { props: { intent: 'secondary' } });
		expect(wrapper.props().intent).toBe('secondary');
		expect(wrapper.classes()).toContain('pdap-button-secondary');
	});

	// Props - isLoading
	test('Renders loading button', () => {
		const wrapper = mount(Button, { props: { isLoading: true } });
		expect(wrapper.props().isLoading).toBe(true);
		expect(wrapper.classes()).toContain('pdap-button-loading');
	});

	// Events
	test('Button handles click event', () => {
		const wrapper = mount(Button);
		wrapper.find('button').trigger('click');
	});
	test('Button handles keydown event', () => {
		const wrapper = mount(Button);
		wrapper.find('button').trigger('keydown');
	});
});
