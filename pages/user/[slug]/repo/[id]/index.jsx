import { useState, useEffect } from "react";

import dayjs from "dayjs";
import { isEmpty, map } from "lodash";
import { BsFillCircleFill, BsStarFill } from "react-icons/bs";

import api from "../../../../../helpers/api";
import constant from "../../../../../helpers/constant";

import { useGithub } from "../../../../../hooks/useGithub";

import Layout from "../../../../../components/Layout";

import ClockLoader from "react-spinners/ClockLoader";
import ReactMarkdown from "react-markdown";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export async function getServerSideProps(ctx) {
  let { params } = ctx;

  const [repoRes] = await Promise.all([
    api.get(`${constant.HOST_API}repos/${params.slug}/${params.id}`),
  ]);

  const [repo] = await Promise.all([repoRes?.data]);

  return {
    props: {
      repo: repo ? repo : {},
    },
  };
}

export const RepoDetail = ({ repo }) => {
  const { setErrorText } = useGithub();

  const [loading, setLoading] = useState(false);
  const [readme, setReadme] = useState("");

  const getReadme = async () => {
    setLoading(true);

    try {
      let { data } = await api.get(
        `${constant.HOST_API_RAW}${repo.owner.login}/${repo.name}/${repo.default_branch}/README.md`,
      );
      setReadme(data);
      setLoading(false);
    } catch (error) {
      error.message
        ? setErrorText(error.message)
        : setErrorText("Have something wrong with search user!");

      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isEmpty(repo)) {
      getReadme();
    }
  }, []);

  return (
    <Layout isBreadcrumb>
      <div className="bg-white shadow rounded-xl md:rounded-2xl w-full py-8 px-6 block">
        <div className="flex justify-between w-full border-b border-gray-200 pb-4 mb-4">
          <div>
            <h2 className="text-base md:text-xl font-semibold text-blue-500 hover:text-blue-600 mb-1 cursor-pointer">
              <a href={repo.html_url} target="_blank">{repo.name}</a>
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
                  <BsStarFill className="mr-2 text-yellow-500" /> {repo.stargazers_count} Stars
                </div>
              </li>
              <li className="text-xs text-gray-500 mr-6">
                Updated on {dayjs(repo.updated_at).format("MMM ddd, YYYY")}
              </li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg border border-gray-300 block">
          <div className="w-full py-2 px-4 border-b border-gray-300 block">
            <span className="text-sm font-semibold text-gray-600">readme.md</span>
          </div>
          <div className="w-full p-5">
            {loading ? (
              <ClockLoader color={"#71717a"} loading={loading} cssOverride={override} size={80} />
            ) : (
              <article className="prose-sm md:prose prose-slate">
                <ReactMarkdown>{readme}</ReactMarkdown>
              </article>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RepoDetail;
