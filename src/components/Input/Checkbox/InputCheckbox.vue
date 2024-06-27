<template>
	<input
		:id="id"
		:name="name"
		:checked="value === 'true' ?? undefined"
		:value="value"
		class="pdap-input-checkbox"
		type="checkbox"
		v-bind="$attrs"
		@input="input"
	/>
</template>

<script setup lang="ts">
import { PdapInputCheckboxProps } from '../types';

defineProps<PdapInputCheckboxProps>();

// Emits
const emit = defineEmits<{
	(event: 'input', val: Event): void;
}>();

const input = (event: Event) => {
	emit('input', event);
};
</script>
