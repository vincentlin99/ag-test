module.exports = {
  response: (res, code, content) => {
    res.status(code);
    res.json(content);
  },
  responseError: (res, code, error) => {
    res.status(code);
    res.json({ error });
  },
  authorize(req, res, next) {
    if (!req.user) {
      return res.sendStatus(401);
    }
    next();
  }
};
