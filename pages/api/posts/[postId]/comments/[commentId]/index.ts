import { ddbDocClient } from "@/lib/ddbDocClient";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
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
        if (deleteResult['$metadata'].httpStatusCode === 200) {
            res.status(200).json({ name: 'John Doe' })
        } else {
            res.status(500).json({ name: 'John Doe' })
        }
    }   
}