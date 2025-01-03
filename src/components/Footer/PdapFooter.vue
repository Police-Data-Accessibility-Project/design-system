<template>
	<footer
		class="bg-brand-wine text-neutral-50 dark:text-neutral-950 flex flex-col lg:flex-row gap-4 xl:gap-12 p-6 lg:p-4 relative lg:sticky lg:bottom-0 text-med xl:text-xl"
		:style="{ '--fundraising-progress': `${targetProgress}%` }"
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
					<FontAwesomeIcon v-if="link.icon" :icon="iconMap.get(link.icon)!" />
					{{ link.text }}
				</a>
				<router-link
					v-if="link.path"
					active-class="pdap-footer-social-link-current"
					exact-active-class="pdap-footer-social-link-current-exact"
					class="pdap-footer-social-link text-neutral-50 dark:text-neutral-950"
					:to="link.path"
				>
					<FontAwesomeIcon v-if="link.icon" :icon="iconMap.get(link.icon)!" />
					{{ link.text }}
				</router-link>
			</li>
		</ul>

		<!-- FUNDRAISING METER -->
		<div v-if="fundraisingData.goal > 0">
			<span class="flex gap-1">
				<a
					href="https://pdap.io/donate"
					target="_blank"
					rel="noreferrer"
					class="text-neutral-50 dark:text-neutral-950"
				>
					<span><FontAwesomeIcon :icon="faCircleDollarToSlot" /> Donate</span>
					(${{ formatWithCommas(fundraisingData.raised) }} of ${{
						formatWithCommas(fundraisingData.goal)
					}}
					raised
					<span
						v-if="
							fundraisingData.goal > 0 &&
							fundraisingData.raised === fundraisingData.goal
						"
					>
						🎉🎉🎉
					</span>
					)
				</a>
			</span>

			<span
				class="inline-block bg-neutral-50 dark:bg-neutral-950 h-3 w-full rounded-full relative before:inline-block before:h-full before:bg-brand-gold before:absolute before:rounded-l-full before:transition-[width] before:duration-1000 before:ease-out before:w-[var(--fundraising-progress)]"
				:class="{
					'before:rounded-r-full':
						fundraisingData.raised === fundraisingData.goal,
				}"
			/>
		</div>

		<!-- COPYRIGHT AND TRANSPARENCY -->
		<div class="flex gap-4 justify-between lg:justify-start lg:ml-auto">
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
import { computed, inject } from 'vue';
import {
	PdapFooterSocialLinks,
	FooterIconName,
	PdapFooterProps,
} from './types';
import { FOOTER_LINK_ICONS } from './constants';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
	faGithub,
	faDiscord,
	faLinkedin,
	IconDefinition,
} from '@fortawesome/free-brands-svg-icons';
import {
	faSmile,
	faInbox,
	faBook,
	faCircleDollarToSlot,
} from '@fortawesome/free-solid-svg-icons';
import { formatWithCommas } from '../../utils/format';

const props = defineProps<PdapFooterProps>();

const iconMap = new Map<FooterIconName, IconDefinition>([
	[FOOTER_LINK_ICONS.GITHUB, faGithub],
	[FOOTER_LINK_ICONS.DISCORD, faDiscord],
	[FOOTER_LINK_ICONS.LINKEDIN, faLinkedin],
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
		href: 'https://www.linkedin.com/company/pdap',
		text: 'LinkedIn',
		icon: FOOTER_LINK_ICONS.LINKEDIN,
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
]);

const targetProgress = computed(() => {
	let progress = 2;

	if (!props.fundraisingData) return (progress = 0);

	const ratio = props.fundraisingData.raised / props.fundraisingData.goal;

	if (ratio > 0.02) {
		progress = ratio * 100;
	}

	return Math.ceil(progress);
});
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
