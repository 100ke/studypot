const models = require("../models");

const createStudy = async (data) => {
  const newStudy = await models.Study.create(data);
  return newStudy;
};

module.exports = {
  createStudy,
};
