const moment = require("moment");

const TIMEFORMAT = "YYYY/MM/DD HH:mm:ss";

const toString = timestamp => {
  return moment.unix(timestamp).format(TIMEFORMAT);
};

const toTimestamp = timestring => {
  return moment(timestring, TIMEFORMAT).unix();
};

module.exports = {
  toString,
  toTimestamp
};
