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
			@click="handleClick"
			@keydown="handleKeyDown"
		>
			<input
				v-if="combobox"
				ref="inputRef"
				v-model="searchText"
				aria-label="Search from the available options"
				type="text"
				:placeholder="selectedOption ? selectedOption.label : placeholder"
				class="selected-value"
				@focus="isOpen = true"
			/>

			<div
				v-if="!combobox"
				class="selected-value"
				:class="{ 'value-is-placeholder': !selectedOption }"
			>
				{{ selectedOption ? selectedOption.label : placeholder }}
			</div>
			<div
				class="arrow"
				:class="{ open: isOpen, swapped: position === 'top' }"
			/>
			<ul
				v-show="isOpen"
				ref="listRef"
				class="pdap-custom-select-options"
				:class="{ [position]: true }"
				role="listbox"
				:tabindex="-1"
				:aria-activedescendant="
					optionIds.get(focusedOptionIndex) ?? selectedOption?.label
				"
			>
				<li
					v-for="(option, index) in filteredOptions"
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
import _isEqual from 'lodash/isEqual';

const { name, options, id, label, combobox, position, filter } = withDefaults(
	defineProps<PdapInputSelectProps>(),
	{
		combobox: false,
		placeholder: 'Select an option',
		position: 'bottom',
		filter: (searchText, options) => {
			if (!searchText) return options;
			return options.filter((option) =>
				option.label.toLowerCase().includes(searchText.toLowerCase())
			);
		},
	}
);
const emit = defineEmits(['change']);
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
const inputRef = ref();
const searchText = ref('');
const filteredOptions = computed(() => {
	return combobox ? filter(searchText.value, options) : options;
});

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
		if (combobox) inputRef.value.focus();
		else selectRef.value.focus();
		focusedOptionIndex.value = -1;
	}
}

function selectOption(option: Option) {
	selectedOption.value = option;
	searchText.value = option.label;
	isOpen.value = false;
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

function handleClick() {
	if (combobox) inputRef.value.focus();
	else toggleOpen();
}

function handleKeyDown(event: KeyboardEvent) {
	if (event.key === 'Tab') {
		if (_isEqual(event.target, selectRef.value)) {
			if (combobox && isOpen.value) isOpen.value = !isOpen.value;
		}
		// 	if (
		// 		!event.shiftKey &&
		// 		focusedOptionIndex.value === filteredOptions.value.length - 1
		// 	) {
		// 		event.preventDefault();
		// 		return;
		// 	}

		// 	if (event.shiftKey && focusedOptionIndex.value === 0) {
		// 		event.preventDefault();
		// 		closeAndReturnFocus();
		// 	} else {
		// 		event.preventDefault();
		// 		focusedOptionIndex.value = focusedOptionIndex.value - 1;
		// 	}

		// 	return;
	}

	if (!isOpen.value) {
		if (['ArrowDown', 'ArrowUp', 'Enter'].includes(event.key)) {
			event.preventDefault();
			isOpen.value = true;
		}
		return;
	}

	switch (event.key) {
		case 'ArrowDown':
			event.preventDefault();
			focusedOptionIndex.value = focusedOptionIndex.value + 1;
			break;
		case 'ArrowUp':
			event.preventDefault();
			if (focusedOptionIndex.value <= 0) {
				closeAndReturnFocus();
				break;
			}
			focusedOptionIndex.value = focusedOptionIndex.value - 1;
			break;
		case 'Enter':
			event.preventDefault();
			event.stopPropagation();
			if (focusedOptionIndex.value >= 0) {
				selectOption(filteredOptions.value[focusedOptionIndex.value]);
			} else {
				isOpen.value = true;
			}
			break;
		case 'Escape':
			event.preventDefault();
			if (combobox) isOpen.value = false;
			else closeAndReturnFocus();
			break;
		default:
			break;
	}
}

watch(
	() => selectedOption.value,
	(newSelected) => {
		// Update form values when state changes.
		if (newSelected) {
			emit('change', newSelected);
			const event = new Event('input', { bubbles: true, cancelable: true });
			selectRef.value.dispatchEvent(event);
			setValues({ [name]: newSelected.value });
		}
	}
);

watch(
	() => focusedOptionIndex.value,
	// When the index to focus changes (tracking this state because we need it for other things), focus that input
	(nextIndexToFocus) => {
		if (typeof nextIndexToFocus === 'number' && nextIndexToFocus < 0) {
			return;
		} else if (
			typeof nextIndexToFocus === 'number' &&
			nextIndexToFocus >= 0 &&
			nextIndexToFocus < filteredOptions.value.length
		) {
			focusOption(nextIndexToFocus);
		} else focusedOptionIndex.value = 0;
	}
);

watch(
	() => isOpen.value,
	(isNowOpen) => {
		// If not the combobox, find selected option and focus it on menu open.
		if (isNowOpen && selectedOption.value && !combobox) {
			const selected = filteredOptions.value.find(
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
				filteredOptions.value.find(
					(opt) => opt.value === formValuesUpdated[name]
				) ??
				// b. changed value does not exist as an option, keep state value.
				selectedOption.value;
	}
);

watch(
	() => searchText.value,
	(newValue) => {
		if (newValue.length <= 1) {
			selectedOption.value = null;
			focusedOptionIndex.value = -1;
		}
	}
);
</script>

<style>
@tailwind components;

@layer components {
	.pdap-custom-select {
		@apply relative w-full bg-neutral-50 border-2 border-solid border-goldneutral-500 cursor-pointer text-lg rounded-sm;
	}

	.pdap-custom-select-options {
		@apply absolute left-[-2px] w-[calc(100%+4px)] bg-neutral-50 border-solid border border-goldneutral-500 max-h-48 overflow-y-auto z-20 p-1;
	}

	.pdap-custom-select-options.bottom {
		@apply top-[115%];
	}

	.pdap-custom-select-options.top {
		@apply top-[unset] bottom-[15%];
	}

	.pdap-custom-select-option {
		@apply text-neutral-950 p-2 w-full max-w-full cursor-pointer border-2 border-solid border-transparent;
	}

	.pdap-custom-select:focus,
	.pdap-custom-select-option:hover,
	.pdap-custom-select-option:focus {
		@apply border-2 border-brand-gold-300 border-solid outline-none;
	}

	.pdap-custom-select-option:hover,
	.pdap-custom-select-option:focus {
		@apply bg-goldneutral-200;
	}

	.pdap-custom-select input {
		@apply w-full bg-transparent border-none outline-none py-2 px-3 text-neutral-950;
	}

	.pdap-custom-select input:focus {
		@apply outline-none;
	}
}

.selected-value {
	@apply py-2 px-3 text-neutral-950;
}

.selected-value.value-is-placeholder {
	@apply text-neutral-600;
}

.arrow {
	@apply absolute top-1/2 right-3 w-0 h-0 border-l-8 border-r-8 border-t-8 border-solid border-x-transparent border-t-neutral-950 transition-transform;
}

.arrow.open,
.arrow.swapped {
	@apply rotate-180;
}

.arrow.swapped.open {
	@apply rotate-0;
}
</style>
