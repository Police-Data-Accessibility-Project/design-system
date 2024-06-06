<template>
	<component
		:is="component"
		v-if="error"
		class="pdap-flex-container-center h-[full]"
	>
		<h1>Oops, something went wrong!</h1>
		<p class="max-w-full" data-test="error-boundary-message">
			If you keep seeing this message, please email
			<a href="mailto:contact@pdap.io">contact@pdap.io</a> for assistance.
		</p>
	</component>
	<slot v-else />
</template>
<script>
/**
 * # `ErrorBoundary`
 * Intercepts uncaught errors from its children and renders an error UI in place of its children.
 *
 * @prop {string} component Optional: the component to render as a fallback, defaults to 'div'
 *
 * @example
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
 */
export default {
	props: {
		component: {
			type: String,
			default: 'div',
		},
	},
	data() {
		return {
			error: false,
		};
	},
	/* TODO: figure out how to cover this lifecycle method in tests */
	errorCaptured(error) {
		this.interceptError(error);
	},
	methods: {
		interceptError(error) {
			this.error = error;
		},
	},
};
</script>
