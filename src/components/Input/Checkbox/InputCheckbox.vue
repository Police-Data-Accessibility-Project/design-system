<template>
	<input
		:id="id"
		:name="name"
		:checked="value === 'true' ?? undefined"
		:value="value"
		class="pdap-input-checkbox"
		type="checkbox"
		v-bind="$attrs"
		@change="change"
	/>
</template>

<script setup lang="ts">
import { PdapInputCheckboxProps } from '../types';

defineProps<PdapInputCheckboxProps>();

// Emits
const emit = defineEmits<{
	(event: 'change', val: Event): void;
}>();

const change = (event: Event) => {
	emit('change', event);
};
</script>
