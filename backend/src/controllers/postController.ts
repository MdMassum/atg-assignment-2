import { NextFunction, Request, Response } from 'express';
import * as postService from '../services/postService';
import { Types } from 'mongoose';
import ErrorHandler from '../utils/errorHandler';
import { AuthenticatedRequest } from '../types/express';

// create post -->
export const createPost = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {

    try {
        const { title, content } = req.body;
        if(!title || !content){
            return next(new ErrorHandler("Title or Content cannot be empty!",400));
        }
        const author = new Types.ObjectId(req.userId);
        const post = await postService.createPost(title, content, author);

        res.status(201).json({success:true,post});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// get all posts-->
export const getPosts = async (req: AuthenticatedRequest, res: Response, next:NextFunction)=> {

    try {
        const posts = await postService.getPosts();
        res.status(200).json({success:true, posts});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// get post by id
export const getPostById = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {

    try {
        const post = await postService.getPostById(req.params.id);

        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true,post});

    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// update a post
export const updatePost = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const post = await postService.updatePost(req.params.id, req.body.title, req.body.content);
        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true,post});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// delete a post-->
export const deletePost = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {

    try {
        const post = await postService.deletePost(req.params.id);

        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true, message: 'Post deleted successfully' });

    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// like a post
export const likePost = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const userId = new Types.ObjectId(req.userId); // Assuming user ID is available in `req.user`
        const post = await postService.addLike(req.params.id, userId);
        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true,post});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// unlike a post -->
export const unlikePost = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const userId = new Types.ObjectId(req.userId); // Assuming user ID is available in `req.user`
        const post = await postService.removeLike(req.params.id, userId);
        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true,post});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// add a comment -->
export const addComment = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const { text } = req.body;
        const author = new Types.ObjectId(req.userId); // Assuming user ID is available in `req.user`
        const post = await postService.addComment(req.params.id, text, author);
        if (!post){
            return next(new ErrorHandler("Post not found",404));
        }
        res.status(200).json({success:true,post});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};