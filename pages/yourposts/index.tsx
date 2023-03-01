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
        <div className='mt-20'>
            <p className='text-xl'>Your Listings</p>
            <div className='grid grid-cols-6'>
                {items!.map((post: any, index: number) => {
                    let imageURL = '/../public/no_image.jpg'; 
                    if (post.image_urls) imageURL = post.image_urls.L[0].S
                    return (
                        <Link href={`/posts/${post.postID.S}`} key={post.postID.S}>
                            <div className='bg-slate-100 rounded m-2 p-4 hover:bg-slate-300 hover:shadow-xl hover:shadow-neutral-500'>
                                <Image
                                    src={imageURL}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                                <p className='text-2xl text-slate-700'>{post.productName ? post.productName.S : ''}</p>
                                <p className='text-md text-slate-900'>{post.price ? post.price.S : ''}</p>
                                <p className='text-sm text-slate-500'>{post.description ? post.description.S : ''}</p>
                                <div className='flex justify-between mt-2'>
                                    <div className='flex justify-start mt-2'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4 h-4 fill-red-500'>
                                                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                            </svg>
                                        </div>
                                        <div className='mx-2'>
                                            <p className='text-xs text-slate-500'>{post.location ? post.location.S : '-'}</p>
                                        </div>
                                    </div>
                                    <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-3 h-3 m-auto" fill="currentColor" viewBox="0 0 448 512">
                                            <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                        </svg>
                                        <p className="ml-2">Delete</p>
                                    </button>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default index