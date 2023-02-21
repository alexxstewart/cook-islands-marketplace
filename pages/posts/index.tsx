import React from 'react'
import { BatchGetItemCommand, ListTablesCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../lib/dbconfig";
import { ddbDocClient } from '@/lib/ddbDocClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import Image from 'next/image';

// This gets called on every request
export async function getServerSideProps() {

    const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));

    console.log("Import data: ", importData);

    return { props: { items: importData.Items} }
}

const index = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    console.log("Loaded data: ", items);
    
    return (
        <div>
            <div>Posts</div>
            <form className="flex items-center px-4" action='/posts/search' method='get'>   
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
                </div>
                <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </form>
            <div className='grid grid-cols-6'>
                {items?.map((item: any, index: number) => {
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
        </div>
    )
}


export default index