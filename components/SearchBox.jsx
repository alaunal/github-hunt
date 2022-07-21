import { useState, useMemo, useEffect } from "react";
import { debounce, isEmpty } from "lodash";
import { BsSearch } from "react-icons/bs";

import { useGithub } from "../hooks/useGithub";

const SearchBox = () => {
  const { searchUser, setUser } = useGithub();
  const [keyword, setKeyword] = useState("");

  const changeHandler = (event) => {
    setKeyword(event.target.value);
  };

  useEffect(() => {
    if (keyword.length >= 2) {
      searchUser(keyword);
    } else if (keyword.length === 0) {
      setUser(null);
    }
  }, [keyword]);

  useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel();
    };
  }, []);

  const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 400), []);

  return (
    <div>
      <div className="text-center w-full block mb-6 md:mb-10">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-700 mb-2">
          Find <span className="text-gray-500 font-light">&</span> Dive
        </h1>
        <p className="text-sm lg:text-lg text-gray-600">
          A simple Application Next.js for search github user and their projects
        </p>
      </div>
      <div className="flex">
        <div className="w-full relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-4">
            <BsSearch className="h-4 w-4 md:h-5 md:w-5 fill-slate-300" />
          </span>
          <input
            onChange={debouncedChangeHandler}
            type="text"
            autoComplete="off"
            placeholder="search github user by username. eg. alaunal"
            className="w-full rounded-full h-10 md:h-14 text-sm md:text-base py-2 pl-12 pr-4 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 block bg-white w-full border border-slate-300 placeholder:text-slate-400 placeholder:font-light"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
