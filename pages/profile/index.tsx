import React from 'react'
import Image from 'next/image'
import { useUser } from '@auth0/nextjs-auth0/client';
import noImage from '../../public/no_image.jpg';
import axios from 'axios';
import Link from 'next/link';

const ProfilePage = () => {

	const { user, error, isLoading } = useUser();

    const submitProfile = async () => {
        console.log("Submitting profile...");
        const res = await axios.patch('/api/profile', {data: '123'});
        console.log("Submit profile response: ", res);
    }

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
                    <input disabled value={user ? user.name : ''} className='w-full p-2 rounded text-slate-400'/>
                </div>

                <div className='grid grid-cols-2 my-4 gap-4'>
                    <div className='w-full mr-1'>
                        <p>First Name</p>
                        <input disabled value={'Alex'} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full ml-1'>
                        <p>Last Name</p>
                        <input disabled value={'Stewart'} className='w-full p-2 rounded text-slate-400'/>
                    </div>

                    <div className='w-full'>
                        <p>Phone number</p>
                        <input disabled value={'567398'} className='w-full p-2 rounded text-slate-400'/>
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