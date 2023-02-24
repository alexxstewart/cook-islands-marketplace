import React from 'react'
import Listing from './Listing'

const Listings = ({ data }: any) => {
    
    const posts = [
        {
            name: 'Test Product 1',
            id: '12356',
            user: 'Alex Stewart',
            price: '$4000',
            location: 'Avatiu'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
        {
            name: 'Test Product 2',
            id: '123455',
            user: 'Harriet Brown',
            price: '$10',
            location: 'Tupapa'
        },
    ]

    console.log("Data: ", data);

    return (
        <div>
            <div className='grid grid-cols-4'>
                {posts.map((post, index) => <Listing key={'123' + index} listing={post} />)}
            </div>
        </div>
    )
}

export async function getServerSideProps() {
    // Fetch data from external API
    // const res = await fetch(`https://.../data`)
    // const data = await res.json()

    console.log("Testing server side props...");

    // Pass data to the page via props
    return { props: { test: "Test" } }
}

export default Listings