const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "docs"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"), // serve files from dist/
      watch: true, // watch dist/ for changes
    },
    port: 8080,
    open: true,
    hot: true, // HMR for JS/CSS
    watchFiles: [
      // watch your source files
      "src/**/*.html",
      "src/**/*.css",
      "src/**/*.js",
    ],
  },
};
