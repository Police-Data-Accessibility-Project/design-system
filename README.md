# Design System

This is a `Vue` component library, styling system, and image asset repository for PDAP-branded client apps.

## Usage

1. Install the package

```
npm install pdap-design-system
```

2. Import the stylesheet in the app's entrypoint (usually `index.js` or `main.js`, at the root of your project)

```
// index.js

import 'pdap-design-system/styles';
```

3. Import and use the components

```
import { Button, Form } from 'pdap-design-system';
```

4. If your project is using `TypeScript`, the component props definitions and other types are exposed for import as well.  
   _n.b. This can be particularly useful for composing `Form` schemas, where `Input` schema objects are defined differently depending on the `type` of input desired._

```
import { PdapInputTypes } from 'pdap-design-system';
```

5. See [the component documentation](./docs/components.md) for details on each component's API.

### About images

PDAP image assets contained in this repo are built to the `/dist` folder. For convenience an importing alias `/images` has been added.

```
import 'pdap-design-system/images/acronym.svg';
```

Or, if you need them all, you can import all images at the app level. Just remember that if it's imported it gets bundled with your production app, so take care not to import unneeded images.

```
import `pdap-design-system/images`;
```

### Using the CLI to copy assets to your local project directory

If you want either styles or images copied to a local folder, you can do so from the root directory of your project.

Assets can be copied using the `pdap-design-system` command line method exposed by this package.

One of the following arguments is required:  
`--copy-assets`: Copies all images and styles.
`--copy-images`: Copies all images.
`--copy-styles`: Copies all styles.

The following argument is optional:  
`--to={path}`: Path to directory where assets should be copied. Defaults to `assets`

```
  pdap-design-system --copy-images --to=image-assets
```

## Development Setup

1. Clone the repo

```
gh repo clone Police-Data-Accessibility-Project/design-system
```

2. CD into the project folder and install dependencies

```
cd design-system
npm i
```

3. Step 2 should result in the `build` script being run after packages are installed. Check the `dist` folder for changes. You then may want to take one or both of the following steps:

- If `build` wasn't called when you installed deps, build styles and images to the `dist` folder:

```
npm run build
```

- To watch for changes and update the build as you make changes:

```
npm run build:watch
```

4. If you use VS Code as your editor, you may want to install the [tailwind VS Code extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), which helps with intellisense and the custom at-rules used by TailwindCSS.

5. Read the [contributing guide](./CONTRIBUTING.md) for development requirements and tips.

## Assets

Use these [brand assets](https://docs.pdap.io/meta/about/staff/brand-assets).
Use this [terminology](https://docs.pdap.io/activities/terms-and-definitions).

## Scripts reference

| Script         | What it does                                    |
| -------------- | ----------------------------------------------- |
| `build`        | Builds the library                              |
| `build:watch`  | Builds the library and watches for file changes |
| `clean`        | Removes testing coverage reports after build    |
| `lint`         | Lint `ts` and `css`                             |
| `lint:es`      | Lint `ts`                                       |
| `lint:css`     | Lint `css`                                      |
| `test`         | Runs full test suite                            |
| `test:changed` | Runs only test suites affected by changed files |
| `types`        | Runs type check on all `ts` and `vue` files     |
