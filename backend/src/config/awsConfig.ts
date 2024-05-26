import AWS from 'aws-sdk';

AWS.config.update({
  region: "eu-west-3", 
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const s3 = new AWS.S3();

export default s3;
