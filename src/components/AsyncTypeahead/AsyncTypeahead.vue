<template>
	<div
		:id="wrapperId"
		data-test="typeahead-wrapper"
		class="pdap-typeahead"
		:class="{ 'pdap-typeahead-expanded': isListOpen }"
	>
		<label v-if="$slots.label" class="col-span-2" :for="id">
			<slot name="label" />
		</label>

		<div v-if="$slots.error && error" class="pdap-input-error-message">
			<!-- TODO: aria-aware error handling?? Not just here but in other input components as well? -->
			<slot name="error" />
		</div>
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<input
			:id="id"
			ref="inputRef"
			v-model="input"
			data-test="typeahead-input"
			class="pdap-typeahead-input"
			type="text"
			:placeholder="placeholder"
			autocomplete="off"
			v-bind="$attrs"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
			@keydown.down.prevent="onArrowDown"
		/>
		<ul
			v-if="itemsToDisplay?.length && inputRef?.value"
			data-test="typeahead-list"
			class="pdap-typeahead-list"
			:class="{ [`pdap-typeahead-list--${position}`]: true }"
		>
			<li
				v-for="(item, index) in itemsToDisplay"
				:key="index"
				class="pdap-typeahead-list-item"
				data-test="typeahead-list-item"
				role="button"
				tabindex="0"
				@click="() => selectItem(item)"
				@keydown.enter.prevent="selectItem(item)"
				@keydown.down.prevent="onArrowDown"
				@keydown.up.prevent="onArrowUp"
			>
				<slot v-if="$slots.item" name="item" v-bind="item" />
				<span v-else>{{ boldMatchText(formatItemForDisplay(item)) }}</span>
			</li>
		</ul>
		<ul
			v-else-if="typeof itemsToDisplay === 'undefined' && input.length > 1"
			class="pdap-typeahead-list"
			:class="{ [`pdap-typeahead-list--${position}`]: true }"
			data-test="typeahead-list-not-found"
		>
			<li class="max-w-[unset]">
				<slot
					v-if="$slots['not-found']"
					name="not-found"
					v-bind="$slots['not-found'] ?? {}"
				/>
				<span v-else>
					<strong>No results found.</strong>
					Please check your spelling.
				</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts" generic="T">
import {
	ref,
	computed,
	onMounted,
	onUnmounted,
	watch,
	onBeforeUpdate,
} from 'vue';
import { PdapAsyncTypeaheadProps } from './types';

/* Props and emits */
const props = withDefaults(defineProps<PdapAsyncTypeaheadProps<T>>(), {
	placeholder: '',
	formatItemForDisplay: (item: T) =>
		typeof item === 'string' ? item : JSON.stringify(item),
	position: 'bottom', // Add this default
});
const emit = defineEmits(['onInput', 'onFocus', 'onBlur', 'selectItem']);

/* Refs and reactive vars */
const inputRef = ref();
const input = ref('');

/* Computed vars */
const wrapperId = computed(() => `${props.id}_wrapper`);
const itemsToDisplay = computed(() => props.items);
const isListOpen = computed(
	() =>
		(itemsToDisplay.value?.length && inputRef?.value?.value) ||
		(typeof itemsToDisplay.value === 'undefined' && input.value.length > 1)
);
const position = computed(() => props.position);

/* Lifecycle methods and listeners */
onMounted(() => {
	window.addEventListener('resize', setInputPositionForList);
});

onBeforeUpdate(setInputPositionForList);

onUnmounted(() => {
	window.removeEventListener('resize', setInputPositionForList);
});

/* Watch expressions */
watch(
	() => inputRef.value,
	(ref) => {
		if (ref) setInputPositionForList();
	}
);

/* Methods */
function setInputPositionForList() {
	const inputElement = inputRef.value;

	// Set the width regardless of position
	document.documentElement.style.setProperty(
		'--typeaheadListWidth',
		inputElement.offsetWidth + 'px'
	);
}

function onInput(e: Event) {
	emit('onInput', e);
}
function onFocus(e?: Event) {
	if (Array.isArray(itemsToDisplay.value) && !itemsToDisplay.value.length) {
		clearInput();
		emit('selectItem', undefined);
	}

	if (e) emit('onFocus', e);
}
function onBlur(e: Event) {
	emit('onBlur', e);
}

function onArrowDown() {
	const items = Array.from(
		document.getElementsByClassName('pdap-typeahead-list-item')
	) as HTMLElement[];

	const focusedIndex = items.indexOf(document.activeElement as HTMLElement); // Casting is okay here because we don't need to access any of the missing properties.

	if (focusedIndex === items.length - 1) return;

	if (focusedIndex === -1) {
		items[0].focus();
	} else {
		items[focusedIndex + 1].focus();
	}
}

function onArrowUp() {
	const items = Array.from(
		document.getElementsByClassName('pdap-typeahead-list-item')
	) as HTMLElement[];

	const focusedIndex = items.indexOf(document.activeElement as HTMLElement);

	if (focusedIndex === 0) {
		inputRef.value.focus();
	} else {
		items[focusedIndex - 1].focus();
	}
}

function selectItem(item: T) {
	input.value = props.formatItemForDisplay
		? props.formatItemForDisplay(item)
		: String(item);

	inputRef.value.blur();
	emit('selectItem', item);
}

function escapeRegExp(s: string) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function boldMatchText(text: string) {
	const regexp = new RegExp(`(${escapeRegExp(input.value)})`, 'ig');
	return text.replace(regexp, '<strong>$1</strong>');
}
function clearInput() {
	input.value = '';
}
// function getInput() {
// 	return inputRef.value;
// }
function focusInput() {
	inputRef.value.focus();
	onFocus();
}
// function blurInput() {
// 	inputRef.value.blur();
// 	onBlur();
// }

defineExpose({
	boldMatchText,
	clearInput,
	focusInput,
	get value() {
		return input.value;
	},
});
</script>

<style>
.pdap-typeahead {
	@apply leading-normal w-full flex flex-col relative;
}

.pdap-typeahead label {
	@apply max-w-[max-content] text-lg py-1 font-medium;
}

.pdap-typeahead-input {
	@apply rounded-sm;
}

.pdap-typeahead-input,
.pdap-typeahead-list {
	@apply bg-neutral-50 border-2 border-brand-gold-300 border-solid p-2 text-neutral-950;
}

.pdap-typeahead-input::placeholder {
	@apply text-neutral-600 text-lg;
}

.pdap-typeahead-input:focus,
.pdap-typeahead-input:focus-within,
.pdap-typeahead-input:focus-visible {
	@apply border-2 border-brand-gold-300 border-solid outline-none;
}

.pdap-typeahead-list {
	@apply absolute w-[var(--typeaheadListWidth)] z-50 overflow-scroll;
}

.pdap-typeahead-list--bottom {
	@apply top-[calc(100%+2px)];
}

.pdap-typeahead-list--top {
	@apply bottom-[calc(100%+2px)];
}

.pdap-typeahead-list-item {
	@apply mt-1 max-w-[unset] p-2 flex items-center gap-6 text-sm md:text-lg;
}

.pdap-typeahead-list-item:focus,
.pdap-typeahead-list-item:focus-visible,
.pdap-typeahead-list-item:focus-within,
.pdap-typeahead-list-item:hover {
	@apply outline-none text-neutral-950 bg-neutral-300;
}
</style>
