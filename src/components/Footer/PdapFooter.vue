<template>
	<footer class="pdap-footer">
		<div class="pdap-flex-container-center">
			<ul class="pdap-footer-social-links">
				<li
					v-for="link in links"
					:key="link.text"
					class="pdap-footer-link-container"
				>
					<a
						v-if="link.href"
						class="pdap-footer-social-link"
						:href="link.href"
						target="_blank"
						referrerpolicy="no-referrer"
						>{{ link.text }}</a
					>
					<router-link
						v-if="link.path"
						active-class="pdap-footer-social-link-current"
						exact-active-class="pdap-footer-social-link-current-exact"
						class="pdap-footer-social-link"
						:to="link.path"
						>{{ link.text }}</router-link
					>
				</li>
			</ul>

			<!-- Copyright and policies -->
			<p class="pdap-footer-copyright">
				© {{ new Date().getFullYear() }} Police Data Accessibility Project<br />
			</p>
			<p class="pdap-footer-copyright">
				PDAP is a non-profit. EIN: 85-4207132.
				<a
					href="https://docs.pdap.io/meta/policy/pdap-privacy-policy"
					alt="Privacy Policy"
					target="_blank"
					><br />
					Privacy Policy <i class="fa fa-external-link" /></a
				><br />
				<a href="mailto:contact@pdap.io">contact@pdap.io</a>
			</p>

			<!-- Widget / logo links -->
			<div class="pdap-footer-widget-links">
				<a href="https://www.guidestar.org/profile/85-4207132" target="_blank">
					<img
						alt="platinum transparency"
						src="https://widgets.guidestar.org/gximage2?o=9973356&l=v4"
					/>
				</a>

				<a
					v-if="!navLogoLinkIsPath"
					:href="logoImageAnchorPath"
					class="pdap-footer-logo"
					><img
						:src="logoImageSrc"
						loading="lazy"
						width="250"
						alt="Police Data Accessibility Project Logo"
				/></a>
				<router-link v-else :to="logoImageAnchorPath" class="pdap-footer-logo"
					><img
						:src="logoImageSrc"
						loading="lazy"
						width="250"
						alt="Police Data Accessibility Project Logo"
				/></router-link>
			</div>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { PdapFooterProps, PdapFooterSocialLinks } from './types';
import acronym from '../../assets/acronym.svg';

const props = withDefaults(defineProps<PdapFooterProps>(), {
	logoImageSrc: acronym,
	logoImageAnchorPath: '/',
});

const links = inject<PdapFooterSocialLinks[]>('footerLinks', [
	{
		href: 'https://github.com/orgs/Police-Data-Accessibility-Project',
		text: 'Github',
	},
	{
		href: 'https://discord.gg/wMqex8nKZJ',
		text: 'Discord',
	},
	{
		href: 'https://www.linkedin.com/company/pdap',
		text: 'LinkedIn',
	},
	{
		path: '/jobs',
		text: 'Jobs',
	},
]);

const navLogoLinkIsPath = props.logoImageAnchorPath.startsWith('/');
</script>

<script lang="ts">
/**
 * # `Footer`
 *
 * ## Props
 * @prop {string} logoImageSrc Src for the PDAP logo image to be displayed
 * @prop {string } logoImageAnchorPath Path for the link that wraps the PDAP logo image
 *
 */
export default {
	name: 'PdapFooter',
};
</script>

<style>
@tailwind components;

@layer components {
	.pdap-footer {
		@apply bg-brand-wine mt-auto mx-auto px-2 py-6 relative text-center text-[rgba(255,251,250)] text-lg;
		@apply md:py-8 md:px-2;
	}

	.pdap-footer-social-links {
		@apply flex justify-center flex-wrap gap-2;
		@apply md:flex-nowrap;
	}

	.pdap-footer-social-links > * {
		@apply mb-2;
	}

	.pdap-footer .pdap-flex-container > * {
		@apply mb-2 text-inherit;
	}

	.pdap-footer-widget-links {
		@apply flex justify-center mt-6;
	}

	.pdap-footer-logo {
		@apply invert ml-7 w-[10rem];
	}

	.pdap-footer-logo img {
		@apply w-full;
	}

	.pdap-nav-link-container {
		@apply align-top basis-[max-content] inline-block list-none relative;
		@apply lg:flex-shrink-0 lg:mx-2 lg:mb-2;
	}

	.pdap-footer-social-link {
		@apply cursor-pointer border-2 border-brand-gold decoration-0 disabled:opacity-50 font-semibold inline-block mx-1 px-6 py-2 rounded-none text-center text-lg w-full bg-brand-gold text-neutral-50;
		@apply hover:brightness-85 lg:text-xl sm:max-w-max;
	}
}
</style>
