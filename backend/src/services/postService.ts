import Post, { IPost, IComment } from '../models/postModel';
import { Types } from 'mongoose';

export const createPost = async (title: string, content: string, images:string[], author: Types.ObjectId): Promise<IPost> => {
    const post = new Post({ title, content, images, author });
    return await post.save();
};

export const getPosts = async (): Promise<IPost[]> => {
    return await Post.find().populate('author', 'username email').sort({ createdAt: -1 });
    // .populate('likes', 'username')
};

export const getPostById = async (postId: string): Promise<IPost | null> => {
    return await Post.findById(postId).populate('author', 'username email').populate('likes', 'username').populate('comments.author', 'username');
};

export const updatePost = async (postId: string, title: string, content: string): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(
        postId,
        { title, content },
        { new: true }
    ).populate('author', 'username email');
};

export const deletePost = async (postId: string): Promise<IPost | null> => {
    return await Post.findByIdAndDelete(postId);
};

export const addLike = async (postId: string, userId: Types.ObjectId): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(
        postId,
        { $addToSet: { likes: userId } },
        { new: true }
    ).populate('likes', 'username');
};

export const removeLike = async (postId: string, userId: Types.ObjectId): Promise<IPost | null> => {
    return await Post.findByIdAndUpdate(
        postId,
        { $pull: { likes: userId } },
        { new: true }
    ).populate('likes', 'username');
};

export const addComment = async (postId: string, text: string, author: Types.ObjectId): Promise<IPost | null> => {
    const comment = { text, author };
    return await Post.findByIdAndUpdate(
        postId,
        { $push: { comments: comment } },
        { new: true }
    ).populate('comments.author', 'username');
};