<template>
	<div class="pdap-input" :class="{ ['pdap-input-error']: error }">
		<label v-if="$slots.label" :for="id"><slot name="label" /></label>
		<label v-else-if="label" :for="id">{{ label }}</label>
		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<textarea
			:id="id"
			:name="name"
			:placeholder="placeholder"
			:value="value"
			v-bind="$attrs"
			type="text"
			@input="onInput"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue';
import { PdapInputTextAreaProps } from './types';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';

const { label, name } = withDefaults(defineProps<PdapInputTextAreaProps>(), {
	placeholder: 'Enter text here',
});
const slots = useSlots();

if (!slots.label && !label)
	throw new Error(
		'All form inputs must have a label, passed as a slot or a prop'
	);

const { values, setValues, v$ } = inject<PdapFormProvideV2>(provideKey)!;

const error = computed(() => {
	return v$.value[name]?.$error ? v$.value[name]?.$errors?.[0]?.$message : '';
});
const value = computed(() =>
	typeof values.value?.[name] === 'string' ? values.value[name] : ''
);

function onInput(e: Event) {
	setValues({ [name]: (e.target as unknown as HTMLInputElement).value });
}
</script>
