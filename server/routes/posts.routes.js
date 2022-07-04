import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
} from '#Controllers/posts.controllers';
import { Router } from 'express';

const router = Router();

router.get('/posts', getPosts);

router.get('/posts/:id', getPost);

router.post('/posts', createPost);

router.put('/posts/:id', updatePost);

router.delete('/posts/:id', deletePost);

export default router;
