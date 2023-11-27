// Component
import FlexContainer from './FlexContainer.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Renders container component', () => {
	// Render
	test('Renders a container', () => {
		const wrapper = mount(FlexContainer, {
			slots: {
				// Todo: Render some actual components here to test
				default: 'Container Content',
			},
		});

		expect(wrapper.find('.pdap-flex-container').exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-flex-container');
		expect(wrapper.html()).toContain('Container Content');
		expect(wrapper.html()).toMatchSnapshot();
	});

	// Props
	// Props - align
	test('Renders start aligned container', () => {
		const wrapper = mount(FlexContainer, { props: { alignment: 'start' } });
		expect(wrapper.props().alignment).toBe('start');
		expect(wrapper.classes()).toContain('pdap-flex-container-start');
	});

	test('Renders center aligned container', () => {
		const wrapper = mount(FlexContainer, { props: { alignment: 'center' } });
		expect(wrapper.props().alignment).toBe('center');
		expect(wrapper.classes()).toContain('pdap-flex-container-center');
	});
});
