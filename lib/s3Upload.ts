import multerS3 from 'multer-s3';
import multer from 'multer';
import { s3Client } from './s3config';
import { v4 as uuidv4 } from 'uuid';

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: 'cook-islands-marketplace-item-images',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, uuidv4())
        }
    })
})