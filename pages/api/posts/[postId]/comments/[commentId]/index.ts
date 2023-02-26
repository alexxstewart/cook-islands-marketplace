import { ddbDocClient } from "@/lib/ddbDocClient";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    console.log("In the comment function now...");

    if (req.method === 'DELETE') {
        
        const { postId, commentId } = req.query;

        const deleteResult = await ddbDocClient.send(new DeleteItemCommand({ 
            TableName: "Comment",
            Key: {
                commentID: {
                    S: commentId ? Array.isArray(commentId) ? commentId[0] : commentId : '',
                },
            },
        }));

        console.log("Delete result: ", deleteResult);
    }   
    
    res.status(200).json({ name: 'John Doe' })
}