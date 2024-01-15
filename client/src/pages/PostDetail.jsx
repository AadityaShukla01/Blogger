import React, { useContext, useEffect, useState } from "react";
import PostAuthor from "../components/PostAuthor";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Thumbnail from "../../public/blog10.jpg";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInfo() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setCreatorID(response.data.creator);
        setPost(response?.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    }
    fetchInfo();
  }, []);

  const deleteHandler = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        }
      );
      //since we have delete at 2 places dashboard and postdetail
      if (response.status == 200) {
        if (location.pathname == `/myposts/${currentUser?.id}`) {
          navigate(0);
        } else navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  };
  
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-4xl mx-auto">
      {error && (
        <p className="p-2 text-center bg-red-600 text-white">{error}</p>
      )}
      {post && (
        <>
          <div className="flex justify-between my-4 items-center">
            <PostAuthor authorID={post?.creator} createdAt={post?.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className="flex items-center gap-4">
                <Link
                  to={`/posts/${id}/edit`}
                  className=" bg-purple-600 text-white rounded-md px-4 py-2"
                >
                  Edit
                </Link>
                <div
                  className=" bg-red-600 text-white rounded-md px-4 py-2 cursor-pointer"
                  onClick={deleteHandler}
                >
                  Delete
                </div>
              </div>
            )}
          </div>
          <div className="my-8 px-3">
            <h1 className="mb-10 text-center font-bold">{post?.title}</h1>
            <img
              src={`http://localhost:5000/upload/${post?.thumbnail}`}
              alt=""
              className="w-max h-max object-cover mx-auto my-20"
            />
            <p // using in this way because of react quill
              dangerouslySetInnerHTML={{ __html: post?.description }}
              className="text-xl my-4 leading-7"
            ></p>
          </div>
        </>
      )}
    </div>
  );
};

export default PostDetail;
