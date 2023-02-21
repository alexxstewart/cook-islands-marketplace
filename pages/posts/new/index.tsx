import React from 'react'

const index = () => {
    return (
        <div className='m-4'>
            <p className='text-2xl'>Add a new listing</p>
            <form action='/api/posts/new' method='post' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <label htmlFor="roll" className='text-slate-800'>Post Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"'
                />
                
                <label htmlFor="price" className='text-slate-800'>Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    required
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                />

                <label htmlFor="price" className='text-slate-800'>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"'
                />

                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Create post</button>
                </div>
            </form>

        </div>
    )
}

export default index