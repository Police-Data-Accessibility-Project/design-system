<template>
	<footer class="pdap-footer">
		<FlexContainer alignment="center">
			<div class="pdap-footer-social-links">
				<a
					v-for="link in links"
					:key="link.text"
					:href="link.to"
					class="pdap-footer-social-link"
					>{{ link.text }}</a
				>
			</div>

			<!-- Copyright and policies -->
			<p class="pdap-footer-copyright">
				© 2023 Police Data Accessibility Project<br />
			</p>
			<p class="pdap-footer-copyright">
				PDAP is a non-profit. EIN: 85-4207132.
				<a
					href="https://docs.pdap.io/meta/policy/pdap-privacy-policy"
					alt="Privacy Policy"
				>
					Privacy Policy</a
				>.
				<a href="mailto:contact@pdap.io">contact@pdap.io</a>
			</p>

			<!-- Widget / logo links -->
			<div class="pdap-footer-widget-links">
				<a href="https://www.guidestar.org/profile/85-4207132" target="_blank"
					><img src="https://widgets.guidestar.org/gximage2?o=9973356&l=v4"
				/></a>

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
		</FlexContainer>
	</footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import FlexContainer from '../FlexContainer/FlexContainer.vue';

export interface PdapFooterSocialLinks {
	to: string;
	text: string;
}

export interface PdapFooterProps {
	logoImageSrc?: string;
	logoImageAnchorPath?: string;
}

const props = withDefaults(defineProps<PdapFooterProps>(), {
	logoImageSrc: 'node_modules/pdap-design-system/dist/images/acronym.svg',
	logoImageAnchorPath: '/',
});

const links = inject<PdapFooterSocialLinks[]>('footerLinks', [
	{
		to: 'https://github.com/orgs/Police-Data-Accessibility-Project',
		text: 'Github',
	},
	{
		to: 'ttps://discord.gg/wMqex8nKZJ',
		text: 'Discord',
	},
	{
		to: 'https://www.linkedin.com/company/pdap',
		text: 'LinkedIn',
	},
]);

const navLogoLinkIsPath = props.logoImageAnchorPath.startsWith('/');
</script>

<style scoped>
@tailwind components;

@layer components {
	.pdap-footer {
		@apply bg-brand-wine mt-auto mx-auto px-2 pt-2 pb-0 relative text-center text-[rgba(255,251,250)] text-lg;
		@apply md:py-8 md:px-2;
	}

	.pdap-footer-social-links > * {
		@apply mb-2;
	}
	.pdap-footer .pdap-flex-container > * {
		@apply mb-2 text-inherit;
	}

	.pdap-footer-widget-links {
		@apply flex mt-6;
	}

	.pdap-footer-logo {
		@apply invert ml-7 w-[10rem];
	}

	.pdap-footer-logo img {
		@apply w-full;
	}

	.pdap-footer-social-link {
		@apply cursor-pointer bg-brand-gold  border-0 decoration-0 disabled:opacity-50 font-semibold inline-block mx-1 px-6 py-3 rounded-none text-center text-neutral-100 text-lg w-full;
		@apply hover:brightness-85 lg:text-xl sm:max-w-max;
	}
}
</style>
