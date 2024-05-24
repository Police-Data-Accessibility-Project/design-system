<template>
	<nav aria-label="Breadcrumb">
		<ol class="breadcrumbs">
			<li
				v-for="(breadcrumb, index) in breadcrumbs"
				:key="index"
				:class="{ 'is-active': breadcrumb.active }"
			>
				<router-link v-if="!breadcrumb.active" :to="breadcrumb.path">
					{{ breadcrumb.text }}
				</router-link>
				<span v-else>{{ breadcrumb.text }}</span>
			</li>
		</ol>
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
.breadcrumbs {
	@apply flex items-center;
}

.breadcrumbs li {
	@apply flex items-center;
}

.breadcrumbs li:not(:last-child)::after {
	@apply mx-2;

	content: '/';
}

.breadcrumbs .is-active {
	@apply text-neutral-950;
}
</style>
