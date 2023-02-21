import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import Router from "next/router";

import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    // if (!body.first || !body.last) {
    //   // Sends a HTTP bad request error code
    //   return res.status(400).json({ data: 'First or last name not found' })
    // }

    const data = await ddbDocClient.send(new PutCommand({
        TableName: "Posts",
        Item: {
            postID: uuidv4(),
            description: req.body.description,
            price: req.body.price,
            productName: req.body.title,
        },
    }));

    console.log("Return Data: ", data);

    if(data['$metadata'].httpStatusCode === 200) {
        res.redirect(307, '/')
    }
}