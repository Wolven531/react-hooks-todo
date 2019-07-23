// More on Cypress config options here:  https://on.cypress.io/plugins-guide
// const webpack = require('@cypress/webpack-preprocessor')

// This function is called when a project is opened or re-opened
// (e.g. due to the project's config changing)

// `on` - used to hook into various events Cypress emits
// `config` -  resolved Cypress config
module.exports = (on, config) => {
	// following config from https://glebbahmutov.com/blog/////use-typescript-with-cypress/
	//   const options = {
	//     // send in the options from your webpack.config.js, so it works the same as your app's code
	//     webpackOptions: require('../../config/webpack.config'),
	//     watchOptions: {}
	//   }

	//   on('file:preprocessor', webpack(options))
}
