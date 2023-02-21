import React from 'react'
import { BatchGetItemCommand, ListTablesCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../lib/dbconfig";
import { ddbDocClient } from '@/lib/ddbDocClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';
import { InferGetServerSidePropsType } from 'next';

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
            {items?.map((item: any, index: number) => {
                return (
                    <p key={index}>{item.postID.S}</p>
                )
            })}
        </div>
    )
}


export default index