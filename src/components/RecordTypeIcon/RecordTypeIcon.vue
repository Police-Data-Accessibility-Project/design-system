<template>
	<FontAwesomeIcon
		v-if="recordTypesToIcons.has(recordType.toLowerCase())"
		:icon="
			recordTypesToIcons.get(recordType.toLowerCase()) ?? []
			/* Fallback array is a never case, since TS doesn't infer the typeguard from `v-if` */
		"
	/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faPersonMilitaryToPerson,
	faPersonMilitaryPointing,
	faBuildingShield,
	faFileShield,
	faBuildingColumns,
} from '@fortawesome/free-solid-svg-icons';

/**
 * Map created from the record types taxonomy:
 * https://app.gitbook.com/o/-MXypK5ySzExtEzQU6se/s/-MXyolqTg_voOhFyAcr-/activities/data-dictionaries/record-types-taxonomy
 */
const recordTypesToIcons = ref(
	new Map([
		/***************************************************
		 ********* Police and public interactions **********
		 **************************************************/
		['police & public interactions', faPersonMilitaryToPerson], // Top level with ampersand
		['police and public interactions', faPersonMilitaryToPerson], // Top level with word
		['accident reports', faPersonMilitaryToPerson],
		['arrest records', faPersonMilitaryToPerson],
		['calls for service', faPersonMilitaryToPerson],
		['car gps', faPersonMilitaryToPerson],
		['citations', faPersonMilitaryToPerson],
		['dispatch logs', faPersonMilitaryToPerson],
		['dispatch recordings', faPersonMilitaryToPerson],
		['field contacts', faPersonMilitaryToPerson],
		['incident reports', faPersonMilitaryToPerson],
		['misc police activity', faPersonMilitaryToPerson],
		['officer involved shootings', faPersonMilitaryToPerson],
		['stops', faPersonMilitaryToPerson],
		['surveys', faPersonMilitaryToPerson],
		['use of force reports', faPersonMilitaryToPerson],
		['vehicle pursuits', faPersonMilitaryToPerson],
		/***************************************************
		 *************  Info about officers  ***************
		 **************************************************/
		['info about officers', faPersonMilitaryPointing], // Top level
		['complaints & misconduct', faPersonMilitaryPointing],
		['complaints and misconduct', faPersonMilitaryPointing],
		['daily activity logs', faPersonMilitaryPointing],
		['training & hiring info', faPersonMilitaryPointing],
		['training and hiring info', faPersonMilitaryPointing],
		['personnel records', faPersonMilitaryPointing],
		/***************************************************
		 *************  Info about agencies  ***************
		 **************************************************/
		['info about agencies', faBuildingShield], // Top level
		['annual & monthly reports', faBuildingShield],
		['annual and monthly reports', faBuildingShield],
		['budgets & finances', faBuildingShield],
		['budgets and finances', faBuildingShield],
		['contact info & agency meta', faBuildingShield],
		['contact info and agency meta', faBuildingShield],
		['geographic', faBuildingShield],
		['list of data sources', faBuildingShield],
		['policies & contracts', faBuildingShield],
		['policies and contracts', faBuildingShield],
		/***************************************************
		 *********  Agency-published resources  ************
		 **************************************************/
		['agency-published resources', faFileShield], // Top level
		['crime maps & reports', faFileShield],
		['crime maps and reports', faFileShield],
		['crime statistics', faFileShield],
		['media bulletins', faFileShield],
		['records request info', faFileShield],
		['resources', faFileShield],
		['sex offender registry', faFileShield],
		['wanted persons', faFileShield],
		/***************************************************
		 ***************  Jails & Courts  ******************
		 **************************************************/
		['jails & courts', faBuildingColumns], // Top level
		['jails and courts', faBuildingColumns], // Top level
		['jails & courts specific', faBuildingColumns], // Top level
		['jails and courts specific', faBuildingColumns], // Top level
		['booking reports', faBuildingColumns],
		['court cases', faBuildingColumns],
		['incarceration records', faBuildingColumns],
	])
);

interface Props {
	recordType: string;
}

const { recordType } = defineProps<Props>();

defineExpose({
	recordTypesToIcons,
});
</script>
