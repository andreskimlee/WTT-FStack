const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const keys = require('../config/keys');
// let me know if you need the aws keys
aws.config.update({
    secretAccessKey: keys.secretAccessKey,
    accessKeyId: keys.accessKeyId,
    region: 'us-east-1'
});

const s3 = new aws.S3();

const fileFilter = (req,file, cb) => {
    // file check. can be changed if we want other file types
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type, please use JPEG or PNG'), false)
    }
}

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'mernstagram-dev',
        acl: 'public-read',
        metadata: function(req,file,cb){
            cb(null, {fieldName: 'TESTING_META_DATA'});
        },
        key: function(req,file,cb){
            cb(null,file.originalname)
        }
    })
})

module.exports = upload;