import type { NextApiRequest, NextApiResponse } from 'next'
import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';


// This function is invoked for updating a users profile.
export default async function handler(req: NextApiRequest, res: NextApiResponse ) {
    
    console.log("Testing the API function for fetching all posts here: ", req.body);

    const response = await ddbDocClient.send(new ScanCommand({
        TableName: "Posts"
    }));

    if (response['$metadata'].httpStatusCode === 200) {
        console.log("SUCCESS: ", response.Items);
        res.status(200).json({ posts: response.Items });
    } else {
        res.status(500).json({ posts: [] });
    }
}
