// See https://github.com/kentcdodds/nps for more about nps.
// See https://doc.esdoc.org/github.com/kentcdodds/nps-utils/ for more about nps-utils.

const npsUtils = require('nps-utils');
const { series, rimraf }  = npsUtils;

module.exports = {
  scripts: {
    build: {
      default: {
        description: 'Clean dist directory and run all builds in mode production',
        script: series(
          rimraf('dist/*'),
          'webpack --config config/webpack.prod.js'
        )
      },
      dev: {
        description: 'Clean dist directory and run all builds in mode development',
        script: series(
          rimraf('dist/*'),
          'webpack --config config/webpack.dev.js'
        )
      }
    }
  }
};
