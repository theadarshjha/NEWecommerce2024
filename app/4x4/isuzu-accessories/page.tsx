"use client";


import IsuzuBanner from '@/components/4by4/Isuzu/IsuzuBanner';
import Head from 'next/head';


const IsuzuAccessories = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Thar', href: '/thar' },
    { label: 'Accessories', href: null }, // Current page
  ];

  return (
    <div className='p-0 font-sf-pro-icons m-0'>
      <Head>
        <title>Thar Accessories</title>
        <meta name="description" content="Explore our range of Thar accessories to enhance your vehicle's performance and style." />
      </Head>
      <IsuzuBanner/>

     

 

      <footer className="bg-gray-900 text-white p-6 mt-8">
        <p className="text-center">© 2024 Thar Accessories. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default IsuzuAccessories;
