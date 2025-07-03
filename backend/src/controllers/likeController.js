const likeService = require("../services/likeService");

const createLike = async (req, res) => {
  const userId = req.user.id;
  const studyId = req.params.id;
  const like = await likeService.likeStudy(studyId, userId);
  res.status(201).json({ message: "좋아요 목록에 추가되었습니다.", like });
};

const deleteLike = async (req, res) => {
  const userId = req.user.id;
  const studyId = req.params.id;
  const result = await likeService.cancelLikeStudy(userId, studyId);
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "like not found" });
  }
};

const totalLikes = async (req, res) => {
  const studyId = req.params.id;
  const likesCount = await likeService.totalLikes(studyId);
  res.status(200).json({ message: "ok", likesCount });
};

const readMyLikes = async (req, res) => {
  const userId = req.user.id;
  const likesList = await likeService.myLikesList(userId);
  res.status(200).json({ message: "ok", likesList });
};

module.exports = {
  createLike,
  deleteLike,
  totalLikes,
  readMyLikes,
};
