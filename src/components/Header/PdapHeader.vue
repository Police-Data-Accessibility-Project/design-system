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
		<PdapNav />
	</header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PdapNav from '../Nav/PdapNav.vue';
import { PdapHeaderProps } from './types';
import lockup from '../../assets/lockup.svg';

// Props
const props = withDefaults(defineProps<PdapHeaderProps>(), {
	logoImageSrc: lockup,
	logoImageAnchorPath: '/',
});

// Vars
const el = ref<HTMLElement | null>(null);
const navLogoLinkIsPath = props.logoImageAnchorPath.startsWith('/');

// Lifecycle methods
onMounted(() => {
	getHeightAndSetToCSSVar();
	window.addEventListener('resize', getHeightAndSetToCSSVar);
});

onBeforeUnmount(() => {
	window.removeEventListener('resize', getHeightAndSetToCSSVar);
});

// Utils
function getHeightAndSetToCSSVar() {
	if (el.value) {
		(document.querySelector(':root') as HTMLElement)?.style.setProperty(
			'--header-height',
			`${el.value.clientHeight}px`
		);
	}
}
</script>

<script lang="ts">
/**
 * # `Header`
 *
 * ## Props
 * @prop {string} logoImageSrc Src for the PDAP logo image to be displayed
 * @prop {string } logoImageAnchorPath Path for the link that wraps the PDAP logo image
 *
 * ## Notes
 * The `Header` component does not require any props to be passed. But keep in mind that it is responsible for rendering the `Nav` component. Consuming applications will need to `provide` an array of nav links -- **there are no defaults for this**, you must `provide` these links either 1\. in a layout component (see example below), at the route level, or at the app level. This allows for flexibility in which links are rendered on which routes
 *
 */
export default {
	name: 'PdapHeader',
};
</script>

<style>
.pdap-header {
	@apply dark:bg-neutral-300 relative bg-neutral-50 flex justify-between p-4 md:p-6 w-full z-50;
}

.logo {
	@apply decoration-0 relative max-w-[80%] px-4;
	@apply xs:max-w-none;
}

.logo img {
	@apply dark:invert;
}
</style>
