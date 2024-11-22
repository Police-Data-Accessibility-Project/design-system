<template>
	<FontAwesomeIcon
		v-if="recordTypesToIcons.has(recordType)"
		:icon="
			recordTypesToIcons.get(recordType) ?? []
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
		['Police & public interactions', faPersonMilitaryToPerson], // Top level with ampersand
		['Police and public interactions', faPersonMilitaryToPerson], // Top level with word
		['Accident Reports', faPersonMilitaryToPerson],
		['Arrest Records', faPersonMilitaryToPerson],
		['Calls for Service', faPersonMilitaryToPerson],
		['Car GPS', faPersonMilitaryToPerson],
		['Citations', faPersonMilitaryToPerson],
		['Dispatch Logs', faPersonMilitaryToPerson],
		['Dispatch Recordings', faPersonMilitaryToPerson],
		['Field Contacts', faPersonMilitaryToPerson],
		['Incident Reports', faPersonMilitaryToPerson],
		['Misc Police Activity', faPersonMilitaryToPerson],
		['Officer Involved Shootings', faPersonMilitaryToPerson],
		['Stops', faPersonMilitaryToPerson],
		['Surveys', faPersonMilitaryToPerson],
		['Use of Force Reports', faPersonMilitaryToPerson],
		['Vehicle Pursuits', faPersonMilitaryToPerson],
		/***************************************************
		 *************  Info about officers  ***************
		 **************************************************/
		['Info about officers', faPersonMilitaryPointing], // Top level
		['Complaints & Misconduct', faPersonMilitaryPointing],
		['Complaints and Misconduct', faPersonMilitaryPointing],
		['Daily Activity Logs', faPersonMilitaryPointing],
		['Training & Hiring Info', faPersonMilitaryPointing],
		['Training and Hiring Info', faPersonMilitaryPointing],
		['Personnel Records', faPersonMilitaryPointing],
		/***************************************************
		 *************  Info about agencies  ***************
		 **************************************************/
		['Info about agencies', faBuildingShield], // Top level
		['Annual & Monthly Reports', faBuildingShield],
		['Annual and Monthly Reports', faBuildingShield],
		['Budgets & Finances', faBuildingShield],
		['Budgets and Finances', faBuildingShield],
		['Contact Info & Agency Meta', faBuildingShield],
		['Contact Info and Agency Meta', faBuildingShield],
		['Geographic', faBuildingShield],
		['List of Data Sources', faBuildingShield],
		['Policies & Contracts', faBuildingShield],
		['Policies and Contracts', faBuildingShield],
		/***************************************************
		 *********  Agency-published resources  ************
		 **************************************************/
		['Agency-published resources', faFileShield], // Top level
		['Crime Maps & Reports', faFileShield],
		['Crime Maps and Reports', faFileShield],
		['Crime Statistics', faFileShield],
		['Media Bulletins', faFileShield],
		['Records Request Info', faFileShield],
		['Resources', faFileShield],
		['Sex Offender Registry', faFileShield],
		['Wanted Persons', faFileShield],
		/***************************************************
		 ***********  Jails & Courts specific  *************
		 **************************************************/
		['Jails & courts', faBuildingColumns], // Top level
		['Jails and courts', faBuildingColumns], // Top level
		['Jails & courts specific', faBuildingColumns], // Top level
		['Jails and courts specific', faBuildingColumns], // Top level
		['Booking Reports', faBuildingColumns],
		['Court Cases', faBuildingColumns],
		['Incarceration Records', faBuildingColumns],
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
