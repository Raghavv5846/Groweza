import multer from 'multer';
const storage = multer.diskStorage({});
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.pdf', '.doc', '.docx'];
    const ext = file.originalname.slice(file.originalname.lastIndexOf('.')).toLowerCase();
    if (!allowedTypes.includes(ext)) {
        cb(new Error('Only PDF or DOC files allowed'), false);
    } else cb(null, true);
};
const upload = multer({ storage, fileFilter });
export default upload;
