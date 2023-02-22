import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';

export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse) {

    const session = await getSession(req, res);
    console.log("Session: ", session);

    console.log("Request: ", req);

    if (session?.user) {
        const data = await ddbDocClient.send(new PutCommand({
            TableName: "Posts",
            Item: {
                postID: uuidv4(),
                description: req.body.description,
                price: req.body.price,
                productName: req.body.title,
                ownedBy: session?.user.name,
            },
        }));
    
        console.log("Return Data: ", data);
    
        if(data['$metadata'].httpStatusCode === 200) {
            res.redirect(307, '/')
        }
    } else {
        res.redirect(200, '/')
    }

});