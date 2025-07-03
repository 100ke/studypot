const express = require("express");
const router = express.Router();
const joinRequestController = require("../controllers/joinRequestController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get(
  "/:userId/join-requests",
  authenticate,
  joinRequestController.readMyRequests
);

module.exports = router;
