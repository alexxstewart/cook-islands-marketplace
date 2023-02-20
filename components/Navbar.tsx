import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex flex-row bg-white justify-between py-2'>
            <ul className='flex flex-row'>
                <li className='text-2xl px-4 text-slate-900'>
                    <Link href='/'>Cook Islands Marketplace</Link>
                </li>
            </ul>

            <div>
                <button className='text-slate-900 mx-2'>Sign up</button>
                <button className='p-2 mx-2 bg-sky-600 rounded-md hover:bg-sky-400'>Log in</button>
            </div>
        </div>
    )
}

export default Navbar