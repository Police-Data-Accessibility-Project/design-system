# Form

The `Form` component is powerful. All you need to do is pass a few props, and the component will generate inputs and render them in the UI, complete with customizable form validation and both form-level and input-level error states.

## Props

| name      | required? | types                                                    | description                                                                                                                    | default     |
| --------- | --------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `error`   | no        | `string` \| `undefined` \| `null`                        | Error state                                                                                                                    | `undefined` |
| `id`      | yes       | `string`                                                 | Form id                                                                                                                        | none        |
| `name`    | yes       | `string`                                                 | Form name                                                                                                                      | none        |
| `schema`  | yes       | `PdapFormSchema` (array of `PdapFormInputProps` objects) | Array of schema entries for inputs                                                                                             | none        |
| `resetOn` | no        | `'submit'` \| `boolean`                                  | When to reset form - if `'submit'`, it happens during submission. If `boolean`, it happens on any change of the prop to `true` | `'submit'`  |



## Notes

- Form schema entries can look different depending on the type of input. We currently only use text inputs, so the example only displays these.
- To properly submit the form, you must render a button with `type="submit"` _inside_ of the `Form` component.
- `Form` emits a `submit` event and passes all values to the handler you pass to `on-submit`
- Currently available form validations are defined by the `PdapFormValidators` interface:

```
PdapFormValidators {
  maxLength: {
    message?: string;
    value: number;
  };
  minLength: {
    message?: string;
    value: number;
  };
  required: {
    message?: string;
    value: boolean;
  };
}
```

- The `message` property is optional. If it is not passed, Vuelidate will default to a generic error message. The `value` property is the value you want to validate against. (i.e. for a required field with a max length of 12 characters, we might pass:

```
// For a custom message
{
  ...,
  validators: {
    maxLength: {
      message: 'No more than twelve characters, please!',
      value: 12
    },
    required: {
      message: 'Pretty please enter this field.',
      value: true
    }
  }
}

// For the default Vuelidate message
{
  ...,
  validators: {
    maxLength: {
      value: 12
    },
    required: {
      value: true
    }
  }
}
```

## Example

Note: to observe `resetOn`, see the [demo page](../../demo/pages/SignupFormDemo.vue)

```
<template>
  <Form :schema="formSchema" :on-submit="handleSubmit" id="test-form" name="data-request-form">
    <Button intent="primary" type="submit">Click me</Button>
  </Form>
</template>

...

<script>
import { Button, Form, PdapInputTypes } from 'pdap-design-system';

...

export default {
  components: ['Button', 'Form'],
  data() {
    return {
      formSchema: [
        {
          id: 'testfirstname',
          name: 'firstName',
          label: 'First Name',
          type: 'text',
          placeholder: 'John',
          value: '',
          validators: {
            minLength: {
              value: 3
            },
            required: {
              message: 'Please provide this information',
              value: true
            }
          },
        },
        {
          id: 'testlastname',
          name: 'lastName',
          label: 'Last Name',
          type: 'text',
          placeholder: 'Doe',
          value: '',
          validators: {
            minLength: {
              value: 3
            },
            maxLength: {
              message: 'A thousand characters for your surname? Are you a bot?',
              value: 999
            },
          },
        {
          id: 'ice-cream',
          name: 'iceCream',
          label: 'Do you like ice cream?',
          type: 'checkbox',
          defaultChecked: true,
        }
      ]
    }
  },
  methods: {
    handleSubmit: async function(data) {
      await doRequestStuff(data);
      this.$router.push('/')
    }
  }
  ...
}
</script>
```
