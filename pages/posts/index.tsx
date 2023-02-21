import React from 'react'
import { BatchGetItemCommand, ListTablesCommand, ScanCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../lib/dbconfig";
import { ddbDocClient } from '@/lib/ddbDocClient';
import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { v4 as uuidv4 } from 'uuid';

const index = ({data} : any) => {
    
    console.log("Loaded data: ", data);
    
    return (
        <div>Posts</div>
    )
}

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

    // console.log("Import data: ", importData);

    // Set the parameters
    // const params = {
    //     RequestItems: {
    //         TABLE_NAME: {
    //             Keys: [
    //             {
    //                 KEY_NAME_1: { N: "KEY_VALUE" },
    //                 KEY_NAME_2: { N: "KEY_VALUE" },
    //                 KEY_NAME_3: { N: "KEY_VALUE" },
    //             },
    //             ],
    //             ProjectionExpression: "ATTRIBUTE_NAME",
    //         },
    //     },
    // };
 
    // const results = await ddbClient.send(new ListTablesCommand({}));
    // results.TableNames?.forEach(function (item:any, index) {
    //     console.log(item);
    // });

    // const dbdata = await ddbClient.send(new BatchGetItemCommand({
    //     RequestItems: {
            
    //     }
    // }));
    // console.log("Success, items retrieved", dbdata);
    // console.log("Error", err);

    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    // const data = await res.json()
  

    // Pass data to the page via props
    return { props: { } }
}

export default index