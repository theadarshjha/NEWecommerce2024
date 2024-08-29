import React from "react";
import asset from "@/data/asset";
import Image from "next/image";
import Link from "next/link";
import { NavbarData } from "@/data/navbar";
import { signInSignOut } from "@/data/navbar";
import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
export const Navbar = () => {
  return (
    <nav className="px-20">
      <section className="flex justify-between items-center w-full    py-4">
        <section className="flex space-x-9 items-center">
          <Image className="h-6 w-[150px]" src={asset.logo} alt="logo" />
          <div className="flex gap-x-8">
            {NavbarData.map((item, idx) => (
              <div key={idx}>
                <ul>
                  <li className="py-1">
                    <Link href={item.link} className="text-sm text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 ">
                      {item.name}
                    </Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex space-x-9 items-center">
          <div className="flex gap-x-8">
            {signInSignOut.map((items, idx: number) => (
              <Link key={idx} href={items.link} className="text-sm text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 ">
                {items.name}
              </Link>
            ))}
          </div>

          <div className="flex gap-x-6 ">
            <MagnifyingGlassIcon aria-hidden="true" className="h-6 w-6" />

            <ShoppingBagIcon aria-hidden="true" className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
          </div>
        </section>
      </section>
    </nav>
  );
};
