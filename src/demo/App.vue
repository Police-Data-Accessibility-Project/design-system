<script setup lang="ts">
import { Header, Footer } from '../components';
import { computed, provide } from 'vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';

const links = [
	{
		path: '/',
		text: 'Search',
		method: 'route',
	},
	{
		href: 'https://pdap.io/data',
		text: 'Data',
		method: 'href',
	},
	{
		href: 'https://pdap.io/community',
		text: 'Community',
		method: 'href',
	},
	{
		href: 'https://pdap.io/about',
		text: 'About',
		method: 'href',
	},
	{
		href: 'https://pdap.io/donate',
		text: 'Donate',
		method: 'href',
	},
	{
		path: '/form-v2-demo',
		text: 'Form Demo',
		method: 'route',
	},
	{
		href: 'https://docs.pdap.io/',
		text: 'Docs',
		method: 'href',
	},
];

provide('navLinks', links);
// provide('footerLinks', links);

const route = useRoute();
const collapseFooterOnEntry = computed(() => {
	for (let i = route.matched.length - 1; i >= 0; i -= 1) {
		const record = route.matched[i];
		if (typeof record.meta?.collapseFooter === 'boolean') {
			return record.meta.collapseFooter;
		}
	}
	return true;
});
</script>

<template>
	<Header />
	<RouterView />
	<Footer :collapse-on-first-render="collapseFooterOnEntry" />
</template>
