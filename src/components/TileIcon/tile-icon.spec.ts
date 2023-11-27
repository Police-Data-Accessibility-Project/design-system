// Component
import TileIcon from './TileIcon.vue';

// Utils
import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';

// Test
describe('Tile icon component', () => {
	// Render
	test('Renders a Tile icon', () => {
		const wrapper = mount(TileIcon, {
			props: {
				imgSrc: 'foo',
				imgAltText: 'bar',
			},
		});

		expect(wrapper.find('.pdap-tile-icon').exists()).toBe(true);
		expect(wrapper.props()).toStrictEqual({ imgSrc: 'foo', imgAltText: 'bar' });
		expect(wrapper.html()).toMatchSnapshot();
	});
});
