import multer from 'multer'
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from '../config/cloudinary'

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "social_media_task", // Folder name
    allowed_formats: ["jpg", "jpeg", "png","gif","bmp","webp"], 
  } as { folder: string },
});

// Multer configuration 
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 MB file size 
});

export default upload;
