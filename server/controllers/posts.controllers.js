import { PostSchema as Post } from '../models/Post.js';

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).send(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPost = async (req, res) => {
    try {
        const { id } = res.params;
        const post = await Post.findById(id);

        return post
            ? res.status(302).json(post)
            : res.status(404).send({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newPost = new Post({ title, description });

        await newPost.save();

        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { id } = res.params;
        const { body } = req;

        const modifiedPost = await Post.findByIdAndUpdate(id, body, {
            new: true,
        });

        return modifiedPost
            ? res.status(200).send(modifiedPost)
            : res.status(404).send({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { id } = res.params;

        const postRemoved = await Post.findByIdAndDelete(id);

        return postRemoved
            ? res.status(200).send({ message: 'Deleted' })
            : res.status(404).send({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
