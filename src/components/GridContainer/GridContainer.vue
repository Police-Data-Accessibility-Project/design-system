<template>
	<component :is="component" :class="classes" :style="styles">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { PdapGridContainerProps } from './types';

const props = withDefaults(defineProps<PdapGridContainerProps>(), {
	columns: 'auto',
	component: 'div',
	rows: 'auto',
});

// CSS class map
const classes = reactive({
	'pdap-grid-container': true,
	[`pdap-grid-container-column-${props.columns}`]: props.columns !== 'auto',
	[String(props.className)]: Boolean(props.className),
});
// CSS styles map
const renderTemplateRowsInline =
	props.templateRows || typeof props.rows === 'number';
const gridTemplateRows =
	props.templateRows ?? `repeat(${props.rows}, minmax(0, 1fr))`;
const styles = reactive({
	...(renderTemplateRowsInline && {
		gridTemplateRows,
	}),
	...(props.templateColumns && { gridTemplateColumns: props.templateColumns }),
});
</script>

<style scoped>
.pdap-grid-container {
	@apply grid grid-cols-[auto] grid-rows-[auto] h-full gap-4 p-8 w-full;
	@apply md:gap-8;
}

.pdap-grid-container-column-1 {
	@apply grid-cols-1;
}

.pdap-grid-container-column-2 {
	@apply items-start grid-cols-1;
	@apply md:grid-cols-2;
}

.pdap-grid-container-column-3 {
	@apply grid-cols-1;
	@apply md:grid-cols-2 lg:grid-cols-3;
}
</style>
