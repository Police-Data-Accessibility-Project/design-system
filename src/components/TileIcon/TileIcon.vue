<template>
	<img class="pdap-tile-icon" :alt="imgAltText" :src="imgSrc" />
</template>

<script setup lang="ts">
import { PdapTileIconProps } from './types';

defineProps<PdapTileIconProps>();
</script>

<script lang="ts">
/**
 * @deprecated unused
 */
export default {
	name: 'TileIcon',
};
</script>

<style>
.pdap-tile-icon {
	@apply h-auto max-w-[7.5rem];
}
</style>
