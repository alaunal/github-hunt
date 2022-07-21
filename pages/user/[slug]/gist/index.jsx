import React from "react";

import api from "../../../../helpers/api";
import constant from "../../../../helpers/constant";

import Layout from "../../../../components/Layout";
import PanelUser from "../../../../components/PanelUser";

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

export const Gist = ({user}) => {
  return (
    <Layout isBreadcrumb>
      <PanelUser user={user} />
    </Layout>
  );
};

export default Gist;
