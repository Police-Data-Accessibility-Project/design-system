<template>
	<button :class="classes" :disabled="isDisabled">
		<slot />
	</button>
</template>

<script setup lang="ts">
import { ClassValue } from 'clsx';
import { defineProps, reactive } from 'vue';

export interface Props {
	className?: ClassValue;
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
	button: true,
	[`button-${props.intent}`]: Boolean(props.intent),
	[String(props.className)]: Boolean(props.className),
	'button-disabled': props.isDisabled,
	'button-loading': props.isLoading,
});
</script>
