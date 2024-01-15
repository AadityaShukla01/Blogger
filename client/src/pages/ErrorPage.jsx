import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div
      className="
    max-w-4xl mx-auto mt-8 flex flex-col gap-8"
    >
      <div>
        <h1 className="text-center">Page not found !</h1>
      </div>
      <div className="text-center">
        <button className="p-2 bg-purple-600 text-white rounded-md my-4">
          <Link to={"/"} className="no-underline text-white">
            Go back to home
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
