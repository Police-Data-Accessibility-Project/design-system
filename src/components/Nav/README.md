# Nav

You do not need to render `Nav` directly. `Header` takes care of that. But you do need to `provide` nav link data from a parent component. This allows for nav links to be dynamic depending on where `Header` is rendered.

## Example

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
