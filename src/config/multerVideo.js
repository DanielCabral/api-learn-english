 
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
var fs = require('fs');


const s3 = new aws.S3({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
  region: process.env.region,
  endpoint: `${process.env.region}.digitaloceanspaces.com`
})

var hash;
const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => { 
      var dir;     
      crypto.randomBytes(16, (err, hs) => {
        hash=hs;

        dir = path.resolve(__dirname, "..", "..", "output")+'/'+hash.toString('hex');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        dir = path.resolve(__dirname, "..", "..", "tmp", "uploads")+'/'+hash.toString('hex');
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }    
            
        cb(null, dir);
    })
    },
    filename: (req, file, cb) => {
      
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        cb(null, file.key);      
    }
  }),
  s3: multerS3({
    s3: s3,
    bucket: 'https://learnenglish.sfo2.digitaloceanspaces.com',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  })
};


module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 2 * 1024 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/mp4",
      "video/avi",
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};