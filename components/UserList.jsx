import React from "react";
import Image from "next/image";
import Link from "next/link";

import { isEmpty, map } from "lodash";

const imgLoader = ({ src }) => {
  return src;
};

export const UserList = ({ users }) => {
  return (
    !isEmpty(users) && (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {map(users, (user, idx) => {
          return (
            <div key={`user-${idx}`}>
              <Link href={`/user/${user.login}`}>
                <div className="bg-white shadow rounded-2xl w-full p-5 block cursor-pointer hover:shadow-lg">
                  <div className="flex w-full justify-center">
                    <div>
                      <div className="relative aspect-square w-24 h-auto bg-gray-100 rounded-full overflow-hidden">
                        <Image
                          loader={imgLoader}
                          src={user.avatar_url}
                          alt="Avatar"
                          layout="fill"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-5 w-full">
                    <h3 className="text-lg font-semibold text-gray-600 flex items-center">
                      {user.login}
                    </h3>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    )
  );
};

export default UserList;
