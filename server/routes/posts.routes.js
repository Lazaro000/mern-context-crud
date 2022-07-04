import { Router } from 'express';

const router = Router();

router.get('/posts', (req, res) => res.send([]));

router.get('/posts/:id', (req, res) => {
    res.send('getting a post');
});

router.post('/posts', (req, res) => {
    res.send('new post created');
});

router.put('/posts/:id', (req, res) => {
    res.send('updating a post');
});

router.delete('/posts/:id', (req, res) => {
    res.send('deleting a post');
});

export default router;
