# Button

## Props

| name        | required? | types                                    | description                | default   |
| ----------- | --------- | ---------------------------------------- | -------------------------- | --------- |
| `isLoading` | no        | `boolean`                                | Request state              | `false`   |
| `intent`    | yes       | `"primary" \| "secondary" \| "tertiary"` | Determines style of button | `primary` |

## Example

```
<template>
  <Button intent="primary" @click="() => console.log('hello world')" type="button">Click me</Button>
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
```
