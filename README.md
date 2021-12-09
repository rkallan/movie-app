# RR Kallan React Application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [https://localhost:3000](https://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.\

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Useful commands

-   cleanup all local branches exept master, develop and current branche

    `git branch | egrep -v "(master|develop|\*)" | xargs git branch -D`

    This project is provided with a script to make it easier to clean up unused local branches

    `npm run clean:branches`

-   package.json sorting from command line

    `npx sort-package-json`

    This project is provided with a script to sort package.json

    `npm run sort:package`

-   npm packages update overview (add -u to update package.json)

    `npx npm-check-updates`

-   commit style for feature and fix etc. (usefull when nit provided)

    `npx commitizen init cz-conventional-changelog --save-dev --save-exact`

    When provided in project

    `npx git-cz`

    This project is provided with a script

    `npm run commit`

-   Check packages to update

    `npx npm-check-updates`

    to update all packages to latest version

    `npx npm-check-updates -u`
