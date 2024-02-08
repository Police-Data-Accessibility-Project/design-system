<template>
	<form
		:id="id"
		:name="name"
		class="pdap-form"
		@change="change"
		@submit.prevent="submit($event)"
	>
		<div
			v-if="typeof errorMessage === 'string'"
			class="pdap-form-error-message"
		>
			{{ errorMessage }}
		</div>

		<PdapInput
			v-for="field in data"
			v-bind="field"
			:key="field.name"
			:error="
				Boolean(v$[field.name]?.$error)
					? v$[field.name]?.$errors?.[0]?.$message
					: ''
			"
			:value="values[field.name]"
			@change="updateForm(field.name, $event)"
			@input="updateForm(field.name, $event)"
		/>
		<slot />
	</form>
</template>

<script setup lang="ts">
// Globals
import { computed, reactive, ref, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';

// Components
import PdapInput from '../Input/PdapInput.vue';

// Utils
import { createRule } from '../../utils/vuelidate';

// Types
import { PdapFormProps } from './types';
import { PdapInputTypes } from '../Input/types';

// Props
const props = withDefaults(defineProps<PdapFormProps>(), {
	error: null,
});

// Emits
const emit = defineEmits(['submit', 'change']);

// State
const data = computed(() =>
	props.schema.map((input) => {
		const newInput = { ...input };
		delete newInput.validators;

		return newInput;
	})
);

let values = reactive<Record<string, string>>(
	data.value.reduce((acc, input) => {
		switch (input.type) {
			case PdapInputTypes.CHECKBOX:
				return { ...acc, [input.name]: String(input.defaultChecked) };
			case PdapInputTypes.TEXT:
			case PdapInputTypes.PASSWORD:
			default:
				return { ...acc, [input.name]: input.value };
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
const v$ = useVuelidate(rules, values, { $autoDirty: false, $lazy: true });

// Types
export type VuelidateInstance = typeof v$.value;

// Vars
const errorMessage = ref(props.error);

// Handlers
function updateForm(fieldName: string, value: string) {
	values[fieldName] = value;
	change();
}

// Effects
// Effect - Updates form error state based on input error state and/or props
watchEffect(() => {
	if (props.error) errorMessage.value = props.error;
	else if (errorMessage.value && v$.value.$errors.length === 0)
		errorMessage.value = null;
	else if (!errorMessage.value && v$.value.$errors.length > 0)
		errorMessage.value = 'Please update this form to correct the errors';
});

// Effect - Debug logger
watchEffect(() => {
	console.debug(`PdapForm ${props.name}\n`, {
		errorMessage: errorMessage.value,
		props,
		schema: props.schema,
		data,
		values,
		vuelidate: {
			rules,
			v$,
		},
	});
});

function change() {
	emit('change', { ...values });
}

async function submit(event: Event) {
	// Check form submission
	const isValidSubmission = await v$.value.$validate();
	if (isValidSubmission) {
		// Emit submit event (spread to new object to create new object, this allows us to reset `values` without messing with the data returned)
		emit('submit', { ...values });
		// Reset vuelidate and form
		v$.value.$reset();
		const form = <HTMLFormElement>event.target;
		form.reset();

		// Wipe values state ('' for text inputs, as-was for everything else)
		values = Object.entries(values).reduce((acc, [key, value]) => {
			return { ...acc, [key]: ['true', 'false'].includes(value) ? value : '' };
		}, {});
		return;
	}
}
</script>

<style>
@tailwind components;

@layer components {
	.pdap-form {
		@apply mb-4 w-full;
	}

	.pdap-form-error-message {
		@apply items-center justify-start basis-full flex-shrink flex bg-red-300 text-red-800 mb-3 p-2 text-sm;
	}
}
</style>
