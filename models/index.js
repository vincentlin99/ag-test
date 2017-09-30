const Promise = require("bluebird");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const config = require("../config");

mongoose.Promise = Promise;

const Schema = mongoose.Schema;
const basename = path.basename(module.filename);

const promiseLibrary = Promise;

const options = {
  promiseLibrary,
  useMongoClient: true
};
const url = `mongodb://${config.db.host}/${config.db.database}`;

mongoose.connect(url, options).then(
  () => {
    console.log("Connection has been established successfully.");
  },
  err => {
    console.error("Unable to connect to the database:", err);
    process.exit(1);
  }
);

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 }
});
const Counter = mongoose.model("Counter", CounterSchema);

const db = {
  Counter
};

fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(db);
    db[model.name] = mongoose.model(model.name, model.schema);
  });

module.exports = db;
