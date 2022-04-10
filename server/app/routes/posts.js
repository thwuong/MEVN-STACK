const express = require('express');
const router = express.Router();

const postsController = require('../controllers/postsController');
const verifyToken = require('../middleware/auth') //middleware




router.delete("/:id",verifyToken,postsController.deletePost);
router.put("/:id",verifyToken,postsController.updatePost);
router.post("/",verifyToken,postsController.createPost);
router.get("/",verifyToken,postsController.findPosts);

module.exports = router;