import React from 'react'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';
import noImage from '../../public/no_image.jpg';
import axios from 'axios';
import Link from 'next/link';
import { ddbDocClient } from '@/lib/ddbDocClient';
import { ScanCommand } from '@aws-sdk/client-dynamodb';
import { getSession } from '@auth0/nextjs-auth0';
import { InferGetServerSidePropsType } from 'next';

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

	const { user, error, isLoading } = useUser();

    const [phoneNum, setPhoneNum] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstName, setfirstName] = React.useState('');

    const submitProfile = async () => {
        const res = await axios.patch('/api/profile', {
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNum
        });
    }

    React.useEffect(() => {
        if (items && items[0]) {
            setfirstName(items[0].firstName.S!);
            setLastName(items[0].lastName.S!);
            setPhoneNum(items[0].phoneNumber.S!);

        }

    }, [])

    return (
        <div className='flex justify-center'>
            <p>Test</p>
            <div className='bg-slate-400 rounded mt-20 p-10 w-1/3'>
                <p className='text-xl'>Profile</p>

                <div className='rounded p-1 flex justify-center'>
                    <Image alt={''} src={noImage} width={100} height={100} className='rounded-full'/>
                </div>

                <div>
                    <p>Email</p>
                    <input disabled value={user ? user.name ? user.name : '' : ''} className='w-full p-2 rounded text-slate-400'/>
                </div>

                <div className='grid grid-cols-2 my-4 gap-4'>
                    <div className='w-full mr-1'>
                        <p>First Name</p>
                        <input value={firstName} onChange={(event: any) => {setfirstName(event?.target.value); console.log("clicked")}} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full ml-1'>
                        <p>Last Name</p>
                        <input value={lastName} onChange={(event: any) => setLastName(event?.target.value)} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full'>
                        <p>Phone number</p>
                        <input value={phoneNum} onChange={(event: any) => setPhoneNum(event?.target.value)} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                </div>

                <div className='flex justify-center'>
                    <Link href='/' className='mx-1 rounded p-2 px-6 ring-2 ring-red-400 text-red-400'>Back</Link>
                    <button className='mx-1 rounded p-2 px-6 bg-sky-600 hover:bg-sky-500 hover:ring-2 hover:ring-sky-200' onClick={submitProfile}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage