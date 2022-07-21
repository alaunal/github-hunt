import React from "react";
import Link from 'next/link';

import { BsGithub } from "react-icons/bs"

export const Header = () => {
  return (
    <header className="h-16 lg:h-20 w-full flex items-center bg-white">
      <div className="container px-5 md:px-0">
        <div className="flex justify-center">
          <div className="w-full lg:w-3/5">
          <Link href="/">
            <div className="text-xl md:text-2xl font-bold text-gray-800 cursor-pointer flex items-center">
              <BsGithub className="inline-block mr-2 text-gray-600" /> Github<span className="font-light text-gray-500">Hunt</span>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
