
# React Component Library

This library facilitates the creation of interfaces, utilizing the Greensight Design system (GDS) framework.

---
## Getting Started 

This document outlines the process for working with this library (referred to as LIB) and testing it in another repository (referred to as REP).

### Step 1: Setting up the Library

To set up LIB for integration with REP, follow these steps:

#### Create a Symlink for LIB

Navigate to the distribution directory and create a symlink:

```bash
cd dist && npm link
```

#### Link LIB to REP

Ensure that dependencies are already installed in REP and link LIB

```bash
npm link @ensi-platform/core-components
```

#### Resolving React Version Conflicts

If a React version conflict occurs, such as an "invalid react hook call" error, follow these step to resolve it:

Link React from REP to LIB, from the root of LIB, execute
```bash
npm link (absolute path to node_modules/react in REP)
```
---
## Lisence
To view the license, please refer to `LICENCE.md` (MIT)