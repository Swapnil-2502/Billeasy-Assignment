const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();
const reviewController = require("../controllers/reviewController")

router.post("/book/:id/reviews", authMiddleware,reviewController.createReview)
router.put("/reviews/:id", authMiddleware, reviewController.updateReview)
router.delete("/reviews/:id",authMiddleware, reviewController.deleteReview)

module.exports = router;