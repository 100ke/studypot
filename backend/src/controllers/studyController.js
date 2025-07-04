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
  const study = await studyService.viewStudyDetail(id);
  if (!study) {
    return res.status(404).json({ message: "study not found" });
  }
  if (title) study.title = title;
  if (description) study.description = description;
  if (location) study.location = location;
  if (startDate) study.startDate = startDate;
  if (endDate) study.endDate = endDate;
  await study.save();
  res.status(200).json({ message: "ok", data: study });
};

const deleteStudy = async (req, res) => {
  const id = req.params.id;
  const result = await studyService.deleteStudy({ where: { id: id } });
  // 서비스 로직으로 이동 필요 확인
  if (result > 0) {
    res.status(204).send();
  } else {
    res.status(404).json({ message: "study not found" });
  }
};

module.exports = {
  createStudy,
  readStudyList,
  readStudy,
  updateStudy,
  deleteStudy,
};
