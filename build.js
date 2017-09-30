import { transformFileSync } from "babel-core";
const config = require("./config");
import { files } from "./libs";
import _debug from "debug";
const debug = _debug("build:all");
import webpack from "webpack";

const dist = config.dir_dist;

if (files.exist(dist) === false) {
  files.mkdir(dist);
}

debug("Compiling...");

/* server part... */

// package.json
const packagejson = files.resolve(config.path_base, "package.json");
const packagejson_target = files.resolve(dist, "package.json");
debug(`${packagejson} to ${packagejson_target}`);
files.copy(packagejson, packagejson_target);

// server.js
const serverjs = files.resolve(config.path_base, "server.js");
const serverjs_target = files.resolve(dist, "server.js");
debug(`${serverjs} to ${serverjs_target}`);
files.write(serverjs_target, transformFileSync(serverjs, {}).code);

// other directories
const API_DIRS = ["config", "helpers", "libs", "models", "routes"];
API_DIRS.forEach(src_dir => {
  debug(`directoy: ${src_dir}......`);
  const dir_src = files.resolve(config.path_base, src_dir);
  const dir_src_target = files.resolve(dist, src_dir);
  if (files.exist(dir_src_target) === false) {
    files.mkdir(dir_src_target);
  }
  files.listFiles(dir_src).forEach(src => {
    const ext = files.extname(src);
    const basename = files.basename(src);
    const target = files.resolve(dir_src_target, basename);
    debug(`${src} to ${target}`);
    if (ext === ".js") {
      files.write(target, transformFileSync(src, {}).code);
    } else {
      files.copy(src, target);
    }
  });
});

/* web part... */
debug("Compiling views...");
const webpackConfig = require("./webpack/webpack.config.js");
const compiler = webpack(webpackConfig({ prod: true }));
const statsFormat = {
  chunks: false,
  chunkModules: false,
  colors: true
};

compiler.run((err, stats) => {
  const jsonStats = stats.toJson();

  debug("Webpack compile completed.");
  debug(stats.toString(statsFormat));

  if (err) {
    debug("Webpack compiler encountered a fatal error.", err);
  } else if (jsonStats.errors.length > 0) {
    debug("Webpack compiler encountered errors.");
    debug(jsonStats.errors.join("\n"));
  } else if (jsonStats.warnings.length > 0) {
    debug("Webpack compiler encountered warnings.");
    debug(jsonStats.warnings.join("\n"));
  } else {
    debug("No errors or warnings encountered.");
  }
});
