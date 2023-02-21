import React from 'react'
import { BatchGetItemCommand } from "@aws-sdk/client-dynamodb";
import { ddbClient } from "../../../lib/dbconfig";

const index = () => {
    return (
        <div>Posts Page</div>
    )
}

// This gets called on every request
export async function getServerSideProps() {

    // Set the parameters
    const params = {
        RequestItems: {
        TABLE_NAME: {
            Keys: [
            {
                KEY_NAME_1: { N: "KEY_VALUE" },
                KEY_NAME_2: { N: "KEY_VALUE" },
                KEY_NAME_3: { N: "KEY_VALUE" },
            },
            ],
            ProjectionExpression: "ATTRIBUTE_NAME",
        },
        },
    };

    const run = async () => {
        try {
          const data = await ddbClient.send(new BatchGetItemCommand(params));
          console.log("Success, items retrieved", data);
          return data;
        } catch (err) {
          console.log("Error", err);
        }
      };

    // Fetch data from external API
    const res = await fetch(`https://.../data`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
}

export default index