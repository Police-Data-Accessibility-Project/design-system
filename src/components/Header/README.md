# Header

## Props

| name                  | required? | types    | description            | default                                                    |
| --------------------- | --------- | -------- | ---------------------- | ---------------------------------------------------------- |
| `logoImageSrc`        | no        | `string` | Source of logo image   | `'node_modules/pdap-design-system/dist/images/lockup.svg'` |
| `logoImageAnchorPath` | no        | `string` | Flex alignment presets | `/`                                                        |

## Notes

The `Header` component does not require any props to be passed. But keep in mind that it is responsible for rendering the `Nav` component. Consuming applications will need to `provide` an array of nav links -- **there are no defaults for this**, you must `provide` these links either 1\. in a layout component (see example below), at the route level, or at the app level. This allows for flexibility in which links are rendered on which routes

### _Example_

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
