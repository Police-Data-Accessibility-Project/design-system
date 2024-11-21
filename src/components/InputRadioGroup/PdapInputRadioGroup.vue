<template>
	<div class="pdap-input-radio-group" :class="{ ['pdap-input-error']: error }">
		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed, inject } from 'vue';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';

const { name } = defineProps<{ name: string }>();

const { v$ } = inject<PdapFormProvideV2>(provideKey)!;

const error = computed(() => v$.value[name]?.$errors?.[0]?.$message);
</script>
