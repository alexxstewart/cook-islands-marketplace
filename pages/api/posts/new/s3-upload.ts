import { ddbDocClient } from "@/lib/ddbDocClient";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { v4 as uuidv4 } from 'uuid';
// import { upload } from "@/lib/s3Upload";
import multer from "multer";
import nextConnect from 'next-connect';

export { APIRoute as default } from "next-s3-upload";

// import S3 from "aws-sdk/clients/s3";

// const s3 = new S3({
//     region: 'ap-southeast-2',
//     accessKeyId: String(process.env.DYNAMODB_ACCESS_KEY), 
//     secretAccessKey: String(process.env.DYNAMODB_SECRET_ACCESS_KEY),
//     signatureVersion: "v4",
//   });

// const upload = multer({
//     storage: multer.diskStorage({
//         destination: './public/uploads',
//          filename: (req, file, cb) => cb(null, file.originalname),
//     }),
// });

// const uploadMiddleware = upload.array('image');

// const apiRoute = nextConnect({
//     // Handle any other HTTP method
//     onNoMatch(req, res) {
//         res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//     },
// });

// apiRoute.use(uploadMiddleware);

// // Process a POST request
// apiRoute.post((req, res) => {
//     res.status(200).json({ data: 'success' });
// });

// export default apiRoute;

// export default withApiAuthRequired (async function handler (req: NextApiRequest, res: NextApiResponse<{data: { url: string; } | null; error: string | null}>) {
//     if (req.method !== "POST") {
//         res.setHeader("Allow", "POST");
//         res.status(405).json({ data: null, error: "Method Not Allowed" });
//         return;
//     }

//     // We have a valid request method
//     // console.log("Request: ", req);
//     console.log("Body: ", req.body);

//     const result = await upload.array('image');
//     console.log("Upload result: ", result);


//     // const session = await getSession(req, res);
//     // if (session?.user) {
//     //     const data = await ddbDocClient.send(new PutCommand({
//     //         TableName: "Posts",
//     //         Item: {
//     //             postID: uuidv4(),
//     //             description: req.body.description,
//     //             price: req.body.price,
//     //             productName: req.body.title,
//     //             ownedBy: session?.user.name,
//     //         },
//     //     }));
    
//     //     if(data['$metadata'].httpStatusCode === 200) {
//     //         res.redirect(307, '/')
//     //     }
//     // } 

    
    
//     // res.status(200).json({ data: { url: "/uploaded-file-url" }, error: null });
// })

// function runMiddleware( req: NextApiRequest & { [key: string]: any }, res: NextApiResponse, fn: (...args: any[]) => void ): Promise<any> {
//     return new Promise((resolve, reject) => {
//         console.log("SOmewhere...");
//         fn(req, res, (result: any) => {
//             console.log("In  the multer callback function...")
//             if (result instanceof Error) {
//                 console.log("Error encoutered: ", result);
//                 return reject(result);
//             }
//             console.log("In the middleware...", result);
//             return resolve(result);
//         });
//     });
// }

// const handler = async ( req: NextApiRequest & { [key: string]: any }, res: NextApiResponse ): Promise<void> => {
//     const storage = multer.memoryStorage()
//     const upload = multer({storage: storage});
  
//     await runMiddleware(req, res, upload.single("image"));
//     const file = req.file;
//     console.log("File: ", file);
//     const others = req.body;
//     console.log("Others: ", others);
//     // const signedUrl = await getSignedUrl(others.bucketName, file.filename);
//     res.status(200).json({ getSignedUrl: 'test' });
// };
// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  
//     if (req.method !== "POST") {
//         return res.status(405).json({ message: "Method not allowed" });
//     }
  
//     try {
//         let { name, type } = req.body;

//         console.log("Name: ", name);
//         console.log("Type: ", type);
  
//         const fileParams = {
//             Bucket: process.env.BUCKET_NAME,
//             Key: name,
//             Expires: 600,
//             ContentType: type,
//             ACL: "public-read"
//         };  
  
//         // const url = await s3.getSignedUrlPromise("putObject", fileParams);
    
//         res.status(200).json({ hello: '123' });
//     } catch (err) {
//         console.log(err);
//         res.status(400).json({ message: err });
//     }
// };  

// export default handler;
  
// export const config = {
//     api: {
//       bodyParser: {
//         sizeLimit: "8mb", // Set desired value here
//       },
//     },
// };