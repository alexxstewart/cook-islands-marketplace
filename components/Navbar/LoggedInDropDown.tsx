import React from "react";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function LoggedInDropDown() {
  
	const { user, error, isLoading } = useUser();

	console.log("USER ID: ", user?.sub);

	const [openState, setOpenState] = React.useState(false);
	
	return (
		<div className="relative inline-block text-left">
			<div>
				<button onClick={() => setOpenState(prev => !prev)} type="button" className="justify-center rounded-md border border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">Profile</button>
			</div>

			{openState && (
				<div className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
					<div className="py-2 px-4 text-sm" role="none">
						<p className="text-slate-800">Logged in as:</p>
						<p className="text-slate-800">{user?.email}</p>
					</div>
					
					<div className="py-1" role="none">
						<Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Profile</Link>
						<Link href="/yourposts" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Your Listings</Link>
					</div>
					<div className="py-1" role="none">
						<Link href='/api/auth/logout' className='text-slate-800 ml: 2'>Log out</Link>
					</div>
				</div>
			)}
		</div>
	);
}
