const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

// AWS Configuration
aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Your AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // Your AWS Secret Access Key
    region: process.env.AWS_REGION,  // AWS region, e.g., 'us-east-1'
});

const s3 = new aws.S3();  // Initialize the S3 service object

// Set up S3 for file uploads
const storage = multerS3({
    s3: s3,
    bucket: process.env.AWS_S3_BUCKET_NAME,  // Your S3 bucket name
    acl: 'public-read',  // Set to 'public-read' to allow public access to the uploaded files
    key: function (req, file, cb) {
        cb(null, `wanderlust_DEV/${Date.now().toString()}_${file.originalname}`);  // Custom file key
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,  // Auto-detect and set the content type for the uploaded files
});
console.log(process.env.AWS_S3_BUCKET_NAME);
const upload = multer({ storage });  // Configure multer to use the defined S3 storage

module.exports = {
    upload,  // Export the configured multer instance
};
