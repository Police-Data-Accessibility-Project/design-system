<template>
	<div
		:class="{
			'pdap-input': true,
			'pdap-input-error': error?.length >= 1,
		}"
	>
		<slot />
		<label class="pdap-input-label" :for="id">{{ label }}</label>
		<div v-if="error" :id="errorMessageId" class="pdap-input-error-message">
			{{ error }}
		</div>
	</div>
</template>

<script setup lang="ts">
// Globals
import { computed, watchEffect } from 'vue';

import { PdapInputBaseProps } from './types';

// Props
const props = defineProps<PdapInputBaseProps>();

const errorMessageId = computed(() => `pdap-${props.name}-input-error`);

watchEffect(() => {
	console.log(
		`Hello from PDAP Input ${props.name} rendered at ${window.location.pathname}`,
		{
			props,
		}
	);
});
</script>

<style>
@tailwind components;

@layer components {
	/* General input styles  */
	.pdap-input {
		@apply align-middle flex h-[max-content] gap-4 leading-normal mb-2 w-full;
	}

	.pdap-input input {
		@apply dark:bg-neutral-950 border-2 border-neutral-300 border-solid border-transparent px-3 py-2 text-[rgba(0,0,0)];
	}

	.pdap-input input::placeholder {
		@apply text-neutral-500;
	}

	.pdap-input input:focus,
	.pdap-input input:focus-within,
	.pdap-input input:focus-visible {
		@apply border-2 border-brand-blue-light border-solid outline-none;
	}

	.pdap-input label {
		@apply items-center flex basis-[max-content] justify-end p-3;
	}

	/* Error state */
	.pdap-input-error {
		@apply flex-wrap;
		row-gap: 0;
	}

	.pdap-input-error label {
		@apply justify-start;
	}

	.pdap-input-error input {
		@apply border-red-800 dark:border-red-300;
	}

	.pdap-input-error-message {
		@apply items-center justify-start basis-full flex-shrink flex bg-red-300 text-red-800 p-2 text-sm;
	}

	/* Specific inputs */

	/* Input - text */
	.pdap-input input[type='text'] {
		@apply h-12 text-lg;
	}

	/* Input - checkbox */
	.pdap-input input[type='checkbox'] {
		@apply w-6 accent-brand-gold;
	}
}
</style>
./Checkbox
