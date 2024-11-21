import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import PdapInputRadio from './PdapInputRadio.vue';
import { provideKey } from '../FormV2/util';
import { ref } from 'vue';

describe('PdapInputRadio', () => {
	let wrapper: VueWrapper;
	const mockSetValues = vi.fn();
	const mockValues = ref({});
	const mockV$ = ref({
		testName: {
			$error: false,
			$errors: [],
		},
	});

	const defaultProps = {
		name: 'testName',
		id: 'test-id',
		label: 'Test Label',
		value: 'test-value',
	};

	beforeEach(() => {
		mockSetValues.mockClear();
	});

	const createWrapper = (props = {}, provide = {}, slots = {}) => {
		return mount(PdapInputRadio, {
			props: {
				...defaultProps,
				...props,
			},
			global: {
				provide: {
					[provideKey as symbol]: {
						setValues: mockSetValues,
						values: mockValues,
						v$: mockV$,
						...provide,
					},
				},
			},
			slots: { ...slots },
		});
	};

	it('renders correctly with default props', () => {
		wrapper = createWrapper();
		expect(wrapper.find('input[type="radio"]').exists()).toBe(true);
		expect(wrapper.find('label').text()).toBe('Test Label');
	});

	it('renders with slot label instead of prop label', () => {
		wrapper = createWrapper(
			{},
			{},
			{
				label: '<span>Slot Label</span>',
			}
		);
		expect(wrapper.find('label span').text()).toBe('Slot Label');
	});

	it('throws error when no label passed as slot or prop', async () => {
		expect(() => {
			wrapper = createWrapper({ label: undefined }, {}, {});
		}).toThrow('All form inputs must have a label, passed as a slot or a prop');
	});

	it('emits input event and calls setValues when changed', async () => {
		wrapper = createWrapper();
		const input = wrapper.find('input');
		await input.setValue(true);
		expect(mockSetValues).toHaveBeenCalledWith({
			[defaultProps.name]: defaultProps.value,
		});
	});

	it('renders with defaultChecked prop', () => {
		wrapper = createWrapper({ defaultChecked: true });
		expect(wrapper.find('input').element.defaultChecked).toBe(true);
	});
});
