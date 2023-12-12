<template>
	<header ref="el" class="pdap-header">
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
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import PdapNav from '../Nav/PdapNav.vue';

import { PdapHeaderProps } from './types';

// Props
const props = withDefaults(defineProps<PdapHeaderProps>(), {
	logoImageSrc: 'node_modules/pdap-design-system/dist/images/lockup.svg',
	logoImageAnchorPath: '/',
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
	window.removeEventListener('resize', getHeight);
});

// Utils
function getHeight() {
	if (el.value) {
		height.value = el.value.offsetHeight;
	}
}
</script>

<style>
.pdap-header {
	@apply dark:bg-neutral-300 relative bg-neutral-50 flex justify-between p-8 w-full z-50;
}

.logo {
	@apply decoration-0 relative max-w-[80%] dark:invert;
	@apply xs:max-w-none;
}
</style>
