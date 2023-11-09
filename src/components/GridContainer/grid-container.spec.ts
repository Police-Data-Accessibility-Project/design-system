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
	{ component: 'card', spanColumn: 3 },
];
const template =
	'<GridItem v-for="item in data" :key="`item.component + ${item.spanRows * Math.random()}`" :component="item.component" :src="item.src ?? undefined" ><slot /></GridItem>';

const expectComponents = new Set(['li', 'img', 'card']);

const TestSlotContent = defineComponent({
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

const getComputedStyle = vi.fn((el) => el.getComputedStyle());
getComputedStyle.mockReturnValue({
	gridTemplateRows: 'repeat(3, minmax(20px, 1fr))',
	gridTemplateColumns: 'repeat(2, auto)',
});
vi.stubGlobal('getComputedStyle', getComputedStyle);

// Test
describe('Renders container component', () => {
	// Render
	test('Renders a container', () => {
		const wrapper = mount(GridContainer, {
			slots: {
				default: TestSlotContent,
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
				default: TestSlotContent,
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
				default: TestSlotContent,
			},
			props: {
				rows: 2,
				columns: 3,
			},
		});

		expect(wrapper.vm.$props.rows).toBe(2);
		expect(wrapper.vm.$props.columns).toBe(3);
	});
});
