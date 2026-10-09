import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder:"travora",
        allowed_formats:["jpg","png","jpeg","webp"],
        transformation:[{
            height:500,
            width:500,
            crop:"limit"
        },{
            fetch_format:"webp"
        },{
            quality:"auto",
        },],
    },
});
const upload=multer({
    storage,
    limits:{
        fileSize:5*1024*1024,
    },
});

export default upload;