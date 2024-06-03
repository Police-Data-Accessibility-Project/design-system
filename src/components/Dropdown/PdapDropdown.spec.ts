import { describe, it, expect, beforeEach } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PdapDropdown from './PdapDropdown.vue';
import { PdapDropdownTriggerType } from './types';

let wrapper;
let trigger;
let content;

describe('PdapDropdown', () => {
	beforeEach(() => {
		wrapper = shallowMount(PdapDropdown, {
			slots: {
				trigger: 'Toggle Dropdown',
				content: '<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul>',
			},
			attachTo: document.body,
		});

		trigger = wrapper.find('[data-test="dropdown-trigger"]');
		content = wrapper.find('[data-test="dropdown-content"]');
	});

	it('should open and close dropdown correctly', async () => {
		expect(content.isVisible()).toBe(false);

		await trigger.trigger('click');
		expect(content.isVisible()).toBe(true);

		await trigger.trigger('click');
		expect(content.isVisible()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should be accessible with keyboard', async () => {
		expect(content.isVisible()).toBe(false);

		await trigger.trigger('keydown.enter');
		expect(content.isVisible()).toBe(true);

		await trigger.trigger('keydown.escape');
		expect(content.isVisible()).toBe(false);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should respect disabled prop', async () => {
		wrapper = shallowMount(PdapDropdown, {
			props: {
				disabled: true,
			},
			slots: {
				trigger: 'Toggle Dropdown',
				content: '<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul>',
			},
			attachTo: document.body,
		});
		trigger = wrapper.find('[data-test="dropdown-trigger"]');
		content = wrapper.find('[data-test="dropdown-content"]');

		await trigger.trigger('click');
		expect(content.isVisible()).toBe(false);

		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should respect the triggerOn prop', async () => {
		wrapper = shallowMount(PdapDropdown, {
			props: {
				triggerOn: PdapDropdownTriggerType.HOVER,
			},
			slots: {
				trigger: 'Toggle Dropdown',
				content: '<ul><li>Option 1</li><li>Option 2</li><li>Option 3</li></ul>',
			},
			attachTo: document.body,
		});
		trigger = wrapper.find('[data-test="dropdown-trigger"]');
		content = wrapper.find('[data-test="dropdown-content"]');

		await trigger.trigger('focusin');
		expect(content.isVisible()).toBe(true);

		await trigger.trigger('focusout');
		expect(content.isVisible()).toBe(false);

		expect(wrapper.html()).toMatchSnapshot();
	});
});
