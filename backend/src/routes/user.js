const express = require("express");
const router = express.Router();
const joinRequestController = require("../controllers/joinRequestController");
const likeController = require("../controllers/likeController");
const { authenticate } = require("../middlewares/authMiddleware");

router.get(
  "/:userId/join-requests",
  authenticate,
  joinRequestController.readMyRequests
);

router.get("/:id/likes", authenticate, likeController.readMyLikes);

module.exports = router;
