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
				<div>
					<Image
						src={'/../public/raro.jpg'} 
						alt={'Rarotonga'} 
						width={2000}
						height={150}
						className='shadow-2xl shadow-gray-800'
					/>
				</div>
				<Listings/>
			</main>
		</>
  	)
}
