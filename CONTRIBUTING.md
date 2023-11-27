# Contributing

## Tech Stack

This is a `Vue` component library. It is built using `Vue3` and the `composition` API with TypeScript. Styles are created using `TailwindCSS`. The library is built using `Vite`. For testing, we use `Vitest`, for linting `eslint`, for formatting `prettier`
Some helpful resources and reading:

[Vue.js docs](https://vuejs.org/guide/introduction.html)  
[Vite docs](https://vitejs.dev/guide/)  
[Vitest docs](https://vitest.dev/guide/)  
[Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/v3/)  
[Tailwind docs](https://tailwindui.com/documentation)  
[TypeScript docs](https://www.typescriptlang.org/docs/)

### Etiquette

Head to [\#outreach](https://discord.com/channels/828274060034965575/853442226034442260/) in our [Discord](https://discord.gg/vKhDv7nC8B) if you'd like to collect feedback from the wider group.

Test your changes **locally first**, if possible. Include **screenshots with your PR** if you're changing something visual.

### Setup

1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).

For PDAP staff: Make changes as needed, but consider how widely this is used. Don't merge things until we test the changes.

For the public: This is an internal system, but it could easily be forked and altered to meet your needs. Feel free to share potentially useful things back to us in a Pull Request.

To test the package locally:

1. Run `npm link` from the root of the project directory.
2. `cd` into the local directory of the app you want to test importing into, then run `npm link pdap-design-system`
3. This will create a symlink between your local directories, allowing you to test changes in real time without actually publishing to the `npm` registry.
4. To test publishing your changes, run `npm publish --dry-run`. The console will output the result of the `publish` method, if you had actually called it.
