import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BsHouseFill, BsChevronRight } from "react-icons/bs";

const Beardcrumb = () => {
  const router = useRouter();

  const [breadcrumbs, setBreadcrumbs] = useState();

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0];
    let pathArray = pathWithoutQuery.split("/");
    pathArray.shift();

    pathArray = pathArray.filter((path) => path !== "");

    const breadcrumbs = pathArray.map((path, index) => {
      const href = "/" + pathArray.slice(0, index + 1).join("/");
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1),
        isCurrent: index === pathArray.length - 1,
      };
    });

    setBreadcrumbs(breadcrumbs);
  }, [router.asPath]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 overflow-hidden">
        <li className="inline-flex items-center">
          <Link href="/">
            <span className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
              <BsHouseFill className="mr-2" />
              Home
            </span>
          </Link>
        </li>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb, idx) => (
            <li key={`breadcrumb-${idx}`} aria-current={breadcrumb.isCurrent ? "page" : "false"}>
              <div className="flex items-center">
                <BsChevronRight />
                {breadcrumb.isCurrent ? (
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400 truncate">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link href={breadcrumb.href} passHref>
                    <span className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer">
                      {breadcrumb.label}
                    </span>
                  </Link>
                )}
              </div>
            </li>
          ))}
      </ol>
    </nav>
  );
};

export default Beardcrumb;
