const path = require('path');
const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');

module.exports = (env, argv) => {
  return merge(
    common(env, argv),
    {
      output: { library: { type: 'umd' } },
      resolve: { extensions: ['.ts', '.tsx'] },
      optimization: { minimize: true }
    }
  )
}
