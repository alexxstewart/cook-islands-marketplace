import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Listings = ({ items }: any) => {
    
    return (
        <div>
            <div className='grid grid-cols-6 w-4/6 mx-auto'>
                {items.map((post: any, index: number) => {
                    let imageURL = '/../public/no_image.jpg'; 
                    if (post.image_urls) imageURL = post.image_urls.L[0].S
                    return (
                        <Link href='/' key={post.postID.S}>
                            <div className='bg-slate-100 rounded m-2 p-4 hover:bg-slate-300 hover:shadow-xl hover:shadow-neutral-500'>
                                <Image
                                    src={imageURL}
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                />
                                <p className='text-2xl text-slate-700'>{post.productName ? post.productName.S : ''}</p>
                                <p className='text-md text-slate-900'>{post.price ? post.price.S : ''}</p>
                                <p className='text-sm text-slate-500'>{post.description ? post.description.S : ''}</p>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Listings