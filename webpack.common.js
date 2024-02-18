const path = require("path");
const process = require("process");

module.exports = {
  resolve: {
    roots: [path.resolve("src/js"), path.resolve("node_modules")],
    modules: [path.resolve("src/js"), path.resolve("node_modules")],
    extensions: [".js", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
};
