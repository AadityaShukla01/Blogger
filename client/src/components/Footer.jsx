import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="my-8 text-center flex flex-col gap-10 bg-slate-900 text-white p-4 w-full">
      <div className="flex flex-wrap gap-4 justify-evenly text-white my-4">
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Agriculture"}
        >
          Agriculture
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Business"}
        >
          Business
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Entertainment"}
        >
          Entertainment
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Investment"}
        >
          Investment
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Art"}
        >
          Art
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Uncategorised"}
        >
          Uncategorised
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Weather"}
        >
          Weather
        </Link>
        <Link
          className="text-white bg-slate-700 hover:bg-slate-500 transition ease-in py-2 px-3 rounded-lg"
          to={"/posts/categories/Education"}
        >
          Education
        </Link>
      </div>
      <div>&copy; Blogs 2023</div>
    </div>
  );
};

export default Footer;
