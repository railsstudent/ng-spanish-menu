[![Netlify Status](https://api.netlify.com/api/v1/badges/e6584d85-1560-49b0-9b14-9b91abbc3c40/deploy-status)](https://app.netlify.com/sites/mystifying-panini-99633b/deploys)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# NgSpanishMenu

The application shows a Spanish menu and customer has to choose dishes and beverages from it. After each selection, a card is created to display description and price dynamically. Finally, the application calculates the total price that customer has to play before leaving the restaurant.

## Install Volta

This project uses Volta manager to pin the version of Node and NPM to 14 and 7 respectively. https://docs.volta.sh/guide/getting-started

- Run `curl https://get.volta.sh | bash` install Volta
- Set the VOLTA_HOME variable to $HOME/.volta
- Add $VOLTA_HOME/bin to the beginning of your PATH variable
- Run `volta install node@14` to install node v14
- Run `volta install npm@7` to install npm v7
- Run `volta pin node@14` to pin node version of the project to 14
- Run `volta pin npm@7`to pin npm version of the project to 7

## Version

- Node 14
- NPM 7

## Setup Netlify function

- `volta install netlify-cli`
- `ntl dev`
- http://localhost:8888/.netlify/functions/menu to retrieve menu

## Manually deploy Netlify function to production

- Run `ntl build` to build netify contents
- Run `ntl deploy` to deploy to preview site
- Run `ntl deploy --prod` to deploy to production site when satisifed

## Commit message with Commitzen

- git add .
- npm run commit

## Todo

- Translation
- GraphQL API in Hasura

## CSS and UI libraries

- TailwindCSS

## Translation

- Transloco

## PWA

Should we convert the application to PWA?

## Articles

### Angular and Storybook

<ol>
  <li><a href="http://www.blueskyconnie.com/?p=2255" target="_blank" rel="noreferrer noopener">Angular and Storybook – Simple Component</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2302" target="_blank" rel="noreferrer noopener">Angular and Storybook – Simple Component with inputs and actions</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2342" target="_blank" rel="noreferrer noopener">Angular and Storybook – Component with content projection</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2537" target="_blank" rel="noreferrer noopener">Angular and Storybook – Publish to Chromatic</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2640" target="_blank" rel="noreferrer noopener">Angular and Storybook – Mock Data in Container Component</a></li>
  <li><a href="http://blueskyconnie.com/?p=3180" target="_blank" rel="noreferrer noopener">How to render Tailwind CSS in Angular and Storybook</a></li>
  <li><a href="http://blueskyconnie.com/?p=3400" target="_blank" rel="noreferrer noopener">How to perform accessibility testing in Angular and Storybook</a></li>
</ol>

### Angular and other open source libraries

<ol>
  <li><a href="http://www.blueskyconnie.com/?p=2389" target="_blank" rel="noreferrer noopener">Build Angular app with Netlify function</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2470" target="_blank" rel="noreferrer noopener">How Angular calls CORS enabled Netlify Function</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=3127" target="_blank" rel="noreferrer noopener">Tailwind CSS in JIT mode with Angular</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=3181" target="_blank" rel="noreferrer noopener">Dynamically import module in Angular</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=3520" target="_blank" rel="noreferrer noopener">Customize template with ngTemplateOutlet and ngTemplate in Angular</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=3654" target="_blank" rel="noreferrer noopener">Split module into single component angular modules (SCAMs)</a></li>
</ol>

### Best coding practices

<ol>
  <li><a href="http://www.blueskyconnie.com/?p=2593" target="_blank" rel="noreferrer noopener">Add value to commit message in Angular application</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2759" target="_blank" rel="noreferrer noopener">Improve Angular code with Betterer</a></li>
  <li><a href="http://www.blueskyconnie.com/?p=2907" target="_blank" rel="noreferrer noopener">Automate release management in Angular</a></li>
</ol>

## Storybook static app

`https://www.chromatic.com/builds?appId=613821be390968003af8c529`

## Github page

`https://railsstudent.github.io/ng-spanish-menu/`

- Note: The application is still a work in progress.

## Netlify app

`https://mystifying-panini-99633b.netlify.app/food`

## Development server

Run `ntl dev` for a dev server. Navigate to `http://localhost:8888/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
