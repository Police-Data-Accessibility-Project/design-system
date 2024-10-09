<template>
	<main>
		<FormV2
			id="form-id"
			name="form-name"
			:schema="SCHEMA"
			@submit="(values) => console.log({ values })"
			@change="(values, event) => console.log({ values, event })"
		>
			<InputText
				:id="INPUT_TEXT_NAME"
				autocomplete="off"
				:name="INPUT_TEXT_NAME"
				:placeholder="PLACEHOLDER"
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

const INPUT_CHECKBOX_NAME = 'ice-cream';
const INPUT_TEXT_NAME = 'first-name';
const INPUT_PASSWORD_NAME = 'password';
const PLACEHOLDER = 'Paul';
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
];
</script>

<style>
main {
	min-height: 80vh;
}
</style>
