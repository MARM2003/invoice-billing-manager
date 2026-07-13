import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const uploadToCloudinary = (file, folder = "invoice-billing-manager") => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject(new Error("No file provided."));
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        resolve(result);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

export default uploadToCloudinary;