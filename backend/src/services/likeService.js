const models = require("../models");
const { checkDuplicate } = require("../utils/checkDuplicate");

const likeStudy = async (studyId, userId) => {
  // 1. 스터디 존재 여부 확인
  const study = await models.Study.findByPk(studyId);
  if (!study) {
    const error = new Error("스터디가 존재하지 않습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 좋아요 중복 확인
  const alreadyLiked = await checkDuplicate(models.Like, {
    userId,
    studyId,
  });
  if (alreadyLiked) {
    const error = new Error("이미 좋아요를 눌렀습니다.");
    error.status = 409;
    throw error;
  }
  const like = await models.Like.create({ userId, studyId });
  //   res.status(201).json({ message: "ok", like });
  return like;
};

const cancelLikeStudy = async (userId, studyId) => {
  // 1. 좋아요 존재 여부 확인
  const like = await models.Like.findOne({ where: { userId, studyId } });
  if (!like) {
    const error = new Error("좋아요 기록이 없습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 좋아요 취소
  const result = await models.Like.destroy({
    where: { userId: userId, studyId: studyId },
  });
  if (result > 0) {
    return result;
  } else {
    const error = new Error("좋아요 취소 실패");
    error.status = 404;
    throw error;
  }
};

const totalLikes = async (studyId) => {
  const likesCount = await models.Like.count({ where: { studyId: studyId } });
  return likesCount;
};

const myLikesList = async (userId) => {
  const myLikes = await models.Like.findAll({
    where: { userId: userId },
    includes: [{ model: models.Study, as: "study" }],
  });
  return myLikes;
};

module.exports = {
  likeStudy,
  cancelLikeStudy,
  totalLikes,
  myLikesList,
};
