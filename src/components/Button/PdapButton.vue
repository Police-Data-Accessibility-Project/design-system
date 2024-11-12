<template>
	<button :class="classes">
		<component
			:is="isLoading ? Spinner : $slots.default"
			v-bind="isLoading ? loadingProps : undefined"
		/>
	</button>
</template>

<script setup lang="ts">
// Imports
import { reactive } from 'vue';
import Spinner from '../Spinner/PdapSpinner.vue';

// Types
import { PdapButtonProps } from './types';

// Props
const props = withDefaults(defineProps<PdapButtonProps>(), {
	intent: 'primary',
	isLoading: false,
});

const loadingProps = {
	show: props.isLoading,
};

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

<style scoped>
@media (prefers-reduced-motion: no-preference) {
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
}
</style>
