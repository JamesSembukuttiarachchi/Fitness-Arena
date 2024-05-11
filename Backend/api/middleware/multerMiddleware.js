import multer, { diskStorage } from "multer";

// Set storage engine
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/offers/"); // Specify the directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Specify the file naming scheme
  },
});

// Initialize upload
const upload = multer({ storage: storage });

export default upload; // Export the 'upload' middleware as the default export
