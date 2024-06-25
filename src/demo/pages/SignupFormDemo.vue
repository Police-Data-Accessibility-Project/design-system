<template>
	<main>
		<Form
			id="bar"
			:error="error"
			:schema="SCHEMA"
			:reset-on="reset"
			name="foo"
			@submit="onSubmit"
			@change="handleChange"
		>
			<Button type="submit">Submit</Button>
		</Form>
	</main>
</template>

<script setup lang="ts">
import { PdapInputTypes } from '../../components/Input/types';
import { Button, Form } from '../../components';
import { ref } from 'vue';

// Constants
const SCHEMA = [
	{
		autocomplete: 'home email',
		'data-test': 'email',
		id: 'email',
		name: 'email',
		label: 'Email',
		type: PdapInputTypes.TEXT,
		placeholder: 'Your email address',
		value: '',
		validators: {
			email: {
				message: 'Please provide your email address',
				value: true,
			},
		},
	},
	{
		autocomplete: 'current-password',
		'data-test': 'password',
		id: 'password',
		name: 'password',
		label: 'Password',
		type: PdapInputTypes.PASSWORD,
		placeholder: 'Your password',
		value: '',
		validators: {
			password: {
				message: 'Please provide your password',
				value: true,
			},
		},
	},
	{
		autocomplete: 'current-password',
		'data-test': 'confirm-password',
		id: 'confirmPassword',
		name: 'confirmPassword',
		label: 'Confirm Password',
		type: PdapInputTypes.PASSWORD,
		placeholder: 'Confirm your password',
		value: '',
		validators: {
			password: {
				message: 'Please confirm your password',
				value: true,
			},
		},
	},
];

const error = ref<undefined | string>(undefined);
const reset = ref(false);

/**
 * When signing up: handles clearing pw-match form errors on change if they exist
 */
function handleChange(formValues: Record<string, string>) {
	if (error.value) {
		handlePasswordValidation(formValues);
	}
}

/**
 * When signing up: validates that passwords match
 * @returns {boolean} `false` if passwords do not match, `true` if they do
 */
function handlePasswordValidation(formValues: Record<string, string>) {
	if (formValues.password !== formValues.confirmPassword) {
		if (!error.value) {
			error.value = 'Passwords do not match, please try again.';
		}
		return false;
	} else {
		error.value = undefined;
		return true;
	}
}

/**
 * Logs user in or signs user up
 */
function onSubmit(formValues: Record<string, string>) {
	if (!handlePasswordValidation(formValues)) {
		reset.value = false;
		return;
	} else {
		reset.value = true;
		console.debug({ formValues });
	}
}
</script>
