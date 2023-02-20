import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Listing = {
    name: string
    id: string
    user: string
    price: string
    location: string
}

const Listing = ({ listing }: any) => {
    return (
        <Link href='/'>
            <div className='bg-slate-800 rounded m-4 p-4 hover:bg-slate-700 hover:shadow-xl hover:shadow-neutral-800'>
                <Image
                    src="/../public/car.jpg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />
                <p className='text-2xl'>{listing.price}</p>
                <p className='text-md text-slate-400'>{listing.name}</p>
                <p className='text-sm text-slate-400'>{listing.location}</p>
            </div>
        </Link>
    )
}

export default Listing