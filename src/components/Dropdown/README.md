# Dropdown

The Dropdown component is an accessible dropdown menu that can be triggered by click or hover and positioned in various placements. It provides keyboard accessibility features such as toggling the dropdown on enter/space and closing on escape.

## Props

| name          | required? | types                | description                                        | default        |
| ------------- | --------- | -------------------- | -------------------------------------------------- | -------------- |
| `defaultOpen` | no        | `boolean`            | Whether the dropdown is initially open             | `false`        |
| `disabled`    | no        | `boolean`            | Whether the dropdown should be disabled            | `false`        |
| `dropdownId`  | yes       | `string`             | ID of dropdown content, must be unique             | none, required |
| `triggerType` | no        | `"press" \| "hover"` | The type of event that should trigger the dropdown | `"press"`      |

## Slots

| name      | required? | description                                                | default |
| --------- | --------- | ---------------------------------------------------------- | ------- |
| `trigger` | yes       | Content to be rendered inside of the trigger button        | n/a     |
| `content` | yes       | Content to be rendered inside the dropdown when it is open | n/a     |

## Examples

See [Component demo](../../demo/pages/ComponentDemo.vue)

### Hover or focus to open

```
<Dropdown 
  trigger-on="hover"
  @update:open="(isOpen: boolean) => (dropdownIsOpen = isOpen)"
  @press="() => console.log('Hello from top-level button')"
>
  <template #trigger>
    <span
      :class="{
        'font-semibold': dropdownIsOpen,
      }"
    >
        Press to toggle dropdown open/closed
    </span>
  </template>
  <template #content>
    <Button
      intent="tertiary"
      @click="buttonAlert('Apples dropdown button clicked')"
    >
      Apples
    </Button>

    <Button
      intent="tertiary"
      @click="buttonAlert('Oranges dropdown button clicked')"
    >
      Oranges
    </Button>

    <a href="https://pdap.io" target="_blank" rel="noreferrer">
      Go to pdap.io
    </a>

    <a href="https://pdap.dev" target="_blank" rel="noreferrer">
      Go to pdap.dev
    </a>
  </template>
</Dropdown>
```

### Press to open
```
<Dropdown @update:open="(isOpen: boolean) => (dropdownIsOpen = isOpen)">
  <template #trigger>
    <span
      :class="{
        'font-semibold': dropdownIsOpen,
      }"
    >
        Press to toggle dropdown open/closed
    </span>
  </template>
  <template #content>
    <Button
      intent="tertiary"
      @click="buttonAlert('Apples dropdown button clicked')"
    >
      Apples
    </Button>

    <Button
      intent="tertiary"
      @click="buttonAlert('Oranges dropdown button clicked')"
    >
      Oranges
    </Button>

    <a href="https://pdap.io" target="_blank" rel="noreferrer">
      Go to pdap.io
    </a>

    <a href="https://pdap.dev" target="_blank" rel="noreferrer">
      Go to pdap.dev
    </a>
  </template>
</Dropdown>
```
