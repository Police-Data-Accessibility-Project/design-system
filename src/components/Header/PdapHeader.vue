<template>
	<header ref="el" :class="classes">
		<a v-if="!navLogoLinkIsPath" :href="logoImageAnchorPath" class="logo"
			><img
				:src="logoImageSrc"
				loading="lazy"
				width="250"
				alt="Police Data Accessibility Project Logo"
		/></a>
		<router-link v-else :to="logoImageAnchorPath" class="logo"
			><img
				:src="logoImageSrc"
				loading="lazy"
				width="250"
				alt="Police Data Accessibility Project Logo"
		/></router-link>
		<PdapNav :top-position="height" />
	</header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { RouterLink } from 'vue-router';

import PdapNav from '../Nav/PdapNav.vue';

import { PdapHeaderProps } from './types';

// Props
const props = withDefaults(defineProps<PdapHeaderProps>(), {
	logoImageSrc: 'node_modules/pdap-design-system/dist/images/lockup.svg',
	logoImageAnchorPath: '/',
});

// CSS class map
const classes = reactive({
	'pdap-header': true,
	[String(props.className)]: Boolean(props.className),
});

// State
const height = ref();

// Vars
const el = ref<HTMLElement | null>(null);
const navLogoLinkIsPath = props.logoImageAnchorPath.startsWith('/');

// Lifecycle methods
onMounted(() => {
	getHeight();
	window.addEventListener('resize', getHeight);
});

onBeforeUnmount(() => {
	/* c8 ignore next 1 */
	window.removeEventListener('resize', getHeight);
});

// Utils
function getHeight() {
	if (el.value) {
		height.value = el.value.offsetHeight;
	}
}
</script>

<style scoped>
.pdap-header {
	@apply dark:bg-neutral-300 fixed bg-neutral-50 flex justify-between p-8 w-full z-50;
}
.logo {
	@apply decoration-0 relative max-w-[80%] dark:invert;
	@apply xs:max-w-none;
}
</style>
