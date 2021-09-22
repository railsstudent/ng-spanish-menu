[![Netlify Status](https://api.netlify.com/api/v1/badges/e6584d85-1560-49b0-9b14-9b91abbc3c40/deploy-status)](https://app.netlify.com/sites/mystifying-panini-99633b/deploys)
# NgSpanishMenu

The application shows a Spanish menu and customer has to choose dishes and beverages from it. After each selection, a card is created to display description and price dynamically. Finally, the application calculates the total price that customer has to play before leaving the restaurant.

## Version

- Node 14
- NPM 7

## Setup Netlify function
- npm install netlify-cli -g
- ntl dev
- http://localhost:8888/.netlify/functions/menu to retrieve menu

## Todo

- ~~Create a card to display description, quantity and price for now~~
- ~~Create Menu item component that displays description and price. Customer edits quality and clicks add button to order (done)~~
- Create shell component to host smart and dumb components (Nati)
- ~~Create Menu component that iterate food and drink choices to render menu items (Connie)~~
- ~~Create Menu card component to content project food question and food choices~~
- Test components with Storybook
- Someone who is good at UX (Not me!!!!) will design the application layout
- ~~Create npm script to deploy the project to github page by angular-cli-ghpages (Connie)~~
- ~~Create github action to deploy the project to github page (stuck, PR submutted)~~
- ~~Build storybook as a standalone application (Connie)~~
- ~~Create github action to deploy storybook to chromium~~

## Data

- ~~Should food menu be hardcoded data in the component?~~
- ~~Should food menu loaded from static JSON file through http service? Http service retrieves data from static json file~~
- ~~Should food menu loaded from backend API that we create?~~
- ~~Want to explore Netlify function to return food menu (Connie)~~

## CSS and UI libraries

- Angular Material?
- Bootstrap?
- TailwindCSS?
- Taiga UI?

## Translation
- Transloco

## PWA
Should we convert the application to PWA?

## Storybook static app

`https://www.chromatic.com/builds?appId=613821be390968003af8c529`

## Github page

`https://railsstudent.github.io/ng-spanish-menu/`

- Note: The application is still a work in progress.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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
