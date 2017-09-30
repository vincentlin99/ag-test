const path = require("path");
const pathBase = path.resolve(__dirname, "..");

const config = {
  api: {
    port: 3000
  },
  secret: "ag-test-api",
  db: {
    host: "127.0.0.1:27017",
    database: "agTest"
  },
  web: {
    port: 5566
  },
  proxy: {
    host: "127.0.0.1",
    port: 3000
  },
  path_base: pathBase,
  dir_dist: path.resolve(pathBase, "dist")
};

module.exports = config;
