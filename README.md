This demonstrates an issue the DllPlugin/DllReferencePlugin when running Yarn 2 when it uses [virtual paths][lexicon].

# Pre-requisites

yarn@~1.22.0 installed globally

# Run

## dll-lib - build bundle + manifest

```shell
cd dll-lib
yarn set version berry # set yarn to v2
yarn # install
yarn webpack
```

## lib-user - build bundle + use manifest from dll-lib

```shell
cd lib-user
yarn set version berry # set yarn to v2
yarn # install
yarn webpack
```

## Expected

The bundle in `lib-user` makes a reference to `react-dom` in it's bundle by using `library-manifest.json` in `dll-lib`.

## Actual

`react-dom` is bundled into `lib-user/dist/index.js`.

## Notes

In `library-manifest.json` in `dll-lib` the reference is a yarn 2 [virtual package][lexicon].

```javascript
{
  "name": "library_1109ed9bec109636950b",
  "content": {
    "./.yarn/$$virtual/react-dom-virtual-4970a0b490/0/cache/react-dom-npm-16.12.0-4ea576dd1a-2.zip/node_modules/react-dom/index.js": {
      "id": 601,
      "buildMeta": {}
    }
  }
}
```

When the webpack build in `dll-user` runs, it looks for `react-dom` but the path it has in `.pnp.js` is:

```javascript
"packageLocation": "./.yarn/$$virtual/react-dom-virtual-76a393ef8c/0/cache/react-dom-npm-16.12.0-4ea576dd1a-2.zip/node_modules/react-dom/",
```

From reading the yarn docs [here][ia] and [here][lexicon] it looks like these virtual paths are unique to disambiguate packages that list peerDependencies. So while they both point to the same package the virtual path will not be the same. This will prevent the reference being be pulled in as the paths won't match.

[ia]: https://yarnpkg.com/advanced/architecture#install-architecture
[lexicon]: https://yarnpkg.com/advanced/lexicon#virtual-package
