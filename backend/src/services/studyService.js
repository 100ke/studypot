const { where } = require("sequelize");
const models = require("../models");
// 컨트롤러->서비스 로직 이전 필요

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

const modifyStudy = async (
  id,
  userId,
  { title, description, location, startDate, endDate }
) => {
  // 1. 스터디 존재 여부 확인
  const study = await models.Study.findByPk(id);
  if (!study) {
    const error = new Error("스터디를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  if (study.hostId !== userId) {
    const error = new Error("수정 권한이 없습니다.");
    error.status = 403;
    throw error;
  }

  if (title) study.title = title;
  if (description) study.description = description;
  if (location) study.location = location;
  if (startDate) study.startDate = startDate;
  if (endDate) study.endDate = endDate;
  await study.save();
  return study;
};

const deleteStudy = async (id, userId) => {
  // 1. 스터디 존재 여부 확인
  const study = await models.Study.findByPk(id);
  if (!study) {
    const error = new Error("스터디를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 권한 체크
  if (study.hostId !== userId) {
    const error = new Error("삭제 권한이 없습니다.");
    error.status = 403;
    throw error;
  }
  const result = await models.Study.destroy({ where: { id } });
  return result > 0;
};

module.exports = {
  createStudy,
  viewStudyList,
  viewStudyDetail,
  modifyStudy,
  deleteStudy,
};
