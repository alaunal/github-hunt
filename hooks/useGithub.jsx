import api from "../helpers/api";
import constant from "../helpers/constant";
import { createContext, useContext, useMemo, useState, useEffect } from "react";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onSearching, setOnSearching] = useState(false);
  const [errorText, setErrorText] = useState("");

  const searchUser = async (keyword) => {
    setOnSearching(true);

    try {
      const { data } = await api.get(`${constant.HOST_API}users/${keyword}`);

      setUser(data);
      setOnSearching(false);
      setErrorText("");
    } catch (error) {
      error.message
        ? setErrorText(error.message)
        : setErrorText("Have something wrong with search user!");

      setOnSearching(false);
      setUser(null);
    }
  };

  useEffect(() => {}, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      errorText,
      setErrorText,
      onSearching,
      searchUser
    }),
    [user, errorText, onSearching],
  );

  return <GithubContext.Provider value={value}>{children}</GithubContext.Provider>;
};

export const useGithub = () => {
  return useContext(GithubContext);
};
