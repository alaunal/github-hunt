import React from "react";

import api from "../../../../helpers/api";
import constant from "../../../../helpers/constant";

import Layout from "../../../../components/Layout";
import PanelUser from "../../../../components/PanelUser";
import UserList from "../../../../components/UserList";

export async function getServerSideProps(ctx) {
  let { params } = ctx;

  const [userRes, followersRes] = await Promise.all([
    api.get(`${constant.HOST_API}users/${params.slug}`),
    api.get(`${constant.HOST_API}users/${params.slug}/followers`),
  ]);

  const [user, followers] = await Promise.all([userRes?.data, followersRes?.data]);

  return {
    props: {
      user: user ? user : {},
      followers: followers ? followers : {},
    },
  };
}

export const Followers = ({user, followers}) => {
  return (
    <Layout isBreadcrumb>
      <PanelUser user={user} />
      <div className="mt-8">
        <UserList users={followers} />
      </div>
    </Layout>
  );
};

export default Followers;
