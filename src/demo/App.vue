<script setup lang="ts">
import { Header, Footer } from '../components';
import { provide } from 'vue';
import { RouterView } from 'vue-router';

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
		href: 'https://docs.pdap.io/',
		text: 'Docs',
		method: 'href',
	},
];

provide('navLinks', links);
// provide('footerLinks', links);
</script>

<template>
	<Header />
	<RouterView />
	<Footer />
</template>
