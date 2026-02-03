<template>
	<footer
		class="pdap-footer z-50 bg-brand-wine-700 text-wineneutral-50 dark:text-wineneutral-950 relative p-2 md:p-3 lg:sticky lg:bottom-0 flex flex-col gap-2"
	>
		<div
			v-if="isCollapsible"
			class="flex justify-center"
			data-testid="pdap-footer-toggle-container"
		>
			<button
				type="button"
				class="pdap-footer-toggle flex items-center justify-center rounded-full border border-solid text-sm text-white w-6 h-6 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-wineneutral-50 shadow-lg bg-[rgb(var(--color-brand-wine-500))] border-white"
				data-testid="pdap-footer-toggle"
				:aria-controls="footerContentId"
				:aria-expanded="isExpanded"
				:aria-label="
					isExpanded ? 'Collapse footer details' : 'Expand footer details'
				"
				@click="toggleFooter"
			>
				<FontAwesomeIcon
					:icon="isExpanded ? faCaretDown : faCaretUp"
					class="text-current"
				/>
			</button>
		</div>
		<transition name="pdap-footer-collapse">
			<div
				v-show="isExpanded"
				:id="footerContentId"
				data-testid="pdap-footer-content"
				class="pdap-footer-content flex flex-col justify-center lg:flex-row gap-4 xl:gap-12 text-med xl:text-xl"
			>
				<!-- LINKS -->
				<ul
					class="grid grid-cols-2 gap-2 md:grid-cols-[auto_auto_auto] lg:w-max lg:gap-x-3 xl:gap-x-4"
				>
					<li v-for="link in links" :key="link.text" class="w-max">
						<a
							v-if="link.href"
							:href="link.href"
							target="_blank"
							rel="noreferrer"
							class="text-inherit"
						>
							<FontAwesomeIcon
								v-if="link.icon"
								:icon="iconMap.get(link.icon)!"
								class="text-brand-wine-100"
							/>
							{{ link.text }}
						</a>
						<router-link
							v-if="link.path"
							active-class="pdap-footer-social-link-current"
							exact-active-class="pdap-footer-social-link-current-exact"
							class="pdap-footer-social-link text-inherit"
							:to="link.path"
						>
							<FontAwesomeIcon
								v-if="link.icon"
								:icon="iconMap.get(link.icon)!"
							/>
							{{ link.text }}
						</router-link>
					</li>
				</ul>
				<!-- COPYRIGHT AND TRANSPARENCY -->
				<div
					class="flex flex-col md:flex-row-reverse gap-4 justify-between lg:justify-start lg:items-center lg:ml-auto"
				>
					<!-- Widget / logo links -->
					<a
						href="https://www.guidestar.org/profile/shared/2ca08a66-da60-4a83-a4c2-c9ddadbc416d"
						target="_blank"
						rel="noreferrer"
					>
						<img
							class="w-14 h-14 overflow-hidden"
							alt="guidestar transparency seal"
							src="/src/assets/candid-platinum.svg"
						/>
					</a>
					<p
						class="lg:max-w-[325px] lg:text-right xl:max-w-[375px] text-wineneutral-50 dark:text-wineneutral-950"
					>
						© {{ new Date().getFullYear() }} Police Data Accessibility Project
						is a non-profit. EIN: 85-4207132.
					</p>
				</div>
			</div>
		</transition>
	</footer>
</template>

<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import {
	PdapFooterProps,
	PdapFooterSocialLinks,
	FooterIconName,
} from './types';
import { FOOTER_LINK_ICONS } from './constants';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faGithub,
	faDiscord,
	IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import {
	faSmile,
	faInbox,
	faBook,
	faEnvelope,
	faArrowsToDot,
	faCaretDown,
	faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

const props = withDefaults(defineProps<PdapFooterProps>(), {
	collapseOnFirstRender: true,
});

const iconMap = new Map<FooterIconName, IconDefinition>([
	[FOOTER_LINK_ICONS.GITHUB, faGithub],
	[FOOTER_LINK_ICONS.DISCORD, faDiscord],
	[FOOTER_LINK_ICONS.EMAIL, faEnvelope],
	[FOOTER_LINK_ICONS.JOBS, faSmile],
	[FOOTER_LINK_ICONS.NEWSLETTER, faInbox],
	[FOOTER_LINK_ICONS.DOCS, faBook],
	[FOOTER_LINK_ICONS.PUBLISH, faArrowsToDot],
]);

const links = inject<PdapFooterSocialLinks[]>('footerLinks', [
	{
		href: 'https://github.com/orgs/Police-Data-Accessibility-Project',
		text: 'Github',
		icon: FOOTER_LINK_ICONS.GITHUB,
	},
	{
		href: 'https://discord.gg/wMqex8nKZJ',
		text: 'Discord',
		icon: FOOTER_LINK_ICONS.DISCORD,
	},
	{
		href: 'https://pdap.io/jobs',
		text: 'Jobs',
		icon: FOOTER_LINK_ICONS.JOBS,
	},
	{
		href: 'https://newsletter.pdap.io/',
		text: 'Newsletter',
		icon: FOOTER_LINK_ICONS.NEWSLETTER,
	},
	{
		href: 'https://docs.pdap.io/',
		text: 'Docs',
		icon: FOOTER_LINK_ICONS.DOCS,
	},
	{
		href: 'mailto:contact@pdap.io',
		text: 'Email',
		icon: FOOTER_LINK_ICONS.EMAIL,
	},
]);

const isExpanded = ref(true);
const hasUserInteracted = ref(false);
const isStickyViewport = ref(false);
const isCollapsible = computed(() => isStickyViewport.value);
const footerContentId = `pdap-footer-content-${Math.random()
	.toString(36)
	.slice(2, 7)}`;

const shouldCollapseOnLoad = computed(() => !!props.collapseOnFirstRender);

const applyDefaultExpansion = (force = false) => {
	if (!isCollapsible.value) {
		isExpanded.value = true;
		return;
	}

	if (!shouldCollapseOnLoad.value) {
		isExpanded.value = true;
		return;
	}

	if (force || !hasUserInteracted.value) {
		isExpanded.value = false;
	}
};

const toggleFooter = () => {
	if (!isCollapsible.value) {
		return;
	}
	hasUserInteracted.value = true;
	isExpanded.value = !isExpanded.value;
};

let mediaQuery: MediaQueryList | undefined;
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | undefined;

const handleMediaChange = (matches: boolean) => {
	isStickyViewport.value = matches;

	if (!matches) {
		hasUserInteracted.value = false;
		isExpanded.value = true;
		return;
	}

	applyDefaultExpansion();
};

onMounted(() => {
	if (typeof window === 'undefined' || !('matchMedia' in window)) {
		handleMediaChange(false);
		return;
	}

	const mq = window.matchMedia('(min-width: 1024px)');
	mediaQuery = mq;
	mediaQueryListener = (event: MediaQueryListEvent) => {
		handleMediaChange(event.matches);
	};

	handleMediaChange(mq.matches);

	if (typeof mq.addEventListener === 'function') {
		mq.addEventListener('change', mediaQueryListener);
	} else if (typeof mq.addListener === 'function') {
		mq.addListener(mediaQueryListener);
	}
});

onBeforeUnmount(() => {
	if (!mediaQuery || !mediaQueryListener) {
		return;
	}

	if (typeof mediaQuery.removeEventListener === 'function') {
		mediaQuery.removeEventListener('change', mediaQueryListener);
	} else {
		mediaQuery.removeListener(mediaQueryListener);
	}
});

watch(
	() => props.collapseOnFirstRender,
	() => {
		hasUserInteracted.value = false;
		applyDefaultExpansion(true);
	}
);
</script>

<script lang="ts">
/**
 * # `Footer`
 *
 *
 */
export default {
	name: 'PdapFooter',
};
</script>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
	.pdap-footer-collapse-enter-active,
	.pdap-footer-collapse-leave-active {
		transition:
			opacity 200ms ease,
			max-height 200ms ease;
	}

	.pdap-footer-collapse-enter-from,
	.pdap-footer-collapse-leave-to {
		opacity: 0;
		max-height: 0;
	}

	.pdap-footer-collapse-enter-to,
	.pdap-footer-collapse-leave-from {
		opacity: 1;
		max-height: 20rem;
	}
}
</style>

