# InputSelect
Accessible, flexible custom select component.

_Note: Only works with `FormV2`. The `FormV1` schema system is not set up to handle this input._

## Props

| name          | required?                     | types                                   | description      | default            |
| ------------- | ----------------------------- | --------------------------------------- | ---------------- | ------------------ |
| `id`          | yes                           | `string`                                | id attr          |                    |
| `label`       | yes, if label slot not passed | `string`                                | label content    |                    |
| `name`        | yes                           | `string`                                | name attr        |                    |
| `placeholder` | no                            | `string`                                | placeholder attr | "Select an option" |
| `options`     | yes                           | `Array<{value: string; label: string}>` | options          |                    |

## Slots

| name    | required?                     | types     | description                          | default |
| ------- | ----------------------------- | --------- | ------------------------------------ | ------- |
| `error` | no<sup>*</sup>                | `Element` | slot content to be rendered as error |         |
| `label` | yes, if label prop not passed | `Element` | slot content to be rendered as label |         |

<sup>*</sup> Note: The error message is determined by Vuelidate via our form validation schema. If the error UI needs to be more complicated than a string that can be passed with the schema, pass an `\#error` slot and it will override the string.       

## Example

```vue
<template>
  <FormV2
    id="form-id"
    name="ice-cream-preference"
    :schema="SCHEMA"
    @submit="(values) => onSubmit({ values })"
    @change="(values, event) => onChange({ values, event })"
  >
  <!-- Other inputs... -->

    <InputSelect
    :id="INPUT_SELECT_NAME"
    :name="INPUT_SELECT_NAME"
    :options="ICE_CREAM_FLAVORS"
    placeholder="Select flavor"
    >
      <template #label>
        <h4>What is your favorite flavor?</h4>
      </template>
    </InputSelect>
  </FormV2>
</template>

<script setup>
import { InputSelect, FormV2 } from 'pdap-design-system';

const ICE_CREAM_FLAVORS = [
	{
		value: 'vanilla',
		label: 'Vanilla',
	},
	{
		value: 'chocolate',
		label: 'Chocolate',
	},
	{
		value: 'neapolitan',
		label: 'Neapolitan',
	},
	{
		value: 'rocky-road',
		label: 'Rocky Road',
	},
	{
		value: 'chunky-monkey',
		label: 'Chunky Monkey',
	},
	{
		value: 'mint-choc',
		label: 'Mint Chocolate Chip',
	},
];

</script>

...
```
