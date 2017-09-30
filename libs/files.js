const fs = require("fs");
const shelljs = require("shelljs");
const pathUtil = require("path");

module.exports = {
  listDirs: src =>
    fs
      .readdirSync(src)
      .filter(file => fs.statSync(pathUtil.join(src, file)).isDirectory())
      .map(dir => pathUtil.join(src, dir)),
  listFiles: src =>
    fs
      .readdirSync(src)
      .filter(file => fs.statSync(pathUtil.join(src, file)).isFile())
      .map(file => pathUtil.join(src, file)),
  exist: path => {
    try {
      fs.accessSync(path, fs.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  },
  mkdir: path => {
    try {
      shelljs.mkdir("-p", path);
      return true;
    } catch (error) {
      return false;
    }
  },
  del: path => {
    try {
      shelljs.rm(path);
      return true;
    } catch (error) {
      return false;
    }
  },
  mv: (source, destination) => {
    try {
      shelljs.mv(source, destination);
      return true;
    } catch (error) {
      return false;
    }
  },
  resolve: (head, tail) => pathUtil.resolve(head, tail),
  basename: path => pathUtil.basename(path),
  read: path => fs.readFileSync(path, "utf8"),
  write: (path, text) => fs.writeFileSync(path, text),
  copy: (source, destination) => shelljs.cp(source, destination),
  copyR: (source, destination) => shelljs.cp("-R", source, destination),
  extname: path => pathUtil.extname(path)
};
