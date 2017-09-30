const mongoose = require("mongoose");
const Promise = require("bluebird");
const moment = require("moment");

const Schema = mongoose.Schema;

const MemberSchema = new Schema({
  _id: {
    type: Number,
    index: { unique: true }
  },
  name: {
    type: String,
    index: { unique: true },
    default: ""
  }
});

const format = object => {
  return {
    ID: object._id,
    name: object.name
  };
};

MemberSchema.statics.create = async function create(data) {
  return new Promise((resolve, reject) => {
    this.count({ name: data.name })
      .then(count => {
        if (count >= 1) {
          return reject("duplicate name");
        }
        const doc = this(data);
        return doc.save();
      })
      .then(doc => {
        return resolve(doc);
      })
      .catch(error => reject(error));
  });
};

MemberSchema.statics.list = function list(pagination, condition) {
  return new Promise((resolve, reject) => {
    const { page, size, order, desc } = pagination;
    const promises = [this.count(condition)];
    const promise = this.find(condition)
      .limit(size)
      .sort(`${desc === true ? "-" : ""}${order}`)
      .skip((page - 1) * size);
    promises.push(promise);
    Promise.all(promises)
      .then(results => {
        const count = results[0];
        const rows = results[1];
        const datas = {
          count,
          rows
        };
        datas.rows = datas.rows.map(row => format(row));
        resolve(datas);
      })
      .catch(error => reject(error));
  });
};

MemberSchema.statics.get = function get(_id) {
  return new Promise((resolve, reject) => {
    this.find({ _id })
      .limit(1)
      .then(doc => {
        if (!doc) {
          return reject("Member not found");
        }
        resolve(format(doc));
      })
      .catch(error => reject(error));
  });
};

module.exports = db => {
  MemberSchema.pre("save", function callback(next) {
    const member = this;
    if (member._id) {
      next();
      return;
    }
    db.Counter
      .findByIdAndUpdate({ _id: "memberId" }, { $inc: { seq: 1 } })
      .then(counter => {
        if (!counter) {
          return db
            .Counter({ _id: "memberId", seq: 1 })
            .save()
            .then(() =>
              db.Counter.findByIdAndUpdate(
                { _id: "memberId" },
                { $inc: { seq: 1 } }
              )
            );
        }
        return counter;
      })
      .then(counter => {
        member._id = counter.seq;
        next();
      })
      .catch(error => next(error));
  });
  return {
    name: "Member",
    schema: MemberSchema
  };
};
