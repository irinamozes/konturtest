
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const OUTPUT_DIRNAME = 'build';
const SRC_DIRNAME = 'src';

module.exports = {
  mode: 'none',

  devServer: {
    contentBase: path.resolve(projectRoot, OUTPUT_DIRNAME),
    entryPath: path.resolve(projectRoot, SRC_DIRNAME)
  },

  devtool: 'sourcemap',

  entry: path.resolve(projectRoot, SRC_DIRNAME, 'main.js'),

  output: {
    filename: 'js/main.js',
    path: path.resolve(projectRoot, OUTPUT_DIRNAME),
    //    outputPath: '/',
    sourceMapFilename: '[file].map'
  }
};
