const path = require("path");

module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "..", "node_modules")],
    alias: {
      "@css": path.resolve(__dirname, "..", "src", "css"),
      "@json": path.resolve(__dirname, "..", "src", "json"),
      "~": path.resolve(__dirname, "..", "src", "js"),
      "react": "preact/compat",
      "react-dom/test-utils": "preact/test-utils",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
    extensions: [".js", ".ts", ".tsx", ".json", ".css", ".scss"],
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
      {
        test: /\.(scss|css)$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-media-minmax")()],
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [],
};
