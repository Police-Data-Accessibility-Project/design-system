<template>
	<input
		:id="id"
		:type="type"
		:name="name"
		:placeholder="placeholder"
		:value="value"
		v-bind="$attrs"
		@input="input"
	/>
</template>

<script setup lang="ts">
import { PdapInputTextProps } from '../types';

defineProps<PdapInputTextProps>();

// Emits
const emit = defineEmits<{
	(event: 'input', val: Event): void;
}>();

const input = (event: Event) => {
	emit('input', event);
};
</script>
