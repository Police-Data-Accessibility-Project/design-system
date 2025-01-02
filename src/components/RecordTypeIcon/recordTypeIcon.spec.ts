import { shallowMount } from '@vue/test-utils';
import RecordTypeIcon from './RecordTypeIcon.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faPersonMilitaryToPerson,
	faPersonMilitaryPointing,
	faBuildingShield,
	faFileShield,
	faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';
import { describe, expect, it } from 'vitest';

describe('RecordTypeIcon', () => {
	it('renders the correct icon for a valid record type', () => {
		const recordType = 'Incident Reports';
		const wrapper = shallowMount(RecordTypeIcon, {
			props: { recordType },
			global: {
				stubs: {
					FontAwesomeIcon,
				},
			},
		});

		expect(wrapper.findComponent(FontAwesomeIcon).props('icon')).toEqual(
			faPersonMilitaryToPerson
		);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('does not render an icon for an invalid record type', () => {
		const recordType = 'Invalid Record Type';
		const wrapper = shallowMount(RecordTypeIcon, {
			props: { recordType },
			global: {
				stubs: {
					FontAwesomeIcon,
				},
			},
		});

		expect(wrapper.findComponent(FontAwesomeIcon).exists()).toBe(false);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('handles record types with ampersand correctly', () => {
		const recordType = 'Police & public interactions';
		const wrapper = shallowMount(RecordTypeIcon, {
			props: { recordType },
			global: {
				stubs: {
					FontAwesomeIcon,
				},
			},
		});

		expect(wrapper.findComponent(FontAwesomeIcon).props('icon')).toEqual(
			faPersonMilitaryToPerson
		);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('handles top-level record types correctly', () => {
		const recordTypes = [
			'Police & public interactions',
			'Info about officers',
			'Info about agencies',
			'Agency-published resources',
			'Jails & courts',
		];

		const expectedIcons = [
			faPersonMilitaryToPerson,
			faPersonMilitaryPointing,
			faBuildingShield,
			faFileShield,
			faBuildingColumns,
		];

		recordTypes.forEach((recordType, index) => {
			const wrapper = shallowMount(RecordTypeIcon, {
				props: { recordType },
				global: {
					stubs: {
						FontAwesomeIcon,
					},
				},
			});

			expect(wrapper.findComponent(FontAwesomeIcon).props('icon')).toEqual(
				expectedIcons[index]
			);
			expect(wrapper.html()).toMatchSnapshot();
		});
	});
});
