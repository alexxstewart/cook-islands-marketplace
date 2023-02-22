import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";

const NewPost = () => {
    
    const [files, setFiles] = React.useState<any[]>([]);

    let [imageUrl, setImageUrl] = useState('');
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  
    let handleFileChange = async (file: any) => {
        console.log("File: ", file);
        if (file) {
            let { url } = await uploadToS3(file);
            setImageUrl(url);
        }
    };

    const onChange = async () => {
        const config = {
            headers: { 'content-type': 'multipart/form-data' },
            onUploadProgress: (event: any) => {
                console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
            },
        };
    
        const formData = new FormData();
        // for (let i = 0; i < files.length; i++ ) {
        //     console.log(files[i]);
        // }
        formData.append(`image`, files[0]);

        console.log("Form data: ", formData);

        const response = await axios.post("/api/posts/new", formData, config);
    
        console.log('Response: ', response);
    };

    const fileChange = (event: any) => {
        const newFiles: any[] = [];
        for(let i = 0; i < event.target.files.length; i++) {
            const newFile = event.target.files[i];
            newFile.previewURL = URL.createObjectURL(event.target.files[i]);
            newFiles.push(newFile);
        }
        console.log(files);
        setFiles([...files, ...newFiles]);
        
    }
    
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

                <label htmlFor="images" className='text-slate-800'>Images</label>
                <input type="file" multiple onChange={fileChange} accept='.jpeg, .jpg, .png'/>

                <div className='grid grid-cols-6 my-2'>
                    {files?.map((file: any, index: number) => {
                        return (
                            <div className='p-2 bg-slate-400 rounded hover:bg-slate-300 m-1' key={index}>
                                <Image src={file.previewURL} width={100} height={100} alt={file.previewURL}/>
                            </div>
                        )
                    })}
                </div>

                {/* <div>

                <input
                    type="file"
                    name="file"
                    multiple={true}
                    onChange={handleFilesChange}
                />

                <div>
                    {urls.map((url, index) => (
                    <div key={url}>
                        File {index}: ${url}
                    </div>
                    ))}
                </div>
                </div> */}

                <FileInput onChange={handleFileChange} />

                <button className='text-slate-800' onClick={openFileDialog}>Upload file</button>

                {imageUrl && <img src={imageUrl} />}

                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create post</button>
                </div>
            </form>

        </div>
    )
}

export default NewPost