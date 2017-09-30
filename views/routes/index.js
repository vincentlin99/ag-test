export default {
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./Admin'),
        require('./Other'),
      ])
    })
  },
}
