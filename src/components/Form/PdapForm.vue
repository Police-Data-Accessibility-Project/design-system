<template>
	<form class="pdap-form" @submit.prevent="submit($event)">
		<div class="pdap-form-error-message">{{ errorMessage }}</div>
		<InputsGenerator
			v-bind="{
				schema,
				values,
				...(typeof v$ !== 'undefined' ? { v$ } : {}),
			}"
		/>
		<slot />
	</form>
</template>

<script setup lang="ts">
// Globals
import { ref, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';

// Components
import InputsGenerator from './InputsGenerator/FormInputsGenerator.vue';

// Utils
import { createRule } from '../../../utils/vuelidate';

// Types
import { PdapInputCheckboxProps, PdapInputTextProps } from '../Input/types';
/**
 * Keyed by currently used validators.
 * Add any Vuelidate validators or custom ones here as we need them.
 * See https://vuelidate-next.netlify.app/validators.html#using-builtin-validators for more.
 *
 */
export interface PdapFormValidators {
	maxLength: number;
	minLength: number;
	required: boolean;
}

export interface PdapFormSchemaEntryInputCheckbox
	extends PdapInputCheckboxProps {
	validators?: Partial<PdapFormValidators>;
}
export interface PdapFormSchemaEntryInputText extends PdapInputTextProps {
	validators?: Partial<PdapFormValidators>;
}
export type PdapFormSchemaEntry =
	| PdapFormSchemaEntryInputCheckbox
	| PdapFormSchemaEntryInputText;
export type PdapFormSchema = PdapFormSchemaEntry[];
export type PdapFormData = Record<string, unknown>;

/**
 * PDAP Form props interface.
 * @param THandleSubmitArgs (type param) - Shape of object passed to handle submit.
 * This will almost always be form data, but we should allow for Forms to do things
 * on submit that don't necessarily involve submitting data. In order to pass this
 */
export interface PdapFormProps {
	// <
	// THandleSubmitArgs extends PdapFormData = PdapFormData,
	// >
	className?: string;
	errorMessage?: string | undefined | null;
	// submit: (args?: THandleSubmitArgs) => void;
	id: string;
	name: string;
	schema: PdapFormSchema;
}

// Props
const props = withDefaults(defineProps<PdapFormProps>(), {
	errorMessage: null,
});

// Emits
const emit = defineEmits(['submit']);

// State
const values = ref<Record<string, unknown>>(
	props.schema.reduce((acc, input) => {
		switch (input.type) {
			case 'checkbox':
				return { ...acc, [input.name]: input.defaultChecked };
			case 'text':
				return { ...acc, [input.name]: input.value };
			default:
				return acc;
		}
	}, {})
);

const rules = props.schema.reduce((acc, input) => {
	const toAdd = Object.entries(input.validators ?? {}).reduce(
		(acc, [key, val]) => {
			return {
				...acc,
				...createRule(key, val),
			};
		},

		{}
	);
	return {
		...acc,
		...toAdd,
	};
}, {});

// TODO: finish validation (display error messages, etc)
const v$ = useVuelidate(rules, values, { $autoDirty: false, $lazy: false });
// Type for passing as prop
export type VuelidateInstance = typeof v$.value;

watchEffect(() =>
	console.debug(
		`Hello from PDAP Form ${props.name} rendered at ${window.location.pathname}`,
		{
			props,
			values,
			rules,
			vuelidate: v$.value,
		}
	)
);

async function submit(event: Event) {
	// Check form submission
	const isCorrectSubmission = await v$.value.$validate();
	if (isCorrectSubmission) {
		// Get form
		const form = <HTMLFormElement>event.target;
		const formData = new FormData(form);

		// Assign values to new object
		const values = {};
		for (const [name, value] of formData) {
			Object.assign(values, { [name]: value });
		}

		// Debug log
		console.log("Hello from Form's onSubmit handler", {
			values,
			isCorrectSubmission,
			vuelidate: v$.value,
		});

		emit('submit', values);
		v$.value.$reset();
		form.reset();
		return;
	} else {
		// TODO: Error and form validation stuff
		return;
	}
}
</script>

<style>
.pdap-form {
	@apply mb-4 w-full;
}
</style>
