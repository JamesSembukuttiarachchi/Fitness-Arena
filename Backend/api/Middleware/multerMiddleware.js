import multer from "multer";
import path from "path";

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join("F:/SLIIT/Y2 S2/Project/Fitness-Arena/Backend/public/images")
    ); // Provide the absolute path to the destination directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// File filter to allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

// Initialize Multer with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;
