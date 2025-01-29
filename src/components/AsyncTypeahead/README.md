# AsyncTypeahead

This component handles single-item selection from a dropdown of items passed into it.  
It emits an `onInput` event when a user types into the input.  
It accepts an array of generically typed `items`, along with props and slots for formatting whatever type is passed with the array.  
Using these in combination allows us to asynchronously (or sync, if you like) fetch items based on user input and display them in a dropdown for selection.  
There are also several methods exposed that can be accessed via a ref for use in components passed as slots.  

NOTE: this does not currently work with the form paradigm that other inputs work with. This is largely because we've used it so far with objects, whose properties need to be formatted into strings for display in the typeahead input after selection. In the future, we'll want to plug this in in a way that the object itself is represented in the form values object. But for now, just use the `selectItem` emit to handle values and merge with form value objects. See [the usage in pdap.io](https://github.com/Police-Data-Accessibility-Project/pdap.io/blob/dev/src/pages/data-source/create.vue#L67-L115) for an example.

## Props

| name                   | required? | types                            | description                                                                   | default                                                                            |
| ---------------------- | --------- | -------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `id`                   | yes       | `string`                         | id for the typeahead input                                                    | n/a                                                                                |
| `placeholder`          | no        | `string`                         | Placeholder text for the input                                                | `''`                                                                               |
| `items`                | yes       | `GenericTypeT[] \| undefined`    | Array of items from which to select                                           | n/a                                                                                |
| `formatItemForDisplay` | no        | `(item: GenericTypeT) => string` | Formatter for items rendered (recommended to pass unless item is type string) | `(item: GenericTypeT) =>  typeof item === 'string' ? item : JSON.stringify(item),` |
| `error`                | no        | `string`                         | Error message if typeahead search or form validation fails                    | n/a                                                                                |

## Slots

| name        | required?      | types     | description                                                     | default                                                                        |
| ----------- | -------------- | --------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `error`     | no<sup>*</sup> | `Element` | slot content to be rendered as error                            | n/a                                                                            |
| `label`     | yes            | `Element` | slot content to be rendered as label                            | n/a                                                                            |
| `item`      | no             | `Element` | slot content rendered with `item: GenericTypeT` passed as props | n/a - If slot not passed, we simply call `formatItemForDisplay` on each `item` |
| `not-found` | no             | `Element` | slot content rendered when no item found                        | `<strong>No results found.</strong> Please check your spelling.`               |

## Emits

| name         | description                      |
| ------------ | -------------------------------- |
| `selectItem` | when item selected from dropdown |
| `onFocus`    | when input is focused            |
| `onBlur`     | when input is blurred            |
| `onInput`    | when input takes new values      |

## Example

```vue
		<AsyncTypeahead
			id="typeahead"
			ref="typeaheadRef"
			class="md:col-span-2"
			:error="typeaheadError"
			:format-item-for-display="getFullText"
			:items="items"
			placeholder="Search for a person"
			@select-item="
				(item) => {
					if (item) {
						selectedItems = [...selectedItems, item];
						items = [];
					}
				}
			"
			@on-input="fetchTypeaheadResults"
		>
			<!-- Item to render passed as scoped slot -->
			<template #item="item">
				<span v-html="typeaheadRef?.boldMatchText(getFullText(item))" />
				<span class="select">Select</span>
			</template>
			<template #not-found>
				<span>
					We can't find the person you're looking for. Is their name spelled
					correctly? If our database is missing something, please reach us at
					<a href="mailto:contact@pdap.io">contact@pdap.io</a>
				</span>
			</template>
		</AsyncTypeahead>
```

<!-- TODO: update pdap.io link when dev -> main -->
Or see the [typeahead demo page](../../demo/pages/TypeaheadDemo.vue) or [the usage in pdap.io](https://github.com/Police-Data-Accessibility-Project/pdap.io/blob/dev/src/pages/data-source/create.vue#L67-L115) for more.