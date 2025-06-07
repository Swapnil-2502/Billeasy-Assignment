const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/book', authMiddleware ,bookController.createBook)
router.get('/book', bookController.getAllBooks)
router.get('/book/:id',bookController.getBookbyId)

module.exports = router