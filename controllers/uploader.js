import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import {accessKeyId, secretAccessKey, region, Bucket} from '../config/aws-config.json'

aws.config = new aws.Config({
  accessKeyId: process.env.S3_ACCESS_KEY || accessKeyId,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || secretAccessKey,
  region: process.env.S3_REGION || region
})
const s3 = new aws.S3()
const upload = multer({
  storage: multerS3({
      s3: s3,
      acl: 'public-read',
      bucket: Bucket,
      contentType: function(req, file,cb){
          cb(null, file.mimetype)
      },
      key: function (req, file, cb) {
          cb(null, file.originalname)
      }
  })
})

export default upload