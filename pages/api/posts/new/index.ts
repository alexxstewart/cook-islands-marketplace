import { ddbDocClient } from '@/lib/ddbDocClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    console.log("Testing the API function here: ", req.body);

    const data = await ddbDocClient.send(new PutCommand({
        TableName: "Posts",
        Item: {
            postID: uuidv4(),
            description: req.body.description,
            price: req.body.price,
            productName: req.body.title,
            categories: req.body.selected_categories,
            image_urls: req.body.image_urls
        },
    }));
    
    res.status(200).json({ name: 'John Doe' })
}
