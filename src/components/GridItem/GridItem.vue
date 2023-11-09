<template>
	<component :is="component" :class="classes" :styles="styles">
		<slot />
	</component>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

export interface PdapGridItemProps {
	className?: string;
	component?: string;
	spanColumn?: 1 | 2 | 3;
	spanRow?: number;
}

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
// CSS styles map
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
