<template>
	<component :is="component" :class="classes">
		<slot />
	</component>
</template>

<script setup lang="ts">
// Imports
import { reactive } from 'vue';

// Types
import { PdapFlexContainerProps } from './types';

// Props
const props = withDefaults(defineProps<PdapFlexContainerProps>(), {
	alignment: 'start',
	component: 'div',
});

// CSS class map
const classes = reactive({
	'pdap-flex-container': true,
	[`pdap-flex-container-${props.alignment}`]: true,
	[String(props.className)]: Boolean(props.className),
});
</script>

<style scoped>
@tailwind components;

@layer components {
	/* Layout */
	.pdap-flex-container {
		/* Left and top aligned by default */
		@apply items-start flex h-full justify-start flex-col max-w-none mx-auto p-8 w-full;

		/* Responsiveness */
		@apply xs:max-w-3xl lg:max-w-4xl;
	}

	.pdap-flex-container-center {
		/* Center-aligned (vert & hor) */
		@apply pdap-flex-container items-center justify-center;
	}
	.pdap-flex-container-start {
		@apply pdap-flex-container;
	}

	.pdap-flex-container > * {
		@apply w-full;
	}
}
</style>
