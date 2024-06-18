<template>
	<main>
		<Form
			:error="error"
			:schema="SCHEMA"
			:reset-on="reset"
			@submit="onSubmit"
			@change="handleChangeOnError"
		>
			<Button type="submit">Submit</Button>
		</Form>
	</main>
</template>

<script setup lang="ts">
import { Button, Form } from '../../components';
import { ref } from 'vue';

// Constants
const SCHEMA = [
	{
		'data-test': 'email',
		id: 'email',
		name: 'email',
		label: 'Email',
		type: 'text',
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
		'data-test': 'password',
		id: 'password',
		name: 'password',
		label: 'Password',
		type: 'password',
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
		'data-test': 'confirm-password',
		id: 'confirmPassword',
		name: 'confirmPassword',
		label: 'Confirm Password',
		type: 'password',
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

const error = ref(undefined);
const reset = ref(false);

/**
 * When signing up: handles clearing pw-match form errors on change if they exist
 */
function handleChangeOnError(formValues) {
	console.debug('onchange', { e: error.value, formValues: formValues.value });

	if (error.value && formValues.password !== formValues.confirmPassword) {
		handlePasswordValidation(formValues);
	}
}

/**
 * When signing up: validates that passwords match
 * @returns {boolean} `false` if passwords do not match, `true` if they do
 */
function handlePasswordValidation(formValues) {
	console.debug('validate', { e: error.value });

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
function onSubmit(formValues) {
	console.debug('onsubmit', { e: error.value });
	if (!handlePasswordValidation(formValues)) {
		return;
	} else {
		reset.value = true;
	}

	console.debug({ formValues });
}
</script>
