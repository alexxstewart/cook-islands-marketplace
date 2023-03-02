import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from '@auth0/nextjs-auth0/client';
import axios from "axios";

export default function LoggedInDropDown() {
  
	const { user, error, isLoading } = useUser();

	console.log("USER ID: ", user?.sub);

	const [openState, setOpenState] = React.useState(false);

	const [loadingState, setLoadingState] = React.useState(false);
	const [imageURL, setImageURL] = React.useState('');
	const [name, setName] = React.useState('');

	const getUser = async () => {
		setLoadingState(true);

		const res = await axios.get(`/api/users/${user?.sub}`);

		if (res.status === 200) {
			setImageURL(res.data.image_url);
			setName(res.data.first_name + ' ' + res.data.last_name);
		}

		setLoadingState(true);
	}

	React.useEffect(() => {
		getUser();
	}, [])
	
	return (
		<div className="relative inline-block text-left">
			<div>
				<button onClick={() => setOpenState(prev => !prev)} type="button" className="justify-center rounded-md border border-gray-300 bg-white  px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 flex" id="menu-button" aria-expanded="true" aria-haspopup="true">
					<Image alt={''} src={imageURL ? imageURL : '/no_image.jpg'} width={32} height={32} className='object-cover rounded-full max-w-8 max-h-8 mr-1 border'/>
					<p className="m-auto">{name ? name : 'Profile'}</p>
				</button>
			</div>

			{openState && (
				<div className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" onFocus={(event: any) => console.log("Focused: ", event)}>
					<div className="py-2 px-4 text-sm flex" role="none">
						<Image alt={''} src={imageURL ? imageURL : '/no_image.jpg'} width={48} height={48} className='object-cover rounded-full max-w-12 max-h-12 mr-1 border'/>
						<div className="m-auto">
							<p className="text-slate-800">Logged in as:</p>
							<p className="text-slate-800">{user?.email}</p>
						</div>
					</div>
					
					<div className="py-1" role="none">
						<Link href="/profile" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 rounded mx-2" role="menuitem" id="menu-item-0">Profile</Link>
						<Link href="/yourposts" className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-200 rounded mx-2" role="menuitem" id="menu-item-1">Your Listings</Link>
					</div>
					<Link href='/api/auth/logout' className="text-red-700 hover:text-white border border-red-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-4 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-700 flex justify-start">
						Log out
						<svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1 my-auto" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
					</Link>
				</div>
			)}
		</div>
	);
}
