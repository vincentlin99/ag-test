const mongoose = require("mongoose");
const moment = require("moment");
const auth = require("../libs").auth;
const time = require("../libs").time;

const Schema = mongoose.Schema;

const AccountSchema = new Schema({
  account: {
    // 帳號
    type: String,
    require: true
  },
  pwd: {
    // 密碼
    type: String,
    require: true
  },
  salt: {
    // pwd salt
    type: String,
    require: true
  },
  createdAt: {
    // 建立時間
    type: Number,
    require: true,
    set: time.toTimestamp,
    get: time.toString
  }
});

AccountSchema.statics.login = function login(name, pwd) {
  return new Promise((resolve, reject) => {
    this.findOne({ name }, (err, AccountDoc) => {
      if (AccountDoc === null) {
        return reject("Account not found");
      }

      auth.hashPassword(pwd, AccountDoc.salt).then(hashedPassword => {
        if (AccountDoc.pwd !== hashedPassword) {
          return reject("Wrong password");
        }
        const { name } = AccountDoc;
        const expiresIn = 6;
        const token = auth.generateAccessToken({ name }, expiresIn);
        return resolve({ token });
      });
    });
  });
};

module.exports = () => {
  AccountSchema.pre("save", function callback(next) {
    const user = this;
    user.createdAt = moment().format("YYYY/MM/DD HH:mm:ss");
    user.salt = auth.generateSalt();
    auth.hashPassword(user.pwd, user.salt).then(hashedPassword => {
      user.pwd = hashedPassword;
      next();
    });
  });

  return {
    name: "Account",
    schema: AccountSchema
  };
};
