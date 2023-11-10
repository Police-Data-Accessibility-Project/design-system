<template>
	<img class="pdap-tile-icon" :alt="imgAltText" :src="imgSrc" />
</template>

<script setup lang="ts">
export interface PdapTileIconProps {
	imgAltText: string;
	imgSrc: string;
}

defineProps<PdapTileIconProps>();
</script>

<style scoped>
.pdap-tile-icon {
	@apply h-auto max-w-[7.5rem];
}
</style>
