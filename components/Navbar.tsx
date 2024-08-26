import React from 'react'
import asset from '@/data/asset'
import Image from 'next/image'
import Link from 'next/link'
import { NavbarData } from '@/data/navbar'
import {MagnifyingGlassIcon, ShoppingBagIcon} from '@heroicons/react/24/outline'
import { GiShoppingCart } from "react-icons/gi";
export const Navbar = () => {
    return (
        <nav>
          <section className='flex justify-between items-center py-4'>
              <Image className='w-80' src={asset.logo} alt="logo"/>
              <div>
              {NavbarData.map((item, idx) => (
                  <ul key={idx} >
                    <li className="py-1">
                      <Link href={item.link} className="text-2xl sm:text-3xl transition-all text-center font-semibold">
                        {item.name}
                      </Link>
                    </li>
                  </ul>
                ))}
              </div>
              <div className='flex gap-2 '> 
                 <MagnifyingGlassIcon color='black' className='text-black'/>
              <ShoppingBagIcon/>
              <GiShoppingCart />
              </div>
            
          </section>
          
        </nav>
      )
}
