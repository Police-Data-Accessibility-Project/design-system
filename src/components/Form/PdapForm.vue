<template>
	<form
		:id="id"
		:name="name"
		class="pdap-form"
		v-bind="$attrs"
		@submit.prevent="submit"
	>
		<div
			v-if="typeof errorMessage === 'string'"
			class="pdap-form-error-message"
		>
			{{ errorMessage }}
		</div>

		<PdapInput
			v-for="field in data"
			v-bind="field"
			:key="field.name"
			:error="
				Boolean(v$[field.name]?.$error)
					? v$[field.name]?.$errors?.[0]?.$message
					: ''
			"
			:value="values[field.name]"
			@input="updateForm(field, $event)"
		/>
		<slot />
	</form>
</template>

<script setup lang="ts">
// Globals
import { computed, ref, watchEffect } from 'vue';
import { useVuelidate } from '@vuelidate/core';

// Components
import PdapInput from '../Input/PdapInput.vue';

// Utils
import { createRule } from '../../utils/vuelidate';

// Types
import { PdapFormProps } from './types';
import { PdapInputProps, PdapInputTypes } from '../Input/types';

// Props
const props = withDefaults(defineProps<PdapFormProps>(), {
	error: null,
	resetOn: 'submit',
});

// Emits
const emit = defineEmits(['submit', 'change']);

// State
const data = computed(() =>
	props.schema.map((input) => {
		const newInput = { ...input };
		delete newInput.validators;

		return newInput;
	})
);

const values = ref<Record<string, string>>(
	data.value.reduce((acc, input) => {
		switch (input.type) {
			case PdapInputTypes.CHECKBOX:
				return { ...acc, [input.name]: String(input.defaultChecked) };
			case PdapInputTypes.TEXT:
			case PdapInputTypes.PASSWORD:
			default:
				return { ...acc, [input.name]: input.value };
		}
	}, {})
);
const rules = props.schema.reduce((acc, input) => {
	const toAdd = Object.entries(input.validators ?? {}).reduce(
		(acc, [key, val]) => {
			return {
				...acc,
				...createRule(key, val),
			};
		},
		{}
	);
	return {
		...acc,
		[input.name]: {
			...toAdd,
		},
	};
}, {});
const v$ = useVuelidate(rules, values, { $autoDirty: false, $lazy: true });

// Vars
const errorMessage = ref(props.error);

// Handlers
function updateForm(field: PdapInputProps, event: Event) {
	const target = event.target as HTMLInputElement;

	const update = (() => {
		switch (field.type) {
			case PdapInputTypes.CHECKBOX:
				return target.checked ? 'true' : 'false';
			default:
				return target.value;
		}
	})();

	values.value[field.name] = update;
	emit('change', values.value, event);
}

// Effects
// Effect - Updates form error state based on input error state and/or props
watchEffect(() => {
	if (props.error) errorMessage.value = props.error;
	else if (errorMessage.value && v$.value.$errors.length === 0)
		errorMessage.value = null;
	else if (!errorMessage.value && v$.value.$errors.length > 0)
		errorMessage.value = 'Please update this form to correct the errors';
});

watchEffect(() => {
	if (props.resetOn && props.resetOn !== 'submit') {
		resetForm();
	}
});

/**
 * Reset vuelidate and wipe values state
 */
function resetForm() {
	v$.value.$reset();
	values.value = Object.entries(values).reduce((acc, [key]) => {
		return { ...acc, [key]: '' };
	}, {});
}

async function submit(e: Event) {
	// Check form submission
	const isValidSubmission = await v$.value.$validate();
	if (isValidSubmission) {
		// Emit submit event (spread to new object to create new object, this allows us to reset `values` without messing with the data returned)
		emit('submit', { ...values.value }, e);

		if (props.resetOn === 'submit') {
			resetForm();
		}
	}
}
</script>

<script lang="ts">
/**
 * # `Form`
 * The `Form` component is powerful. All you need to do is pass a few props, and the component will generate inputs and render them in the UI, complete with customizable form validation and both form-level and input-level error states.
 *
 *
 * ## Props
 * @prop {string | undefined | null} error Error state. Only a non-falsy string results in a form-level error being displayed
 * @prop {string} id Passed through to the `form` element as its `id`
 * @prop {string} name Passed through to the `form` element as its `name`
 * @prop {PdapFormSchema} schema Array of `PdapFormInputProps` objects.
 *
 * ## Notes
 *
 * - Form schema entries can look different depending on the type of input. We currently only use text inputs, so the example only displays these.
 * - To properly submit the form, you must render a button with `type="submit"` _inside_ of the `Form` component.
 * - `Form` emits a `submit` event and passes all values to the handler you pass to `on-submit`
 * - Currently available form validations are defined by the `PdapFormValidators` interface:
 *
 * ```
 * PdapFormValidators {
 *   maxLength: {
 *     message?: string;
 *     value: number;
 *   };
 *   minLength: {
 *     message?: string;
 *     value: number;
 *   };
 *   required: {
 *     message?: string;
 *     value: boolean;
 *   };
 * }
 * ```
 *
 *
 * @example
 *
 * <template>
 *  <Form :schema="formSchema" :on-submit="handleSubmit" id="test-form" name="data-request-form">
 *    <Button intent="primary" type="submit">Click me</Button>
 *  </Form>
 * </template>
 *
 *
 * <st>
 * import { Button, Form, PdapInputTypes } from 'pdap-design-system';
 *
 * export default {
 *  components: ['Button', 'Form'],
 *  data() {
 *    return {
 *      formSchema: [
 *        {
 *          id: 'testfirstname',
 *          name: 'firstName',
 *          label: 'First Name',
 *          type: 'text',
 *          placeholder: 'John',
 *          value: '',
 *          validators: {
 *            minLength: {
 *              value: 3
 *            },
 *            required: {
 *              message: 'Please provide this information',
 *              value: true
 *            }
 *          },
 *        },
 *        {
 *          id: 'testlastname',
 *          name: 'lastName',
 *          label: 'Last Name',
 *          type: 'text',
 *          placeholder: 'Doe',
 *          value: '',
 *          validators: {
 *            minLength: {
 *              value: 3
 *            },
 *            maxLength: {
 *              message: 'A thousand characters for your surname? Are you a bot?',
 *              value: 999
 *            },
 *          },
 *        {
 *          id: 'ice-cream',
 *          name: 'iceCream',
 *          label: 'Do you like ice cream?',
 *          type: 'checkbox',
 *          defaultChecked: true,
 *        }
 *      ]
 *    }
 *  },
 *  methods: {
 *    handleSubmit: async function(data) {
 *      await doRequestStuff(data);
 *      this.$router.push('/')
 *    }
 *  }
 *}
 * </scriptt>
 */
export default {
	name: 'PdapForm',
};
</script>

<style>
@tailwind components;

@layer components {
	.pdap-form {
		@apply mb-4 w-full;
	}

	.pdap-form-error-message {
		@apply items-center justify-start basis-full flex-shrink flex bg-red-300 text-red-800 mb-3 p-2 text-sm;
	}
}
</style>
