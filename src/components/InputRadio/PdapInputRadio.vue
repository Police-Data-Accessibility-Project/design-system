<template>
	<div class="pdap-input pdap-input-radio">
		<input
			:id="id"
			:name="name"
			:defaultChecked="defaultChecked"
			:value="value"
			v-bind="$attrs"
			type="radio"
			@input="onInput"
		/>

		<label v-if="$slots.label" :for="id"><slot name="label" /></label>
		<label v-else-if="label" :for="id">{{ label }}</label>
	</div>
</template>

<script setup lang="ts">
import { inject, useSlots } from 'vue';
import { PdapInputRadioProps } from './types';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';

const { label, name } = defineProps<PdapInputRadioProps>();
const slots = useSlots();

if (!slots.label && !label)
	throw new Error(
		'All form inputs must have a label, passed as a slot or a prop'
	);

const { setValues } = inject<PdapFormProvideV2>(provideKey)!;

function onInput(e: Event) {
	setValues({ [name]: (e.target as unknown as HTMLInputElement).value });
}
</script>
