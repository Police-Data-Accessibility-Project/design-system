<template>
	<div :class="classes">
		<slot />
	</div>
</template>

<script setup lang="ts">
// Imports
import { reactive } from 'vue';

// Types
export interface PdapContainerProps {
	alignment: 'center' | 'start';
	className?: string;
}

// Props
const props = withDefaults(defineProps<PdapContainerProps>(), {
	alignment: 'start',
});

// CSS class map
const classes = reactive({
	'pdap-container': true,
	[`pdap-container-${props.alignment}`]: true,
	[String(props.className)]: Boolean(props.className),
});
</script>

<style scoped>
@tailwind components;

@layer components {
	/* Layout */
	.pdap-container {
		/* Left and top aligned by default */
		@apply items-start flex justify-start flex-col max-w-none mx-auto p-8 w-full;

		/* Responsiveness */
		@apply xs:max-w-3xl lg:max-w-4xl;
	}

	.pdap-container-center {
		/* Center-aligned (vert & hor) */
		@apply pdap-container items-center justify-center;
	}
	.pdap-container-start {
		@apply pdap-container;
	}

	.pdap-container > * {
		@apply w-full;
	}
}
</style>
