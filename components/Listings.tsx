import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Listings = ({ items }: any) => {
    
    return (
        <div>
            <div className='grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 lg:w-4/6 mx-auto'>
                {items.map((post: any, index: number) => {
                    let imageURL = 'no_image.jpg'; 
                    if (post.image_urls && post.image_urls.length > 0) imageURL = post.image_urls[0];
                    if (post.image_urls.L && post.image_urls.L[0]) imageURL = post.image_urls.L[0].S;
                    
                    return (
                        <Link href={`/posts/${post.postID.S ? post.postID.S : post.postID}`} key={post.postID.S ? post.postID.S : post.postID}>
                            <div className='bg-gray-100 rounded m-2 p-4 hover:bg-gray-200 hover:shadow-lg hover:shadow-neutral-500 hover:p-6'>
                                <Image
                                    src={imageURL}
                                    priority
                                    alt="Picture of the author"
                                    width={500}
                                    height={500}
                                    className="mb-2"
                                />
                                <p className='text-2xl text-slate-700 truncate'>{post.productName ? (post.productName.S ? post.productName.S : post.productName) : '-'}</p>
                                <p className='text-md text-slate-900'>{post.price ? (post.price.S ? post.price.S : post.price) : '-'}</p>
                                <p className='text-sm text-slate-500 max-h-24 truncate'>{post.description ? (post.description.S ? post.description.S : post.description) : '-'}</p>
                                <div className='flex justify-start mt-2'>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className='w-4 h-4 fill-red-500'>
                                            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                                        </svg>
                                    </div>
                                    <div className='mx-2'>
                                        <p className='text-xs text-slate-500'>{post.location ? (post.location.S ? post.location.S : post.location) : ' - '}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default Listings