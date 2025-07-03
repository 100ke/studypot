const requestService = require("../services/joinRequestService");

const createJoinRequest = async (req, res) => {
  const userId = req.user.id;
  const { studyId } = req.params;
  const result = await requestService.applyToStudy(userId, studyId);
  res.status(201).json(result);
};

const readMyRequests = async (req, res) => {
  const userId = req.user.id;
  const result = await requestService.myRequestList(userId);
  res.status(200).json({ message: "ok", result });
};

const getJoinRequestForStudy = async (req, res) => {
  const studyId = req.params.studyId;
  const hostId = req.user.id;
  const result = await requestService.getRequestForStudy(studyId, hostId);
  res.status(200).json({ message: "ok", requests: result });
};

const updateJoinRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  const hostId = req.user.id;

  await requestService.updateRequestStatus(requestId, hostId, status);
  res.status(200).json({ message: "요청 상태가 변경되었습니다." });
};

module.exports = {
  createJoinRequest,
  readMyRequests,
  updateJoinRequestStatus,
  getJoinRequestForStudy,
};
