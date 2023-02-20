import Link from 'next/link'
import React from 'react'

import { useUser } from '@auth0/nextjs-auth0/client';
import LoggedInDropDown from './LoggedInDropDown';

const Navbar = () => {

    const { user, error, isLoading } = useUser();

    return (
        <div className='flex flex-row bg-white justify-between py-2'>
            <ul className='flex flex-row'>
                <li className='text-2xl px-4 text-slate-900'>
                    <Link href='/'>Cook Islands Marketplace</Link>
                </li>
            </ul>

            <div>
                {!user && (<Link href='/api/auth/login' className='p-2 mx-2 bg-sky-600 rounded-md hover:bg-sky-400'>Log in</Link>)}
                {user && (
                    <>
                        <Link href='/' className='px-2 py-1 mx-2 bg-green-600 rounded-md hover:bg-green-500'>New Listing</Link>
                        <button className='mx-2 text-slate-800'>Test</button>
                        <LoggedInDropDown user={user}/>
                    </>
                )} 
            </div>
        </div>
    )
}

export default Navbar