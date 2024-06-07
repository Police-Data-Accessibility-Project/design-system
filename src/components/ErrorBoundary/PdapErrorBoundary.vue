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
import { PdapErrorBoundaryProps, PdapErrorEmitted } from './types';

const props = withDefaults(defineProps<PdapErrorBoundaryProps>(), {
	component: 'div',
	onError: undefined,
	params: undefined,
});

const emits = defineEmits<{
	(event: 'onError', { error, vm, info }: PdapErrorEmitted): void;
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

	props.onError?.(error, vm, info);
	emits('onError', { error, vm, info });
}

/* Impossible and unwise to try testing this, so we remove from the coverage report */
/* c8 ignore next 3 */
onErrorCaptured((err, vm, info) => {
	interceptError(err, vm, info);
});
</script>

<script lang="ts">
/**
 * # `ErrorBoundary`
 * Intercepts uncaught errors from its children and renders an error UI in place of its children.
 *
 * ## Props
 * @prop {string} component Optional: the component to render as a fallback, defaults to 'div'
 * @prop {PdapErrorBoundaryProps['onError']} onError Optional: callback to run on error, accepts two arguments, the error and the element (optional)
 * @prop {Record<string, string>} params Optional: parameters to be forwarded to fallback
 *
 * ## Emits
 * @emits onError includes object with `error`, and optionally `info` and `vm
 *
 * @example Top level
 *
 * <template>
 * 	<AuthWrapper>
 * 		<Header :logo-image-src="lockup" />
 * 		<ErrorBoundary component="main">
 * 			<router-view />
 * 		</ErrorBoundary>
 * 		<Footer :logo-image-src="acronym" />
 * 	</AuthWrapper>
 * </template>
 *
 * @example Within a component
		<ErrorBoundary
			class="col-span-full items-start"
			component="div"
			@on-error="({ error, vm, info }) => console.debug({ error, vm, info })"
		>
			<div class="col-span-full">
				<p>
					This is the content that will render inside the error boundary if
					there is no error
				</p>
				<Button @click="triggerError">Click here to trigger error</Button>
			</div>
		</ErrorBoundary>
 *
 */
export default {
	name: 'ErrorBoundary',
};
</script>
