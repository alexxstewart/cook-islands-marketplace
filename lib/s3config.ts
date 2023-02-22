import { S3Client } from "@aws-sdk/client-s3";

// Set the AWS Region.
const REGION = "ap-southeast-2"; 

// Create an Amazon DynamoDB service client object.
export const s3Client = new S3Client({ 
    region: REGION,
    credentials: {
        accessKeyId: String(process.env.DYNAMODB_ACCESS_KEY), 
        secretAccessKey: String(process.env.DYNAMODB_SECRET_ACCESS_KEY),
    }
});