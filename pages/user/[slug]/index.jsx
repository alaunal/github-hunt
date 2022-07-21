import React from "react";

import api from "../../../helpers/api";
import constant from "../../../helpers/constant";

import Layout from "../../../components/Layout";
import CardUser from "../../../components/CardUser";

export async function getServerSideProps(ctx) {
  let { params } = ctx;

  const [userRes] = await Promise.all([api.get(`${constant.HOST_API}users/${params.slug}`)]);

  const [user] = await Promise.all([userRes?.data]);

  return {
    props: {
      user: user ? user : {},
    },
  };
}

export const User = ({ user }) => {
  return (
    <Layout isBreadcrumb>
      <CardUser user={user} />
    </Layout>
  );
};

export default User;
