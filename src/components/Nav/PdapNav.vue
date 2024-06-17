<!-- eslint-disable vue/no-multiple-template-root -->
<template>
	<div
		:aria-label="
			state.isExpanded ? 'close navigation menu' : 'open navigation menu'
		"
		:aria-expanded="state.isMobile && state.isExpanded"
		aria-controls="nav"
		class="pdap-nav-open-button"
		role="button"
		:tabindex="0"
		@click="toggleIsExpanded"
		@keyup.enter="toggleIsExpanded"
	>
		<svg
			aria-label="Menu"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
		>
			<!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
			<path
				d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"
			/>
		</svg>
	</div>

	<transition>
		<nav
			v-show="state.isMobile && state.isExpanded"
			id="nav"
			:aria-hidden="!(state.isMobile && state.isExpanded)"
			class="pdap-nav"
		>
			<li
				v-for="link in links"
				:key="link.text"
				class="pdap-nav-link-container"
			>
				<a
					v-if="link.href"
					class="pdap-nav-link"
					:href="link.href"
					target="_blank"
					referrerpolicy="no-referrer"
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
	</transition>
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
import { PdapLinkData } from './types';

// Inject
let links: PdapLinkData[] | undefined = inject('navLinks');

if (typeof links === 'undefined') {
	links = [];
	console.error(
		'Hey, PDAP developer \n',
		'Did you forget to inject some linkData for the Nav component?'
	);
}

// Refs
const state = reactive<{ isExpanded: boolean; isMobile: boolean }>({
	isExpanded: false,
	isMobile: true,
});

// Life cycle methods
onBeforeMount(() => {
	setIsMobile();
	window.addEventListener('resize', setIsMobile);
});

onBeforeUnmount(() => {
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
	const body = document.querySelector('body');
	if (!state.isExpanded && state.isMobile) {
		state.isExpanded = true;
		if (!body?.classList.contains('lock-scroll')) {
			document.querySelector('body')?.classList.add('lock-scroll');
		}
	} else if (state.isExpanded && state.isMobile) {
		state.isExpanded = false;
		document.querySelector('body')?.classList.remove('lock-scroll');
	}
	await nextTick();
}
</script>

<script lang="ts">
/**
 * # `Nav`
 *
 * ## Notes
 * You do not need to render `Nav` directly. `Header` takes care of that. But you do need to `provide` nav link data from a parent component. This allows for nav links to be dynamic depending on where `Header` is rendered.
 *
 * @example
 *
 *<template>
 *  <Header />
 *  <router-view />
 *  <Footer />
 *</template>
 *
 *
 *<scriptt>
 *import { Footer, Header } from 'pdap-design-system';
 *import { RouterView } from 'vue-router';
 *
 *...
 *
 *export default {
 *  name: 'Layout',
 *  components: ['Footer', 'Header'],
 *  provide: {
 *    navLinks: [
 *      { path: '/', text: 'Home', method: 'path' },
 *      { path: '/a', text: 'a', method: 'path' },
 *      { path: '/b', text: 'b', method: 'path' },
 *      { path: '/c', text: 'c', method: 'path' },
 *      { href: 'https://www.google.com', text: 'Go to Google', method: 'href' },
 *    ]
 *  }
 *  ...
 *}
 *</scriptt>
 */
export default {
	name: 'PdapHeader',
};
</script>

<style>
@tailwind components;

@layer components {
	/* Nav */
	.pdap-nav {
		@apply items-start bg-neutral-300 flex relative z-40;
		@apply lg:bg-transparent lg:justify-center max-lg:absolute max-lg:flex-col max-lg:left-0 max-lg:h-[calc(100vh-var(--header-height))] max-lg:p-6 max-lg:w-full;

		top: var(--header-height);
	}

	.pdap-nav[aria-hidden='true'],
	.pdap-nav-open-button {
		@apply max-lg:hidden;
	}

	.pdap-nav-link-container {
		@apply align-top basis-[max-content] p-2 lg:p-0 inline-block list-none relative;
		@apply lg:flex-shrink-0 lg:flex-grow lg:mx-2 lg:mb-2;
	}

	.pdap-nav-link {
		@apply decoration-0 font-medium p-2 text-left text-xl lg:text-lg text-neutral-950;
	}

	.pdap-nav-link-current {
		@apply lg:outline-neutral-800 lg:outline text-neutral-950;
	}

	.pdap-nav-link-current-exact {
		@apply pdap-nav-link-current lg:outline-neutral-800;
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
<style scoped>
/* Transition styles - scoped to avoid collision */
@media (prefers-reduced-motion: no-preference) {
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.5s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
}
</style>
