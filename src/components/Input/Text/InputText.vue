<template>
	<input
		:id="id"
		:type="type"
		:name="name"
		:placeholder="placeholder"
		:value="value"
		v-bind="$attrs"
		@change="change"
		@input="input"
	/>
</template>

<script setup lang="ts">
import { PdapInputTextProps } from '../types';

defineProps<PdapInputTextProps>();

// Emits
const emit = defineEmits<{
	(event: 'change', val: Event): void;
	(event: 'input', val: Event): void;
}>();

const change = (event: Event) => {
	emit('change', event);
};

const input = (event: Event) => {
	emit('input', event);
};
</script>
