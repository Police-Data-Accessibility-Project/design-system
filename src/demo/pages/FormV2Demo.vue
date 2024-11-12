<template>
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

			<p>Foo bar baz, extra content here</p>

			<InputCheckbox
				:id="INPUT_CHECKBOX_NAME"
				:name="INPUT_CHECKBOX_NAME"
				label="Do you like ice cream?"
			/>

			<InputSelect
				:id="INPUT_SELECT_NAME"
				:name="INPUT_SELECT_NAME"
				:options="ICE_CREAM_FLAVORS"
				placeholder="Select flavor"
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

			<PdapInputTextArea
				:id="INPUT_TEXT_AREA_NAME"
				:name="INPUT_TEXT_AREA_NAME"
				label="Any notes to share?"
				:rows="5"
			/>

			<Button :is-loading="mockLoading" type="submit">Submit</Button>
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
import PdapInputTextArea from '../../components/InputTextArea/PdapInputTextArea.vue';
import { onMounted, ref } from 'vue';

const mockLoading = ref(true);

onMounted(() => {
	setTimeout(() => {
		mockLoading.value = false;
	}, 5000);
});

const INPUT_CHECKBOX_NAME = 'ice-cream';
const INPUT_TEXT_PLACEHOLDER = 'Paul';
const INPUT_TEXT_NAME = 'first-name';
const INPUT_PASSWORD_NAME = 'password';
const INPUT_SELECT_NAME = 'flavors';
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
			required: {
				value: true,
			},
		},
	},
	{
		name: INPUT_PASSWORD_NAME,
		validators: {
			required: {
				value: true,
			},
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
				value: true,
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
