<template>
	<button :class="classes">
		<slot />
	</button>
</template>

<script setup lang="ts">
// Imports
import { reactive } from 'vue';

// Types
export interface PdapButtonProps {
	className?: string;
	intent?: 'primary' | 'secondary';
	isLoading?: boolean;
}

// Props
const props = withDefaults(defineProps<PdapButtonProps>(), {
	intent: 'primary',
	isLoading: false,
});

// CSS class map
const classes = reactive({
	'pdap-button': true,
	[`pdap-button-${props.intent}`]: Boolean(props.intent),
	[String(props.className)]: Boolean(props.className),
	'pdap-button-loading': props.isLoading,
});
</script>

<style scoped>
@tailwind components;

@layer components {
	.pdap-button {
		@apply cursor-pointer border-0 decoration-0 disabled:opacity-50 font-semibold inline-block mx-1 px-6 py-3 rounded-none text-center text-lg w-full;
		@apply hover:brightness-85 lg:text-xl sm:max-w-max;
	}

	.pdap-button-primary {
		@apply pdap-button bg-brand-gold text-neutral-100;
	}

	.pdap-button-secondary {
		@apply pdap-button bg-transparent border-brand-gold border-2 border-solid text-brand-gold;
	}
}
</style>