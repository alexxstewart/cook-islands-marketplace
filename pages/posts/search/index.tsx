import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { InferGetServerSidePropsType } from 'next';
import React from 'react'

export async function getServerSideProps() {

    const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));

    console.log("Import data: ", importData);

    return { props: { items: importData.Items} }
}

const index = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <p>Search Posts</p>
        </div>
    )
}

export default index