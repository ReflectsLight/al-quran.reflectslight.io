const path = require("path");
const process = require("process");

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
      "@json": path.resolve(__dirname, "src/json"),
      "~": path.resolve(__dirname, "src/js"),
    },
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          loader: 'tsx',
          target: 'es2015'
        }
      },
    ],
  },
};
