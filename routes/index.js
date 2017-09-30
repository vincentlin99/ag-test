const express = require("express");
const member = require("./member");
const auth = require("./auth");

const routes = {
  setup: app => {
    // setup routes
    const api = express.Router();
    api.use("/auth", auth);
    api.use("/member", member);
    app.use("/api", api);
  }
};

module.exports = routes;
