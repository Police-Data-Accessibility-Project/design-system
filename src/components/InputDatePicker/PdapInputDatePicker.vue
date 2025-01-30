<template>
	<div class="pdap-input" :class="{ 'pdap-input-error': error }">
		<label v-if="$slots.label" :id="`${name}-${id}-label`" :for="id">
			<slot name="label" />
		</label>
		<label v-else-if="label" :id="`${name}-${id}-label`" :for="id">
			{{ label }}
		</label>
		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<VueDatePicker
			v-bind="{ ...$attrs, ...$props }"
			v-model="date"
			:state="Boolean(error)"
			:dark="darkModePreference"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { provideKey } from '../FormV2/util';
import { PdapFormProvideV2 } from '../FormV2/types';
import { PdapDatePickerProps } from './types';
import _isEqual from 'lodash/isEqual';

const { setValues, values, v$ } = inject<PdapFormProvideV2>(provideKey)!;
const { label, name, id } = defineProps<PdapDatePickerProps>();

const date = ref();
const error = computed(() => v$.value[name]?.$errors?.[0]?.$message);

// TODO: when decision made on whether to do dark them with inputs, pass as `:dark` prop to `VueDatePicker` (also add listener for updates )
const darkModeQuery = ref(window.matchMedia('(prefers-color-scheme: dark)'));
const darkModePreference = ref(darkModeQuery.value.matches);

function updateColorMode(e: MediaQueryListEvent) {
	darkModePreference.value = e.matches;
}
onMounted(() => {
	darkModeQuery.value.addEventListener('change', updateColorMode);
});
onUnmounted(() => {
	darkModeQuery.value.removeEventListener('change', updateColorMode);
});

watch(
	() => date.value,
	(newDate) => {
		// Sync values with underlying input, for form
		if (newDate) setValues({ [name]: newDate });
	}
);

watch(
	// Welcome to the land of edge-cases.
	() => values.value,
	// In the (unlikely, unrecommended, but sometimes unfortunately necessary) event of form values changing upstream from a parent component:
	(formValuesUpdated) => {
		const val = formValuesUpdated[name];
		// Case 0: Values are equivalent, or the change was made here, do nothing.

		/*
		 * Case 1: Value does not exist in form values object, meaning either:
		 ** a. it has not been set by the upstream change, or
		 ** b. has been changed to an empty string by `Form` after submit event
		 ** In either case, clear state or keep it clear
		 */
		if (!val) date.value = undefined;
		// Case 2 (rare): value has been programmatically updated upstream of `Form`
		else if (
			!_isEqual(val, date.value) &&
			(val instanceof Date ||
				(Array.isArray(val) && val.every((date) => date instanceof Date)))
		) {
			// Set the date to the value of the form value
			date.value = formValuesUpdated[name];
		}
	}
);
</script>

<style>
@tailwind base;

.dp__theme_light,
.dp__theme_dark {
	/* FULL LIST OF CUSTOMIZING OPTIONS from https://vue3datepicker.com/customization/theming/ */
	/* --dp-background-color: #212121;
    --dp-text-color: #fff;
    --dp-hover-color: #484848;
    --dp-hover-text-color: #fff;
    --dp-hover-icon-color: #959595;
    --dp-primary-color: #005cb2;
    --dp-primary-disabled-color: #61a8ea;
    --dp-primary-text-color: #fff;
    --dp-secondary-color: #a9a9a9;
    --dp-border-color: #2d2d2d;
    --dp-menu-border-color: #2d2d2d;
    --dp-border-color-hover: #aaaeb7;
    --dp-border-color-focus: #aaaeb7;
    --dp-disabled-color: #737373;
    --dp-disabled-color-text: #d0d0d0;
    --dp-scroll-bar-background: #212121;
    --dp-scroll-bar-color: #484848;
    --dp-success-color: #00701a;
    --dp-success-color-disabled: #428f59;
    --dp-icon-color: #959595;
    --dp-danger-color: #e53935;
    --dp-marker-color: #e53935;
    --dp-tooltip-color: #3e3e3e;
    --dp-highlight-color: rgb(0 92 178 / 20%);
    --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
    --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
    --dp-range-between-border-color: var(--dp-hover-color, #fff); */
}

.dp__theme_light {
	--dp-primary-color: rgb(var(--color-brand-gold-600));
	--dp-primary-text-color: rgb(var(--color-neutral-50));
}

.dp__theme_dark {
	--dp-primary-color: rgb(var(--color-brand-gold-700));
	--dp-primary-text-color: rgb(var(--color-neutral-950));
}

.pdap-input .dp__input {
	@apply text-lg pl-9;
}

div[role='gridcell'] {
	@apply outline-none border-2 border-solid border-transparent;
}

div[role='gridcell']:hover,
div[role='gridcell']:focus,
div[role='gridcell']:focus-visible {
	@apply border-2 border-brand-gold-300 border-solid outline-none;
}
</style>
