# React Component Library

This library makes it easy to create interfaces using the Greensight Design System (GDS) library.

---

### How and where to get accesses

For accesses to the [ensi-platform at npmjs.com](https://www.npmjs.com/org/ensi-platform) oraganization, contact the resource manager.

---

### How to work with LIB

After cloning the repository, install the `yarn` dependencies (Node 18.18+)

The build is started with the `yarn build` command and creates a build at the ./dist path.

The build can be parallelized for this purpose by defining the `BUILD_CONCURRENCY` parameter in the `bin/build.sh` file

Each parallel process takes about 0.5-1GB of RAM per node instance, so calculate your capabilities

To rebuild an individual component use
`yarn build-component [COMPONENT_NAME]`, for ex. yarn build-component select

P.s. build.bat on windows is outdated and doesn't work

---

## Start working on the task

Next, let's describe the process of working with this library (hereinafter LIB) and testing it in another repository/project (hereinafter REP).

To customize the LIB for local integration with REP, follow these steps:

#### Step 1: Create a symbolic link for the LIB

Navigate to the dist build directory and create a symbolic link

```bash
cd dist && yarn link
```

#### Step 2: Linking the LIB to the REP

Make sure the dependencies are already installed in REP and link the LIBs

```bash
yarn link @ensi-platform/core-components
```

This way the linked repository will always have your `dist` build in it

#### Resolving React version conflicts

Next, during REP build/dev build, you may have an error, related with some react hook. For example devtools will have warning “invalid react hook call”. To fix it, link react from REP to the LIB, following this steps:

1. Go to REP/node_modules/react and create link

```bash
yarn link
```

2. Navigate to the root of the LIB and link react

```bash
yarn link react
```

---

### Publish a new version

Once the task is finished, you should go to the `cd dist/` build folder and publish the new version with the `yarn publish --access=public` command

The new version will include all the contents of the dist folder, but you can always adjust the whitelist in the `dist/package.json` parameter `files`

---

## License

Refer to the LICENSE.md (MIT) file to view the license.
