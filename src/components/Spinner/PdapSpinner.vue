<template>
	<Transition appear>
		<div v-if="show" class="pdap-spinner">
			<svg
				aria-label="loading"
				:width="size"
				:height="size"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
					opacity=".25"
					:stroke="color"
					:fill="color"
				/>
				<path
					d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
					class="pdap-spinner-innards"
					:stroke="color"
					:fill="color"
				/>
			</svg>

			<Transition appear mode="out-in">
				<p v-if="text && show" aria-live="polite">
					{{ text }}
				</p>
			</Transition>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { PdapSpinnerProps } from './types';

withDefaults(defineProps<PdapSpinnerProps>(), {
	color: 'currentColor',
	size: 24,
	text: '',
	show: false,
});
</script>

<script lang="ts">
/**
 * # `Spinner`
 * Loading spinner component
 *
 * @preserve
 */
export default {
	name: 'PdapSpinner',
};
</script>

<style>
@tailwind components;

@layer components {
	.pdap-spinner {
		@apply items-center bg-inherit flex flex-col gap-4 h-auto justify-center w-auto z-30;
	}

	@media (prefers-reduced-motion: no-preference) {
		.pdap-spinner-innards {
			transform-origin: center;
			animation: spinner 0.85s infinite linear;
		}
	}
}

@keyframes spinner {
	100% {
		transform: rotate(360deg);
	}
}
</style>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease-in;
	}

	.v-enter-from,
	.v-leave-to {
		@apply opacity-0;
	}
}
</style>
