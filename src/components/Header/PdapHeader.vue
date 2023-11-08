<template>
	<header ref="el" :class="classes">
		<a
			v-if="!navLogoLinkIsPath"
			:href="logoImageAnchorPath"
			:aria-current="isSameRoute"
			class="logo"
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
import {
	computed,
	// onBeforeMount,
	onBeforeUnmount,
	onMounted,
	reactive,
	ref,
	watchEffect,
} from 'vue';
import { RouterLink, useRoute } from 'vue-router';

import PdapNav from '../Nav/PdapNav.vue';

export interface PdapHeaderProps {
	className?: string;
	logoImageSrc?: string;
	logoImageAnchorPath?: string;
}

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
const route = useRoute();
const isSameRoute = computed(() => route.path === props.logoImageAnchorPath);
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
	console.log('getHeight firing');
	if (el.value) {
		height.value = el.value.offsetHeight;
	}
}

watchEffect(() => {
	if (height.value) {
		console.log({ height: height.value });
	}
});
</script>

<style scoped>
.pdap-header {
	@apply dark:bg-neutral-300 fixed bg-neutral-50 flex justify-between p-8 w-full z-50;
}
</style>
