import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import ImageDropBox from '@/components/ImageDropBox';
import { Dropdown } from "@nextui-org/react";

const NewPost = () => {
    
    // FORM INPUT VALUES
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');

    const [urls, setUrls] = useState<string[]>([]);
    const { uploadToS3, files } = useS3Upload();    

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
    const handleFilesUpload = async () => {
        const files = Array.from(selectedFiles);
        for (let index = 0; index < files.length; index++) {
            const file:any = files[index];
            const { url } = await uploadToS3(file);
            console.log("Got url: ", url);
            setUrls(current => [...current, url]);
        }
        submitForm()
    };

    const handleFiles = (event: any) => {
        setSelectedFiles(current => [...current, ...event.target.files]);
    }

    const submitForm = () => {

    }

    const removeFile = (index: number) => {
        const newFiles = selectedFiles;
        newFiles.splice(index, 1);
        setSelectedFiles([...newFiles]);
    }

    const categories = [
        'Antiques & collectables',
        'Transportation',
        'Computers',
        'Mobile phones',
        'Baby gear',
        'Music & instruments',
        'Books',
        'Gaming',
        'Pets & animals',
        'Building & renovation',
        'Health & beauty',
        'Sports',
        'Home & living',
        'Toys & models',
        'Clothing & fashion',
        'Jewellery & watches',
        'Electronics & photography',
        'Business, farming & industry',
    ]
  
    
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
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    value={title}
                    onChange={(event: any) => setTitle(event?.target.value)}
                />
            
                <label htmlFor="price" className='text-slate-800'>Price</label>
                <input
                    type="text"
                    id="price"
                    name="price"
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    value={price}
                    onChange={(event: any) => setPrice(event.target.value)}
                />
                

                <label htmlFor="description" className='text-slate-800'>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className='shadow border border-slate-300 bg-slate-200 w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    value={description}
                    onChange={(event: any) => setDescription(event.target.value)}
                />

                <div className='my-4'>
                    <p className='text-xl text-slate-800'>Select the categories: </p>
                </div>
                <div className='grid grid-cols-4 mb-4'>
                    {categories.map((category: string, index: number) => {
                        return (
                            <div key={category} className='flex-row'>
                                <input name={category} type='checkbox' className='rounded p-1 m-2 bg-slate-400'/>
                                <label className='text-slate-800'>{category}</label>
                            </div>
                        )
                    })}
                </div>

                <ImageDropBox files={selectedFiles} setFiles={setSelectedFiles}/>

                <div className='mt-2'></div>

                <div>
                    <input multiple accept='.jpg, .jpeg, .png, .gif' onChange={handleFiles} type="file" />

                    <div className='grid grid-cols-6'>
                        {selectedFiles.map((file: any, index: number) => {
                            const previewURL = URL.createObjectURL(file);
                            return (
                                <div key={index+'imagepreview'} className='p-2 m-1 bg-slate-500 hover:bg-slate-300 rounded'>
                                    <p className='text-sm'>{file.name}</p>
                                    <p className='text-xs'>Size: {file.size}</p>
                                    <Image alt={file.name} src={previewURL} width={200} height={200}/>  
                                    <button className='text-yellow-600' onClick={(e) => {
                                        e.preventDefault();
                                        removeFile(index)
                                    }}>Remove</button>
                                </div>
                            )
                        })}
                    </div>

                    <div className="pt-8">
                        {files.map((file, index) => (
                            <div key={index}className='text-slate-800'>
                                File #{index} progress: {file.progress}%
                            </div>
                        ))}
                        {urls.map((url: string, index: number) => (
                            <div key={"hello" + index} className='p-2 bg-slate-500'>
                                <Image src={url} alt={'Imegas'} width={200} height={200}/>
                            </div>
                        ))}
                    </div>
                </div>

                <button className='p-2 m-2 text-slate-800 bg-sky-800 rounded' onClick={handleFilesUpload}>Upload Files</button>

                <div className="flex items-center justify-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Create post</button>
                </div>
            </form>

        </div>
    )
}

export default NewPost