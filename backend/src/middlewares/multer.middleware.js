import multer from 'multer'
import { ApiError } from '../utils/apiError.js'


// store temporarily
const storage = multer.diskStorage(
    {
        filename: function(req, file, cb){
            cb(null, file.originalname)
        }
    }
)

// to validate if the file uploaded is image
const fileFilter = (req,file,cb) => {
    if(!file.mimetype.startsWith('image/')){
        cb(new ApiError(400, "Only image files is allowed"), false);
    }
    else{
        cb(null, true);
    }
}

const uploadFile = multer(
    {
        storage : storage,
        fileFilter
    }
)

export {uploadFile}