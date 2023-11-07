// Component
import PdapContainer from './PdapContainer.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Renders container component', () => {
	// Render
	test('Renders a container', () => {
		const wrapper = mount(PdapContainer, {
			slots: {
				// Todo: Render some actual components here to test
				default: 'Container Content',
			},
		});

		expect(wrapper.find('.pdap-container').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-container');
		expect(wrapper.html()).toContain('Container Content');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - align
	test('Renders start aligned container', () => {
		const wrapper = mount(PdapContainer, { props: { align: 'start' } });
		expect(wrapper.props().align).toBe('start');
		expect(wrapper.classes()).toContain('pdap-container-start');
	});

	test('Renders center aligned container', () => {
		const wrapper = mount(PdapContainer, { props: { align: 'center' } });
		expect(wrapper.props().align).toBe('center');
		expect(wrapper.classes()).toContain('pdap-container-center');
	});
});
