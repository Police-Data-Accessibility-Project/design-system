<template>
	<footer
		class="bg-brand-wine text-wineneutral-50 dark:text-wineneutral-950 flex flex-col justify-center lg:flex-row gap-4 xl:gap-12 p-2 lg:p-2 lg:px-8 relative lg:sticky lg:bottom-0 text-med xl:text-xl"
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
					class="text-neutral-50 dark:text-neutral-950"
				>
					<FontAwesomeIcon v-if="link.icon" :icon="iconMap.get(link.icon)!" class="text-brand-wine-100 dark:text-brand-wine-800"/>
					{{ link.text }}
				</a>
				<router-link
					v-if="link.path"
					active-class="pdap-footer-social-link-current"
					exact-active-class="pdap-footer-social-link-current-exact"
					class="pdap-footer-social-link text-wineneutral-50 dark:text-wineneutral-950"
					:to="link.path"
				>
					<FontAwesomeIcon v-if="link.icon" :icon="iconMap.get(link.icon)!" />
					{{ link.text }}
				</router-link>
			</li>
		</ul><!-- COPYRIGHT AND TRANSPARENCY -->
		<div class="flex gap-4 justify-between text-lg lg:justify-start lg:items-center lg:ml-auto">
			<p class="lg:max-w-[325px] lg:text-right xl:max-w-[375px]">
				© {{ new Date().getFullYear() }} Police Data Accessibility Project is a
				non-profit. EIN: 85-4207132.
			</p>

			<!-- Widget / logo links -->
			<a
				href="https://www.guidestar.org/profile/85-4207132"
				target="_blank"
				rel="noreferrer"
			>
				<img
					class="w-14 h-14"
					alt="platinum transparency"
					src="https://widgets.guidestar.org/gximage2?o=9973356&l=v4"
				/>
			</a>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import {
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
} from '@fortawesome/free-solid-svg-icons';

const iconMap = new Map<FooterIconName, IconDefinition>([
	[FOOTER_LINK_ICONS.GITHUB, faGithub],
	[FOOTER_LINK_ICONS.DISCORD, faDiscord],
	[FOOTER_LINK_ICONS.EMAIL, faEnvelope],
	[FOOTER_LINK_ICONS.JOBS, faSmile],
	[FOOTER_LINK_ICONS.NEWSLETTER, faInbox],
	[FOOTER_LINK_ICONS.DOCS, faBook],
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
