const express = require("express");
const router = express.Router();
const studyController = require("../controllers/studyController");
const joinRequestController = require("../controllers/joinRequestController");
const likeController = require("../controllers/likeController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, studyController.createStudy);
router.get("/", studyController.readStudyList);
router.get("/:id", studyController.readStudy);
router.patch("/:id", studyController.updateStudy);
router.delete("/:id", studyController.deleteStudy);

router.post(
  "/:studyId/join",
  authenticate,
  joinRequestController.createJoinRequest
);
router.get(
  "/:studyId/join-requests",
  authenticate,
  joinRequestController.getJoinRequestForStudy
);
router.patch(
  "/:id/join-requests/:requestId",
  authenticate,
  joinRequestController.updateJoinRequestStatus
);

router.post("/:id/like", authenticate, likeController.createLike);
router.delete("/:id/like", authenticate, likeController.deleteLike);
router.get("/:id/likes", likeController.totalLikes);

module.exports = router;
