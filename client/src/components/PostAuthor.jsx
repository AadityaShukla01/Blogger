import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${authorID}`
        );
        setAuthor(response?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAuthor();
  }, []);

  return (
    <div className="">
      <Link to={`/posts/users/${authorID}`} className="flex items-start gap-2">
        <div className="w-30 h-30">
          <img
            src={`http://localhost:5000/upload/${author?.avatar}`}
            alt=""
            className="w-10 h-10 rounded-lg overflow-hidden"
          />
        </div>
        <div className="my-1">
          <h5 className="text-sm font-bold">By: {author?.name}</h5>
          <small>
            <ReactTimeAgo date={createdAt} locale="en-US" />
          </small>
        </div>
      </Link>
    </div>
  );
};

export default PostAuthor;
