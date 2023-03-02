import { ddbDocClient } from '@/lib/ddbDocClient';
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { PutCommand } from '@aws-sdk/lib-dynamodb';
import type { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid';

export default withApiAuthRequired(async function handler( req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession(req, res); // Get the users session

    const data = await ddbDocClient.send(new PutCommand({
        TableName: "Posts",
        Item: {
            postID: uuidv4(),
            description: req.body.description,
            price: req.body.price,
            productName: req.body.title,
            productNameLower: req.body.title.toLowerCase(),
            categories: req.body.selected_categories,
            image_urls: req.body.image_urls,
            location: req.body.location,
            userID: session?.user.sub,
        },
    }));
    
    res.status(200).json({ name: 'John Doe' })
})
