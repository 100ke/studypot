const studyService = require("../services/studyService");
// 서비스 로직으로 이동할 부분 확인

const createStudy = async (req, res) => {
  const { title, description, location, startDate, endDate } = req.body;
  const hostId = req.user.id;

  const study = await studyService.createStudy({
    title,
    description,
    location,
    startDate,
    endDate,
    hostId,
  });

  res.status(201).json(study);
};

const readStudyList = async (req, res) => {
  const studyList = await studyService.viewStudyList();
  res.status(200).json({ message: "ok", data: studyList });
};

const readStudy = async (req, res) => {
  const id = req.params.id;
  const study = await studyService.viewStudyDetail(id);
  if (!study) {
    return res.status(404).json({ message: "study not found" });
  }
  res.status(200).json({ message: "ok", data: study });
};

const updateStudy = async (req, res) => {
  const id = req.params.id;
  const { title, description, location, startDate, endDate } = req.body;
  const userId = req.user.id;
  try {
    const updatedStudy = await studyService.modifyStudy(id, userId, {
      title,
      description,
      location,
      startDate,
      endDate,
    });
    res.status(200).json({ message: "ok", data: updatedStudy });
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "스터디 수정 중 오류 발생";
    res.status(status).json({ message });
  }
};

const deleteStudy = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  try {
    const isDeleted = await studyService.deleteStudy(id, userId);
    if (isDeleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "study not found" });
    }
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "스터디 삭제 중 오류 발생";
    res.status(status).json({ message });
  }
};

module.exports = {
  createStudy,
  readStudyList,
  readStudy,
  updateStudy,
  deleteStudy,
};
