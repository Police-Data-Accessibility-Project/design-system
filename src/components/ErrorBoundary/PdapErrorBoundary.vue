<template>
	<slot v-if="!error$" />
	<component
		:is="component"
		v-else
		class="pdap-flex-container-center h-[full]"
		:v-bind="params"
	>
		<h1>Oops, something went wrong!</h1>
		<p class="max-w-full" data-test="error-boundary-message">
			If you keep seeing this message, please email
			<a href="mailto:contact@pdap.io">contact@pdap.io</a> for assistance.
		</p>
	</component>
</template>

<script setup lang="ts">
import { ComponentPublicInstance, onErrorCaptured, ref } from 'vue';
import { PdapErrorBoundaryProps } from './types';

const props = withDefaults(defineProps<PdapErrorBoundaryProps>(), {
	component: 'div',
	onError: undefined,
	params: undefined,
	stopPropagation: false,
});

interface PdapErrorEmitted {
	error: Error;
	vm: ComponentPublicInstance | null;
	info?: string;
}

const emits = defineEmits<{
	(event: 'error', { error, vm, info }: PdapErrorEmitted): void;
}>();
const error$ = ref<Error>();
const info$ = ref<string | undefined>('');

function interceptError(
	error: Error,
	vm: ComponentPublicInstance | null,
	info?: string
) {
	error$.value = error;
	info$.value = info;

	props.onError?.(error, vm);
	emits('error', { error: error, vm, info });

	if (props.stopPropagation) return false;
}

/* Impossible and unwise to try testing this, so we remove from the coverage report */
/* c8 ignore next 3 */
onErrorCaptured((err, vm, info) => {
	interceptError(err, vm, info);
});
</script>
