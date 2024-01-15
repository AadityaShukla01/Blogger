import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  thumbnail,
  category,
  title,
  desc,
  authorID,
  createdAt,
}) => {
  const shortDesc = desc.length > 145 ? desc.substring(0, 145) + "...." : desc;
  const postTitle = title.length > 145 ? desc.substring(0, 40) + "...." : title;
  const image = `http://localhost:5000/upload/${thumbnail}`;
  // console.log(image);
  return (
    <div className=" bg-white p-4 rounded-md hover:bg-gray-200 transition-all ease-in hover:shadow-lg shadow-black flex flex-col gap-4">
      <Link to={`/posts/${postID}`}>
        <div className="flex">
          <img
            src={image}
            alt={title}
            className="overflow-hidden grow rounded-md"
          />
        </div>
        <div>
          <h3 className="text-center my-2 font-bold ">{postTitle}</h3>
          <p
            dangerouslySetInnerHTML={{ __html: shortDesc }}
            className="my-4"
          ></p>
          <div className="flex items-end justify-between gap-4">
            <PostAuthor authorID={authorID} createdAt={createdAt} />
            <Link
              to={`/posts/categories/${category}`}
              className="p-2 bg-slate-200 rounded-md text-sm"
            >
              {category}
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
