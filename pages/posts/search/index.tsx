import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import React from 'react'

export async function getServerSideProps(context: any) {

    console.log("Context: ", context.query);

    // const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));

    // console.log("Import data: ", importData);

    return { props: { items: []} }
}

// export async function getStaticProps(context: any) {

//     console.log("Search Context: ", context)

//     // const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));

//     // console.log("Import data: ", importData);

//     return { props: { items: []} }
// }

const index = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <p>Search Posts</p>
        </div>
    )
}

export default index