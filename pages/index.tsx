import Head from 'next/head'
import Image from 'next/image'
import Listings from '@/components/Listings'
import React from 'react'
import { ddbDocClient } from '@/lib/ddbDocClient'
import { ScanCommand } from '@aws-sdk/client-dynamodb'
import { InferGetServerSidePropsType } from 'next'
import axios from 'axios'

export async function getServerSideProps() {
	const searchValue = '';
	const response = await ddbDocClient.send(new ScanCommand({
        TableName: "Posts"
    }));

    return { props: { items: response.Items} }
}

export default function Home({items}: InferGetServerSidePropsType<typeof getServerSideProps>) {

	const [openState, setOpenState] = React.useState(false);
	const [loadingState, setLoadingState] = React.useState(false);

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
		setLoadingState(true);
		setPosts([]);
		if (!searchValue) {
			const res = await axios.get(`/api/posts`);		
			if (res.status === 200)	setPosts(res.data.posts);
		}else {
			const res = await axios.post(`/api/search`, {
				value: searchValue,
				categories: selectedCategories,
			});
	
			console.log("ITEMs on search: ", res);
	
			if (res.status === 200) {
				setPosts(res.data.posts);
			}
		}
		setLoadingState(false);
	}

	React.useEffect(() => {
		console.log("ITEMS on intial page load: ", items);
		setPosts(items!); 
	}, [])

  	return (
    	<>
      		<Head>
				<title>Cook Islands Marketplace</title>
				<meta name="description" content="Marketplace for Cook Islanders to buy/sell items" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" href="/next.svg" />
			</Head>
			<main className='bg-white'>
				<div className='relative'>
					<Image
						src={'rarotongan.jpg'} 
						alt={'Rarotonga'} 
						width={2000} 
						height={150} 
						className='absolute shadow-xl shadow-gray-300 object-cover h-96 w-full brightness-75'
					/>
					<div className='flex justify-center relative top-36 z-40'>
						<div className='flex flex-col justify-center w-full'>
							<p className='text-6xl text-white my-4 py-4 mx-auto text-center'><strong>Cook Islands Marketplace</strong></p>
							<div className='mb-4 flex w-2/3 mx-auto'>
								<div className='mr-2 flex-none'>
									<div className="">
										{/* <div>
											<button 
												onClick={(e: any) => {  
													setOpenState(prev => !prev)
												}} type="button" className="py-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" id="menu-button" aria-expanded="true" aria-haspopup="true">
												Categories
												<svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
												</svg>
											</button>
										</div> */}

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
									<input value={searchValue} onKeyDown={(event) => {
										if (event.key === 'Enter') startSearch();
									}} onChange={(event: any) => setSearchValue(event?.target.value)} type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
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

				<div className='relative top-64 pb-40'>
					{loadingState && (
						<div>
							<svg aria-hidden="true" className="w-8 h-8 mx-auto my-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
								<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
							</svg>
							<p className='text-md text-gray-500 text-center'>Loading posts...</p>
						</div>
					)}
					{posts.length === 0 && !loadingState && (
						<div className='m-10'>
							<p className='text-2xl text-center text-gray-500'>No posts to show...</p>
							<p className='text-sm text-center text-gray-500'>Please try another search</p>
						</div>
					)}
					<Listings items={posts}/>
				</div>
			</main>
		</>
  	)
}
