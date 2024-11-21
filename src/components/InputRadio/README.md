# InputRadio
Radio input. Designed to be wrapped with `RadioGroup`

## Props - required

| name             | required?                     | types     | description                                   | default |
| ---------------- | ----------------------------- | --------- | --------------------------------------------- | ------- |
| `defaultChecked` | no                            | `boolean` | radio is checked by default. Only 1 per group |         |
| `id`             | yes                           | `string`  | id attr                                       |         |
| `label`          | yes, if label slot not passed | `string`  | label content                                 |         |
| `name`           | yes                           | `string`  | name attr                                     |         |

## Slots

| name    | required?                     | types     | description                          | default |
| ------- | ----------------------------- | --------- | ------------------------------------ | ------- |
| `label` | yes, if label prop not passed | `Element` | slot content to be rendered as label |         |

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
    <RadioGroup :name="INPUT_RADIO_GROUP_NAME">
      <h4 class="text-lg">
        Select another flavor, with radio buttons this time!
      </h4>
      <InputRadio
        v-for="{ label, value, defaultChecked } of ICE_CREAM_FLAVORS"
        :id="value"
        :key="label"
        :default-checked="defaultChecked"
        :name="INPUT_RADIO_GROUP_NAME"
        :value="value"
        :label="label"
      />
    </RadioGroup>
  </FormV2>
</template>

<script setup>
import { RadioGroup, InputRadio, FormV2 } from 'pdap-design-system';
</script>

...
```
