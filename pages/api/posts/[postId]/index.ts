import { ddbDocClient } from "@/lib/ddbDocClient";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    console.log("In the delete function now...");

    if (req.method === 'DELETE') {
        
        const { postId } = req.query;
        console.log("Delete request for post ID: ", postId);

        const deleteResult = await ddbDocClient.send(new DeleteItemCommand({ 
            TableName: "Posts",
            Key: {
                postID: {
                    S: postId,
                },
            },
        }));

        console.log("Delete result: ", deleteResult);
    }
    
    res.status(200).json({ name: 'John Doe' })
}