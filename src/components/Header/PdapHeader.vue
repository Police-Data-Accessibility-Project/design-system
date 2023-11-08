<template>
	<header :class="classes">
		<a href="index.html" aria-current="page" class="logo"
			><img
				:src="logoImagePath"
				loading="lazy"
				width="250"
				alt="Police Data Accessibility Project Logo"
		/></a>
		<PdapNav />
	</header>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import PdapNav from '../Nav/PdapNav.vue';

export interface PdapHeaderProps {
	className?: string;
	logoImagePath?: string;
}

// Props
const props = withDefaults(defineProps<PdapHeaderProps>(), {
	logoImagePath: 'node_modules/pdap-design-system/dist/images/lockup.svg',
});

// CSS class map
const classes = reactive({
	'pdap-header': true,
	[String(props.className)]: Boolean(props.className),
});
</script>

<style scoped>
.pdap-header {
	@apply dark:bg-neutral-300 bg-neutral-50 flex justify-between p-8 relative z-50;
}
</style>
