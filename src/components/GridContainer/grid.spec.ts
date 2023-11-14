/* eslint-disable vue/one-component-per-file */
// Component
import GridContainer from './GridContainer.vue';
import GridItem, { PdapGridItemProps } from '../GridItem/GridItem.vue';

// Utils
import { defineComponent } from 'vue';
import { mount } from '@vue/test-utils';
import { describe, expect, test, vi } from 'vitest';

type TestSlotProps<T extends PdapGridItemProps = PdapGridItemProps> = T;

const data = [
	{ component: 'li' },
	{ component: 'img', src: 'https://mock.test.com' },
	{ component: 'card', spanColumn: 3, spanRow: 2 },
];
const template =
	'<GridItem v-for="item in data" :key="`item.component + ${item.spanRow * Math.random()}`" :component="item.component" :src="item.src ?? undefined" :spanRow="item.spanRow"><slot /></GridItem>';

const expectComponents = new Set(['li', 'img', 'card']);

const MultipleItems = defineComponent({
	components: {
		GridItem,
	},
	props: {
		data: {
			type: Array<TestSlotProps>,
			default: data,
		},
	},
	template,
});

const SingleItem = defineComponent({
	components: {
		GridItem,
	},
	props: {
		data: {
			type: Array<TestSlotProps>,
			default: data,
		},
	},
	template: '<GridItem :spanRow="3"><slot /></GridItem>',
});

const getComputedStyle = vi.fn((el) => el.getComputedStyle());
getComputedStyle.mockReturnValue({
	gridTemplateRows: 'repeat(3, minmax(20px, 1fr))',
	gridTemplateColumns: 'repeat(2, auto)',
	gridRow: 'span 2 / span 2',
});
vi.stubGlobal('getComputedStyle', getComputedStyle);

// Test
describe('Renders container component', () => {
	// Render
	test('Renders a container', () => {
		const wrapper = mount(GridContainer, {
			slots: {
				default: MultipleItems,
			},
		});

		const container = wrapper.find('.pdap-grid-container');
		const items = container.findAll('.pdap-grid-item');

		// Container
		expect(container.exists()).toBe(true);
		expect(wrapper.classes()).toContain('pdap-grid-container');

		// Renders all items passed
		expect(items.length).toBe(3);

		// Renders fall-through prop conditionally for img element
		expect(container.find('[src="https://mock.test.com"]').exists()).toBe(true);

		// Renders each type of component passed
		expect(
			items.every((item) =>
				item.getRootNodes().some((node) => expectComponents.has(node.localName))
			)
		).toBe(true);

		// Snapshot
		expect(wrapper.html()).toMatchSnapshot();
	});

	test('Renders a container with template props passed', () => {
		const wrapper = mount(GridContainer, {
			slots: {
				default: MultipleItems,
			},
			props: {
				templateColumns: 'repeat(2, auto)',
				templateRows: 'repeat(3, minmax(20px, 1fr))',
			},
		});

		expect(window.getComputedStyle(wrapper.vm.$el).gridTemplateColumns).toBe(
			'repeat(2, auto)'
		);
		expect(window.getComputedStyle(wrapper.vm.$el).gridTemplateRows).toBe(
			'repeat(3, minmax(20px, 1fr))'
		);
	});

	test('Renders a container with columns and rows props passed', () => {
		const wrapper = mount(GridContainer, {
			slots: {
				default: MultipleItems,
			},
			props: {
				rows: 2,
				columns: 3,
			},
		});

		expect(wrapper.vm.$props.rows).toBe(2);
		expect(wrapper.vm.$props.columns).toBe(3);
	});

	test('Renders a grid item with custom row span prop', () => {
		const wrapper = mount(GridContainer, {
			slots: {
				default: SingleItem,
			},
		});

		expect(
			window.getComputedStyle(wrapper.find('.pdap-grid-item').element).gridRow
		).toBe('span 2 / span 2');
	});
});
