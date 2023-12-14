# Contributing

## Tech Stack

This is a `Vue` component library. It is built using `Vue3` and the `composition` API with TypeScript. Styles are created using `TailwindCSS`. The library is built using `Vite`. For testing, we use `Vitest`, for linting `eslint`, for formatting `prettier`. Conventional commits are enforced using `commitizen`, and publishing is done automatically via `semantic-release`.
Some helpful resources and reading:

[Commitizen](https://commitizen-tools.github.io/commitizen/)
[Semantic Release](https://semantic-release.gitbook.io/semantic-release/)
[Tailwind](https://tailwindui.com/documentation)  
[TypeScript](https://www.typescriptlang.org/docs/)
[Vite](https://vitejs.dev/guide/)  
[Vitest](https://vitest.dev/guide/)  
[Vue Testing Handbook](https://lmiller1990.github.io/vue-testing-handbook/v3/)  
[Vue.js](https://vuejs.org/guide/introduction.html)  
[Vuelidate](https://vuelidate.js.org/)

### Etiquette

Head to [\#outreach](https://discord.com/channels/828274060034965575/853442226034442260/) in our [Discord](https://discord.gg/vKhDv7nC8B) if you'd like to collect feedback from the wider group.

Test your changes **locally first**, if possible. Include **screenshots with your PR** if you're changing something visual.

### Setup

1. [Clone the repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository).
2. Install `node@v20.6.1` (Recommended to [use `nvm` to manage `node` versions](https://github.com/nvm-sh/nvm))
3. `cd` into the project directory `cd design-system` and install dependencies `npm i`

### Workflow
1. Create a branch prefixed with the appropriate action (e.g. `feature/add-dropdown-component`, `fix/button-border-styles`).
2. Make your changes.
3. Commit your changes, using `npm run _commit` (this calls `commitizen`, which guides you through creating a conventional commit).*


* [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification) are strictly enforced. It is generally best to use `npm run _commit` or `cz`, if you have `commitizen` installed globally. Even if you commit using `git commit`, this repository uses `husky` to lint commit messages. If you must skip the pre-commit hook (useful for `git commit --amend`, etc.) you can pass `no-verify` to `git commit`. But we check commit messages again on pull request, so please make sure they are formatted according to the convention.
#### A few examples
```
# example 1
feat: Button

# example 2
fix(Button): update border styles
Bug in post-css causing....

BREAKING CHANGE
Prop `style` changes to `intent`

# example 3
docs(README): add button documentation
Document component API
```

### Why all this humbuggery about conventional commits?
Because we use `semantic-release` to auto-generate releases, `CHANGELOG` entries, etc., based on conventional commits, all commits need to follow the convention.

### Testing and verifying changes
To test the package locally:

1. Run `npm link` from the root of the project directory.
2. `cd` into the local directory of the app you want to test importing into, then run `npm link pdap-design-system`
3. This will create a symlink between your local directories, allowing you to test changes in real time without actually publish to the `npm` registry.
4. To test publishing, squash merge your local feature/fix/whatever branch into `main`. Then from `main` run `npm exec semantic-release --dry-run`. Then revert the squash merge commit.

The `lint`, `test`, and `build` scripts are all required to pass before pull requests can be merged. The `lint` scripts are run against all staged files, and you can run `test:changed` to verify test suites against all local changes (staged and unstaged) before committing. You can run `build` locally as well, if you want to verify that it will pass before pushing changes. 
