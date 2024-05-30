<template>
	<nav aria-label="Breadcrumb">
		<transition-group class="pdap-breadcrumbs" name="pdap-breadcrumbs" tag="ul">
			<li
				v-for="breadcrumb in breadcrumbs"
				:key="breadcrumb.text"
				:class="{ 'is-active': breadcrumb.active }"
			>
				<router-link v-if="!breadcrumb.active" :to="breadcrumb.path">
					{{ breadcrumb.text }}
				</router-link>
				<span v-else>{{ breadcrumb.text }}</span>
			</li>
		</transition-group>
	</nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { getBreadcrumbs } from '../../utils/breadcrumbs';

const route = useRoute();

const breadcrumbs = computed(() => getBreadcrumbs(route));
</script>

<style scoped>
.pdap-breadcrumbs {
	@apply flex items-center;
}

.pdap-breadcrumbs li {
	@apply flex items-center;
}

.pdap-breadcrumbs li:not(:first-child)::before {
	@apply mx-2;

	content: '/';
}

.pdap-breadcrumbs .is-active {
	@apply text-neutral-950;
}

/* Animations */
.pdap-breadcrumbs-enter-active,
.pdap-breadcrumbs-leave-active {
	transition: opacity 0.2s ease;
}

.pdap-breadcrumbs-enter-from,
.pdap-breadcrumbs-leave-to {
	opacity: 0;
}
</style>
