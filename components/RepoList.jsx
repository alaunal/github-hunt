import React from "react";
import Link from "next/link";

import dayjs from "dayjs";
import { isEmpty, map } from "lodash";
import { BsFillCircleFill, BsStarFill } from "react-icons/bs";

export const RepoList = ({ repos }) => {
  return (
    <div className="bg-white shadow rounded-2xl w-full py-8 px-6 block">
      <div className="flex flex-col">
        {!isEmpty(repos) &&
          repos.map((repo, idx) => {
            return (
              <div
                className="flex justify-between w-full border-b border-gray-200 pb-4 mb-4"
                key={`repo-${idx}`}
              >
                <div className="overflow-hidden break-words">
                  <h2 className="text-base md:text-xl font-semibold text-blue-500 hover:text-blue-600 mb-1 cursor-pointer">
                    <Link href={`/user/${repo.owner.login}/repo/${repo.name}`}>{repo.name}</Link>
                  </h2>
                  {!isEmpty(repo.description) && (
                    <p className="text-xs  text-gray-500 mb-4">
                      <em>{repo.description}</em>
                    </p>
                  )}

                  {!isEmpty(repo.topics) && (
                    <ul className="flex items-center flex-wrap">
                      {map(repo.topics, (topic, idx) => {
                        return (
                          <li className="mr-3 mb-4" key={`topic-${idx}`}>
                            <span className="flex h-5 md:h-6 items-center justify-center px-3 bg-blue-100 text-blue-700 rounded-full text-xs">
                              {topic}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}

                  <ul className="grid grid-cols-1 gap-3 md:flex md:items-center">
                    {!isEmpty(repo.language) && (
                      <li className="text-xs text-gray-500 mr-6">
                        <div className="flex items-center">
                          <BsFillCircleFill className="mr-2 text-gray-600" /> {repo.language}
                        </div>
                      </li>
                    )}
                    <li className="text-xs text-gray-500 mr-6">
                      <div className="flex items-center">
                        <BsStarFill className="mr-2 text-yellow-500" /> {repo.stargazers_count}{" "}
                        Stars
                      </div>
                    </li>
                    <li className="text-xs text-gray-500 mr-6">
                      Updated on {dayjs(repo.updated_at).format("MMM ddd, YYYY")}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default RepoList;
