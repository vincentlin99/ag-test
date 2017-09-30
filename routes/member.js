const Router = require("express").Router;
const utils = require("../libs").utils;
const models = require("../models");

const router = Router();

router.post("/", utils.authorize, async (req, res) => {
  const data = req.body;
  try {
    await models.Member.create(data);
    const result = {
      code: "success"
    };
    return utils.response(res, 201, result);
  } catch (error) {
    return utils.responseError(res, 400, error);
  }
});

router.get("/", utils.authorize, async (req, res) => {
  try {
    const data = await models.Member.list({}, {});
    const result = {
      data: data.rows
    };
    return utils.response(res, 201, result);
  } catch (error) {
    return utils.responseError(res, 400, error);
  }
});

module.exports = router;
