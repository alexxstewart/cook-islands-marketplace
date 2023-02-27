import { ddbDocClient } from "@/lib/ddbDocClient";
import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') { // Return the users firstname/lastname/email/imageURL 
        const { userID } = req.query;

        const data = await ddbDocClient.send(new ScanCommand({ 
            FilterExpression: "contains (userID, :x)",
            ExpressionAttributeValues: {
                ":x": userID,
            },
            TableName: "Users",
        }));

        if (data.Items && data.Items[0] && data['$metadata'].httpStatusCode === 200) { // Found user
            res.status(200).json({ 
                first_name: data.Items[0].firstName ? data.Items[0].firstName : '',
                last_name: data.Items[0].lastName ? data.Items[0].lastName : '',
                image_url: data.Items[0].imageURL ? data.Items[0].imageURL : '',
                email: data.Items[0].email ? data.Items[0].email : '',
                phone_number: data.Items[0].phoneNumber ? data.Items[0].phoneNumber : '',
            });
        } else {
            res.status(500).json({ commentAdded: false });
        }
    }
}