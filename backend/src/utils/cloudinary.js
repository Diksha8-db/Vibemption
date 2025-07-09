import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const upload = async(localFilePath) => {
    try{
        if(!localFilePath){
            return null;
        }

        // uploading file
        const response = cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })

        return response
    }
    catch(error){
        fs.unlinkSync(localFilePath)
        return null
    }
}

export default upload