import { useEffect } from "react";
import Head from "next/head";

import Header from "./Header";
import Beardcrumb from "./Beardcrumb";

import { toast } from 'react-toastify';

import { isEmpty } from "lodash";

import { useGithub } from "../hooks/useGithub";

const Layout = ({ children, isBreadcrumb = false }) => {
  const { errorText } = useGithub();

  useEffect(() => {
    if(!isEmpty(errorText)) {
      toast.error(errorText);
    }
  }, [errorText]);

  return (
    <>
      <Head>
        <title>Github Hunt - Next Js Application</title>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.png" />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <meta content="Github Hunt - Next Js Application" name="description" />
        <meta
          content="Search, Next Js, Github, Github Hunt, Github Hunt Next Js, Github Hunt Next Js Application"
          name="keyword"
        />
        <meta content="desktop" name="device" />
        <meta name="theme-color" content="#111827" />

        <link href="/icons/icon-16x16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/icons/icon-32x32.png" rel="icon" type="image/png" sizes="32x32" />

        <link rel="apple-touch-icon" href="/icons/icon-32x32.png"></link>

        <meta name="application-name" content="Github Hunt" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Github Hunt" />


      </Head>
      <Header />
      <main className="py-6 lg:py-10">
        <div className="container px-5 lg:px-0">
          {isBreadcrumb && (
            <div className="flex justify-center mb-8">
              <div className="w-full lg:w-3/5">
                <Beardcrumb />
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <div className="w-full lg:w-3/5">{children}</div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
