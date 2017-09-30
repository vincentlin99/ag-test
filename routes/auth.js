const Router = require("express").Router;
const utils = require("../libs").utils;
const models = require("../models");

const router = Router();

router.post("/admin", async (req, res) => {
  const { account, password } = req.body;
  return models.Account
    .login(account, password)
    .then(result => utils.response(res, 200, result))
    .catch(err => utils.responseError(res, 401, err));
});

router.get("/admin", (req, res) => {
  if (req.jwtExpired === true) {
    return utils.response(res, 200, "jwt expired");
  }
  return utils.response(res, 200, req.user);
});

module.exports = router;
