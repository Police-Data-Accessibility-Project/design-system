<template>
	<div>foo</div>
	<main>
		<FormV2
			id="form-id"
			name="form-name"
			:schema="SCHEMA"
			@error="(v$) => console.debug({ v$ })"
			@submit="(values) => console.log({ values })"
			@change="(values, event) => console.log({ values, event })"
		>
			<InputText
				:id="INPUT_TEXT_NAME"
				autocomplete="off"
				:name="INPUT_TEXT_NAME"
				:placeholder="INPUT_TEXT_PLACEHOLDER"
			>
				<template #label>
					<h4>Your name</h4>
				</template>
			</InputText>

			<InputPassword
				:id="INPUT_PASSWORD_NAME"
				autocomplete="off"
				:name="INPUT_PASSWORD_NAME"
				placeholder="Password"
				label="Type your password here"
			/>

			<InputCheckbox
				:id="INPUT_CHECKBOX_NAME"
				:name="INPUT_CHECKBOX_NAME"
				label="Do you like ice cream?"
			/>

			<InputSelect
				:id="INPUT_SELECT_NAME"
				combobox
				:name="INPUT_SELECT_NAME"
				:options="ICE_CREAM_FLAVORS"
				position="top"
				placeholder="Select flavor"
				@change="(value) => console.log({ value })"
			>
				<template #label>
					<h4>What is your favorite flavor?</h4>
				</template>
				<template #error>
					<p class="p-4">
						Custom error slot with
						<a class="text-wineneutral-50" href="#">a link</a> and more padding
						than one would usually care for. Only rendered if an error exists.
					</p>
				</template>
			</InputSelect>

			<InputSelectMulti
				:id="INPUT_SELECT_MULTI_NAME"
				:name="INPUT_SELECT_MULTI_NAME"
				:options="ICE_CREAM_FLAVORS"
				placeholder="Select flavor"
				position="top"
				@change="(value) => console.log({ value })"
			>
				<template #label>
					<h4>What are your favorite flavors (multi-select)?</h4>
				</template>
				<template #error>
					<p class="p-2">
						Custom error slot with
						<a class="text-wineneutral-50" href="#">a link</a>
					</p>
				</template>
			</InputSelectMulti>

			<RadioGroup :name="INPUT_RADIO_GROUP_NAME">
				<h4 class="text-lg">
					Select another flavor, with radio buttons this time!
				</h4>
				<InputRadio
					v-for="{ label, value, defaultChecked } of ICE_CREAM_FLAVORS"
					:id="value"
					:key="label"
					:default-checked="defaultChecked"
					:name="INPUT_RADIO_GROUP_NAME"
					:value="value"
					:label="label"
				/>
			</RadioGroup>

			<InputDatePicker
				:id="INPUT_DATE_NAME"
				:name="INPUT_DATE_NAME"
				position="left"
			>
				<template #label>
					<h4>When will you next consume ice cream?</h4>
				</template>
			</InputDatePicker>

			<PdapInputTextArea
				:id="INPUT_TEXT_AREA_NAME"
				:name="INPUT_TEXT_AREA_NAME"
				label="Any notes to share?"
				:rows="5"
			/>

			<Button type="submit">Submit</Button>
		</FormV2>
	</main>
</template>

<script setup lang="ts">
import { Button } from '../../components/Button';
import { FormV2 } from '../../components/FormV2';
import { InputText } from '../../components/InputText';
import { InputCheckbox } from '../../components/InputCheckbox';
import { InputPassword } from '../../components/InputPassword';
import { InputSelect } from '../../components/InputSelect';
import InputSelectMulti from '../../components/InputSelectMulti/PdapInputSelectMulti.vue';
import { InputRadio } from '../../components/InputRadio';
import { RadioGroup } from '../../components/InputRadioGroup';
import { InputDatePicker } from '../../components/InputDatePicker';
import PdapInputTextArea from '../../components/InputTextArea/PdapInputTextArea.vue';

import { defineComponent } from 'vue';
defineComponent({
	name: 'FormV2Demo',
});

console.log('mounting FormV2Demo');

const INPUT_CHECKBOX_NAME = 'ice-cream';
const INPUT_TEXT_PLACEHOLDER = 'Paul';
const INPUT_TEXT_NAME = 'first-name';
const INPUT_DATE_NAME = 'date';
const INPUT_PASSWORD_NAME = 'password';
const INPUT_SELECT_NAME = 'flavors';
const INPUT_SELECT_MULTI_NAME = 'flavors_multi';
const INPUT_RADIO_GROUP_NAME = 'flavors_2';
const INPUT_TEXT_AREA_NAME = 'notes';

const ICE_CREAM_FLAVORS = [
	{
		value: 'vanilla',
		label: 'Vanilla',
	},
	{
		value: 'chocolate',
		label: 'Chocolate',
	},
	{
		value: 'neapolitan',
		label: 'Neapolitan',
	},
	{
		value: 'rocky-road',
		label: 'Rocky Road',
		defaultChecked: true,
	},
	{
		value: 'chunky-monkey',
		label: 'Chunky Monkey',
	},
	{
		value: 'mint-choc',
		label: 'Mint Chocolate Chip',
	},
];

const SCHEMA = [
	{
		name: INPUT_TEXT_NAME,
		validators: {
			required: {},
			minLength: {
				value: 3,
				message: 'Your name should be at least 3 characters long',
			},
		},
	},
	{
		name: INPUT_PASSWORD_NAME,
		validators: {
			required: {},
			password: {
				value: true,
				message: 'Your password should be a valid password',
			},
		},
	},
	{
		name: INPUT_SELECT_NAME,
		validators: {
			required: {
				message: 'Please select your favorite flavor of ice cream.',
			},
		},
	},
	{
		name: INPUT_SELECT_MULTI_NAME,
		validators: {
			custom: {
				predicate: (s: []) => s.length,
				message: 'Please select at least two flavors of ice cream.',
			},
			required: {
				message: 'Please select your favorite flavor of ice cream.',
			},
		},
	},
	{
		name: INPUT_RADIO_GROUP_NAME,
		validators: {
			required: {
				message: 'Please select your favorite flavor of ice cream. Again.',
			},
		},
	},
	{
		name: INPUT_DATE_NAME,
		validators: {
			required: {
				message: "Please select the next date at which you'll get ice cream.",
			},
		},
	},
	// {
	// 	name: INPUT_TEXT_AREA_NAME,
	// 	validators: {
	// 		required: {
	// 			message: 'Please add some notes.',
	// 			value: true,
	// 		},
	// 	},
	// },
];
</script>

<style>
main {
	min-height: 80vh;
}
</style>
