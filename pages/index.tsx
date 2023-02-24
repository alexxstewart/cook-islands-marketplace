import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Listings from '@/components/Listings'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  	return (
    	<>
      		<Head>
				<title>Cook Islands Marketplace</title>
				<meta name="description" content="Marketplace for Cook Islanders to buy/sell items" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href='' />
			</Head>
			<main className='bg-zinc-900'>
				<div className='max-h-32' >
					<Image
						src={'/../public/rarotongan.jpg'} 
						alt={'Rarotonga'} 
						width={2000}
						height={150}
						className='shadow-2xl shadow-gray-800'
					/>
				</div>
				<div className='w-full mb-4 flex-row'>
					<div>
						<button id="dropdownBgHoverButton" data-dropdown-toggle="dropdownBgHover" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Dropdown checkbox <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
						<div id="dropdownBgHover" className="z-10 hidden w-48 bg-white rounded-lg shadow dark:bg-gray-700">
							<ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownBgHoverButton">
							<li>
								<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="checkbox-item-4" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
									<label htmlFor="checkbox-item-4" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
								</div>
							</li>
							<li>
								<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input checked id="checkbox-item-5" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
									<label htmlFor="checkbox-item-5" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Checked state</label>
								</div>
							</li>
							<li>
								<div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
									<input id="checkbox-item-6" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
									<label htmlFor="checkbox-item-6" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">Default checkbox</label>
								</div>
							</li>
							</ul>
						</div>
					</div>
					<div>
						<form className="flex items-center px-4" action='/posts/search' method='get'>   
							<label htmlFor="simple-search" className="sr-only">Search</label>
							<div className="relative w-full">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
								</div>
								<input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required/>
							</div>
							<button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
								<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								<span className="sr-only">Search</span>
							</button>
						</form>
					</div>
				</div>
				<Listings/>
			</main>
		</>
  	)
}
