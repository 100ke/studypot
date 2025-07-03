const models = require("../models");

const createStudy = async (data) => {
  const newStudy = await models.Study.create(data);
  return newStudy;
};

const viewStudyList = async (data) => {
  const studyList = await models.Study.findAll(data);
  return studyList;
};

const viewStudyDetail = async (data) => {
  const study = await models.Study.findByPk(data);
  return study;
};

const modifyStudy = async (data) => {
  const newStudy = await models.Study.update(data);
  return newStudy;
};

const deleteStudy = async (data) => {
  const study = await models.Study.destroy(data);
  return study;
};

module.exports = {
  createStudy,
  viewStudyList,
  viewStudyDetail,
  modifyStudy,
  deleteStudy,
};
