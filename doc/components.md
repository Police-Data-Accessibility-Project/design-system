# PDAP Component Documentation

Documentation for PDAP component usage

## Button

### Props

| name        | required? | types                    | description                | default   |
| ----------- | --------- | ------------------------ | -------------------------- | --------- |
| `className` | no        | `string`                 | Add a custom css class     | none      |
| `isLoading` | no        | `boolean`                | Request state              | `false`   |
| `intent`    | yes       | `primary` \| `secondary` | Determines style of button | `primary` |

### Example

```
<template>
  <Button className="custom-btn-class" intent="primary" :on-click="() => console.log('hello world')" type="button">Click me</Button>
</template>

...

<script>
import { Button } from 'pdap-design-system';

...

export default {
  components: ['Button'],
  ...
}
</script>

...

<style scoped>
.custom-btn-class {
  padding: 12px;
}
</style>
```

## FlexContainer

All container components are designed to be dynamic and take any `HTMLElement` tag as the component to be rendered. `FlexContainer`. `FlexContainer` can itself be passed as the element type for `GridItem`, for example, or vice versa, allowing us to easily compose complex layouts (more on this later with the `GridContainer` and `GridItem` documentation).

### Props

| name        | required? | types               | description                         | default |
| ----------- | --------- | ------------------- | ----------------------------------- | ------- |
| `className` | no        | `string`            | Add a custom css class              | none    |
| `component` | no        | `string`            | HTML Element to render as container | `'div'` |
| `alignment` | no        | `start` \| `center` | Flex alignment presets              | `start` |

### Example

```
<template>
	<FlexContainer alignment="center" component="card">
      <h2>Some content goes here</h2>
      <p>More content goes here.</p>
      <Button className="custom-button-class-name" :isLoading="false" @click="() => console.log('hello world')">
        Say hello with this button
      </Button>
	</FlexContainer>
</template>

...

<script>
import { Button, FlexContainer } from 'pdap-design-system';

...

export default {
  components: ['Button', 'FlexContainer'],
  ...
}
</script>
```

## Footer

### Props

| name                  | required? | types    | description            | default                                                     |
| --------------------- | --------- | -------- | ---------------------- | ----------------------------------------------------------- |
| `logoImageSrc`        | no        | `string` | Source of logo image   | `'node_modules/pdap-design-system/dist/images/acronym.svg'` |
| `logoImageAnchorPath` | no        | `string` | Flex alignment presets | `/`                                                         |

### Notes

The `Footer` component provides support for overriding the default social links. The `links` variable is `inject`ed by the component, using the following defaults:

```
export default {
  ...
  inject: {
    footerLinks: {
      default: [
	      {
	      	to: 'https://github.com/orgs/Police-Data-Accessibility-Project',
	      	text: 'Github',
	      },
	      {
	      	to: 'ttps://discord.gg/wMqex8nKZJ',
	      	text: 'Discord',
	      },
	      {
	      	to: 'https://www.linkedin.com/company/pdap',
	      	text: 'LinkedIn',
	      },
      ]
    }
  },
  data() {
    return {
      links: this.footerLinks;
    }
  }
}
```

If we desire different links somewhere that `Footer` is rendered, simply `provide` an overriding array from a parent component, like so:

### Example

```
<template>
  <Header />
  <router-view />
  <Footer />
</template>

...

<script>
import { Header, Footer } from 'pdap-design-system';
import { RouterView } from 'vue-router'

...

export default {
  name: 'Layout',
  components: ['Header', 'Footer'],
  ...
  provide: {
    navLinks: [...]
  }
}
</script>

```

## Form

The `Form` component is powerful. All you need to do is pass a few props, and the component will generate inputs and render them in the UI, complete with customizable form validation and both form-level and input-level error states.

### Props

| name        | required? | types                             | description                        | default     |
| ----------- | --------- | --------------------------------- | ---------------------------------- | ----------- |
| `className` | no        | `string`                          | Add a custom css class             | none        |
| `error`     | no        | `string` \| `undefined` \| `null` | Error state                        | `undefined` |
| `id`        | yes       | `string`                          | Form id                            | none        |
| `name`      | yes       | `string`                          | Form name                          | none        |
| `schema`    | yes       | `PdapFormSchema`                  | Array of schema entries for inputs | none        |

N.B.:

- Form schema entries can look different depending on the type of input. We currently only use text inputs, so the example only displays these.
- To properly submit the form, you must render a button with `type="submit"` _inside_ of the `Form` component.
- `Form` emits a `submit` event and passes all values to the handler you pass to `on-submit`
- Currently available form validations are defined by the `PdapFormValidators` interface:

```

PdapFormValidators {
maxLength: number;
minLength: number;
required: boolean;
}

```

### Example

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
  data: {
    formSchema: [
      {
        id: 'testfirstname',
        name: 'firstName',
        label: 'First Name',
        type: PdapInputTypes.TEXT,
        placeholder: 'John',
        value: '',
        validators: { minLength: 3, required: true },
      },
    ]
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

## GridContainer

## GridItem

## Header

## Input

Inputs are rendered by the `Form` component via a schema. Please see `Form` for more details

## Nav

You do not need to render `Nav` directly. `Header` takes care of that. But you do need to `provide` nav link data from a parent component. This allows for nav links to be dynamic depending on where `Header` is rendered.

### Example

```

<template>
  <Header />
  <router-view />
  <Footer />
</template>

...

<script>
import { Footer, Header } from 'pdap-design-system';
import { RouterView } from 'vue-router';

...

export default {
  name: 'Layout',
  components: ['Footer', 'Header'],
  provide: {
    navLinks: [
      { path: '/', text: 'Home', method: 'path' },
      { path: '/a', text: 'a', method: 'path' },
      { path: '/b', text: 'b', method: 'path' },
      { path: '/c', text: 'c', method: 'path' },
      { href: 'https://www.google.com', text: 'Go to Google', method: 'href' },
    ]
  }
  ...
}
</script>

```

const linkData = [
{ path: '/', text: 'Home', method: 'path' },
{ path: '/a', text: 'a', method: 'path' },
{ path: '/b', text: 'b', method: 'path' },
{ path: '/c', text: 'c', method: 'path' },
{ href: 'https://www.google.com', text: 'Go to Google', method: 'href' },
];

provide('navLinks', linkData);

## TileIcon

```

```
