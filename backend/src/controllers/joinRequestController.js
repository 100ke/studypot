const requestService = require("../services/joinRequestService");

const createJoinRequest = async (req, res) => {
  const userId = req.user.id;
  const { studyId } = req.params;
  try {
    const result = await requestService.applyToStudy(userId, studyId);
    res.status(201).json(result);
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || "스터디 신청 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
};

const readMyRequests = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await requestService.myRequestList(userId);
    res.status(200).json({ message: "ok", result });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message || "신청한 스터디 목록 조회 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
};

const getJoinRequestForStudy = async (req, res) => {
  const studyId = req.params.studyId;
  const hostId = req.user.id;
  try {
    const result = await requestService.getRequestForStudy(studyId, hostId);
    res.status(200).json({ message: "ok", requests: result });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message || "스터디 신청자 조회 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
};

const updateJoinRequestStatus = async (req, res) => {
  const studyId = req.params.id;
  const requestId = req.params.requestId;
  const { status } = req.body;
  const hostId = req.user.id;
  try {
    await requestService.updateRequestStatus(
      requestId,
      studyId,
      hostId,
      status
    );
    res.status(200).json({ message: "요청 상태가 변경되었습니다." });
  } catch (error) {
    const status = error.status || 500;
    const message =
      error.message || "스터디 신청 상태 변경 중 오류가 발생했습니다.";
    res.status(status).json({ message });
  }
};

module.exports = {
  createJoinRequest,
  readMyRequests,
  updateJoinRequestStatus,
  getJoinRequestForStudy,
};
