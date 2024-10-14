# React Component Library

This React component library is designed for use in Ensi frontend services. It makes it easier to create interfaces using the Greensight Design System (GDS) library.

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

P.s. build.bat for Windows is outdated and not debugged, there may be problems.

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

Next, during REP dev-build, you may have an error, related with some react hook. For example devtools will have warning “invalid react hook call”. This happens because of the presence of multiple react entities. To fix it, link react from REP to the LIB, following this steps:

1. Go to REP/node_modules/react and create link

```bash
yarn link
```

2. Navigate to the root of the LIB and link react

```bash
yarn link react
```

To test integration in prod-build mode, you should publish LIB to npm (and unlink local LIB from REP)

---

### Publish a new version

1. Once the task is finished, you should add new version to package json:

    - PATCH version when you make backward compatible bug fixes
    - MINOR version when you add functionality in a backward compatible manner
    - MAJOR version when you make incompatible API changes

2. Build the LIB and go to the `dist/` build folder and from there run command `yarn publish --access=public`. Specify the same version as the step above in package.json

    New version of the package will include all the contents of the dist folder, but you can always adjust the whitelist in the `dist/package.json` parameter `files`.

3. After you merge your task-branch into master-branch, add a new annotated git tag with new version identifier.
   Push it to gitlab-repository, release it and fill the release description changes.

---

## License

Refer to the LICENSE.md (MIT) file to view the license.
