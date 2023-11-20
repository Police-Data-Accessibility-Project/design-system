<template>
	<component :is="component" :class="classes" :style="styles">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

import { PdapGridItemProps } from './types';

const props = withDefaults(defineProps<PdapGridItemProps>(), {
	component: 'div',
	spanColumn: 1,
	spanRow: 1,
});

// CSS class map
const classes = reactive({
	'pdap-grid-item': true,
	[`pdap-grid-item-span-column-${props.spanColumn}`]: props.spanColumn > 1,
	[String(props.className)]: Boolean(props.className),
});
// CSS styles
const styles = reactive({
	// Only add inline property if it is passed and exceeds the default
	...(props.spanRow > 1 && {
		gridRow: `span ${props.spanRow} / span ${props.spanRow}`,
	}),
});
</script>

<style scoped>
.pdap-grid-item {
	@apply col-span-1 row-span-1;
}
.pdap-grid-item-span-column-2 {
	@apply md:col-span-2;
}

.pdap-grid-item-span-column-3 {
	@apply col-span-1;
	@apply md:col-span-2 lg:col-span-3;
}
</style>
