# ErrorBoundary
Intercepts uncaught errors from its children and renders an error UI in place of its children.

## Props
| name        | required? | types                                                                           | description                     | default     |
| ----------- | --------- | ------------------------------------------------------------------------------- | ------------------------------- | ----------- |
| `component` | no        | `string`                                                                        | component to render as fallback | `'div'`     |
| `onError`   | no        | `(error: Error, target?: ComponentPublicInstance \| null \| undefined) => void` | callback to run on error        | `undefined` |
| `params`    | no        | `Record<string,string>`                                                         | params to forward to fallback   | `undefined` |

## Example
_From data-sources `App.vue`: This will catch any uncaught error at the route level and render the error fallback_

```
<template>
	<AuthWrapper>
		<Header />
		<ErrorBoundary component="main">
			<router-view />
		</ErrorBoundary>
		<Footer />
	</AuthWrapper>
</template>
```

_From data-sources `SearchResultPage.vue`: For each of these results, the error boundary will catch any uncaught error only within its `SearchResultCard` component child and render the error fallback. In this case, the error will_ not _bubble any further up the DOM tree, allowing us to render the rest of the UI that did not error._

```
<div class="grid pdap-grid-container-column-3 gap-4">
  <ErrorBoundary
    v-for="result in [...getAllRecordsFromSection(section)]"
    :key="result.type"
  >
    <SearchResultCard
      data-test="search-results-cards"
      :data-source="result"
    />
  </ErrorBoundary>
</div>
```