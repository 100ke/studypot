const models = require("../models");

const createComment = async (studyId, userId, content) => {
  // 1. 스터디 존재 여부 확인
  const study = await models.Study.findByPk(studyId);
  if (!study) {
    const error = new Error("스터디가 존재하지 않습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 스터디 생성
  const newComment = await models.Comment.create({ studyId, userId, content });
  return newComment;
};

const getCommentsList = async (studyId) => {
  const commentList = await models.Comment.findAll({
    where: { studyId },
    include: [{ model: models.User, as: "writer" }],
  });
  // 작성자 이름 표시 가능한지
  return commentList;
};

const modifyComment = async (commentId, userId, content) => {
  // 1. 댓글 존재 여부 확인
  const comment = await models.Comment.findByPk(commentId);
  if (!comment) {
    const error = new Error("댓글이 존재하지 않습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 작성자 일치 여부 확인 (권한 검사)
  if (comment.userId !== userId) {
    const error = new Error("댓글 수정 권한이 없습니다.");
    error.status = 403;
    throw error;
  }
  // 3. 댓글 내용 수정
  await models.Comment.update(
    { content }, // 변경할 값
    { where: { id: commentId } } // 조건
  );
  const newComment = await models.Comment.findByPk(commentId);
  return newComment;
};

const deleteComment = async (commentId, userId) => {
  // 1. 댓글 존재 여부 확인
  const comment = await models.Comment.findByPk(commentId);
  if (!comment) {
    const error = new Error("댓글이 존재하지 않습니다.");
    error.status = 404;
    throw error;
  }
  // 2. 작성자 일치 여부 확인 (권한 검사)
  if (comment.userId !== userId) {
    const error = new Error("댓글 삭제 권한이 없습니다.");
    error.status = 403;
    throw error;
  }
  const result = await models.Comment.destroy({ where: { id: commentId } });
  if (result > 0) {
    return result;
  } else {
    const error = new Error("댓글 삭제 실패");
    error.status = 404;
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentsList,
  modifyComment,
  deleteComment,
};
