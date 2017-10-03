const models = require("../models");
const Promise = require("bluebird");

const ACCOUNTS = [
  {
    account: "admin",
    password: "admin"
  }
];

module.exports = {
  sync: () => {
    return Promise.reduce(
      ACCOUNTS,
      (creates, account) => {
        const condition = { account: account.account };
        return models.Account.count(condition).then(count => {
          if (count > 0) {
            return creates;
          }
          creates.push(account);
          return creates;
        });
      },
      []
    ).then(creates => {
      return Promise.reduce(
        creates,
        (successes, account) => {
          console.log("predefine account", account.account);
          const doc = models.Account(account);
          return doc.save();
        },
        []
      );
    });
  }
};
