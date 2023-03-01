import React from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import ImageDropBox from '@/components/ImageDropBox';
import { Button, Loading, Progress } from "@nextui-org/react";
import Router from 'next/router';

const NewPost = () => {
    
    // UI STATE VALUES
    const [loadingState, setLoadingState] = React.useState(false);
    const [showCategories, setShowCategories] = React.useState(false);

    // FORM INPUT VALUES
    const [title, setTitle] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [location, setLocation] = React.useState('-');
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);

    const [urls, setUrls] = useState<string[]>([]);
    const { uploadToS3, files } = useS3Upload();    

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
    const handleFilesUpload = async () => {
        setLoadingState(true);
        const savedImageURLs = [];

        const files = Array.from(selectedFiles);
        for (let index = 0; index < files.length; index++) {
            const file:any = files[index];
            const { url } = await uploadToS3(file);
            console.log("Got url: ", url);
            savedImageURLs.push(url);
            setUrls(current => [...current, url]);
        }
        submitForm(savedImageURLs);
    };

    const handleFiles = (event: any) => {
        setSelectedFiles(current => [...current, ...event.target.files]);
    }

    const submitForm = async (urls: string[]) => {
        const data = {
            title: title,
            price: price, 
            description: description,
            selectedCategories: selectedCategories,
            image_urls: urls,
            location: location
        }
        
        const res = await axios.post('/api/posts/new', data);
        if (res.status === 200) Router.push('/'); 
        setLoadingState(false);
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
    ];

    const locations = [
        '-',
        'Aroa',
        'Avarua',
        'Avatiu',
        'Avvavaroa',
        'Kavera',
        'Muri',
        'Nikao',
        'Takuvaine',
        'Tikioki',
        'Titikaveka',
        'Tupapa',
        'Turangi',
        'Turoa',
        'Rutaki',
        'Vaimaanga',
        'Other'
    ];
  
    const handleCheckboxChange = (category: string, checkedState: any) => {
        console.log(category);
        console.log(checkedState);
        if (checkedState) setSelectedCategories(current => [...current, category]);
        else if (!checkedState) { // Remove category from the selected category array
            const index = selectedCategories.indexOf(category);
            if (index > 0) { // Remove the value from the array
                const newArray = selectedCategories;
                newArray.splice(index, 1);
                setSelectedCategories(newArray);
            }
        }
    }
    
    return (
        <div className='mt-20 w-1/2 mx-auto'>
            <form action='/api/posts/new' method='post' className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
                
                <p className='text-3xl text-slate-800'>Add a new listing</p>
                
                <br/>

                <label htmlFor="roll" className='text-slate-800'>Post Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className='shadow border border-slate-300 bg-white w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    value={title}
                    onChange={(event: any) => setTitle(event?.target.value)}
                />

                <div className='grid grid-cols-2'>
                    <div className='w-full'>
                        <label htmlFor="price" className='text-slate-800'>Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            className='shadow border border-slate-300 bg-white w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                            value={price}
                            onChange={(event: any) => setPrice(event.target.value)}
                        />
                    </div>
                    <div className='w-full'>
                        <label className="text-gray-800">Select a location</label>
                        <select value={location} onChange={(event: any) => setLocation(event.target.value)} className="shadow border border-slate-300 bg-white w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline">
                            <option selected>Choose a location</option>
                            {locations.map((location: string) => {
                                return (
                                    <option value={location} key={location}>{location}</option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            
                

                <label htmlFor="description" className='text-slate-800'>Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className='shadow border border-slate-300 bg-white w-full rounded py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:shadow-outline'
                    value={description}
                    onChange={(event: any) => setDescription(event.target.value)}
                />

                <div onClick={() => setShowCategories(prev => !prev)} className='my-4 flex justify-between bg-white hover:bg-gray-300 rounded p-2'>
                    <p className='text-lg text-slate-800 my-auto'>Select the categories: </p>
                    {showCategories ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 h-4 fill-gray-600 my-auto'>
                            <path d="M201.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 173.3 54.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"/>
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-4 h-4 fill-gray-600 my-auto'>
                            <path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                        </svg>
                    )}
                </div>
                {showCategories && (
                    <div className='grid grid-cols-4 mb-4'>
                        {categories.map((category: string, index: number) => {
                            return (
                                <div key={category} className='flex-row' onClick={(event: any) => handleCheckboxChange(category, event.target.checked)}>
                                    <input name={category} type='checkbox' className='rounded p-1 m-2 bg-slate-400'/>
                                    <label className='text-slate-800'>{category}</label>
                                </div>
                            )
                        })}
                    </div>
                )}

                <ImageDropBox files={selectedFiles} setFiles={setSelectedFiles}/>

                <div className='mt-2'></div>
                
                {files.length > 0 && (
                    <div className='mb-4'>
                        <div className="pt-8">
                            <p className='text-lg text-slate-600'>Uploading images...</p>
                            {files.map((file, index) => {
                                const previewURL = URL.createObjectURL(file.file)
                                return (
                                    <div key={index}className='text-slate-800 rounded p-2 m-2 bg-slate-400'>
                                        <div className='flex justify-between mb-1'>
                                            <div className='flex justify-start'>
                                                <Image alt={file.file.name} src={previewURL} width={50} height={50}/>
                                                <p className='ml-2'>{file.file.name}</p>
                                            </div>
                                            <p>Progress: {file.progress}%</p>
                                        </div>
                                        <Progress color="primary" size="xs" value={file.progress} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )}

                <div className='flex items-center justify-center'>
                    <Button 
                        disabled={loadingState}
                        icon={loadingState && <Loading />} 
                        onClick={handleFilesUpload}
                    >Create Post</Button>
                </div>
            </form>

        </div>
    )
}

export default NewPost