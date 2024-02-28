<template>
	<GridContainer
		:class="{
			'pdap-input': true,
			'pdap-input-error': Number(error?.length) >= 1,
		}"
	>
		<!-- Text -->
		<input
			v-if="type === PdapInputTypes.TEXT"
			:id="id"
			type="text"
			:name="name"
			:placeholder="placeholder"
			:value="value"
			v-bind="$attrs"
			@input="input"
		/>

		<!-- Password -->
		<input
			v-if="type === PdapInputTypes.PASSWORD"
			:id="id"
			type="password"
			:name="name"
			:placeholder="placeholder"
			:value="value"
			v-bind="$attrs"
			@input="input"
		/>

		<!-- Checkbox -->
		<input
			v-else-if="type === PdapInputTypes.CHECKBOX"
			:id="id"
			class="pdap-input-checkbox"
			:name="name"
			:checked="checked"
			type="checkbox"
			:value="value"
			v-bind="$attrs"
			@change="change"
		/>

		<div v-if="error" :id="errorMessageId" class="pdap-input-error-message">
			{{ error }}
		</div>

		<label class="pdap-input-label" :for="id">{{ label }}</label>
	</GridContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { PdapInputBaseProps, PdapInputTypes } from './types';
import { GridContainer } from '..';

const props = withDefaults(defineProps<PdapInputBaseProps>(), {});

// Emits
const emit = defineEmits<{
	(event: 'change', val: string): void;
	(event: 'input', val: string): void;
}>();

const change = () => {
	checked.value = !checked.value;
	emit('change', checked.value.toString());
};

const input = (event: Event) => {
	emit('input', (<HTMLInputElement>event.target).value);
};

const checked = ref(props.defaultChecked);

const errorMessageId = computed(() => `pdap-${props.name}-input-error`);
</script>

<style>
@tailwind components;

@layer components {
	/* General input styles  */
	.pdap-input {
		@apply h-[max-content] gap-4 leading-normal mb-3 w-full;
	}

	.pdap-grid-container.pdap-input {
		@apply p-0 gap-0;
	}

	.pdap-input input {
		@apply dark:bg-neutral-950 border border-neutral-500 border-solid px-3 py-2 text-[rgba(0,0,0)];
	}

	.pdap-input input::placeholder {
		@apply text-neutral-600 text-lg;
	}

	.pdap-input input:focus,
	.pdap-input input:focus-within,
	.pdap-input input:focus-visible {
		@apply border-2 border-brand-blue-light border-solid outline-none;
	}

	.pdap-input label {
		@apply max-w-[max-content] text-lg py-1 font-medium;
	}

	/* Error state */
	.pdap-input-error {
		@apply flex-wrap;

		row-gap: 0;
	}

	.pdap-input-error label {
		@apply justify-start text-sm;
	}

	.pdap-input-error input {
		@apply border-red-800 dark:border-red-300;
	}

	.pdap-input-error-message {
		@apply items-center justify-start flex bg-red-300 text-red-800 p-1 text-xs;
	}

	/* Specific inputs */
	/* Input - text */
	.pdap-input input[type='text'] {
		@apply h-12 text-lg;
	}

	/* Input - checkbox */
	.pdap-input input[type='checkbox'] {
		@apply h-6 w-6 accent-brand-gold;
	}

	.pdap-input input[type='checkbox'] ~ label {
		@apply pl-0;
	}
}
</style>
