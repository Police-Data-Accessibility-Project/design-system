<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<div
		aria-controls="nav"
		class="pdap-nav-open-button"
		role="button"
		@click="toggleIsExpanded"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
			<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
			/>
		</svg>
	</div>

	<nav
		id="nav"
		:aria-expanded="(state.isMobile && state.isExpanded) || !state.isMobile"
		:class="classes"
		:style="state.isMobile ? { top: `${topPosition}px` } : {}"
	>
		<li v-for="link in links" :key="link.text" class="pdap-nav-link-container">
			<a
				v-if="link.href"
				class="pdap-nav-link"
				:href="link.href"
				@click="toggleIsExpanded"
				>{{ link.text }}</a
			>
			<router-link
				v-if="link.path"
				active-class="pdap-nav-link-current"
				exact-active-class="pdap-nav-link-current-exact"
				class="pdap-nav-link"
				:to="link.path"
				@click="toggleIsExpanded"
				>{{ link.text }}</router-link
			>
		</li>
	</nav>
</template>

<script setup lang="ts">
// Imports
import {
	inject,
	nextTick,
	onBeforeMount,
	onBeforeUnmount,
	reactive,
} from 'vue';
import { RouterLink } from 'vue-router';
// Types
import { PdapLinkData, PdapNavProps } from './types';

// Inject
let links: PdapLinkData[] | undefined = inject('navLinks');

if (typeof links === 'undefined') {
	links = [];
	console.error(
		'Hey, PDAP developer \n',
		'Did you forget to inject some linkData for the Nav component?'
	);
}

// Props
const props = defineProps<PdapNavProps>();

// Refs
const state = reactive<{ isExpanded: boolean; isMobile: boolean }>({
	isExpanded: false,
	isMobile: true,
});

// CSS class map
const classes = reactive({
	'pdap-nav': true,
	[String(props.className)]: Boolean(props.className),
});

// Life cycle methods
onBeforeMount(() => {
	setIsMobile();
	window.addEventListener('resize', setIsMobile);
});

onBeforeUnmount(() => {
	/* c8 ignore next 1 */
	window.removeEventListener('resize', setIsMobile);
});

// Handlers
async function setIsMobile() {
	if (window.innerWidth <= 1024) {
		state.isMobile = true;
	} else {
		state.isMobile = false;
	}
	await nextTick();
}

async function toggleIsExpanded() {
	if (!state.isExpanded) state.isExpanded = true;
	else state.isExpanded = false;
	await nextTick();
}
</script>

<style scoped>
@tailwind components;

@layer components {
	/* Nav */
	.pdap-nav {
		@apply items-center bg-neutral-400 flex relative z-40;
		@apply lg:bg-transparent lg:justify-center max-lg:absolute max-lg:flex-col max-lg:left-0 max-lg:h-[calc(100vh-104px)] max-lg:p-6 max-lg:top-[104px] max-lg:w-full;
	}

	.pdap-nav[aria-expanded='false'],
	.pdap-nav-open-button {
		@apply max-lg:hidden;
	}

	.pdap-nav-link-container {
		@apply align-top basis-[max-content] inline-block list-none relative;
		@apply lg:flex-shrink-0 lg:flex-grow lg:mx-2 lg:mb-2;
	}

	.pdap-nav-link {
		@apply decoration-0 font-medium p-2 text-left text-lg text-neutral-800;
	}

	.pdap-nav-link-current {
		@apply lg:border-neutral-400 lg:border-2 lg:border-solid text-neutral-700;
	}

	.pdap-nav-link-current-exact {
		@apply pdap-nav-link-current lg:border-neutral-700;
	}

	.pdap-nav-open-button {
		@apply cursor-pointer flex items-center text-xl;
		@apply lg:hidden;
	}

	.pdap-nav-open-button svg {
		@apply fill-neutral-950 h-5;
	}
}
</style>
