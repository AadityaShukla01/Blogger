import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorised");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //redirect user to login if they arent logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  const POST_CATEGORIES = [
    "Art",
    "Education",
    "Uncategorised",
    "Business",
    "Weather",
    "Agriculture",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bulltet",
    "indent",
    "link",
    "image",
  ];

  //getting post to fill the post with earlier details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/posts/${id}`
        );
        setTitle(response?.data.title);
        setDescription(response?.data?.description);
        setCategory(response?.data?.category);
        setThumbnail(response?.data?.thumbnail);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEditPostHandler = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      //if everything is fine redirect user to home page after post is created
      if (response.status === 200) {
        return navigate("/");
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-center my-4 font-bold">Edit Post</h2>
      {error && (
        <p className="p-2 bg-red-600 text-white max-w-xl mx-auto my-4 text-center">
          {error}
        </p>
      )}
      <form
        className="max-w-xl mx-auto text-center flex flex-col gap-5"
        onSubmit={handleEditPostHandler}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          className="p-2 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
        <select
          name="category"
          className="p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {POST_CATEGORIES.map((cat) => (
            <option value={cat} key={cat}>
              {cat}
            </option>
          ))}
        </select>
        <ReactQuill
          value={description}
          onChange={setDescription}
          modules={modules}
          formats={formats}
          className="overflow-scroll bg-gray-100 max-h-[720px]"
        />
        <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
        <button type="submit" className="px-3 py-2 bg-purple-600 text-white">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditPost;
