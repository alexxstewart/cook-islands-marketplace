import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

const NewPost = () => {
    
    const [urls, setUrls] = useState<string[]>([]);
    const { uploadToS3 } = useS3Upload();
  
    const handleFilesChange = async ({ target }:any) => {
      const files = Array.from(target.files);
  
      for (let index = 0; index < files.length; index++) {
        const file:any = files[index];
        const { url } = await uploadToS3(file);
        console.log("Got url: ", url);
        setUrls(current => [...current, url]);
      }
    };
  
    
    return (
        <div className='m-4 w-1/2 mx-auto'>
            <form action='/api/posts/new' method='post' className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                
                <p className='text-2xl text-slate-800'>Add a new listing</p>
                
                <br/>

                <label htmlFor="roll" className='text-slate-800'>Post Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                />
            
                <label htmlFor="price" className='text-slate-800'>Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    required
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                />
                

                <label htmlFor="description" className='text-slate-800'>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    required
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                />

                <div className='mt-2'></div>

                <div>
                    <input
                        type="file"
                        name="file"
                        multiple={true}
                        onChange={handleFilesChange}
                    />

                    <div>
                        {urls.map((url, index) => (
                        <div key={url}>
                            <Image alt={"Image"} src={url} width={200} height={200}/>
                            File {index}: ${url}
                        </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create post</button>
                </div>
            </form>

        </div>
    )
}

export default NewPost