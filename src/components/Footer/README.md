# Footer

## Props

| name              | required? | types                              | description                  | default |
| ----------------- | --------- | ---------------------------------- | ---------------------------- | ------- |
| `fundraisingData` | yes       | `{ raised: string; goal: string }` | data from donor box campaign |         |

## Notes

The `Footer` component provides support for overriding the default social links. The `links` variable is `inject`ed by the component, using the following defaults:

```vue
export default {
  ...
  inject: {
    footerLinks: {
      default: [
          {
            href: 'https://github.com/orgs/Police-Data-Accessibility-Project',
            text: 'Github',
            icon: FOOTER_LINK_ICONS.GITHUB,
          },
          {
            href: 'https://discord.gg/wMqex8nKZJ',
            text: 'Discord',
            icon: FOOTER_LINK_ICONS.DISCORD,
          },
          {
            href: 'https://pdap.io/jobs',
            text: 'Jobs',
            icon: FOOTER_LINK_ICONS.JOBS,
          },
          {
            href: 'https://newsletter.pdap.io/',
            text: 'Newsletter',
            icon: FOOTER_LINK_ICONS.NEWSLETTER,
          },
          {
            href: 'https://docs.pdap.io/',
            text: 'Docs',
            icon: FOOTER_LINK_ICONS.DOCS,
          },
          {
            href: 'mailto:contact@pdap.io',
            text: 'Email',
            icon: FOOTER_LINK_ICONS.EMAIL,
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

```vue
<template>
  <Header />
  <router-view />
  <Footer />
</template>

...

<script>
import { Header, Footer, FOOTER_LINK_ICONS } from 'pdap-design-system';
import { RouterView } from 'vue-router'

...

export default {
  name: 'Layout',
  components: ['Header', 'Footer'],
  ...
  provide: {
    navLinks: [
      // Type
      {
        href?: string;
        path?: string;
        text: string;
        icon?: FooterIconName;
      },
      // Example
      {
        href: 'https://www.foo.com';
        text: 'Foo';
        icon: FOOTER_LINK_ICONS.GITHUB;
      }
    ]
  }
}
</script>
```

If `href` is passed, a standard anchor tag. If `path` is passed, a `RouterLink` component is rendered.
If neither are passed, it's a no-op.
If both are passed, `path` takes precedence.

`FOOTER_LINK_ICONS` is exposed from the package. `icon` must be a value contained on that object if it is passed.