import { shallowMount } from '@vue/test-utils';
import PdapSpinner from './PdapSpinner.vue';

import { describe, expect, it } from 'vitest';

describe('PdapSpinner', () => {
	it('renders spinner when show prop is true', () => {
		const wrapper = shallowMount(PdapSpinner, {
			props: {
				show: true,
			},
		});

		expect(wrapper.find('svg').exists()).toBe(true);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('does not render spinner when show prop is false', () => {
		const wrapper = shallowMount(PdapSpinner, {
			props: {
				show: false,
			},
		});

		expect(wrapper.find('svg').exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('renders text when text prop is provided', () => {
		const text = 'Loading...';
		const wrapper = shallowMount(PdapSpinner, {
			props: {
				show: true,
				text,
			},
		});

		expect(wrapper.text()).toContain(text);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('applies custom color and size', () => {
		const color = 'red';
		const size = 48;
		const wrapper = shallowMount(PdapSpinner, {
			props: {
				show: true,
				color,
				size,
			},
		});
		const svg = wrapper.find('svg');
		expect(svg.attributes('width')).toBe(`${size}`);
		expect(svg.attributes('height')).toBe(`${size}`);
		expect(wrapper.find('path').attributes('stroke')).toBe(color);
		expect(wrapper.find('path').attributes('fill')).toBe(color);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
