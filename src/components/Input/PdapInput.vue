<template>
	<div class="pdap-input">
		<slot />
		<label class="pdap-input-label" :for="id">{{ label }}</label>
		<!-- TODO: add error message and associate with input -->
	</div>
</template>

<script setup lang="ts">
// Globals
import { watchEffect } from 'vue';

import { PdapInputBaseProps } from './types';

// Props
const props = defineProps<PdapInputBaseProps>();

watchEffect(() => {
	console.debug(
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
		@apply align-middle dark:bg-neutral-950 bg-neutral-50 block border-[1px] border-neutral-300 border-solid h-9 leading-normal mb-2;
	}

	.pdap-input input {
		@apply px-3 py-2 text-[rgba(0,0,0)] text-sm w-full;
	}

	.pdap-input input::placeholder {
		@apply text-neutral-500;
	}

	.pdap-input input:focus {
		@apply border-2 border-brand-blue-light border-solid outline-0;
	}

	/* Input - text */
	.pdap-input input[type='text'] {
		@apply h-12 text-lg;
	}
}
</style>
./Checkbox
