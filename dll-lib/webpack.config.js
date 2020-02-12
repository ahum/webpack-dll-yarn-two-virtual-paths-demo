const path = require("path");
const webpack = require("webpack");
module.exports = {
  entry: {
    library: ["react-dom"]
  },
  output: {
    filename: "dll-[name].js",
    library: "[name]_[fullhash]",
    path: path.resolve(__dirname, "dist")
  },
  plugins: [
    new webpack.DllPlugin({
      context: path.resolve(__dirname),
      path: path.join(__dirname, "dist", "[name]-manifest.json"),
      name: "[name]_[fullhash]"
    })
  ]
};
