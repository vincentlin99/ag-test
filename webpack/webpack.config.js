const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StringReplaceWebpackPlugin = require("string-replace-webpack-plugin");
const path = require("path");

const NODE_ENV = process.env.NODE_ENV || "development";
const ENV = {
  DEV: NODE_ENV === "development",
  PROD: NODE_ENV === "production",
  TEST: NODE_ENV === "test"
};

let APP_ENTRY = [path.join(__dirname, "../views/")];

if (ENV.DEV) {
  APP_ENTRY = [
    "react-hot-loader/patch",
    "webpack-dev-server/client?http://localhost:5566",
    "webpack/hot/dev-server"
  ].concat(APP_ENTRY);
}

// Okay, this may be confusing at first glance but go through it step-by-step
module.exports = env => {
  const ifDev = plugin => (ENV.DEV ? plugin : undefined);
  const ifProd = plugin => (env.prod ? plugin : undefined);
  const removeEmpty = array => array.filter(p => !!p);

  return {
    devtool: "inline-source-map",

    /**
     * entry tells webpack where to start looking.
     * In this case we have both an app and vendor file.
     */
    entry: {
      app: APP_ENTRY,
      vendor: [
        "react",
        "react-dom",
        "react-router",
        "redux",
        "react-redux",
        "redux-saga",
        "react-router-redux",
        "whatwg-fetch",
        "babel-polyfill",
        "moment",
        "gsap",
        "reactstrap",
        "react-addons-transition-group",
        "react-addons-css-transition-group",
        "react-bootstrap-table",
        "react-lazyload"
      ]
    },
    /**
     * output tells webpack where to put the files he creates
     * after running all its loaders and plugins.
     *
     * > [name].[hash].js will output something like app.3531f6aad069a0e8dc0e.js
     * > path.join(__dirname, '../build/') will output into a /build folder in
     *   the root of this prject.
     */
    output: {
      filename: "[name].[hash].js",
      path: path.join(__dirname, "../dist/static"),
      publicPath: "/"
    },

    context: path.resolve(__dirname, "../views"),

    module: {
      // rules,

      // Loaders allow you to preprocess files!
      loaders: [
        {
          test: /\.(js)$/, // look for .js files
          exclude: /node_modules/, // ingore /node_modules
          loader: "babel-loader", // preprocess with that babel goodness
          query: {
            cacheDirectory: true
          }
        },
        /* comment because of a strange 'logo' issue
        {
          test: /\.(jpg|jpeg|png|ico|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        },
        */
        {
          test: /\.(jpg|jpeg|png|ico|svg)$/,
          loader: "file-loader",
          options: {
            name: "assets/[name].[ext]"
          }
        },
        {
          test: /\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: `css-loader!sass-loader?includePaths[]=${path.resolve(
              __dirname,
              "../node_modules/compass-mixins/lib"
            )}`
          })
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.js$/,
          loader: StringReplaceWebpackPlugin.replace({
            replacements: [
              {
                pattern: /(@@googlemapkey)/gi,
                replacement: function(match, p1, offset, string) {
                  if (ENV.DEV) {
                    return "AIzaSyChK0ZjCalTZON3O0pjPliO5qJR1wHDWE4";
                  }
                  if (env.prod) {
                    return "AIzaSyDfejHv6alU5FiNiHE_23uIYc3CEtInjCs";
                  }
                }
              }
            ]
          })
        }
      ]
    },

    plugins: removeEmpty([
      new StringReplaceWebpackPlugin(),

      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),

      // Only running HMR in development
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NamedModulesPlugin()),

      new ExtractTextPlugin("[name]-[contenthash].css"),

      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: Infinity,
        filename: "[name].[hash].js"
      }),

      /**
      * HtmlWebpackPlugin will make sure out JavaScriot files are being called
      * from within our index.html
      */
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "../views/index.html"),
        filename: "index.html",
        inject: "body"
      }),

      /*
       * Only running DedupePlugin() and UglifyJsPlugin() in production
       * ifProd(new webpack.optimize.DedupePlugin()),
       */
      ifProd(
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true,
            warnings: false,
            unused: true,
            dead_code: true
          },
          output: {
            comments: false
          },
          sourceMap: false
        })
      )
    ])
  };
};
