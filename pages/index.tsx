import Head from 'next/head'
import Image from 'next/image'
import Listings from '@/components/Listings'
import React from 'react'
import { ddbDocClient } from '@/lib/ddbDocClient'
import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { InferGetServerSidePropsType } from 'next'
import axios from 'axios'

export async function getServerSideProps() {
    const importData = await ddbDocClient.send(new ScanCommand({ TableName: "Posts" }));
    return { props: { items: importData.Items} }
}

export default function Home({items}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const [openState, setOpenState] = React.useState(false);

	const [searchValue, setSearchValue] = React.useState('');

	const [posts, setPosts] = React.useState<any[]>([]);

	const [selectedCategories, setSelectedCategories] = React.useState<any[]>([]);

	const [categoriesDropdownState, setCategoriesDropdownState] = React.useState(false);
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

	const startSearch = async () => {
		console.log("Searching: ", searchValue);
		console.log("Searching for value...");
		const res = await axios.post(`/api/search`, {
			value: searchValue,
			categories: selectedCategories,
		});

		if (res.status === 200) {
			setPosts(res.data.posts);
		}

		console.log("SEARCH RESULT: ", res);
	}

	React.useEffect(() => {
		setPosts(items); 
	}, [])

  	return (
    	<>
      		<Head>
				<title>Cook Islands Marketplace</title>
				<meta name="description" content="Marketplace for Cook Islanders to buy/sell items" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href='' />
			</Head>
			<main className='bg-white'>
				<div className='relative'>
					<Image
						src={'/../public/rarotongan.jpg'} 
						alt={'Rarotonga'} 
						width={2000} 
						height={150} 
						className='absolute shadow-xl shadow-gray-300 object-cover h-96 w-full'
					/>
					<div className='flex justify-center relative top-36 z-40'>
						<div className='flex flex-col justify-center w-full'>
							<p className='text-6xl text-white my-4 py-4 mx-auto text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-900'><strong>Find your next purchase</strong></p>
							<div className='mb-4 flex w-2/3 mx-auto'>
								<div className='mr-2 flex-none'>
									<div className="">
										<div>
											<button 
												onClick={(e: any) => {  
													setOpenState(prev => !prev)
												}} type="button" className="py-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="menu-button" aria-expanded="true" aria-haspopup="true">
												Categories
												<svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
												</svg>
											</button>
										</div>

										{openState && (
											<div className="absolute left-0 z-10 mt-2 w-96 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
												<div className='grid grid-cols-2'>
													{categories.map((category: string) => {
															return (
																<div onClick={() => console.log("logging...")} key={category} className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
																	<input id={'Checkbox-' + category} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
																	<label htmlFor="checkbox-item-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{category}</label>
																</div>
															)
														})}
												</div>
											</div>
										)}
									</div>
								</div>

								<div className='w-full grow'>   
									<input value={searchValue} onChange={(event: any) => setSearchValue(event?.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
								</div>

								<div className='flex-none'>
									<button onClick={startSearch} type="submit" className="p-5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
										<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='relative top-64'>
					<Listings items={posts}/>
				</div>
			</main>
		</>
  	)
}
