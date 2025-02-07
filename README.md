# React Component Library

This React component library is designed for use in Ensi frontend services. It makes it easier to create interfaces using the Greensight Design System (GDS) library.

---

## How and where to get accesses

For accesses to the [ensi-platform at npmjs.com](https://www.npmjs.com/org/ensi-platform) oraganization, contact the resource manager.

---

## How to work with LIB

After cloning the repository, install the `yarn` dependencies (Node 18.18+)

The build is started with the `yarn build` command and creates a build at the ./dist path.

The build can be parallelized for this purpose by defining the `BUILD_CONCURRENCY` parameter in the `bin/build.sh` file

Each parallel process takes about 0.5-1GB of RAM per node instance, so calculate your capabilities

To rebuild an individual component use
`yarn build-component [COMPONENT_NAME]`, for ex. yarn build-component select

P.s. build.bat for Windows is outdated and not debugged, there may be problems.

---

## Start working on the task

Next, let's describe the process of working with this library (hereinafter **LIB**) and testing it in another repository/project (hereinafter **REP**).

To customize the LIB for local integration with REP, you must link following dependencies:

For LIB:
- `react`
- `@types/react`

For REP:
- `@ensi-platform/core-components`

Ensure that the versions of `@ensi-platform/core-components` in both LIB and REP are identical.

You can link the LIB to the REP in two ways: manually or using the linking script (recommended).

### Linking via script (recommended)

#### Step 1: Configure path to REP

By default, the script assumes that LIB and REP are located in the same parent directory. If this is not the case, create a `linker.config.json` file based on the `linker.config.json.example` file in the root of LIB.

In the `linker.config.json`, set the `"frontendPath"` key to the absolute path of REP. If you leave this value empty or delete it, the script will attempt to link assuming LIB and REP are in the same directory.

To get the absolute path to REP, navigate to the REP directory and run the following command:

```bash
pwd
```

Example `linker.config.json`:

```json
{
  "frontendPath": "/absolute/path/to/your/repo"
}
```

####  Step 2: Run script

Run the following command:

```bash
yarn run link
```

The script will inform you of success or display any errors if they occur.

By default, the script suppresses the console output of yarn commands. To run the script with detailed logs, use the following command:

```bash
yarn run link --verbose
```

### Manually linking

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

Next, during REP build, you may have an error, related with some react hook. For example devtools will have warning “invalid react hook call”. This happens because of the presence of multiple react entities. To fix it, link **react** and **@types/react** from REP to the LIB, following this steps:

1. Navigate to the **REP/node_modules** and create links:

```bash
yarn link --cwd react
yarn link --cwd @types/react
```

2. Navigate to the root of the LIB and link react and @types/react

```bash
yarn link react
yarn link @types/react
```

---

## Restoring LIB and REP to Original State

After completing your work, it's important to return both the LIB and REP to their original states.

You can do this in two ways: manually or using the unlinking script (recommended).

### Unlinking via script (recommended)

Simply run the following command:

```bash
yarn run unlink
```

For detailed output, use the --verbose (-v) flag:

```bash
yarn run unlink --verbose
```

If you don't want to reinstall some dependencies after unlinking, use the --no-repack (-nr) flag:

```bash
yarn run unlink --no-repack
```

### Manually unlinking

#### Step 1: Unlink @ensi-platform/core-components from REP

Navigate to the REP directory and run:

```bash
yarn unlink @ensi-platform/core-components
```

#### Step 2: Unregister `react` and `@types/react` links

Navigate to the REP/node_modules directory and run:

```bash
yarn unlink --cwd react
yarn unlink --cwd @types/react
```

#### Step 3: Unlink `react` and `@types/react` from LIB

Navigate to the LIB directory and run:

```bash
yarn unlink react
yarn unlink @types/react
```

#### Step 4: Unregister `@ensi-platform/core-components` link

Navigate to the LIB/dist directory and run:

```bash
yarn unlink
```

#### Step 5: Reinstall dependencies

After unlinking to restore initial LIB and REP node_modules you need to reinstall dependencies.

Run the following command in both the LIB and REP directories:

```bash
yarn repack
```

## Publish a new version

After review approval and merging task-branch to master, you should publish a new version.

1. Firstly, actualize master and rebuild the package:

```bash
git checkout master
git pull origin master
yarn && yarn build
```

2. Then check the latest package version at [npmjs.com](https://www.npmjs.com/package/@ensi-platform/core-components?activeTab=versions) and choose a new version number:

    - PATCH version when you make backward compatible bug fixes
    - MINOR version when you add functionality in a backward compatible manner
    - MAJOR version when you make incompatible API changes

3. Go to `dist/` build folder and publish code to npmjs:

```bash
cd dist
yarn publish --access=public
```

This command will override version number only in package.json in `dist/` folder.

New version of the package will include all the contents of the dist folder, but you can always adjust the whitelist in the `dist/package.json` parameter `files`.

4. Next run command `yarn version` and specify the same version as in step 3.
   This command will override version number in package.json, commit changes and create new annotated tag.

5. Now push changes to gitlab and additionally push tags:

```bash
git push origin master
git push origin --tags
```

6. Finally go to gitlab-repository, check your tag, release it and fill the release description changes.

---

## Creating a new package

It is **recommended** to use create-package.js script to create a new package

Run `yarn create-package` from the root

## License

Refer to the LICENSE.md (MIT) file to view the license.
