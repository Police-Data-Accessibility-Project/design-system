<template>
	<div
		class="pdap-input pdap-input-password"
		:class="{ ['pdap-input-error']: error }"
	>
		<slot v-if="$slots.error" name="error" class="pdap-input-error-message" />
		<div v-else-if="error" class="pdap-input-error-message">{{ error }}</div>

		<div class="pdap-input-password-wrapper">
			<input
				:id="id"
				:name="name"
				:placeholder="placeholder ?? 'Password'"
				:value="values?.[name]"
				v-bind="$attrs"
				:type="isMasked ? 'password' : 'text'"
				@input="onInput"
			/>
			<button
				type="button"
				class="pdap-input-password-toggle"
				:aria-label="isMasked ? 'Show text' : 'Hide text'"
				@click="toggleMask"
			>
				<FontAwesomeIcon :icon="isMasked ? faEye : faEyeSlash" />
			</button>
		</div>

		<label v-if="$slots.label" :for="id"><slot name="label" /></label>
		<label v-else-if="label" :for="id">{{ label }}</label>
	</div>
</template>

<script setup lang="ts">
import { computed, inject, ref, useSlots } from 'vue';
import { PdapInputTextProps } from '../InputText/types';
import { PdapFormProvideV2 } from '../FormV2/types';
import { provideKey } from '../FormV2/util';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const { label, name } = defineProps<PdapInputTextProps>();
const slots = useSlots();

if (!slots.label && !label)
	throw new Error(
		'All form inputs must have a label, passed as a slot or a prop'
	);

const { values, setValues, v$ } = inject<PdapFormProvideV2>(provideKey)!;

const error = computed(() => {
	return v$.value[name]?.$error ? v$.value[name]?.$errors?.[0]?.$message : '';
});

const isMasked = ref(true);

function onInput(e: Event) {
	setValues({ [name]: (e.target as unknown as HTMLInputElement).value });
}

function toggleMask() {
	isMasked.value = !isMasked.value;
}
</script>

<style>
@tailwind components;

@layer components {
	.pdap-input-password input {
		@apply w-full;
	}

	.pdap-input-password-wrapper {
		@apply relative;
	}

	.pdap-input-password-toggle {
		@apply absolute right-4 cursor-pointer text-[rgba(0_0_0)] top-1/2 translate-y-[-50%];
	}
}
</style>
