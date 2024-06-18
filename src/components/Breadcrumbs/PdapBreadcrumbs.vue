<template>
	<nav aria-label="Breadcrumb">
		<transition-group class="pdap-breadcrumbs" tag="ul">
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

<script lang="ts">
/**
 * # `Breadcrumbs`
 *
 * Renders a hierarchy of matching links for all paths matching the current path.
 *
 * The rendered text of each link will default to the `name` value in each matching route's object, unless `meta.breadcrumbText` is set.
 *
 *
 */
export default {
	name: 'PdapBreadcrumbs',
};
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
</style>

<style scoped>
@media (prefers-reduced-motion: no-preference) {
	/* Animations */
	.v-enter-active,
	.v-leave-active {
		transition: opacity 0.2s ease;
	}

	.v-enter-from,
	.v-leave-to {
		opacity: 0;
	}
}
</style>
