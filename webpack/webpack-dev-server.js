/**
 * Webpack Dev Server
 * This file is used to run our local enviroment in development
 * mode. Production build does not go through dev server.
 */
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("./webpack.config"); // haven't created this yet. No sweat.
const path = require("path");
const fs = require("fs");

// always dev enviroment when running webpack dev server
const env = { dev: process.env.NODE_ENV };

const view = path.resolve(__dirname, "../views");

const devServerConfig = {
  host: "0.0.0.0",
  hot: true,
  inline: true,
  stats: { color: true },
  // contentBase: path.join(__dirname, '../views/'),
  contentBase: path.join(__dirname, "../dist/static"),
  publicPath: "/",
  // Need historyApiFallback to be able to refresh on dynamic route
  // historyApiFallback: { disableDotRule: true },
  historyApiFallback: true,
  proxy: {
    "/api": "http://localhost:3000"
  }
};

/**
 * Creating the server to listen to. We are passing in our webpack config
 * that we will setup at webpack/webpack.config.js. We are also passing in
 * the server configuration object that we created above.
 */
const server = new WebpackDevServer(
  webpack(webpackConfig(env)),
  devServerConfig
);

// will be live at http://localhost:3000/
server.listen(5566, "0.0.0.0");
