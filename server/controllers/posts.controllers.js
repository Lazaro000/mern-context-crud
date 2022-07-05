import { PostSchema as Post } from '../models/Post.js';

export const getPosts = async (req, res) => {
    const posts = await Post.find();
    res.status(200).send(posts);
};

export const getPost = async (req, res) => {
    const { id } = res.params;
    const post = await Post.findById(id);

    return post
        ? res.status(302).json(post)
        : res.status(404).send({ message: 'Not found' });
};

export const createPost = async (req, res) => {
    const { title, description } = req.body;
    const newPost = new Post({ title, description });

    await newPost.save();

    return res.status(201).json(newPost);
};

export const updatePost = async (req, res) => {
    const { id } = res.params;
    const { body } = req;
    const modifiedPost = await Post.findByIdAndUpdate(id, body, {
        new: true,
    });

    return modifiedPost
        ? res.status(200).send(modifiedPost)
        : res.status(404).send({ message: 'Not found' });
};

export const deletePost = async (req, res) => {
    const { id } = res.params;
    const postRemoved = await Post.findByIdAndDelete(id);

    return postRemoved
        ? res.status(200).send({ message: 'Deleted' })
        : res.status(404).send({ message: 'Not found' });
};
