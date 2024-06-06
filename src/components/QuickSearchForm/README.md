# QuickSearchForm
Renders a form to search the API `/search` endpoint with a search term and a location.

## Props

| name   | required? | types             | description                                                                  | default  |
| ------ | --------- | ----------------- | ---------------------------------------------------------------------------- | -------- |
| `mode` | no        | `'dev' \| 'prod'` | env —— controls which url users are sent to when form is rendered on pdap.io | `'prod'` |

## Notes

The different `mode` prop values result the following base url values in the eventual navigation 

| value    | base url                          |
| -------- | --------------------------------- |
| `'dev'`  | `'https://data-sources.pdap.dev'` |
| `'prod'` | `'https://data-sources.pdap.io'`  |

