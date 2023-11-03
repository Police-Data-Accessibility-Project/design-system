<template>
	<button :class="classes" :disabled="isDisabled">
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
import { defineProps, reactive } from 'vue';

export interface Props {
	className?: string;
	intent?: 'primary' | 'outline';
	isDisabled?: boolean;
	isLoading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	intent: 'primary',
	isDisabled: false,
	isLoading: false,
});

const classes = reactive({
	'pdap-button': true,
	[`pdap-button-${props.intent}`]: Boolean(props.intent),
	[String(props.className)]: Boolean(props.className),
	'pdap-button-disabled': props.isDisabled,
	'pdap-button-loading': props.isLoading,
});
</script>

<style>
/* Buttons */
.pdap-button {
	@apply cursor-pointer border-0 decoration-0 font-semibold inline-block mx-1 px-6 py-3 rounded-none text-center text-lg w-full;
	@apply hover:brightness-85 lg:text-xl sm:max-w-max;
}

.pdap-button-primary {
	@apply pdap-button bg-brand-gold text-neutral-100;
}

.pdap-button-outline {
	@apply pdap-button bg-transparent border-brand-gold border-2 border-solid text-brand-gold;
}

.pdap-button-disabled {
	@apply opacity-50;
}
</style>
