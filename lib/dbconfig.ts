import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "ap-southeast-2"; 
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ 
    region: REGION,
    credentials: {
        accessKeyId: String(process.env.DYNAMODB_ACCESS_KEY), 
        secretAccessKey: String(process.env.DYNAMODB_SECRET_ACCESS_KEY),
    }
});
export { ddbClient };