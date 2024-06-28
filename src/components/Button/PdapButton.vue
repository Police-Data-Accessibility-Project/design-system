<template>
	<button :class="classes">
		<slot />
	</button>
</template>

<script setup lang="ts">
// Imports
import { reactive } from 'vue';

// Types
import { PdapButtonProps } from './types';

// Props
const props = withDefaults(defineProps<PdapButtonProps>(), {
	intent: 'primary',
	isLoading: false,
});

// CSS class map
const classes = reactive({
	'pdap-button': true,
	[`pdap-button-${props.intent}`]: Boolean(props.intent),
	'pdap-button-loading': props.isLoading,
});
</script>

<script lang="ts">
/**
 * # `Button`
 * Styled button with PDAP branding. DOM attributes are forwarded to the HTML element, and most functionality works well this way.
 *
 * ## Props
 * @prop {'primary' | 'secondary' | 'tertiary'} intent controls the styling of the button
 * @prop {boolean} isLoading loading state of button
 *
 */
export default {
	name: 'PdapButton',
};
</script>

<style>
@tailwind components;

@layer components {
	.pdap-button {
		@apply cursor-pointer border-2 border-brand-gold decoration-0 disabled:opacity-50 font-semibold inline-block px-6 py-2 rounded-none text-center text-lg w-full;
		@apply hover:brightness-85 lg:text-xl sm:max-w-max;
	}

	.pdap-button-primary {
		@apply pdap-button bg-brand-gold text-neutral-50;
	}

	.pdap-button-primary[type='submit'] {
		@apply bg-brand-gold;
	}

	.pdap-button-secondary {
		@apply pdap-button bg-transparent border-2 border-brand-gold text-brand-gold;
	}

	.pdap-button-secondary[type='submit'] {
		@apply bg-transparent;
	}

	.pdap-button-tertiary {
		@apply pdap-button bg-transparent border-2 border-transparent text-neutral-950;
	}

	.pdap-button-tertiary[type='submit'] {
		@apply bg-transparent;
	}
}
</style>
