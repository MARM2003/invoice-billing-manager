import multer from "multer";

// Store file in memory instead of disk
const storage = multer.memoryStorage();

// Allow only image files
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only JPG, JPEG and PNG images are allowed."),
      false
    );
  }
};

const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },

  fileFilter,
});

export default upload;