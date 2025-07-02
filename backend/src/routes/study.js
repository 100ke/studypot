const express = require("express");
const router = express.Router();
const studyController = require("../controllers/studyController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, studyController.createStudy);
router.get("/", studyController.readStudyList);
router.get("/:id", studyController.readStudy);
router.patch("/:id", studyController.updateStudy);
router.delete("/:id", studyController.deleteStudy);

module.exports = router;
