<template>
	<header ref="el" class="pdap-header">
		<a v-if="!navLogoLinkIsPath" :href="logoAnchorPath" class="logo"
			>
			<FontAwesomeIcon :icon="faArrowsToCircle" />
			&nbsp;Police Data Access Point</a>
		<router-link v-else :to="logoAnchorPath" class="logo"
			>
			<FontAwesomeIcon :icon="faArrowsToCircle" />
			&nbsp;Police Data Access Point</router-link>
		<PdapNav />
	</header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import PdapNav from '../Nav/PdapNav.vue';
import { PdapHeaderProps } from './types';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowsToCircle } from '@fortawesome/free-solid-svg-icons';

// Props
const props = withDefaults(defineProps<PdapHeaderProps>(), {
	logoAnchorPath: '/',
});

// Vars
const el = ref<HTMLElement | null>(null);
const navLogoLinkIsPath = props.logoAnchorPath.startsWith('/');

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
 * @prop {string } logoAnchorPath Path for the link that wraps the PDAP logo image
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
	@apply decoration-0 relative max-w-[80%] text-xl font-bold p-2 outline outline-wineneutral-500 text-brand-wine-400;
	@apply lg:text-lg;
	@apply xs:max-w-none;
}

</style>
