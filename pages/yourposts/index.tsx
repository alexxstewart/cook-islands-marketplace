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
            <div className='grid grid-cols-6'>
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
                                <div className='flex justify-between'>
                                    <p className='text-2xl'>{item.price?.S}</p>
                                    <div className='flex justify-between'>
                                        <button  type="button" className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mx-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 512 512">
                                                <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/>
                                            </svg>
                                        </button>
                                        <button  type="button" className="text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-3 h-3" fill="currentColor" viewBox="0 0 448 512">
                                                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                            </svg>
                                        </button>
                                    </div>

                                </div>
                                <p className='text-md text-slate-400'>{item.productName?.S}</p>
                                <p className='text-sm text-slate-400'>{item.description?.S}</p>
                                <p className='text-sm text-slate-400'>{item.by?.S}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default index