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
  password: {
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

AccountSchema.statics.login = function login(account, password) {
  return new Promise((resolve, reject) => {
    this.findOne({ account }, (err, AccountDoc) => {
      if (AccountDoc === null) {
        return reject("Account not found");
      }

      auth.hashPassword(password, AccountDoc.salt).then(hashedPassword => {
        if (AccountDoc.password !== hashedPassword) {
          return reject("Wrong password");
        }
        const { account } = AccountDoc;
        const expiresIn = 6;
        const token = auth.generateAccessToken({ account }, expiresIn);
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
    auth.hashPassword(user.password, user.salt).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  });

  return {
    name: "Account",
    schema: AccountSchema
  };
};
