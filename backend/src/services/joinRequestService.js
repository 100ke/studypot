const { where } = require("sequelize");
const models = require("../models");
const { checkDuplicate } = require("../utils/checkDuplicate");

const applyToStudy = async (userId, studyId) => {
  const study = await models.Study.findByPk(studyId);

  if (study) {
    const alreadyApplied = await checkDuplicate(models.JoinRequest, {
      userId,
      studyId,
    });
    if (alreadyApplied) {
      const error = new Error("이미 신청한 스터디 입니다.");
      error.status = 409;
      throw error;
    }
    const joinRequest = await models.JoinRequest.create({ userId, studyId });
    return { message: "ok", joinRequest };
  }
  return { message: "스터디가 존재하지 않습니다." };
};

const myRequestList = async (userId) => {
  const myRequestList = await models.JoinRequest.findAll({
    where: { userId },
    include: [{ model: models.Study, as: "study" }],
  });
  return myRequestList;
};

const getRequestForStudy = async (studyId, hostId) => {
  const study = await models.Study.findOne({ where: { id: studyId } });
  // 1. 스터디 존재 여부 확인
  if (!study) {
    const error = new Error("스터디를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  // 2. studyId 소유자가 hostId인지 확인
  if (study.hostId === hostId) {
    // 3. 해당 스터디의 참여 신청 목록 조회
    const joinRequests = await models.JoinRequest.findAll({
      where: { studyId: studyId },
    });
    return joinRequests;
  } else {
    const error = new Error("해당 스터디에 대한 권한이 없습니다.");
    error.status = 403;
    throw error;
  }
};

const updateRequestStatus = async (requestId, studyId, hostId, status) => {
  // 1. 스터디 존재 여부 조회
  const study = await models.Study.findByPk(studyId);
  if (!study) {
    const error = new Error("해당 스터디를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 스터디 신청 존재 확인
  const request = await models.JoinRequest.findOne({
    where: { id: requestId, studyId: studyId },
  });
  if (!request) {
    const error = new Error("해당 스터디 신청을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  // 2. 호스트 권한 확인
  if (study.hostId !== hostId) {
    const error = new Error("해당 요청에 대한 권한이 없습니다.");
    error.status = 403;
    throw error;
  }
  // 3. 상태 업데이트
  if (!["approved", "rejected"].includes(status)) {
    const error = new Error("유효하지 않은 상태입니다.");
    error.status = 400;
    throw error;
  }
  request.status = status;
  await request.save();
};

module.exports = {
  applyToStudy,
  myRequestList,
  getRequestForStudy,
  updateRequestStatus,
};
