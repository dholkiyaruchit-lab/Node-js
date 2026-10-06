import fs from "fs";
import multer from "multer";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        let folderName = "uploads/";

        fs.mkdirSync(folderName,{recursive:true});

        return cb(null,folderName);
    },
    
  filename: (req, file, cb) => {
    const uniqueName = `${file.fieldname}-${Date.now()}-${file.originalname}`;

    return cb(null, uniqueName);
  }
});
const fileFilter = (req, file, cb) => {
  const imagesTypes = ["image/jpg", "image/jpeg", "image/png"];
};
const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export default uploads;
