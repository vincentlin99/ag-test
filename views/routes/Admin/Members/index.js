module.exports = {
  path: "member",
  getIndexRoute(locationm, cb) {
    require.ensure([], require => {
      cb(null, require("./List"));
    });
  }
};
