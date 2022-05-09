const Base = require("../models/base");

const initBaseData = async () => {
  const public = new Base({ name: "Public" });
  await public.save().catch((err) => console.log(err));
  const private = new Base({ name: "Private" });
  await private.save().catch((err) => console.log(err));
  return "base data added";
};

exports.initBaseData = initBaseData;
