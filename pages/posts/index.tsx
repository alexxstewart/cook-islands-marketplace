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

    // const data = await ddbDocClient.send(new PutCommand({
    //     TableName: "Posts",
    //     Item: {
    //         postID: uuidv4(),
    //         description: 'Hello there my name is alex',
    //         price: '$5000.00',
    //         productName: 'Nissan Car',
    //     },
    // }));

    // console.log("Submitted the data: ", data);

    const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));

    console.log("Import data: ", importData);

    return { props: { items: importData.Items} }
}

const index = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    
    console.log("Loaded data: ", items);
    
    return (
        <div>
            <div>Posts</div>
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
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}


export default index