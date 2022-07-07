import axios from "axios";

export const getPostsRequests = async () => {
    await axios.get('/posts');
}

export const createPostRequest = async (post) => {
    await axios.post('/posts', post);
}