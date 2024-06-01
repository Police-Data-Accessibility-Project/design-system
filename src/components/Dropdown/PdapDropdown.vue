<template>
	<div
		ref="dropdownRef"
		v-click-outside="closeDropdown"
		class="pdap-dropdown"
		@keydown.escape="closeDropdown"
	>
		<Button
			:aria-controls="dropdownId"
			:aria-expanded="open"
			:disabled="disabled"
			aria-haspopup="true"
			intent="tertiary"
			:class="{
				'pdap-dropdown-trigger': true,
				'pointer-events-none': disabled,
				'cursor-not-allowed': disabled,
			}"
			data-test="dropdown-trigger"
			@click.prevent="press"
			@keydown.enter.space.prevent="press"
		>
			<slot name="trigger" />
		</Button>

		<Transition name="dropdown" appear>
			<div
				v-show="open"
				:id="dropdownId"
				ref="contentRef"
				:aria-hidden="!open"
				class="pdap-dropdown-content"
				data-test="dropdown-content"
				role="menu"
			>
				<slot name="content" />
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { PdapDropdownProps, PdapDropdownTriggerType } from './types';
import { default as vClickOutside } from '../../directives/click-outside';
import { Button } from '../Button';
// Constants
const EVENTS_OPEN_ON_HOVER = ['mouseenter', 'focus', 'focusin'];
const EVENTS_CLOSE_ON_HOVER = ['focusout', 'mouseleave', 'blur'];

// Props
const props = withDefaults(defineProps<PdapDropdownProps>(), {
	defaultOpen: false,
	disabled: false,
	triggerOn: PdapDropdownTriggerType.PRESS,
});

// Emits
const emit = defineEmits(['update:open', 'press']);

// Vars
const dropdownId = 'pdap-dropdown';
const contentRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const open = ref<boolean>(props.defaultOpen);
const triggerOnHover = computed(
	() => props.triggerOn === PdapDropdownTriggerType.HOVER
);

function press(event: Event) {
	emit('press', event);
	if (props.triggerOn !== PdapDropdownTriggerType.HOVER) toggleDropdown();
}

const toggleDropdown = () => {
	if (!props.disabled) {
		open.value = !open.value;
		emit('update:open', open.value);
	}
};

function openDropdown() {
	open.value = true;
	emit('update:open', true);
}

function closeDropdown() {
	open.value = false;
	emit('update:open', false);
}

function getMaxHeight() {
	if (!contentRef.value) return;
	contentRef.value.style.display = 'block';
	const height = window.getComputedStyle(contentRef.value).height;
	contentRef.value.style.display = 'none';
	const root = document?.querySelector(':root') as HTMLElement;

	if (contentRef.value && root)
		root.style.setProperty('--dropdown-content-max-height', String(height));
}

onMounted(() => {
	if (triggerOnHover.value) {
		EVENTS_OPEN_ON_HOVER.forEach((event) => {
			if (dropdownRef.value) {
				dropdownRef.value.addEventListener(event, openDropdown);
			}
		});
		EVENTS_CLOSE_ON_HOVER.forEach((event) => {
			if (dropdownRef.value) {
				dropdownRef.value.addEventListener(event, closeDropdown);
			}
		});
	}
	getMaxHeight();
});

// TODO: figure out how to test unmounting listener. Not a big deal, but for the sake of full coverage...
/* c8 ignore next 14 */
onUnmounted(() => {
	if (triggerOnHover.value) {
		EVENTS_OPEN_ON_HOVER.forEach((event) => {
			if (dropdownRef.value) {
				dropdownRef.value.addEventListener(event, openDropdown);
			}
		});
		EVENTS_CLOSE_ON_HOVER.forEach((event) => {
			if (dropdownRef.value) {
				dropdownRef.value.addEventListener(event, closeDropdown);
			}
		});
	}
});
</script>

<style>
@tailwind components;

:root {
	--dropdown-content-max-height: 200px;
}

@layer components {
	.pdap-dropdown {
		@apply relative inline-block;
	}

	.pdap-dropdown-trigger {
		@apply cursor-pointer p-0;
	}

	.pdap-dropdown-content {
		@apply flex flex-col w-full p-2 overflow-hidden relative max-h-[var(--dropdown-content-max-height)];
	}

	.pdap-dropdown-content.dropdown-enter-active,
	.pdap-dropdown-content.dropdown-leave-active {
		transition:
			opacity 0.3s ease-in-out,
			max-height 0.5s ease-in;
	}

	.pdap-dropdown-content.dropdown-enter-from,
	.pdap-dropdown-content.dropdown-leave-to {
		@apply max-h-0 opacity-0;
	}

	.pdap-dropdown-content > * {
		@apply p-0 my-2 w-full max-w-[unset] items-start text-start;
	}
}
</style>
