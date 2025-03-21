import cloudinary from '../config/cloudinary'


// Function to upload an image to Cloudinary
const uploadImageToCloudinary = async (filePath: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "products",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Image upload failed.");
  }
};

export { uploadImageToCloudinary };