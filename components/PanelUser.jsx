import React from "react";
import Image from "next/image";
import Link from "next/link";
import { isEmpty } from "lodash";

const imgLoader = ({ src }) => {
  return src;
};

export const PanelUser = ({ user }) => {
  return (
    !isEmpty(user) && (
      <div className="bg-white shadow rounded-xl md:rounded-2xl w-full py-8 px-6 block">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center md:pr-6 mb-4 md:mb-0">
            <div>
              <div className="relative aspect-square w-10 md:w-14 h-auto bg-gray-100 rounded-full overflow-hidden">
                <Image loader={imgLoader} src={user.avatar_url} alt="avatar" layout="fill" />
              </div>
            </div>
            <div className="pl-4">
              <h2 className="text-base md:text-lg font-semibold text-gray-700">{user.name}</h2>
              <p className="text-xs md:text-sm text-gray-500">@{user.login}</p>
            </div>
          </div>
          <div>
            <nav>
              <ul className="grid grid-cols-2 gap-3 md:flex md:items-center">
                <li className="md:ml-8 text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                  <Link href={`/user/${user.login}/repo`}>Repositories</Link>
                </li>
                <li className="md:ml-8 text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                  <Link href={`/user/${user.login}/followers`}>Followers</Link>
                </li>
                <li className="md:ml-8 text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                  <Link href={`/user/${user.login}/following`}>Following</Link>
                </li>
                <li className="md:ml-8 text-sm font-medium text-gray-500 hover:text-gray-800 cursor-pointer">
                  <Link href={`/user/${user.login}/gist`}>Gist</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  );
};

export default PanelUser;
