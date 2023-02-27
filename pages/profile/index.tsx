import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';
import noImage from '../../public/no_image.jpg';
import axios from 'axios';
import Link from 'next/link';
import { useS3Upload } from "next-s3-upload";
import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { getSession } from '@auth0/nextjs-auth0';
import { InferGetServerSidePropsType } from 'next';
import { Progress } from '@nextui-org/react';

// This gets called on every request
export async function getServerSideProps(context: any) {
    // Get the session
    const session = await getSession(context.req, context.res);

    if (session?.user) {
        const importData = await ddbDocClient.send(new ScanCommand({ 
            FilterExpression: "contains (userID, :userID)",
            ExpressionAttributeValues: {
              ":userID": { S: session?.user.sub },
            },
            TableName: "Users",
        }));
    
        if (importData.Items && importData.Items[0]) { // Return the user data
            return { props: { items: importData.Items }};
        }
    }
    return { props: { } }
}

const ProfilePage = ({items}: InferGetServerSidePropsType<typeof getServerSideProps>) => {


    const onDrop = useCallback((acceptedFiles: any) => {
        setSelectedFile(acceptedFiles[0]);
        setSelectedFileURL(URL.createObjectURL(acceptedFiles[0]));
    }, [])

	const { user, error, isLoading } = useUser();
    const { uploadToS3, files } = useS3Upload();   
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg'],
            'image/jpg': ['.jpg'],
        }}
    )

    const [loadingState, setLoadingState] = React.useState(false);

    const [phoneNum, setPhoneNum] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstName, setfirstName] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');

    const [selectedFile, setSelectedFile] = React.useState<any>();
    const [selectedFileURL, setSelectedFileURL] = React.useState('');

    const submit = () => {
        if (selectedFile) {
            handleImageUpload();
        } else {
            submitProfile('')
        }
    }

    const handleImageUpload = async () => {

        // If
        setLoadingState(true);
        const { url } = await uploadToS3(selectedFile);
        submitProfile(url);
    };

    const submitProfile = async (uploadedImageURL: string) => {
        console.log("Uploaded image URL: ", uploadedImageURL);
        const res = await axios.patch('/api/profile', {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNum,
            image_url: uploadedImageURL ? uploadedImageURL : '',
        });
        setLoadingState(false);
    }

    React.useEffect(() => {
        if (items && items[0]) {
            setfirstName(items[0].firstName ? items[0].firstName.S! : '');
            setLastName(items[0].lastName ? items[0].lastName.S!: '');
            setPhoneNum(items[0].phoneNumber ? items[0].phoneNumber.S! : '');
            setImageURL(items[0].imageURL ? items[0].imageURL.S! : '');
        }
    }, []);

    return (
        <div className='flex justify-center'>
            <p>Test</p>
            <div className='bg-slate-400 rounded mt-20 p-10 w-1/3'>
                <p className='text-xl'>Profile</p>

                <div className='p-1 flex justify-center'>
                    <Image alt={''} src={imageURL ? imageURL : selectedFileURL ? selectedFileURL : noImage } width={100} height={100} className='rounded-full p-0.5 bg-slate-800 shadow-xl'/>
                </div>

                <div {...getRootProps()}>
                    <input {...getInputProps()}/>
                    {
                        isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div className='flex justify-center my-2'>
                            <div className='hover:bg-blue-300 p-2 bg-blue-400 rounded flex justify-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className='w-6 h-6'>
                                    <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"/>
                                </svg>
                                <p className='ml-2'>Select new image</p>
                            </div>
                        </div>
                    }
                </div>

                <div>
                    <p>Email</p>
                    <input disabled value={user ? user.name ? user.name : '' : ''} className='w-full p-2 rounded text-slate-400'/>
                </div>

                <div className='grid grid-cols-2 my-4 gap-4'>
                    <div className='w-full mr-1'>
                        <p>First Name</p>
                        <input disabled={loadingState} value={firstName} onChange={(event: any) => {setfirstName(event?.target.value); console.log("clicked")}} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full ml-1'>
                        <p>Last Name</p>
                        <input disabled={loadingState} value={lastName} onChange={(event: any) => setLastName(event?.target.value)} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full'>
                        <p>Phone number</p>
                        <input disabled={loadingState} value={phoneNum} onChange={(event: any) => setPhoneNum(event?.target.value)} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                </div>

                {files.map((file: any) => {
                    console.log("File: ", file);
                    return (
                        <div key={'123'} className='my-4'>
                            <div className='flex justify-between bg-slate-500 rounded p-2'>
                                <p>{file.file.name}</p>
                                <p>{file.progress}%</p>
                            </div>
                            <Progress color="primary" size="xs" value={file.progress} />
                        </div>
                    )
                })}

                <div className='flex justify-center'>
                    <Link href='/' className='mx-1 rounded p-2 px-6 ring-2 ring-red-400 text-red-400'>Back</Link>
                    <button className='mx-1 rounded p-2 px-6 bg-sky-600 hover:bg-sky-500 hover:ring-2 hover:ring-sky-200' onClick={submit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage