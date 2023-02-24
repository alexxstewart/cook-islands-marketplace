import { ddbDocClient } from "@/lib/ddbDocClient";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import Image from 'next/image';


export async function getServerSideProps({ params }:any) {
    // Fetch the post with the postID in the params

    const importData = await ddbDocClient.send(new ScanCommand({ 
        FilterExpression: "contains (postID, :postid)",
        ExpressionAttributeValues: {
          ":postid": { S: params.postID },
        },
        // ProjectionExpression: "ownedBy",
        TableName: "Posts",
    }));

    return {
        props: { item: importData.Items![0] }
    }
}

const index = ({ item }: any) => {
    
    let image = '/../../public/car.jpg';
    if (item.image_urls) image = item.image_urls.L[0].S;

    return (
        <div className="rounded p-4 bg-slate-500 w-1/2">
            <div className="flex justify-between">
                <p className="text-3xl">{item.productName ? item.productName.S : ''}</p>
                <p className="text-slate-600">{item.price ? item.price.S : ''}</p>
            </div>
            <Image alt={''} src={image} width={500} height={500}/>
            <p>{item.ownedBy ? item.ownedBy.S : ''}</p>
        </div>
    )
}

export default index