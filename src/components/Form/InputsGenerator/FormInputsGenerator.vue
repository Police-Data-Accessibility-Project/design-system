<template>
	<PdapInput
		v-for="field in schema"
		:id="field.id"
		:key="field.name"
		:error="v?.[field.name]?.$errors?.[0]?.$message"
		:name="field.name"
		:label="field.label"
	>
		<component
			:is="INPUT_COMPONENT_MAP[field.type]"
			v-bind="field"
			:value="formData[field.name]"
			@blur="updateValidations(field.name)"
			@input="updateForm(field.name, $event)"
		/>
	</PdapInput>
</template>

<script lang="ts">
// Components
import PdapInput from '../../Input/PdapInput.vue';
import InputText from '../../Input/Text/InputText.vue';
import InputCheckbox from '../../Input/Checkbox/InputCheckbox.vue';

// Types
import { PropType } from 'vue';
import { PdapFormSchema } from '../types.ts';
import { INPUT_COMPONENT_MAP } from '../../Input/utils';
import { VuelidateInstance } from '../PdapForm.vue';

// Export
// (Using standard default export to locally register components for passing to <component :is={component} />)
// This is a workaround for the behavior of <script setup>, which does not properly register imported custom components
export default {
	name: 'InputsGenerator',
	components: { InputText, InputCheckbox, PdapInput },
	props: {
		schema: { type: Object as PropType<PdapFormSchema> },
		values: { type: Object as PropType<Record<string, unknown>> },
		v$: {
			type: Object as PropType<VuelidateInstance>,
		},
	},
	emits: ['blur', 'input'],
	setup(_, { emit }) {
		emit('input');
		emit('blur');
	},
	data() {
		return {
			formData: this.values || {},
			INPUT_COMPONENT_MAP: INPUT_COMPONENT_MAP,
			v: this.$props.v$,
		};
	},
	methods: {
		updateForm(fieldName: string, value: unknown) {
			this.formData[fieldName] = value;
			this.$emit('input', this.formData);
		},
		updateValidations(fieldName: string) {
			this.v$?.value?.[fieldName].$touch;
		},
	},
};
</script>
