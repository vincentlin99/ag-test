const Router = require("express").Router;
const utils = require("../libs").utils;
const models = require("../models");

const router = Router();

router.post("/", (req, res) => {
  const data = req.body;
  const condition = { account: data.account };
  models.Account
    .count(condition)
    .then(count => {
      if (count > 0) {
        return utils.response(res, 201, "duplicate account");
      }
      const doc = models.Account(data);
      return doc.save();
    })
    .then(result => utils.response(res, 201, result))
    .catch(error => utils.responseError(res, 400, error));
});

module.exports = router;
