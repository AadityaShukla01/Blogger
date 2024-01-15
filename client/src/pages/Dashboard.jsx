import React, { useContext, useEffect, useState } from "react";
import thumbnail1 from "../../public/blog1.jpg";
import thumbnail2 from "../../public/blog2.jpg";
import thumbnail3 from "../../public/blog3.jpg";
import thumbnail4 from "../../public/blog4.jpg";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

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

const Dashboard = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const token = currentUser?.token;
  const location = useLocation();

  //redirect user to login if they arent logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/posts`, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser?.token}` },
        });
        setPosts(response?.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const deleteHandler = async (_id) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/posts/${_id}`,
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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <>
              <div className="flex justify-between items-center my-8">
                <div>
                  <img
                    src={`http://localhost:5000/upload/${post.thumbnail}`}
                    alt=""
                    className="object-cover"
                  />
                </div>
                <h5 className="font-bold">{post.title}</h5>
                <div className="flex gap-4">
                  <Link
                    to={`/posts/${post?._id}`}
                    className="px-3 py-2 bg-gray-200 rounded-md"
                  >
                    View
                  </Link>
                  <Link
                    to={`/posts/${post?._id}/edit`}
                    className="px-3 py-2 bg-purple-600 rounded-md text-white"
                  >
                    Edit
                  </Link>
                  <div
                    className=" px-3 py-2 bg-red-600 text-white rounded-md cursor-pointer"
                    onClick={() => deleteHandler(post?._id)}
                  >
                    Delete
                  </div>
                </div>
              </div>
            </>
          );
          // </div>;
        })}
    </div>
  );
};

export default Dashboard;
