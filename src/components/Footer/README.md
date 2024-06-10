# Footer

## Props

| name                  | required? | types    | description            | default                                                     |
| --------------------- | --------- | -------- | ---------------------- | ----------------------------------------------------------- |
| `logoImageSrc`        | no        | `string` | Source of logo image   | `'node_modules/pdap-design-system/dist/images/acronym.svg'` |
| `logoImageAnchorPath` | no        | `string` | Flex alignment presets | `/`                                                         |

## Notes

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

## Example

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
