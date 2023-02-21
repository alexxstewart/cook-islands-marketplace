import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { InferGetServerSidePropsType } from 'next';
import React from 'react'
import {  getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';
import Image from 'next/image';


export async function getServerSideProps(context: any) {

    // Get the session
    const session = await getSession(context.req, context.res);

    if (session?.user) {
        const importData = await ddbDocClient.send(new ScanCommand({ 
            FilterExpression: "contains (ownedBy, :email)",
            ExpressionAttributeValues: {
              ":email": { S: session?.user.name },
            },
            // ProjectionExpression: "ownedBy",
            TableName: "Posts",
        }));
    
        console.log("Returned your posts: ", importData.Items);
    
        return { props: { items: importData.Items} }
    } else {
        return { props: { items: [] }}
    }
}

const index = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <p>Your Posts</p>
            {items?.map((item) => {
                return (
                    <Link href={{pathname: `/posts/${item.postID.S}`}} key={item.postID.S}>
                        <div className='bg-slate-800 rounded m-4 p-4 hover:bg-slate-700 hover:shadow-xl hover:shadow-neutral-800'>
                            <Image
                                src="/../public/car.jpg"
                                alt="Picture of the author"
                                width={500}
                                height={500}
                            />
                            <p className='text-2xl'>{item.price?.S}</p>
                            <p className='text-md text-slate-400'>{item.productName?.S}</p>
                            <p className='text-sm text-slate-400'>{item.description?.S}</p>
                            <p className='text-sm text-slate-400'>{item.by?.S}</p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default index