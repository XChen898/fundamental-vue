# fundamental-vue
Vue.JS components for [SAP Fiori Fundamentals](https://github.com/SAP/fundamental)


## Description
Fundamental-vue is a set of [Vue.js](https://vuejs.org/) components implementation of [SAP Fiori Fundamentals library](https://sap.github.io/fundamental/). SAP Fiori Fundamentals library is a Design System and HTML/CSS Component Library used to build modern Product User Experiences with the SAP look and feel. This will allow you to stay/use Vue.js for your application and get SAP look and feel.
Fundamental-vue is open for contribution as long as you follow certain [rules/guidelines](./CONTRIBUTING.md).



## [Playground](https://dist-4d2gqwr8y.now.sh)


## Serve Documentation
```
$ npm run serve:docs
```

## Build Documentation
```
$ ./scripts/build
$ npm run build -- src/docs/DocsMain.ts
```

## Build
```
$ ./scripts/build
$ npm pack
```

## Deploy Documentation
The `deploy-docs`-script currently deploys the documentation app to [now.sh](https://now.sh). It assumes that you have a [now.sh](https://now.sh)-account and that you are logged in.

```
$ ./scripts/deploy-docs
```

## Install

To download and use this library, you first need to install the node package manager - [npm](https://www.npmjs.com/get-npm).
 
1. Install Fundamental-vue
```
$ npm install --save fundamental-vue
```

After installing, you will need to import fundamental-vue and make it available to your Vue application.

In your `main.js`:

```
// ...
import FundamentalVue from 'fundamental-vue';
Vue.use(FundamentalVue);
// ...
```

Fundamental-vue does not include the ['Fiori Fundamentals' library](https://github.com/SAP/fundamental) which is required for styling. 


2. Install Fiori Fundamentals

The quickest way to get Fiori Fundamentals styling for your components is  to include the compiled and minified Fiori Fundamentals CSS library with the following CDN link in your public `index.html` file:
```
<link rel="stylesheet" type="text/css" href="https://unpkg.com/fiori-fundamentals@1.3.3/dist/fiori-fundamentals.min.css">
```

However, installing the Fiori Fundamentals library with npm (recommended) will give you the flexibility to use individual components and enable [advanced customisation options](https://github.com/SAP/fundamental/wiki/Advanced-Customization). In this case, you do not need the CDN link as this method uses the SASS/SCSS source.

To install the Fiori Fundamentals SASS/SCSS source:
```
$ npm install --save fiori-fundamentals
```

<!-- To get this working correctly, you must also make the Fiori Fundamentals SCSS/CSS available to your project. 

If you decide to use Fiori Fundamentals SASS source, you can customise your SCSS imports according to your requirements in your main SCSS file. -->

The following assumes the usage of a module bundler such as [webpack](https://webpack.js.org/). To compile Fiori Fundamentals SASS/SCSS to CSS, two additional packages are required for your bundling process - [sass-loader](https://github.com/webpack-contrib/sass-loader) and [node-sass](https://github.com/sass/node-sass). To install these packages as development dependencies:

```
$ npm install sass-loader node-sass --save-dev
```

*Add info on adding loaders to webpack config*

Loading the SCSS and running your project at this point will throw some errors related to the path configuration required for icons and fonts. This is a [known issue](https://github.com/SAP/fundamental#known-issues). 

To rectify this, start by creating a directory ('scss') in your project's `src` directory. Within this directory, create a main SCSS file ('main.scss') from which to manage your imports, configurations and customisations. 

Add the following to the main SCSS file:
```
$fd-icons-path : "../node_modules/fiori-fundamentals/scss/icons/"; // should be declared before the scss import

$fd-scss-font-path : "../node_modules/fiori-fundamentals/scss/fonts/";

@import "../node_modules/fiori-fundamentals/scss/all.scss";
```

Import the main SCSS file in your `App.js` style block file to add Fiori Fundamentals styles to your project.

```
<style lang='scss'>
...
@import "./scss/main.scss";
...
</style>
```





## Known Issues

Click [here](https://github.com/SAP/fundamental-vue/issues) to view the current issues.

## How to obtain support

If you encounter an issue, you can [create a ticket](https://github.com/SAP/fundamental-vue/issues/new)


## Contributing

If you want to contribute, please check the [CONTRIBUTING.md](./CONTRIBUTING.md) documentation for contribution guidelines.

## License

Copyright (c) 2018 SAP SE or an SAP affiliate company. All rights reserved.
This file is licensed under the Apache Software License, v. 2 except as noted otherwise in the [LICENSE file](https://github.com/SAP/fundamental-vue/blob/master/LICENSE.txt)
