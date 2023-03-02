import { ddbDocClient } from "@/lib/ddbDocClient";
import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'DELETE') {
        
        const { postId } = req.query;

        const deleteResult = await ddbDocClient.send(new DeleteItemCommand({ 
            TableName: "Posts",
            Key: {
                postID: {
                    S: postId ? Array.isArray(postId) ? postId[0] : postId : '',
                },
            },
        }));

        res.status(200).json({ delete_status: true })
    }
}