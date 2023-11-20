<template>
	<form class="pdap-form" @submit.prevent="submit($event)">
		<div
			v-if="typeof error === 'string' && error.length > 0"
			class="pdap-form-error-message"
		>
			{{ error }}
		</div>
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
import { createRule } from '../../utils/vuelidate';

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
 */
export interface PdapFormProps {
	className?: string;
	error?: string | undefined | null;
	// submit: (args?: THandleSubmitArgs) => void;
	id: string;
	name: string;
	schema: PdapFormSchema;
}

// Props
const props = withDefaults(defineProps<PdapFormProps>(), {
	error: null,
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
		[input.name]: {
			...toAdd,
		},
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

		// Assign values to object
		const values = {};
		for (const [name, value] of formData) {
			Object.assign(values, { [name]: value });
		}

		// Debug log
		console.debug("Hello from Form's onSubmit handler", {
			values,
			isCorrectSubmission,
			vuelidate: v$.value,
		});

		emit('submit', values);
		v$.value.$reset();
		form.reset();
		return;
	} else {
		console.error('is invalid form data', { v$: v$.value });
		return;
	}
}
</script>

<style>
.pdap-form {
	@apply mb-4 w-full;
}

.pdap-form-error-message {
	@apply items-center justify-start basis-full flex-shrink flex bg-red-300 text-red-800 p-2 text-sm;
}
</style>
