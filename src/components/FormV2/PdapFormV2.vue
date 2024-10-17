<template>
	<form
		:id="id"
		:name="name"
		class="pdap-form"
		@submit.prevent="submit"
		@change="emit('change', values, $event)"
	>
		<slot v-if="$slots.error" name="error" />
		<div
			v-else-if="typeof errorMessage === 'string'"
			class="pdap-form-error-message"
		>
			{{ errorMessage }}
		</div>

		<slot />
	</form>
</template>
<script setup lang="ts">
// Globals
import { provide, ref, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';

// Types
import { PdapFormPropsV2 } from './types';
import { provideKey, makeRules } from './util';

// Props
const { defaultValues, error, schema } = withDefaults(
	defineProps<PdapFormPropsV2>(),
	{
		error: null,
	}
);

// Emits
const emit = defineEmits(['submit', 'change', 'error']);

// Constants
const errorMessage = ref(error);
const values = ref(defaultValues ?? {});
const rules = schema ? makeRules(schema) : {};
const v$ = useVuelidate(rules, values, { $autoDirty: false, $lazy: true });

// Provide
provide(provideKey, {
	setValues,
	values,
	rules,
	v$,
});

// Expose
defineExpose({
	setValues,
	v$,
});

// Helpers
function setValues(val: Partial<typeof values.value>) {
	values.value = { ...values.value, ...val };
}
function resetForm() {
	v$.value.$reset();
	values.value = Object.entries(values.value).reduce((acc, [key]) => {
		return {
			...acc,
			[key]:
				typeof values.value[key] === 'string'
					? ''
					: Boolean(defaultValues?.[key]),
		};
	}, {});
}
async function submit(e: Event) {
	// Check form submission
	const isValidSubmission = await v$.value.$validate();
	if (!isValidSubmission) emit('error', v$);
	if (isValidSubmission) {
		// Emit submit event (spread to new object to create new object, this allows us to reset `values` without messing with the data returned)
		emit('submit', { ...values.value }, e);

		resetForm();
	}
}

// Effects
// Effect - Updates form error state based on input error state and/or props
watchEffect(() => {
	if (error) errorMessage.value = error;
	else if (errorMessage.value && v$.value.$errors.length === 0)
		errorMessage.value = null;
	else if (!errorMessage.value && v$.value.$errors.length > 0)
		errorMessage.value = 'Please update this form to correct the errors';
});
</script>

<style>
@tailwind components;

@layer components {
	.pdap-form-error-message {
		@apply items-center justify-start basis-full flex-shrink flex bg-red-300 text-red-800 mb-3 p-2 text-sm;
	}
}
</style>
