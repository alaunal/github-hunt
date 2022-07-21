import { useState } from "react";

import Layout from "../components/Layout";
import SearchBox from "../components/SearchBox";
import CardUser from "../components/CardUser";

import { useGithub } from "../hooks/useGithub";

import ClockLoader from "react-spinners/ClockLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {
  const { onSearching, user } = useGithub();

  return (
    <Layout>
      <SearchBox />
      <div className="py-6 md:py-10">
        {onSearching && (
          <ClockLoader color={"#71717a"} loading={onSearching} cssOverride={override} size={80} />
        )}
        {!onSearching && user && <CardUser user={user} />}
      </div>
    </Layout>
  );
}
