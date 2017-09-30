module.exports = {
  path: "admin",
  getComponent(location, cb) {
    require.ensure([], require => {
      cb(null, require("./LayoutContainer"));
    });
  },
  getIndexRoute(location, cb) {
    require.ensure([], require => {
      cb(null, require("./Login"));
    });
  },
  getChildRoutes(location, cb) {
    require.ensure([], require => {
      cb(null, [require("./Members")]);
    });
  }
};
