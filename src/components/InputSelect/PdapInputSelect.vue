<template>
	<div class="pdap-input" :class="{ 'pdap-input-error': error }">
		<label v-if="$slots.label" :id="`${name}-${id}-label`" :for="id">
			<slot name="label" />
		</label>
		<label v-else-if="label" :id="`${name}-${id}-label`" :for="id">
			{{ label }}
		</label>
		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<!-- TODO: aria-aware error handling?? Not just here but in other input components as well? -->
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<div
			:id="id"
			ref="selectRef"
			v-on-click-outside="closeAndReturnFocus"
			aria-controls="listbox"
			:aria-expanded="isOpen"
			:aria-labelledby="`${name}-${id}-label`"
			class="pdap-custom-select"
			:class="{ open: isOpen }"
			role="combobox"
			:tabindex="0"
			v-bind="$attrs"
			@click="toggleOpen"
			@keydown="handleKeyDown"
		>
			<div class="selected-value">
				{{ selectedOption ? selectedOption.label : placeholder }}
			</div>
			<div class="arrow" :class="{ open: isOpen }" />
			<ul
				v-show="isOpen"
				ref="listRef"
				class="pdap-custom-select-options"
				role="listbox"
				:tabindex="-1"
				:aria-activedescendant="
					optionIds.get(focusedOptionIndex) ?? selectedOption?.label
				"
			>
				<li
					v-for="(option, index) in options"
					:id="optionIds.get(index)"
					:key="option.value + '_select-option'"
					:ref="(el) => setOptionRef(el as HTMLLIElement, index)"
					class="pdap-custom-select-option"
					:class="{ selected: focusedOptionIndex === index }"
					role="option"
					:aria-selected="option.value === selectedOption?.value"
					tabindex="0"
					@click.stop="selectOption(option)"
					@keydown.enter.stop="selectOption(option)"
					@focus="focusedOptionIndex = index"
					@mouseenter="focusedOptionIndex = index"
					@mouseleave="undefined"
					@blur="undefined"
				>
					{{ option.label }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, inject, watch, computed, nextTick, useSlots } from 'vue';
import { PdapSelectOption as Option, PdapInputSelectProps } from './types';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';
import { vOnClickOutside } from '../../directives';

const { name, options, id, label } = withDefaults(
	defineProps<PdapInputSelectProps>(),
	{
		placeholder: 'Select an option',
	}
);
const slots = useSlots();
if (!slots.label && !label)
	throw new Error(
		'All form inputs must have a label, passed as a slot or a prop'
	);

const { setValues, values, v$ } = inject<PdapFormProvideV2>(provideKey)!;

const isOpen = ref(false);
const selectedOption = ref<Option | null>(null);
const focusedOptionIndex = ref(-1);
const optionRefs = ref<Map<number, HTMLLIElement>>(new Map());
const selectRef = ref();

const optionIds = computed(() => {
	return new Map(
		options.map(({ value }, index) => [index, `${name}-option-${value}`])
	);
});

const error = computed(() => {
	return v$.value[name]?.$error ? v$.value[name]?.$errors?.[0]?.$message : '';
});

function toggleOpen() {
	isOpen.value = !isOpen.value;
}

function closeAndReturnFocus() {
	if (isOpen.value) {
		isOpen.value = false;
		selectRef.value.focus();
		focusedOptionIndex.value = -1;
	}
}

function selectOption(option: Option) {
	selectedOption.value = option;
	closeAndReturnFocus();
}

function setOptionRef(el: HTMLLIElement | null, index: number) {
	if (el) {
		optionRefs.value.set(index, el);
	}
}
function focusOption(index: number) {
	const optionElement = optionRefs.value.get(index);
	if (optionElement) {
		// Using nextTick here to ensure DOM is fully updated first
		nextTick(() => {
			optionElement.focus();
		});
	}
}

function handleKeyDown(event: KeyboardEvent) {
	if (event.key === 'Tab') {
		if (!event.shiftKey && focusedOptionIndex.value === options.length - 1) {
			event.preventDefault();
			return;
		}

		if (event.shiftKey && focusedOptionIndex.value === 0) {
			event.preventDefault();
			closeAndReturnFocus();
			return;
		}

		return;
	}

	if (!isOpen.value) {
		if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
			event.preventDefault();
			toggleOpen();
		}
		return;
	}

	event.preventDefault();
	switch (event.key) {
		case 'ArrowDown':
			if (focusedOptionIndex.value === options.length - 1) break;
			focusedOptionIndex.value = focusedOptionIndex.value + 1;
			break;
		case 'ArrowUp':
			if (focusedOptionIndex.value <= 0) {
				closeAndReturnFocus();
				break;
			}
			focusedOptionIndex.value = focusedOptionIndex.value - 1;
			break;
		case 'Enter':
			if (focusedOptionIndex.value >= 0) {
				selectOption(options[focusedOptionIndex.value]);
			} else {
				toggleOpen();
			}
			break;
		case 'Escape':
			closeAndReturnFocus();
			break;
	}
}

watch(
	() => selectedOption.value,
	(newSelected) => {
		// Update form values when state changes.
		if (newSelected) {
			setValues({ [name]: newSelected.value });
		}
	}
);

watch(
	() => focusedOptionIndex.value,
	// When the index to focus changes (tracking this state because we need it for other things), focus that input
	(nextIndexToFocus) => {
		if (typeof nextIndexToFocus === 'number' && nextIndexToFocus >= 0) {
			focusOption(nextIndexToFocus);
		}
	}
);

watch(
	() => isOpen.value,
	(isNowOpen) => {
		// If menu is opening, find selected option and focus it.
		if (isNowOpen && selectedOption.value) {
			const selected = options.find(
				(opt) => opt.value === selectedOption?.value?.value
			);
			if (!selected) return;
			const index = options.indexOf(selected);
			focusedOptionIndex.value = index;
		}
	}
);

watch(
	// Welcome to the land of edge-cases.
	() => values.value,
	// In the (unlikely, unrecommended, but sometimes unfortunately necessary) event of form values changing upstream from a parent component:
	(formValuesUpdated) => {
		// Case 0: Values are equivalent, or the change was made here, do nothing.

		/*
		 * Case 1: Value does not exist in form values object, meaning either:
		 ** a. it has not been set by the upstream change, or
		 ** b. has been changed to an empty string by `Form` after submit event
		 ** In either case, clear state or keep it clear
		 */
		if (!formValuesUpdated[name]) selectedOption.value = null;

		// Case 2 (rare): value has been programmatically updated upstream of `Form`, handle either:
		if (formValuesUpdated[name] !== selectedOption?.value)
			selectedOption.value =
				// a. changed value exists as an option, we override state, or
				options.find((opt) => opt.value === formValuesUpdated[name]) ??
				// b. changed value does not exist as an option, keep state value.
				selectedOption.value;
	}
);
</script>

<style>
@tailwind components;

@layer components {
	.pdap-custom-select {
		@apply relative w-full bg-neutral-50 dark:bg-neutral-950 border-2 border-solid border-neutral-500 cursor-pointer;
	}

	.pdap-custom-select-options {
		@apply absolute top-[115%] left-[-2px] w-[calc(100%+4px)] bg-neutral-50 dark:bg-neutral-950 border-solid border-2 border-neutral-500 max-h-48 overflow-y-auto z-20 p-1;
	}

	.pdap-custom-select-option {
		@apply text-neutral-950 dark:text-neutral-50 p-2 w-full max-w-full cursor-pointer;
	}

	.pdap-custom-select-option:hover,
	.pdap-custom-select-option:focus {
		@apply bg-neutral-200 dark:bg-neutral-700;
	}
}

.selected-value {
	@apply py-2 px-3 text-neutral-950 dark:text-neutral-50;
}

.arrow {
	@apply absolute top-1/2 right-3 w-0 h-0 border-l-8 border-r-8 border-t-8 border-solid border-x-transparent border-t-neutral-950 dark:border-t-neutral-50 transition-transform;
}

.arrow.open {
	@apply rotate-180;
}
</style>
