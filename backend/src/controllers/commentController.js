const commentService = require("../services/commentService");
const models = require("../models");

// /studies/:id/comments
const createComment = async (req, res) => {
  const studyId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  const comment = await commentService.createComment(studyId, userId, content);
  res.status(201).json({ message: "댓글 작성 성공", comment });
};

// /studies/:id/comments
const readCommentsList = async (req, res) => {
  const studyId = req.params.id;
  const commentsList = await commentService.getCommentsList(studyId);
  res.status(200).json({ message: "ok", commentsList });
};

// /comments/:id
const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  const { content } = req.body;
  const comment = await commentService.modifyComment(
    commentId,
    userId,
    content
  );
  res.status(200).json({ message: "댓글 수정 완료", comment });
};

// /comments/:id
const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  const userId = req.user.id;
  await commentService.deleteComment(commentId, userId);
  res.status(204).send();
};

module.exports = {
  createComment,
  readCommentsList,
  updateComment,
  deleteComment,
};
