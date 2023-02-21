import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

// Set the AWS Region.
const REGION = "ap-southeast-2"; 
// Create an Amazon DynamoDB service client object.
const ddbClient = new DynamoDBClient({ 
    region: REGION,
    credentials: {
        accessKeyId: 'AKIAZJJ7KNA7LFXGAPI3', 
        secretAccessKey: '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',
    }
    // AKIAZJJ7KNA7LFXGAPI3
    // YQ1A47pdICeFwZ3K5t9y0hk1jXg/8AHlvUPfZpZC
});
export { ddbClient };