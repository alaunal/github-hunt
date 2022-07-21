import React from "react";

import api from "../../../../helpers/api";
import constant from "../../../../helpers/constant";

import Layout from "../../../../components/Layout";
import PanelUser from "../../../../components/PanelUser";
import RepoList from "../../../../components/RepoList";

export async function getServerSideProps(ctx) {
  let { params } = ctx;

  const [userRes, reposRes] = await Promise.all([
    api.get(`${constant.HOST_API}users/${params.slug}`),
    api.get(`${constant.HOST_API}users/${params.slug}/repos`),
  ]);

  const [user, repos] = await Promise.all([userRes?.data, reposRes?.data]);

  return {
    props: {
      user: user ? user : {},
      repos: repos ? repos : {},
    },
  };
}

export const Repo = ({ user, repos }) => {
  return (
    <Layout isBreadcrumb>
      <PanelUser user={user} />
      <div className="mt-8">
        <RepoList repos={repos} />
      </div>
    </Layout>
  );
};

export default Repo;
