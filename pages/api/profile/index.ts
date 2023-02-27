// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken, getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from '@/lib/ddbDocClient';


// This function is invoked for updating a users profile.
export default withApiAuthRequired(async function handler(req: NextApiRequest, res: NextApiResponse ) {

    const session = await getSession(req, res);
    console.log("USER Session: ", session);
    
    console.log("Testing the API function for updating a user here: ", req.body);

    const data = await ddbDocClient.send(new UpdateCommand({
        TableName: "Users",
        Key: {
            "userID": session?.user.sub,
        },
        UpdateExpression: "set firstName = :a, lastName = :b, phoneNumber = :c",
        ExpressionAttributeValues: {
            ":a": req.body.first_name,
            ":b": req.body.last_name,
            ":c": req.body.phone_number,
            // ":d": req.body.image_url,
        }
    }));

    console.log("STATUS: ", data);
    
    res.status(200).json({ name: 'John Doe' })
})
