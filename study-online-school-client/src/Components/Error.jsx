/* eslint-disable react/no-unescaped-entities */

import { Link } from "react-router-dom";

const Error = () => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <img src="https://i.ibb.co/bv16gBR/404.jpg" alt="" />
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
            Something's missing.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{" "}
          </p>
          <Link to={"/"}>
            {" "}
            <button className="btn bg-stSecondary text-white hover:text-stGray">
              Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
