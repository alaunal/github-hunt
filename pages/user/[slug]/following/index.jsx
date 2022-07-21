import React from "react";

import api from "../../../../helpers/api";
import constant from "../../../../helpers/constant";

import Layout from "../../../../components/Layout";
import PanelUser from "../../../../components/PanelUser";
import UserList from "../../../../components/UserList";

export async function getServerSideProps(ctx) {
  let { params } = ctx;

  const [userRes, followingRes] = await Promise.all([
    api.get(`${constant.HOST_API}users/${params.slug}`),
    api.get(`${constant.HOST_API}users/${params.slug}/following`),
  ]);

  const [user, following] = await Promise.all([userRes?.data, followingRes?.data]);

  return {
    props: {
      user: user ? user : {},
      following: following ? following : {},
    },
  };
}

export const Following = ({user, following}) => {
  return (
    <Layout isBreadcrumb>
      <PanelUser user={user} />
      <div className="mt-8">
        <UserList users={following} />
      </div>
    </Layout>
  );
};

export default Following;
