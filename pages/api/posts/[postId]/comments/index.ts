import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    console.log("In the get comments api function now...", req.method);

    if (req.method === 'POST') {
        const { postId } = req.query;

        const data = await ddbDocClient.send(new PutCommand({
            TableName: "Comments",
            Item: {
                commentID: uuidv4(),
                postID: postId,
                comment: req.body.comment,
                userID: req.body.userID,
                date: Date.now().toString(),
            },
        }));
    
        if (data['$metadata'].httpStatusCode === 200) {
            res.status(200).json({ commentAdded: true });
        } else {
            res.status(500).json({ commentAdded: false });
        }
    } else if (req.method === 'GET') { // Get the comments for a post
        console.log("GETTING COMMENTS NOW...")
        const result = await ddbDocClient.send(new ScanCommand({ TableName: "Comments" }));
        res.status(200).json({ items: result.Items });
    }
}