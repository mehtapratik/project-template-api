# Project template for API development

A starter kit for RESTful API development using Node.js and Express. This template eliminates need of starting from scratch every time. Instead, it is already set up with popular build, linting and code formatting tools along with most common middlewares.

Use server.js as your starting point. Define routes inside resources folder as an individual resource. An example folder, user, is added as an illustration.

## Configuration
 Configurable items, such as port numbers, are exposed as properties of `config` object in `server.js`. 
 
 Additional configuration parameters can be defined inside config folder. Every configfuration parameter should offer a default value in `default.js`. Default values can be overriden based on build environment, such as `development.js` and `production.js`.

## Formating, Liting and Transpiling
Linting, formatting and transpiling is already setup. You may find the need to tweak those rules based you project need and coding styles.
- Prettier and `.editorconfig` setup for code formatting rules. 
- `eslint` is configured to ensure code quality during development and build time.
- Uses Babel to transpile ES6 scripts to Common.JS scripts compatible to current version of Node.js.

## NPM Scripts
- **Build Script**: Runs linters before generating output under `dist` folder. Build won't succeed if there are any linting errors.
- **Start Script**: Runs linters before starting `server.js` and setting a watch on scripts inside `scr` folder. Script will terminate on linter errors.