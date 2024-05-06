<template>
	<input
		:id="id"
		class="pdap-input-checkbox"
		:name="name"
		:checked="value === 'true' || (!value && defaultChecked)"
		type="checkbox"
		:value="value"
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
