const express = require("express");
const router = express.Router();
const studyController = require("../controllers/studyController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, studyController.createStudy);

module.exports = router;
