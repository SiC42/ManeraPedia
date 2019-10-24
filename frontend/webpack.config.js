const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ["@babel/polyfill", "index.jsx"],
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: ["babel-loader", "eslint-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpe?g|gif|ico)$/i,
        exclude: /node_modules/,
        use: ["file-loader?name=[name].[ext]"] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ],
  devServer: {
    historyApiFallback: true
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "http://localhost:5000"
    })
  }
};
