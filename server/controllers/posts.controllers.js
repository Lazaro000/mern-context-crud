import { PostSchema as Post } from '../models/Post.js';
import { uploadImage, deleteImage } from '../libs/cloudinary.js';
import fs from 'fs-extra';

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
        const { tempFilePath } = req.files.image;
        let image;

        if (req.files.image) {
            const result = await uploadImage(tempFilePath);

            console.log(result);

            /**
             * Eliminar la imagen que se guarda en local
             */
            await fs.remove(tempFilePath);

            image = {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }

        const newPost = new Post({ title, description, image });

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
        const { id } = req.params;

        const postRemoved = await Post.findByIdAndDelete(id);

        if (postRemoved && postRemoved.image.public_id)
            deleteImage(postRemoved.image.public_id);

        return postRemoved
            ? res.status(200).send({ message: 'Deleted' })
            : res.status(404).send({ message: 'Not found' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
