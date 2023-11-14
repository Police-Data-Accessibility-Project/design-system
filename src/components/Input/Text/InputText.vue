<template>
	<input
		:id="id"
		type="text"
		:name="name"
		:value="value"
		:placeholder="placeholder"
		@input="input"
	/>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue';

// Types
import { type PdapInputTextProps } from '../types';

// Props
const props = withDefaults(defineProps<PdapInputTextProps>(), {});

// Emits
const emit = defineEmits<{
	(event: 'input', val: string): void;
}>();

const input = (event: Event) => {
	emit('input', (<HTMLInputElement>event.target).value);
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
