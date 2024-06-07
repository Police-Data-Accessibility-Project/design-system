<template>
	<div
		ref="dropdownRef"
		v-click-outside="closeDropdown"
		class="pdap-dropdown"
		@keydown.escape="closeDropdown"
		v-on="dropdownHandlers"
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
			@click.prevent.stop="press"
			@keydown.enter.space.prevent.stop="press"
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
import { computed, onMounted, ref } from 'vue';
import { PdapDropdownProps, PdapDropdownTriggerType } from './types';
import { default as vClickOutside } from '../../directives/click-outside';
import { Button } from '../Button';

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
	if (props.triggerOn === PdapDropdownTriggerType.PRESS) toggleDropdown();
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
	contentRef.value.style.display = 'flex';
	contentRef.value.style.setProperty('max-height', 'max-content');
	const height = contentRef.value.scrollHeight;
	contentRef.value.style.display = 'none';
	contentRef.value.style.removeProperty('max-height');
	const root = document?.querySelector(':root') as HTMLElement;

	const previousMaxHeight = root?.style?.getPropertyValue(
		'--dropdown-content-max-height'
	);

	// If current dropdown shorter than current max height var, return
	if (Number(previousMaxHeight?.match(/\d+/)?.join('')) >= height) return;

	// Otherwise, increase var
	if (contentRef.value && root)
		root.style.setProperty('--dropdown-content-max-height', `${height + 16}px`);
}

const dropdownHandlers = {
	mouseenter: triggerOnHover.value ? openDropdown : undefined,
	focus: triggerOnHover.value ? openDropdown : undefined,
	focusin: triggerOnHover.value ? openDropdown : undefined,
	focusout: triggerOnHover.value ? closeDropdown : undefined,
	mouseleave: triggerOnHover.value ? closeDropdown : undefined,
	blur: triggerOnHover.value ? closeDropdown : undefined,
};

onMounted(() => {
	getMaxHeight();
});
</script>

<script lang="ts">
/**
 * # `Dropdown`
 * An accessible dropdown menu that can be triggered by click or hover and positioned in various placements. It provides keyboard accessibility features such as toggling the dropdown on enter/space and closing on escape.
 *
 * ## Props
 * @prop {boolean} defaultOpen Controls the initial `isOpen` state
 * @prop {boolean} disabled Disabled state (forwarded to trigger button)
 * @prop {PdapDropdownTriggerType} triggerType `'press' | 'hover'`
 *
 */
export default {
	name: 'PdapButton',
};
</script>

<style>
@tailwind components;

:root {
	--dropdown-content-max-height: 0px;
}

@layer components {
	.pdap-dropdown {
		@apply relative inline-block w-max;
	}

	.pdap-dropdown-trigger {
		@apply cursor-pointer p-0 px-2;
	}

	.pdap-dropdown-content {
		@apply flex flex-col w-full overflow-hidden relative max-h-[var(--dropdown-content-max-height)] px-2;
	}

	.pdap-dropdown-content.dropdown-enter-active,
	.pdap-dropdown-content.dropdown-leave-active {
		transition:
			opacity 0.5s ease-in,
			max-height 0.7s ease;
	}

	.pdap-dropdown-content.dropdown-enter-from,
	.pdap-dropdown-content.dropdown-leave-to {
		@apply max-h-0 opacity-0;
	}

	.pdap-dropdown-content > * {
		@apply my-2 p-0 w-full max-w-[calc(100%-4px)] items-start text-start;
	}
}
</style>
