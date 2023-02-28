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
            <div className='bg-gray-200 rounded mt-20 p-10 w-1/3 shadow-xl shadow-gray-400'>
                <p className='text-xl'>Profile</p>

                <div className='p-1 flex justify-center'>
                    <Image alt={''} src={imageURL ? imageURL : selectedFileURL ? selectedFileURL : noImage } width={96} height={96} className='object-cover rounded-full max-w-24 max-h-24 mr-1 shadow-lg'/>
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
                    <input disabled value={user ? user.name ? user.name : '' : ''} className='w-full p-2 rounded text-gray-400 bg-gray-300'/>
                </div>

                <div className='grid grid-cols-2 my-4 gap-4'>
                    <div className='w-full mr-1'>
                        <p>First Name</p>
                        <input disabled={loadingState} value={firstName} onChange={(event: any) => {setfirstName(event?.target.value); console.log("clicked")}} className='w-full p-2 rounded text-slate-400 shadow-inner'/>
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
                    <Link href='/' className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Back</Link>
                    
                    <button type="button" onClick={submit} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage