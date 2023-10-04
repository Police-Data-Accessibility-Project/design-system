# Design System

These are styling resources like CSS and templates for new PDAP microservices or branded web projects.

Open `src/demo.html` to see how things look.

`src/css/global-styles.css` are the styles used across all PDAP applications.

`src/images` are icons and brand assets.

CSS and assets are built to the `dist` directory before each release, so you will access them from there.

## Usage

1. In the project's root directory:

```
npm install pdap-design-system
```

#### To import and use CSS

After installing the package, include PDAP styles in a project using one of two strategies.

1. If you are using `Vue.js` or another framework that bundles CSS via a build tool like Webpack or Vite, you can import the package directly in your entrypoint js file. So, if your entrypoint is `main.js`, import it in that file like so:

```
import 'pdap-design-system'
```

And voila! You have access to PDAP's design system CSS / images to use in your templates / components:

```
<button class="button">Say Hello</button>
```

2. If the project does not have a build tool that bundles CSS for you, you can still include PDAP styles via HTML `link` tags:

```
  <link href="node_modules/pdap-design-system/dist/css/global-styles.css" rel="stylesheet" type="text/css">
```

#### To import and use images

There are also two strategies for including PDAP image assets.

1. Images can be copied to a directory of your choosing using the `pdap-design-system-copy-assets` command line method exposed by this package.

```
  pdap-design-system-copy-assets
```

Optional arguments:

```
--path={desiredPath}
```

By default, the images will be copied to a directory named `/assets` in the root of the project directory. If you would prefer them to be copied to a custom directory name, run the command with the `path` argument.

```
  pdap-design-system-copy-assets --path=foo
```

2. Alternatively, you can reference images directly from the `node_modules` directory in the same way CSS is imported

```
  <img src='node_modules/pdap-design-system/dist/{path-to-image}.png' alt='some descriptive alt text'>
```

## Development Setup

1. Clone the repo

```
gh repo clone Police-Data-Accessibility-Project/design-system
```

2. Install dependencies

```
npm i
```

3. If you use VS Code as your editor, you may want to install the [tailwind VS Code extension](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss), which helps with intellisense and the custom at-rules (`@tailwind`, for example) used by TailwindCSS.

## Principles

This is a first pass, so they're not etched in stone. Open to suggestions.

We are making tools for transparency about a serious subject. We should be focused, friendly, and open.

- Our design should take accessibility seriously.
- Keep it simple: things should not do anything they don't need to do.
- We should keep our users informed and in control with timely, relevant feedback.
- Things that look the same should behave in the same way, and an action should always produce the same result.
- Don't reinvent the wheel: use standard conventions and cues.
- Provide help to people in context, not in the docs.
- Establish good visual hierarchy by ensuring each page and object has a primary function.

## Assets

Use these [brand assets](https://docs.pdap.io/meta/about/staff/brand-assets).
Use this [terminology](https://docs.pdap.io/activities/terms-and-definitions).

## Other notes

This is based on the PDAP website, which was originally created in Webflow. That might explain some of the CSS browser compatibility choices.
