import express from 'express';
import * as postController from '../controllers/postController';
import verifyAuth from '../middleware/auth'

const router = express.Router();

// authenticated post route -->
router.use(verifyAuth);

router.get('/', postController.getPosts);
router.get('/:id', postController.getPostById);
router.post('/create', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/like/:id', postController.likePost);
router.post('/unlike/:id', postController.unlikePost);
router.post('/comment/:id', postController.addComment);

export default router;