import React from "react";
import Image from "next/image";
import Link from "next/link";

import { isEmpty } from "lodash";

import { BsBuilding, BsPinMap, BsShare, BsTwitter, BsEnvelope } from "react-icons/bs";

const imgLoader = ({ src }) => {
  return src;
};

const intToString = (num) => {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (num / si[index].v).toFixed(1).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
};

const CardUser = ({ user }) => {
  return (
    !isEmpty(user) && (
      <div className="bg-white shadow rounded-xl md:rounded-2xl w-full py-8 px-6 block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div>
                <div className="relative aspect-square w-14 md:w-20 h-auto bg-gray-100 rounded-full overflow-hidden">
                  <Image loader={imgLoader} src={user.avatar_url} alt="avatar" layout="fill" />
                </div>
              </div>
              <div className="pl-4">
                <h2 className="text-lg md:text-2xl font-medium md:font-semibold text-gray-700">{user.name}</h2>
                <p className="text-xs md:text-base text-gray-500">@{user.login}</p>
              </div>
            </div>

            <div className="py-3 md:py-4">
              {!isEmpty(user.company) && (
                <p className="text-xs md:text-sm text-gray-600 flex items-center mb-3">
                  <BsBuilding className="inline-block mr-2" />
                  {user.company}
                </p>
              )}

              {!isEmpty(user.email) && (
                <p className="text-xs md:text-sm text-gray-600 flex items-center mb-3">
                  <BsEnvelope className="inline-block mr-2" />
                  <a href="mailto:theninja@gmail.com" className="underline hover:text-blue-500">
                    {user.email}
                  </a>
                </p>
              )}

              {!isEmpty(user.location) && (
                <p className="text-xs md:text-sm text-gray-600 flex items-center mb-3">
                  <BsPinMap className="inline-block mr-2" />
                  {user.location}
                </p>
              )}

              {!isEmpty(user.blog) && (
                <p className="text-xs md:text-sm text-gray-600 flex items-center mb-3">
                  <BsShare className="inline-block mr-2" />
                  <a href={user.blog} target="_blank" className="underline hover:text-blue-500">
                    Blog
                  </a>
                </p>
              )}

              {!isEmpty(user.twitter_username) && (
                <p className="text-xs md:text-sm text-gray-600 flex items-center mb-3">
                  <BsTwitter className="inline-block mr-2" />@{user.twitter_username}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            {!isEmpty(user.bio) && (
              <div className="pt-3 md:pl-3 md:pt-0 border-t-4 md:border-l-4 md:border-l-0 border-gray-500 w-full block mb-8">
                <em className="text-xs md:text-sm text-gray-400">{user.bio}</em>
              </div>
            )}
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="p-4 bg-gray-100 rounded-lg">
                <Link href={`/user/${user.login}/followers`}>
                  <div className="cursor-pointer group">
                    <p className="text-xl text-gray-800 font-medium group-hover:text-blue-500">
                      {intToString(user.followers)}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-blue-400">Followers</p>
                  </div>
                </Link>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <Link href={`/user/${user.login}/following`}>
                  <div className="cursor-pointer group">
                    <p className="text-xl text-gray-800 font-medium group-hover:text-blue-500">
                      {intToString(user.following)}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-blue-400">Following</p>
                  </div>
                </Link>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <Link href={`/user/${user.login}/gist`}>
                  <div className="cursor-pointer group">
                    <p className="text-xl text-gray-800 font-medium group-hover:text-blue-500">
                      {intToString(user.public_gists)}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-blue-400">Gist</p>
                  </div>
                </Link>
              </div>
              <div className="p-4 bg-gray-100 rounded-lg">
                <Link href={`/user/${user.login}/repo`}>
                  <div className="cursor-pointer group">
                    <p className="text-xl text-gray-800 font-medium group-hover:text-blue-500">
                      {intToString(user.public_repos)}
                    </p>
                    <p className="text-sm text-gray-400 group-hover:text-blue-400">Repo</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CardUser;
