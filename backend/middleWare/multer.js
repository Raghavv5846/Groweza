import multer from 'multer';
import path from 'path';

// Use memory storage so we can access req.file.buffer for Cloudinary streaming
const storage = multer.memoryStorage();

const allowedExtensions = [
    '.jpg', '.jpeg', '.png',
    '.pdf', '.doc', '.docx',
    '.xlsx', '.xls', '.txt', '.zip'
];

const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
        cb(new Error('Only image and document files are allowed'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
