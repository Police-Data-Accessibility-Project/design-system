# InputSelect
Date picker component. Uses Vue3 Date Picker library under the hood.

## Props - required

| name    | required?                     | types    | description   | default |
| ------- | ----------------------------- | -------- | ------------- | ------- |
| `id`    | yes                           | `string` | id attr       |         |
| `label` | yes, if label slot not passed | `string` | label content |         |
| `name`  | yes                           | `string` | name attr     |         |

## Props - Vue3 Date Picker
The props interface extends the underlying component interface, so [all props available on the Vue 3 Date Picker component](https://vue3datepicker.com/props/modes/) are available to be passed.

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
    <InputDatePicker
      :id="INPUT_DATE_NAME"
      :name="INPUT_DATE_NAME"
      position="left"
    >
      <template #label>
        <h4>When will you next consume ice cream?</h4>
      </template>
    </InputDatePicker>
  </FormV2>
</template>

<script setup>
import { InputDatePicker, FormV2 } from 'pdap-design-system';
</script>

...
```
