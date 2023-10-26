# Contributing

For PDAP staff: Make changes as needed, but consider how widely this is used. Don't merge things until we test the changes.

For the public: This is an internal system, but it could easily be forked and altered to meet your needs. Feel free to share potentially useful things back to us in a Pull Request.

This is an `npm` package. Currently it is published manually using `npm publish`. Please do not do this. A PDAP staff member will publish once your changes are approved.

If you want to check the new release before publishing, run `npm publish --dry-run`. This will preview the release for you without actually releasing.

To test the package locally:

1. Run `npm link` from the root of the project directory.
2. `cd` into the local directory of the app you want to test importing into, then run `npm link pdap-design-system`
3. This will create a symlink between your local directories, allowing you to test changes in real time without actually publishing to the `npm` registry.
