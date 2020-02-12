var path = require("path");
var webpack = require("webpack");

const manifest = require("../dll-lib/dist/library-manifest.json"); // eslint-disable-line

module.exports = {
  entry: {
    index: "./index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.resolve(__dirname),
      manifest
    })
  ]
};
