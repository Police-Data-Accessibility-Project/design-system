<template>
	<input
		:id="id"
		class="pdap-input-checkbox"
		:name="name"
		:checked="defaultChecked"
		:value="value"
		type="checkbox"
		@change="change"
	/>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

// Types
import { PdapInputCheckboxProps } from '../types';

const props = withDefaults(defineProps<PdapInputCheckboxProps>(), {});

// Emits
const emit = defineEmits<{
	(event: 'change', val: string): void;
}>();

const change = (event: Event) => {
	emit('change', (<HTMLInputElement>event.target).checked.toString());
};

watchEffect(() => {
	console.debug(
		`Hello from PDAP InputText ${props.name} rendered at ${window.location.pathname}`,
		{
			props,
		}
	);
});
</script>

<!-- <style></style> -->
