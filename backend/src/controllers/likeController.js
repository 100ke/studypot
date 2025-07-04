const likeService = require("../services/likeService");

const createLike = async (req, res) => {
  const userId = req.user.id;
  const studyId = req.params.id;
  try {
    const like = await likeService.likeStudy(studyId, userId);
    res.status(201).json({ message: "좋아요 목록에 추가되었습니다.", like });
  } catch (error) {
    const status = error.status || 500;
    res
      .status(status)
      .json({ message: error.message || "좋아요 추가 중 오류 발생" });
  }
};

const deleteLike = async (req, res, next) => {
  const userId = req.user.id;
  const studyId = req.params.id;
  try {
    await likeService.cancelLikeStudy(userId, studyId);
    res.status(204).send();
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "좋아요 취소 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
};

const totalLikes = async (req, res) => {
  const studyId = req.params.id;
  try {
    const likesCount = await likeService.totalLikes(studyId);
    res.status(200).json({ message: "ok", likesCount });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "좋아요 수 조회 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
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
