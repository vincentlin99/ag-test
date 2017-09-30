const config = require("./config");
const express = require("express");
const app = express();
const json = require("body-parser").json;
const urlencoded = require("body-parser").urlencoded;
const jwt = require("express-jwt");
const predefine = require("./helpers/predefine");
const routes = require("./routes");

app.use(json());
app.use(
  urlencoded({
    extended: false
  })
);

const unauthPaths = [
  /^\/api\/files/,
  {
    url: "/",
    methods: ["POST"]
  }
];
app.use(
  jwt({
    secret: config.secret,
    requestProperty: "user"
  }).unless({
    path: unauthPaths
  })
);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,Content-Type,Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});

app.use(function(err, req, res, next) {
  console.error({
    err
  });
  if (err.message === "jwt expired") {
    req.jwtExpired = true;
  }
  next();
});

process.on("uncaughtException", function(err) {
  console.error(err); // handle the error safely
});

predefine
  .sync()
  .then(() => {
    routes.setup(app);
  })
  .then(() => {
    app.listen(config.api.port, function() {
      console.log(`Api server listening on port: ${config.api.port}`);
    });
  })
  .catch(error => {
    log.error(error);
    process.exit(1);
  });
