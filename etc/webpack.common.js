const path = require("path");
module.exports = (env, argv) => {
  return  {
    devtool: "source-map",
    resolve: {
      modules: [path.resolve(__dirname, "..", "node_modules")],
      alias: {
        "@css": path.resolve(__dirname, "..", "src", "css"),
        "@json": path.resolve(__dirname, "..", "src", "json"),
        "~": path.resolve(__dirname, "..", "src", "js"),
      },
      extensions: [".js", ".ts", ".tsx", ".json", ".css", ".scss"],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  esmodules: false,
                  browsers: ['KaiOS >= 2.5', 'Firefox >= 48'],
                },
                useBuiltIns: 'entry',
                corejs: 3,
              }],
              '@babel/preset-typescript',
              '@babel/preset-react'
            ],
          },
        },
        {
          test: /\.(scss|css)$/i,
          exclude: /node_modules/,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ]
        }
      ],
    },
    plugins: [],
    optimization: {}
  }
};
