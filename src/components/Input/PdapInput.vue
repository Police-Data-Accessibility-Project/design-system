<template>
	<div
		:class="{
			'pdap-input': true,
			[`pdap-input-${type}`]: true,
			[`pdap-input-${type}-checked`]:
				type === PdapInputTypes.CHECKBOX && value === 'true',
			'pdap-input-error': Number(error?.length) >= 1,
		}"
	>
		<PdapInputCheckbox
			v-if="type === PdapInputTypes.CHECKBOX"
			class="pdap-input-checkbox"
			v-bind="{ ...$attrs, ...(props as PdapInputCheckboxProps) }"
		/>

		<PdapInputText
			v-else
			v-bind="{ ...$attrs, ...($props as PdapInputTextProps) }"
		/>

		<div v-if="error" :id="errorMessageId" class="pdap-input-error-message">
			{{ error }}
		</div>

		<label class="pdap-input-label" :for="id">
			{{ label }}
			<!-- This is a hacky and extremely implementation-specific way to render these icons. Would be better to decouple Form and Input rendering a bit more so that we can more easily use slots, etc. -->
			<!-- Issue created to create V2 of form and input components to handle more flexible UI: https://github.com/Police-Data-Accessibility-Project/design-system/issues/102 -->
			<RecordTypeIcon :record-type="label" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import {
	PdapInputProps,
	PdapInputTypes,
	PdapInputCheckboxProps,
	PdapInputTextProps,
} from './types';
import PdapInputText from './Text/InputText.vue';
import PdapInputCheckbox from './Checkbox/InputCheckbox.vue';
import RecordTypeIcon from '../RecordTypeIcon/RecordTypeIcon.vue';

const props = withDefaults(defineProps<PdapInputProps>(), {});

const errorMessageId = computed(() => `pdap-${props.name}-input-error`);
</script>

<style scoped>
@tailwind components;

@layer components {
	/* General input styles  */
	.pdap-input {
		@apply h-[max-content] gap-1 leading-normal mb-3 w-full flex flex-col;
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
		@apply border-2 border-blue-light border-solid outline-none;
	}

	.pdap-input label {
		@apply max-w-[max-content] text-lg py-1 font-medium;
	}

	/* Error state */
	.pdap-input-error {
		@apply flex-wrap gap-x-0;
	}

	.pdap-input-error label {
		@apply justify-start;
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
	.pdap-input-checkbox {
		@apply border-2 border-transparent items-center gap-4 flex-row py-1 px-2 w-auto;
	}

	.pdap-input-checkbox-checked {
		@apply border-2 border-brand-gold border-solid rounded-md;
	}

	.pdap-input input[type='checkbox'] {
		@apply h-6 w-6 accent-brand-gold;
	}

	.pdap-input input[type='checkbox'] ~ label {
		@apply pl-0 w-full max-w-full;
	}

	.pdap-input input[type='checkbox'],
	.pdap-input input[type='checkbox'] ~ label {
		@apply cursor-pointer;
	}
}

/* stylelint-disable */
.svg-inline--fa {
	@apply ml-2;
}
/* stylelint-enable */
</style>
