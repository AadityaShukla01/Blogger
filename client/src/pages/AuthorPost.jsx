import React, { useEffect, useState } from "react";

import thumbnail1 from "../../public/blog1.jpg";
import thumbnail2 from "../../public/blog2.jpg";
import thumbnail3 from "../../public/blog3.jpg";
import thumbnail4 from "../../public/blog4.jpg";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

import axios from "axios";

const data = [
  {
    id: "1",
    thumbnail: thumbnail1,
    category: "Category",
    title: "Title",
    desc: "Description",
    authorID: 1,
  },
  {
    id: "2",
    thumbnail: thumbnail2,
    category: "Category",
    title: "Title",
    desc: "Description",
    authorID: 2,
  },
  {
    id: "3",
    thumbnail: thumbnail3,
    category: "Category",
    title: "Title",
    desc: "Description",
    authorID: 3,
  },
  {
    id: "4",
    thumbnail: thumbnail4,
    category: "Category",
    title: "Title",
    desc: "Description",
    authorID: 4,
  },
  {
    id: "5",
    thumbnail: thumbnail4,
    category: "Category",
    title: "Title",
    desc: "By default, Tailwind provides six drop shadow utilities, one inner shadow utility, and a utility for removing existing shadows. You can customize these values by editing theme.boxShadow or theme.extend.boxShadow in your tailwind.config.js fileIf a DEFAULT shadow is provided, it will be used for the non-suffixed shadow utility. Any other keys will be used as suffixes, for example the key 2 will create a corresponding shadow-2 utility.",
    authorID: 5,
  },
];

const AuthorPost = () => {
  const [posts, setPosts] = useState([]);
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/users/${id}`
        );
        setPosts(response?.data);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };

    fetchPost();
  }, [id]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8 px-3">
        {posts.length > 0 ? (
          posts.map(
            ({
              _id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={_id}
                postID={_id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                desc={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )
        ) : (
          <h1 className="text-center">No posts yet...</h1>
        )}
      </div>
    </div>
  );
};

export default AuthorPost;
