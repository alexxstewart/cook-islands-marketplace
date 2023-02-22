import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';

export default withApiAuthRequired (async function handler (req: NextApiRequest, res: NextApiResponse<{data: { url: string; } | null; error: string | null}>) {
    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        res.status(405).json({ data: null, error: "Method Not Allowed" });
        return;
    }

    // We have a valid request method

    const session = await getSession(req, res);
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
    
        if(data['$metadata'].httpStatusCode === 200) {
            res.redirect(307, '/')
        }
    } 

    res.status(200).json({ data: { url: "/uploaded-file-url" }, error: null });
})

export const config = {
    api: {
        bodyParser: false,
    },
}