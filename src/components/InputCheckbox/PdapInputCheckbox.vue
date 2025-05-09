<template>
	<div
		class="pdap-input pdap-input-checkbox"
		:class="{ ['pdap-input-error']: error }"
	>
		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<input
			:id="id"
			:name="name"
			:defaultChecked="defaultChecked"
			:value="values?.[name] ?? ''"
			v-bind="$attrs"
			type="checkbox"
			@input="onInput"
		/>

		<label v-if="$slots.label" :for="id"><slot name="label" /></label>
		<label v-else-if="label" :for="id">{{ label }}</label>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, useSlots } from 'vue';
import { PdapInputCheckboxProps } from './types';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';

const { label, name } = defineProps<PdapInputCheckboxProps>();
const slots = useSlots();

if (!slots.label && !label)
	throw new Error(
		'All form inputs must have a label, passed as a slot or a prop'
	);

const { values, setValues, v$ } = inject<PdapFormProvideV2>(provideKey)!;

const error = computed(() => {
	return v$.value[name]?.$error ? v$.value[name]?.$errors?.[0]?.$message : '';
});

function onInput(e: Event) {
	setValues({ [name]: (e.target as unknown as HTMLInputElement).checked });
}
</script>
