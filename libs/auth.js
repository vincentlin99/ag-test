const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = {
  hashPassword: (pwd, salt) =>
    new Promise((resolve, reject) => {
      crypto.pbkdf2(pwd, salt, 100000, 50, "sha512", (err, key) => {
        if (err) {
          reject(err);
        } else {
          resolve(key.toString("hex"));
        }
      });
    }),
  generateSalt: () => crypto.randomBytes(16).toString("hex"),
  generateAccessToken: (data, expire) =>
    jwt.sign(data, config.secret, { expiresIn: expire })
};
