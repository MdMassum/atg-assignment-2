import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IComment extends Document {
    text: string;
    author: Types.ObjectId; // Reference to User model
    createdAt: Date;
}

export interface IPost extends Document {
    title: string;
    content: string;
    images:string[];
    author: Types.ObjectId; // Reference to User model
    likes: Types.ObjectId[]; // Array of User references
    comments: IComment[];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema: Schema = new Schema({
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    createdAt: { type: Date, default: Date.now }
});

const PostSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    images:[{type:String}],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of User references
    comments: [CommentSchema]
}, {
    timestamps: true
});

export default mongoose.model<IPost>('Post', PostSchema);